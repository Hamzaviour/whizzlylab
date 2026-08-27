import { ImageResponse } from "next/og";
import { getService, getAllServiceSlugs } from "@/lib/services";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ServiceOpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);

  const title = service ? service.title : "Specialized Engineering Service";
  const headline = service ? service.headline : "Production-grade AI and software engineering services.";
  const deliverables = service ? service.deliverables.slice(0, 4) : [];
  const stack = service ? service.stack.slice(0, 4) : [];
  const accentColor = service?.accentColor || "#a855f7";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#05010f",
          backgroundImage: `radial-gradient(circle at 85% 20%, ${accentColor}55 0%, transparent 50%), radial-gradient(circle at 15% 85%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)`,
          padding: "60px 70px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Frame border */}
        <div
          style={{
            position: "absolute",
            top: "24px",
            left: "24px",
            right: "24px",
            bottom: "24px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "24px",
            display: "flex",
          }}
        />

        {/* Top row */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                backgroundColor: accentColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "4px",
                  backgroundColor: "#ffffff",
                  display: "flex",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "26px",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "#ffffff",
                }}
              >
                WHIZZLY LAB
              </span>
              <span
                style={{
                  fontSize: "13px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#94a3b8",
                  fontWeight: 600,
                }}
              >
                Service Specification
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              padding: "6px 16px",
              borderRadius: "9999px",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: `1px solid ${accentColor}88`,
              color: "#e2e8f0",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Engineering Practice
          </div>
        </div>

        {/* Center: Service Title & Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              fontSize: "52px",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              display: "flex",
            }}
          >
            {title}
          </div>

          <p
            style={{
              fontSize: "22px",
              lineHeight: 1.35,
              color: "#cbd5e1",
              margin: 0,
              display: "flex",
            }}
          >
            {headline}
          </p>
        </div>

        {/* Deliverables & Stack Badges */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px" }}>
            {deliverables.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                  color: "#f1f5f9",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                <span style={{ color: accentColor, marginRight: "8px" }}>•</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(255, 255, 255, 0.12)",
              paddingTop: "16px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row", gap: "8px", alignItems: "center" }}>
              <span style={{ fontSize: "14px", color: "#64748b", fontWeight: 600 }}>
                STACK:
              </span>
              <span style={{ fontSize: "14px", color: "#38bdf8", fontWeight: 600 }}>
                {stack.join(" • ")}
              </span>
            </div>
            <span style={{ fontSize: "15px", color: "#94a3b8", fontWeight: 500 }}>
              whizzlylab.com/services/{slug}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
