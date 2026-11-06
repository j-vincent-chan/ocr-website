/**
 * Short, reader-facing name for each service arm.
 * Team feedback: "Arm 01" means nothing to a PI landing on the page —
 * say what the arm is instead. Kept in a plain module (no components)
 * so it can be shared without tripping React Fast Refresh.
 */
export const ARM_NAMES: Record<string, string> = {
  "01": "Research Development",
  "02": "Research Operations & Management",
  "03": "Data Management",
  "04": "AI Tools",
  "05": "Community Management",
};

export function armName(arm: string) {
  return ARM_NAMES[arm] ?? `Arm ${arm}`;
}
