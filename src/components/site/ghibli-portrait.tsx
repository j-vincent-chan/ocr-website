import { useState } from "react";

type GhibliPortraitProps = {
  name: string;
  photo: string;
  photoHover: string;
};

export function GhibliPortrait({ name, photo, photoHover }: GhibliPortraitProps) {
  const [active, setActive] = useState(false);

  return (
    <div
      className="relative w-full aspect-square rounded-2xl overflow-hidden bg-cream"
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <img
        src={photo}
        alt={name}
        className={`absolute inset-0 h-full w-full object-cover object-[center_18%] motion-safe:transition-opacity motion-safe:duration-500 ${
          active ? "opacity-0" : "opacity-100"
        }`}
        loading="lazy"
      />

      <img
        src={photoHover}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover object-center motion-safe:transition-opacity motion-safe:duration-500 ${
          active ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy"
      />

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
