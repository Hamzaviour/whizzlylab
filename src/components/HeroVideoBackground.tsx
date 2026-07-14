"use client";

import { useEffect, useRef } from "react";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4";

/**
 * Full-bleed hero video with rAF fade-in / fade-out loop
 * (0.5s edges, 100ms pause, then replay).
 */
export default function HeroVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId = 0;
    const fadeDuration = 0.5;

    const updateOpacity = () => {
      if (!video.duration) {
        animationFrameId = requestAnimationFrame(updateOpacity);
        return;
      }

      const currentTime = video.currentTime;
      const duration = video.duration;
      let opacity = 1;

      if (currentTime < fadeDuration) {
        opacity = currentTime / fadeDuration;
      } else if (currentTime > duration - fadeDuration) {
        opacity = (duration - currentTime) / fadeDuration;
      }

      video.style.opacity = Math.max(0, Math.min(1, opacity)).toString();
      animationFrameId = requestAnimationFrame(updateOpacity);
    };

    const handleEnded = () => {
      cancelAnimationFrame(animationFrameId);
      video.style.opacity = "0";

      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => undefined);
        animationFrameId = requestAnimationFrame(updateOpacity);
      }, 100);
    };

    video.addEventListener("ended", handleEnded);
    video.play().catch(() => undefined);
    animationFrameId = requestAnimationFrame(updateOpacity);

    return () => {
      cancelAnimationFrame(animationFrameId);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={VIDEO_SRC}
      muted
      playsInline
      preload="auto"
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-100 ease-out"
      style={{ opacity: 0 }}
    />
  );
}
