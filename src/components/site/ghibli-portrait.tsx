import { useEffect, useState } from "react";
import {
  DEFAULT_BADGE,
  currentSeason,
  seasonalPortrait,
  type GhibliSeason,
} from "./ghibli-seasons";

type GhibliPortraitProps = {
  name: string;
  photo: string;
  photoHover: string;
};

export function GhibliPortrait({ name, photo, photoHover }: GhibliPortraitProps) {
  const [active, setActive] = useState(false);
  // Resolved on the client so the server's timezone can't cause a hydration mismatch.
  const [season, setSeason] = useState<GhibliSeason>();
  useEffect(() => setSeason(currentSeason()), []);

  const hoverSrc = seasonalPortrait(season, name) ?? photoHover;

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
        src={hoverSrc}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover object-center motion-safe:transition-opacity motion-safe:duration-500 ${
          active ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy"
      />

      {active && season?.particles ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 [container-type:size] motion-reduce:hidden">
          {season.particles.map((p, i) => (
            <span
              key={i}
              className="ghibli-particle absolute -top-6 text-lg"
              style={{
                left: `${8 + i * (84 / season.particles!.length)}%`,
                animationDelay: `${(i * 0.7) % 2.4}s`,
                animationDuration: `${3.2 + (i % 3) * 0.6}s`,
              }}
            >
              {p}
            </span>
          ))}
        </div>
      ) : null}

      <span
        className={`pointer-events-none absolute bottom-3 right-3 rounded-full bg-ink/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white motion-safe:transition-opacity motion-safe:duration-300 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      >
        {season?.badge ?? DEFAULT_BADGE}
      </span>
    </div>
  );
}
