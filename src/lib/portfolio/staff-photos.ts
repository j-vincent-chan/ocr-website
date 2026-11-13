import bushraSamad from "@/assets/people/bushra-samad.jpg";
import coreyRathe from "@/assets/people/corey-rathe.jpg";
import franciscoQuintanilla from "@/assets/people/francisco-quintanilla.jpg";
import gabeMurphy from "@/assets/people/gabe-murphy.jpg";
import jonathanWilson from "@/assets/people/jonathan-wilson.jpg";
import linaKamil from "@/assets/people/lina-kamil.jpg";
import lindsayBreithaupt from "@/assets/people/lindsay-breithaupt.jpg";
import michelleYu from "@/assets/people/michelle-yu.jpg";
import nataliaDikinov from "@/assets/people/natalia-dikinov.jpg";
import ohnmarChan from "@/assets/people/ohnmar-chan.jpg";
import oliviaMurley from "@/assets/people/olivia-murley.jpg";
import reidBolus from "@/assets/people/reid-bolus.jpg";
import vincentChan from "@/assets/people/vincent-chan.jpg";
import xochitlVargas from "@/assets/people/xochitl-vargas.jpg";

/** Map staff keys from portfolio.json to site photo assets. */
const BY_KEY: Record<string, string> = {
  "Vincent Chan, PhD": vincentChan,
  "Gabe Murphy, PhD": gabeMurphy,
  "Reid Bolus, PhD": reidBolus,
  "Lindsay Breithaupt, MPH": lindsayBreithaupt,
  "Corey Rathe, MS": coreyRathe,
  "Francisco Quintanilla": franciscoQuintanilla,
  "Natalia Dikinov": nataliaDikinov,
  "Ohnmar Chan": ohnmarChan,
  "Lina Kamil, MPH": linaKamil,
  "Olivia Murley": oliviaMurley,
  "Michelle Yu": michelleYu,
  "Bushra Samad, MS": bushraSamad,
  "Jonathan Wilson": jonathanWilson,
  "Xochitl Vargas": xochitlVargas,
};

export function staffPhotoUrl(key: string): string | undefined {
  return BY_KEY[key];
}
