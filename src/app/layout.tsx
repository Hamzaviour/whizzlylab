import type { Metadata } from "next";
import "./globals.css";
import InteractiveShell from "@/components/InteractiveShell";

export const metadata: Metadata = {
  title: {
    default: "Whizzly Lab",
    template: "%s | Whizzly Lab",
  },
  description:
    "Whizzly Lab builds intelligent AI systems, real-time data pipelines, and production-grade full-stack products. Led by Hamza Younas.",
  applicationName: "Whizzly Lab",
  icons: {
    icon: [{ url: "/icon", type: "image/png" }],
    apple: [{ url: "/apple-icon", type: "image/png" }],
  },
  openGraph: {
    title: "Whizzly Lab",
    description:
      "AI, ML & full-stack engineering — intelligent systems that ship.",
    siteName: "Whizzly Lab",
    images: [{ url: "/logo-og.jpg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
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
        <link rel="icon" href="/icon" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-icon" />
      </head>
      <body className="min-h-full antialiased">
        <InteractiveShell>{children}</InteractiveShell>
      </body>
    </html>
  );
}
