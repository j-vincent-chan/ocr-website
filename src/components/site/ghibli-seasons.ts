export type GhibliSeason = {
  id: string;
  badge: string;
  /** Inclusive [month, day] range, months 1–12. */
  start: [number, number];
  end: [number, number];
  particles?: string[];
};

export const DEFAULT_BADGE = "✨ Ghibli mode";

export const GHIBLI_SEASONS: GhibliSeason[] = [
  {
    id: "thanksgiving",
    badge: "🦃 Thanksgiving Ghibli mode",
    start: [11, 1],
    end: [11, 30],
    particles: ["🍁", "🍂", "🍁", "🍂", "🍁", "🍂"],
  },
  {
    id: "winter",
    badge: "❄️ Winter Ghibli mode",
    start: [12, 1],
    end: [1, 6],
    particles: ["❄️", "❅", "❆", "❄️", "❅", "❆"],
  },
];

const SEASONAL_PORTRAITS = import.meta.glob<string>(
  "../../assets/people/hover/seasons/*/*.jpg",
  { eager: true, import: "default" },
);

function toOrdinal([month, day]: [number, number]) {
  return month * 100 + day;
}

export function currentSeason(date = new Date()): GhibliSeason | undefined {
  const today = toOrdinal([date.getMonth() + 1, date.getDate()]);
  return GHIBLI_SEASONS.find((s) => {
    const start = toOrdinal(s.start);
    const end = toOrdinal(s.end);
    return start <= end ? today >= start && today <= end : today >= start || today <= end;
  });
}

/** `?season=<id>` previews a season outside its dates. */
export function activeSeason(): GhibliSeason | undefined {
  const preview = new URLSearchParams(window.location.search).get("season");
  return GHIBLI_SEASONS.find((s) => s.id === preview) ?? currentSeason();
}

export function seasonalPortrait(season: GhibliSeason | undefined, name: string) {
  if (!season) return undefined;
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  return SEASONAL_PORTRAITS[`../../assets/people/hover/seasons/${season.id}/${slug}.jpg`];
}
