type MonthDay = [month: number, day: number];

export type GhibliSeason = {
  id: string;
  badge: string;
  /** Inclusive range, months 1–12. A range may wrap past the new year. */
  start?: MonthDay;
  end?: MonthDay;
  /** For holidays whose date moves each year; only listed years are active. */
  byYear?: Record<number, [MonthDay, MonthDay]>;
  particles?: string[];
};

export const DEFAULT_BADGE = "✨ Ghibli mode";

export const GHIBLI_SEASONS: GhibliSeason[] = [
  {
    id: "lunar-new-year",
    badge: "🏮 Lunar New Year Ghibli mode",
    // About a week before through two weeks after the new year.
    byYear: {
      2027: [[1, 30], [2, 20]],
      2028: [[1, 19], [2, 9]],
      2029: [[2, 6], [2, 27]],
      2030: [[1, 27], [2, 17]],
    },
    particles: ["🏮", "🧧", "✨", "🏮", "🧧", "✨"],
  },
  {
    id: "spring",
    badge: "🌸 Spring Ghibli mode",
    start: [3, 1],
    end: [4, 30],
    particles: ["🌸", "🌸", "🌸", "🌸", "🌸", "🌸"],
  },
  {
    id: "pride",
    badge: "🌈 Pride Ghibli mode",
    start: [6, 1],
    end: [6, 30],
    particles: ["🌈", "✨", "🌈", "✨", "🌈", "✨"],
  },
  {
    id: "summer",
    badge: "☀️ Summer Ghibli mode",
    start: [7, 1],
    end: [8, 31],
    particles: ["✨", "🌻", "✨", "🌻", "✨", "🌻"],
  },
  {
    id: "halloween",
    badge: "🎃 Halloween Ghibli mode",
    start: [10, 1],
    end: [10, 31],
    particles: ["🦇", "🍂", "🦇", "🍂", "🦇", "🍂"],
  },
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

function toOrdinal([month, day]: MonthDay) {
  return month * 100 + day;
}

function inRange(today: number, start: MonthDay, end: MonthDay) {
  const s = toOrdinal(start);
  const e = toOrdinal(end);
  return s <= e ? today >= s && today <= e : today >= s || today <= e;
}

export function currentSeason(date = new Date()): GhibliSeason | undefined {
  const today = toOrdinal([date.getMonth() + 1, date.getDate()]);
  return GHIBLI_SEASONS.find((s) => {
    const range = s.byYear ? s.byYear[date.getFullYear()] : s.start && s.end && [s.start, s.end];
    return range ? inRange(today, range[0], range[1]) : false;
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
