import coreyRatheGif from "@/assets/people/hover/clips/corey-rathe-gesture.gif";
import coreyRatheWebm from "@/assets/people/hover/clips/corey-rathe-gesture.webm";
import franciscoQuintanillaGif from "@/assets/people/hover/clips/francisco-quintanilla-gesture.gif";
import franciscoQuintanillaWebm from "@/assets/people/hover/clips/francisco-quintanilla-gesture.webm";
import gabeMurphyGif from "@/assets/people/hover/clips/gabe-murphy-gesture.gif";
import gabeMurphyWebm from "@/assets/people/hover/clips/gabe-murphy-gesture.webm";
import jonathanWilsonGif from "@/assets/people/hover/clips/jonathan-wilson-gesture.gif";
import jonathanWilsonWebm from "@/assets/people/hover/clips/jonathan-wilson-gesture.webm";
import lilyOrtizGif from "@/assets/people/hover/clips/lily-ortiz-gesture.gif";
import lilyOrtizWebm from "@/assets/people/hover/clips/lily-ortiz-gesture.webm";
import linaKamilGif from "@/assets/people/hover/clips/lina-kamil-gesture.gif";
import linaKamilWebm from "@/assets/people/hover/clips/lina-kamil-gesture.webm";
import michelleYuGif from "@/assets/people/hover/clips/michelle-yu-gesture.gif";
import michelleYuWebm from "@/assets/people/hover/clips/michelle-yu-gesture.webm";
import nataliaDikinovGif from "@/assets/people/hover/clips/natalia-dikinov-gesture.gif";
import nataliaDikinovWebm from "@/assets/people/hover/clips/natalia-dikinov-gesture.webm";
import ohnmarChanGif from "@/assets/people/hover/clips/ohnmar-chan-gesture.gif";
import ohnmarChanWebm from "@/assets/people/hover/clips/ohnmar-chan-gesture.webm";
import reidBolusGif from "@/assets/people/hover/clips/reid-bolus-gesture.gif";
import reidBolusWebm from "@/assets/people/hover/clips/reid-bolus-gesture.webm";
import vincentChanGif from "@/assets/people/hover/clips/vincent-chan-gesture.gif";
import vincentChanWebm from "@/assets/people/hover/clips/vincent-chan-gesture.webm";
import xochitlVargasGif from "@/assets/people/hover/clips/xochitl-vargas-gesture.gif";
import xochitlVargasWebm from "@/assets/people/hover/clips/xochitl-vargas-gesture.webm";

export type GhibliClip = {
  webm: string;
  gif: string;
  variant: "wave" | "nod" | "lean" | "brighten";
};

export const GHIBLI_CLIPS: Record<string, GhibliClip> = {
  "corey-rathe": { webm: coreyRatheWebm, gif: coreyRatheGif, variant: "brighten" },
  "francisco-quintanilla": {
    webm: franciscoQuintanillaWebm,
    gif: franciscoQuintanillaGif,
    variant: "brighten",
  },
  "gabe-murphy": { webm: gabeMurphyWebm, gif: gabeMurphyGif, variant: "nod" },
  "jonathan-wilson": { webm: jonathanWilsonWebm, gif: jonathanWilsonGif, variant: "wave" },
  "lily-ortiz": { webm: lilyOrtizWebm, gif: lilyOrtizGif, variant: "brighten" },
  "lina-kamil": { webm: linaKamilWebm, gif: linaKamilGif, variant: "brighten" },
  "michelle-yu": { webm: michelleYuWebm, gif: michelleYuGif, variant: "lean" },
  "natalia-dikinov": { webm: nataliaDikinovWebm, gif: nataliaDikinovGif, variant: "brighten" },
  "ohnmar-chan": { webm: ohnmarChanWebm, gif: ohnmarChanGif, variant: "wave" },
  "reid-bolus": { webm: reidBolusWebm, gif: reidBolusGif, variant: "lean" },
  "vincent-chan": { webm: vincentChanWebm, gif: vincentChanGif, variant: "lean" },
  "xochitl-vargas": { webm: xochitlVargasWebm, gif: xochitlVargasGif, variant: "wave" },
};

export function ghibliClipFromHover(photoHover: string): GhibliClip | null {
  const file = photoHover.split("/").pop() ?? "";
  const slug = file.match(/^(.+)-hover/)?.[1];
  return slug ? (GHIBLI_CLIPS[slug] ?? null) : null;
}
