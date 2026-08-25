"use client";

import { useEffect } from "react";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-WHIZZLYLAB";

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

export default function Analytics() {
  useEffect(() => {
    // Check if consent has already been granted
    const checkConsent = () => {
      try {
        const consent = localStorage.getItem("whizzly_cookie_consent");
        if (consent === "accepted" && typeof window.gtag === "function") {
          window.gtag("consent", "update", {
            analytics_storage: "granted",
          });
        }
      } catch {}
    };

    checkConsent();
    const handleUpdate = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", {
          analytics_storage: detail === "accepted" ? "granted" : "denied",
        });
      }
    };

    window.addEventListener("whizzly_consent_update", handleUpdate);
    return () => window.removeEventListener("whizzly_consent_update", handleUpdate);
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('consent', 'default', {
              'analytics_storage': 'denied'
            });
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `,
        }}
      />
    </>
  );
}
