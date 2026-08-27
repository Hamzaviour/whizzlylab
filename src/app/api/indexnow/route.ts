import { NextRequest, NextResponse } from "next/server";
import { submitToIndexNow, pingSitemaps, getAllSiteUrls } from "@/lib/indexnow";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const urls = getAllSiteUrls();
    const indexNowResult = await submitToIndexNow(urls);
    const sitemapResult = await pingSitemaps();

    return NextResponse.json({
      status: "success",
      timestamp: new Date().toISOString(),
      indexNow: indexNowResult,
      sitemapPing: sitemapResult,
      urlsIndexed: urls,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { status: "error", message: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const urlsToSubmit: string[] =
      Array.isArray(body.urls) && body.urls.length > 0
        ? body.urls
        : getAllSiteUrls();

    const indexNowResult = await submitToIndexNow(urlsToSubmit);
    let sitemapResult = null;

    if (body.pingSitemaps !== false) {
      sitemapResult = await pingSitemaps();
    }

    return NextResponse.json({
      status: "success",
      timestamp: new Date().toISOString(),
      indexNow: indexNowResult,
      sitemapPing: sitemapResult,
      urlsCount: urlsToSubmit.length,
      urlsIndexed: urlsToSubmit,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { status: "error", message: errorMessage },
      { status: 500 }
    );
  }
}
