import coreyRatheWebm from "@/assets/people/hover/clips/corey-rathe-gesture.webm";
import franciscoQuintanillaWebm from "@/assets/people/hover/clips/francisco-quintanilla-gesture.webm";
import gabeMurphyWebm from "@/assets/people/hover/clips/gabe-murphy-gesture.webm";
import jonathanWilsonWebm from "@/assets/people/hover/clips/jonathan-wilson-gesture.webm";
import lilyOrtizWebm from "@/assets/people/hover/clips/lily-ortiz-gesture.webm";
import linaKamilWebm from "@/assets/people/hover/clips/lina-kamil-gesture.webm";
import michelleYuWebm from "@/assets/people/hover/clips/michelle-yu-gesture.webm";
import nataliaDikinovWebm from "@/assets/people/hover/clips/natalia-dikinov-gesture.webm";
import ohnmarChanWebm from "@/assets/people/hover/clips/ohnmar-chan-gesture.webm";
import reidBolusWebm from "@/assets/people/hover/clips/reid-bolus-gesture.webm";
import vincentChanWebm from "@/assets/people/hover/clips/vincent-chan-gesture.webm";
import xochitlVargasWebm from "@/assets/people/hover/clips/xochitl-vargas-gesture.webm";

export type GhibliClip = {
  webm: string;
  variant: "wave" | "nod" | "lean" | "brighten";
};

export const GHIBLI_CLIPS: Record<string, GhibliClip> = {
  "corey-rathe": { webm: coreyRatheWebm, variant: "brighten" },
  "francisco-quintanilla": { webm: franciscoQuintanillaWebm, variant: "brighten" },
  "gabe-murphy": { webm: gabeMurphyWebm, variant: "nod" },
  "jonathan-wilson": { webm: jonathanWilsonWebm, variant: "wave" },
  "lily-ortiz": { webm: lilyOrtizWebm, variant: "brighten" },
  "lina-kamil": { webm: linaKamilWebm, variant: "brighten" },
  "michelle-yu": { webm: michelleYuWebm, variant: "lean" },
  "natalia-dikinov": { webm: nataliaDikinovWebm, variant: "brighten" },
  "ohnmar-chan": { webm: ohnmarChanWebm, variant: "wave" },
  "reid-bolus": { webm: reidBolusWebm, variant: "lean" },
  "vincent-chan": { webm: vincentChanWebm, variant: "lean" },
  "xochitl-vargas": { webm: xochitlVargasWebm, variant: "wave" },
};

export function ghibliClipFromHover(photoHover: string): GhibliClip | null {
  const file = photoHover.split("/").pop() ?? "";
  const slug = file.match(/^(.+)-hover/)?.[1];
  return slug ? (GHIBLI_CLIPS[slug] ?? null) : null;
}
