import { useEffect, useRef, useState } from "react";
import type { GhibliClip } from "@/data/ghibli-clips";

type GhibliPortraitProps = {
  name: string;
  photo: string;
  photoHover: string;
  clip: GhibliClip | null;
};

export function GhibliPortrait({ name, photo, photoHover, clip }: GhibliPortraitProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [gestureKey, setGestureKey] = useState(0);
  const [useGifFallback, setUseGifFallback] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMotionEnabled(!reduced);
  }, []);

  useEffect(() => {
    if (!active || !motionEnabled || useGifFallback || !clip || !videoRef.current) return;
    const video = videoRef.current;
    video.currentTime = 0;
    void video.play().catch(() => setUseGifFallback(true));
  }, [active, motionEnabled, useGifFallback, clip, gestureKey]);

  const handleEnter = () => {
    setGestureKey((key) => key + 1);
    setUseGifFallback(false);
    setActive(true);
  };

  const handleLeave = () => {
    setActive(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const showClip = active && motionEnabled && clip;

  return (
    <div
      className="relative w-full aspect-square rounded-2xl overflow-hidden bg-cream"
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      <img
        src={photo}
        alt={name}
        className={`absolute inset-0 h-full w-full object-cover object-[center_18%] motion-safe:transition-opacity motion-safe:duration-500 ${
          active ? "opacity-0" : "opacity-100"
        }`}
        loading="lazy"
      />

      <div
        className={`absolute inset-0 overflow-hidden ${
          active ? "opacity-100" : "opacity-0 pointer-events-none"
        } motion-safe:transition-opacity motion-safe:duration-500`}
        aria-hidden={!active}
      >
        {!showClip ? (
          <img
            src={photoHover}
            alt=""
            className={`h-full w-full object-cover object-center ${active ? "opacity-100" : "opacity-0"}`}
            loading="lazy"
          />
        ) : useGifFallback ? (
          <img
            key={`gif-${gestureKey}`}
            src={clip.gif}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <video
            key={`video-${gestureKey}`}
            ref={videoRef}
            className="h-full w-full object-cover object-center"
            muted
            playsInline
            preload="metadata"
            poster={photoHover}
            onError={() => setUseGifFallback(true)}
          >
            <source src={clip.webm} type="video/webm" />
          </video>
        )}
      </div>

      <span
        className={`pointer-events-none absolute bottom-3 right-3 rounded-full bg-ink/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white motion-safe:transition-opacity motion-safe:duration-300 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      >
        ✨ Ghibli mode
      </span>
    </div>
  );
}
