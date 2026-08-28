import { NextRequest, NextResponse } from "next/server";
import {
  retrieveKnowledge,
  buildGroundedSystemPrompt,
  generateSmartFallbackReply,
} from "@/lib/rag/engine";

export const dynamic = "force-dynamic";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const message: string = (body.message || "").trim();
    const history: ChatMessage[] = Array.isArray(body.history) ? body.history : [];
    const currency: string = (body.currency || "USD").toUpperCase();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // 1. Perform Hybrid RAG Retrieval over Whizzly Lab Knowledge Base
    const retrievedChunks = retrieveKnowledge(message, 4);
    const sources = retrievedChunks.map((r) => ({
      title: r.chunk.title,
      url: r.chunk.url,
    }));

    // 2. Build Grounded Prompt with retrieved context
    const systemPrompt = buildGroundedSystemPrompt(retrievedChunks, currency);

    // 3. API Keys Check
    const groqKey = process.env.GROQ_API_KEY;
    const geminiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_AI_API_KEY ||
      process.env.GOOGLE_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    let llmReply: string | null = null;
    let engineUsed = "local-rag-neural-synthesis";

    // ── Primary Engine: Groq API (High Speed Llama-3.3-70B / Llama-3.1-8B) ──
    if (groqKey) {
      const groqModels = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"];
      for (const model of groqModels) {
        if (llmReply) break;
        try {
          const groqResp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${groqKey}`,
            },
            body: JSON.stringify({
              model,
              messages: [
                { role: "system", content: systemPrompt },
                ...history.slice(-6).map((h) => ({ role: h.role, content: h.content })),
                { role: "user", content: message },
              ],
              temperature: 0.35,
              max_tokens: 1024,
            }),
          });

          if (groqResp.ok) {
            const groqData = await groqResp.json();
            const text = groqData?.choices?.[0]?.message?.content?.trim();
            if (text) {
              llmReply = text;
              engineUsed = `groq-${model}`;
            }
          } else {
            const errText = await groqResp.text();
            console.warn(`Groq API error (${model}): ${groqResp.status} - ${errText}`);
          }
        } catch (groqErr) {
          console.warn(`Groq API call error (${model}):`, groqErr);
        }
      }
    }

    // ── Secondary Engine: Gemini API (if Groq is not configured/fails) ──────
    if (!llmReply && geminiKey) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
        const contents = [
          ...history.slice(-6).map((h) => ({
            role: h.role === "assistant" ? "model" : "user",
            parts: [{ text: h.content }],
          })),
          {
            role: "user",
            parts: [{ text: message }],
          },
        ];

        const geminiResp = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents,
            generationConfig: {
              temperature: 0.35,
              maxOutputTokens: 1000,
            },
          }),
        });

        if (geminiResp.ok) {
          const geminiData = await geminiResp.json();
          const candidateText =
            geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            llmReply = candidateText.trim();
            engineUsed = "gemini-1.5-flash";
          }
        }
      } catch (geminiErr) {
        console.warn("Gemini API call failed:", geminiErr);
      }
    }

    // ── Tertiary Engine: OpenAI (if configured) ─────────────────────────────
    if (!llmReply && openaiKey) {
      try {
        const openAiResp = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: systemPrompt },
              ...history.slice(-6).map((h) => ({ role: h.role, content: h.content })),
              { role: "user", content: message },
            ],
            temperature: 0.3,
            max_tokens: 1000,
          }),
        });

        if (openAiResp.ok) {
          const openAiData = await openAiResp.json();
          llmReply = openAiData?.choices?.[0]?.message?.content?.trim() || null;
          if (llmReply) engineUsed = "openai-gpt-4o-mini";
        }
      } catch (openAiErr) {
        console.warn("OpenAI API call failed:", openAiErr);
      }
    }

    // ── Smart Fallback Engine: Deterministic RAG Knowledge Synthesis ────────
    const fallbackMeta = generateSmartFallbackReply(message, retrievedChunks, currency);

    if (!llmReply) {
      return NextResponse.json({
        reply: fallbackMeta.reply,
        sources,
        suggestedQuestions: fallbackMeta.suggestedQuestions,
        actionCta: fallbackMeta.actionCta,
        groundedCount: retrievedChunks.length,
        engine: "local-rag-neural-synthesis",
      });
    }

    return NextResponse.json({
      reply: llmReply,
      sources,
      suggestedQuestions: fallbackMeta.suggestedQuestions,
      actionCta: fallbackMeta.actionCta,
      groundedCount: retrievedChunks.length,
      engine: engineUsed,
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Internal Server Error";
    console.error("Chat API error:", errMessage);
    return NextResponse.json(
      { error: "Failed to process chat request", details: errMessage },
      { status: 500 }
    );
  }
}
