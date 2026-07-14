export type ServicePage = {
  slug: string;
  title: string;
  short: string;
  tag: string;
  accentColor: string;
  image: string;
  headline: string;
  body: string[];
  deliverables: string[];
  stack: string[];
};

export const SERVICES: ServicePage[] = [
  {
    slug: "web-development",
    title: "Web Development",
    short:
      "High-performance React and Next.js products with Flask APIs, Docker, and cloud delivery.",
    tag: "",
    accentColor: "#3b82f6",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80",
    headline: "Product-grade web platforms that load fast and scale cleanly.",
    body: [
      "Whizzly Lab builds modern web products with React, Next.js, and hardened API layers — designed for performance, security, and maintainability.",
      "From marketing sites to authenticated dashboards, we ship interfaces that feel premium and backends that stay production-ready.",
    ],
    deliverables: [
      "Next.js / React frontends",
      "Flask / Node API layers",
      "Dockerized deployments",
      "Auth, CMS, and cloud hosting",
    ],
    stack: ["Next.js", "React", "TypeScript", "Flask", "Docker", "AWS"],
  },
  {
    slug: "machine-learning",
    title: "Machine Learning",
    short:
      "Supervised learning, deep models, evaluation loops, and Hugging Face pipelines.",
    tag: "",
    accentColor: "#a855f7",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1400&q=80",
    headline: "Models that train, evaluate, and ship into real systems.",
    body: [
      "We design supervised and deep learning pipelines with clear evaluation loops — from feature prep to Hugging Face deployment.",
      "Every model engagement starts with data quality, ends with measurable business outcomes, and stays monitorable after launch.",
    ],
    deliverables: [
      "Model training & evaluation",
      "Feature engineering pipelines",
      "Hugging Face deployments",
      "Monitoring & retraining loops",
    ],
    stack: ["Python", "PyTorch", "scikit-learn", "Hugging Face", "MLflow"],
  },
  {
    slug: "ai",
    title: "AI",
    short:
      "RAG systems, agentic workflows, LangChain, ChromaDB, and production LLM deployments.",
    tag: "Popular",
    accentColor: "#00F0FF",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80",
    headline: "Agentic AI and RAG systems built for production — not demos.",
    body: [
      "Whizzly Lab delivers retrieval-augmented generation, LangChain agents, and LLM apps that plug into your docs, tools, and workflows.",
      "We focus on grounding, latency, cost control, and safe tool use so AI features earn trust with real users.",
    ],
    deliverables: [
      "RAG knowledge bases",
      "Agentic tool workflows",
      "LangChain / ChromaDB stacks",
      "LLM eval & guardrails",
    ],
    stack: ["LangChain", "ChromaDB", "OpenAI", "Hugging Face", "Python"],
  },
  {
    slug: "automation",
    title: "Automation",
    short:
      "n8n workflows, AWS orchestration, and voice AI with Whisper, Deepgram, and ElevenLabs.",
    tag: "",
    accentColor: "#ec4899",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    headline: "Workflows that remove busywork and connect your stack.",
    body: [
      "From n8n graphs to AWS-orchestrated jobs, we automate handoffs between CRMs, data stores, messaging, and AI services.",
      "Voice pipelines with Whisper, Deepgram, and ElevenLabs turn speech into structured action across your product.",
    ],
    deliverables: [
      "n8n / Zapier-style workflows",
      "AWS job orchestration",
      "Voice AI pipelines",
      "Ops alerts & integrations",
    ],
    stack: ["n8n", "AWS", "Whisper", "Deepgram", "ElevenLabs"],
  },
  {
    slug: "data-analytics",
    title: "Data Analytics",
    short:
      "Power BI, Tableau, and Looker Studio storytelling for executive decision-making.",
    tag: "",
    accentColor: "#14b8a6",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    headline: "Dashboards that turn messy data into clear decisions.",
    body: [
      "We build analytics layers and executive dashboards in Power BI, Tableau, and Looker Studio — connected to the sources your team already trusts.",
      "Expect clean metrics definitions, reliable refresh, and visuals that leadership can act on without digging for answers.",
    ],
    deliverables: [
      "Executive KPI dashboards",
      "ETL / warehouse connectors",
      "Metric dictionaries",
      "Scheduled reporting",
    ],
    stack: ["Power BI", "Tableau", "Looker Studio", "SQL", "Python"],
  },
  {
    slug: "business-solutions",
    title: "Business Solutions",
    short:
      "Healthcare, compliance, and e-commerce platforms engineered end-to-end.",
    tag: "Premium",
    accentColor: "#f43f5e",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=80",
    headline: "Domain platforms for healthcare, compliance, and commerce.",
    body: [
      "We ship vertical products like CureCMS, COMPLYSECOPS, and OXO — blending product design, AI, and reliable engineering.",
      "Every engagement is scoped to your sector’s constraints: privacy, auditability, ops workflows, and customer experience.",
    ],
    deliverables: [
      "Domain discovery & architecture",
      "Full-stack product delivery",
      "AI-assisted operations",
      "Launch & iteration support",
    ],
    stack: ["Next.js", "AI agents", "Cloud", "Compliance-aware design"],
  },
  {
    slug: "computer-vision",
    title: "Computer Vision",
    short:
      "Classification and detection models for satellite, industrial, and operational vision tasks.",
    tag: "",
    accentColor: "#8b5cf6",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&q=80",
    headline: "Vision models that see what operators need to catch.",
    body: [
      "Whizzly Lab builds classification and detection systems for satellite, industrial, and operational imagery.",
      "We handle dataset curation, model training, and integration into dashboards or alerting so vision output becomes action.",
    ],
    deliverables: [
      "Object detection models",
      "Image classification pipelines",
      "Dataset tooling",
      "Inference APIs & alerts",
    ],
    stack: ["PyTorch", "OpenCV", "YOLO", "Hugging Face", "Python"],
  },
  {
    slug: "data-pipelines",
    title: "Data Pipelines",
    short:
      "Kafka, Spark, and PySpark streams that turn raw events into real-time intelligence.",
    tag: "New",
    accentColor: "#f59e0b",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
    headline: "Real-time pipelines for events, NLP, and downstream AI.",
    body: [
      "We design Kafka and Spark pipelines that move data from producers to stores, models, and product surfaces with clear SLAs.",
      "Whether it’s EchoSense-style streaming NLP or batch warehouses, the goal is reliable, observable data flow.",
    ],
    deliverables: [
      "Kafka topics & consumers",
      "Spark / PySpark jobs",
      "Stream → store → model paths",
      "Observability & retries",
    ],
    stack: ["Kafka", "Spark", "PySpark", "Python", "Cloud"],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export function getAllServiceSlugs() {
  return SERVICES.map((s) => s.slug);
}
