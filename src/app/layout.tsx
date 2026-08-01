import type { Metadata, Viewport } from "next";
import "./globals.css";
import InteractiveShell from "@/components/InteractiveShell";
import { CurrencyProvider } from "@/lib/currency";

export const metadata: Metadata = {
  metadataBase: new URL("https://whizzlylab.com"),
  title: {
    default: "Whizzly Lab — AI, ML & Full-Stack Engineering Studio",
    template: "%s | Whizzly Lab",
  },
  description:
    "Whizzly Lab is an AI and full-stack engineering studio founded by Hamza Younas. We build intelligent AI systems, real-time data pipelines, and production-grade web products from Lahore to the world.",
  keywords: [
    "AI engineering",
    "machine learning",
    "full-stack development",
    "data pipelines",
    "RAG agents",
    "Kafka",
    "Next.js",
    "AI development Pakistan",
    "Hamza Younas",
    "Whizzly Lab",
    "web development Lahore",
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
    url: "https://whizzlylab.com",
    title: "Whizzly Lab — AI, ML & Full-Stack Engineering Studio",
    description:
      "AI, ML & full-stack engineering — intelligent systems that ship. Founded by Hamza Younas in Lahore.",
    siteName: "Whizzly Lab",
    images: [
      {
        url: "https://whizzlylab.com/logo-og.jpg",
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
      "AI, ML & full-stack engineering — intelligent systems that ship. Founded by Hamza Younas in Lahore.",
    images: ["https://whizzlylab.com/logo-og.jpg"],
    creator: "@whizzlylab",
  },
  alternates: {
    canonical: "https://whizzlylab.com",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/icon", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", type: "image/png" }],
  },
  manifest: "/manifest.json",
  verification: {
    google: "your-google-site-verification-code",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
              url: "https://whizzlylab.com",
              logo: "https://whizzlylab.com/logo-full.png",
              description:
                "AI and full-stack engineering studio building intelligent systems that ship.",
              founder: {
                "@type": "Person",
                name: "Hamza Younas",
                url: "https://hamzayounas.netlify.app/",
                jobTitle: "AI Engineer & Founder",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Lahore",
                addressCountry: "PK",
              },
              sameAs: [],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                email: "hello@whizzlylab.com",
              },
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon" type="image/png" sizes="512x512" />
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
