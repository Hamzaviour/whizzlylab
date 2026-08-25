import type { Metadata, Viewport } from "next";
import "./globals.css";
import InteractiveShell from "@/components/InteractiveShell";
import { CurrencyProvider } from "@/lib/currency";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
  "https://whizzlylab.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Whizzly Lab — AI, ML & Full-Stack Engineering Studio",
    template: "%s | Whizzly Lab",
  },
  description:
    "Whizzly Lab is an AI and full-stack engineering studio founded by Hamza Younas. We build intelligent AI systems, real-time data pipelines, and production-grade web products for clients worldwide.",
  keywords: [
    "AI engineering",
    "machine learning",
    "full-stack development",
    "data pipelines",
    "RAG agents",
    "Kafka",
    "Next.js",
    "AI development",
    "Hamza Younas",
    "Whizzly Lab",
    "web development",
    "AI consultancy",
    "software development",
  ],
  authors: [{ name: "Hamza Younas" }],
  creator: "Hamza Younas",
  publisher: "Whizzly Lab",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "Whizzly Lab — AI, ML & Full-Stack Engineering Studio",
    description:
      "AI, ML & full-stack engineering — intelligent systems that ship. Founded by Hamza Younas.",
    siteName: "Whizzly Lab",
    images: [
      {
        url: `${BASE_URL}/logo-og.jpg`,
        width: 652,
        height: 521,
        alt: "Whizzly Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Whizzly Lab — AI, ML & Full-Stack Engineering",
    description:
      "AI, ML & full-stack engineering — intelligent systems that ship. Founded by Hamza Younas.",
    images: [`${BASE_URL}/logo-og.jpg`],
    creator: "@whizzlylab",
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "16x16", type: "image/png" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "48x48", type: "image/png" },
      { url: "/icon.png", sizes: "96x96", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", type: "image/png" }],
  },
  manifest: "/manifest.json",
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "your-google-site-verification-code",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#05010f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Whizzly Lab",
              url: BASE_URL,
              logo: `${BASE_URL}/logo-full.png`,
              image: `${BASE_URL}/logo-og.jpg`,
              description:
                "Whizzly Lab is an AI, machine learning, and full-stack engineering studio building intelligent AI systems, real-time data pipelines, and production-grade software worldwide.",
              founder: {
                "@type": "Person",
                name: "Hamza Younas",
                url: "https://hamzayounas.netlify.app/",
                jobTitle: "Lead AI Engineer & Founder",
              },
              sameAs: [
                "https://www.linkedin.com/company/whizzly-lab",
                "https://www.instagram.com/whizzlylab",
                "https://www.facebook.com/profile.php?id=61592686831558",
                "https://github.com/Hamzaviour",
                "https://hamzavelous-echosense-ai.hf.space/login",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                email: "whizzlylab@gmail.com",
                url: "https://wa.me/923039969903",
                availableLanguage: ["English"],
              },
              knowsAbout: [
                "Artificial Intelligence",
                "Machine Learning",
                "RAG Systems",
                "Data Engineering",
                "Apache Kafka",
                "Apache Spark",
                "Next.js",
                "Full-Stack Development",
              ],
            }),
          }}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Barlow:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://db.onlinewebfonts.com/c/e55e9079ee863276569c8a68d776ef04?family=Futura+Md+BT+Medium"
          rel="stylesheet"
        />
        <link rel="icon" href="/icon.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/icon.png" sizes="48x48" type="image/png" />
        <link rel="icon" href="/icon.png" sizes="96x96" type="image/png" />
        <link rel="icon" href="/icon.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/icon.png" sizes="512x512" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#05010f" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-full antialiased">
        <CurrencyProvider>
          <InteractiveShell>{children}</InteractiveShell>
        </CurrencyProvider>
      </body>
    </html>
  );
}
