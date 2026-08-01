import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Whizzly Lab — AI & Full-Stack Engineering Studio",
    short_name: "Whizzly Lab",
    description:
      "AI, ML, and full-stack engineering studio building intelligent systems that ship. Founded by Hamza Younas in Lahore.",
    start_url: "/",
    display: "standalone",
    background_color: "#05010f",
    theme_color: "#05010f",
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
