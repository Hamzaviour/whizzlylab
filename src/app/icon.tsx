import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/** Large tab icon — logo scaled up to dominate the mark */
export default async function Icon() {
  const bytes = await readFile(join(process.cwd(), "public", "icon.png"));
  const logoSrc = `data:image/png;base64,${Buffer.from(bytes).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05010f",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          width={440}
          height={440}
          alt=""
          style={{
            objectFit: "contain",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
