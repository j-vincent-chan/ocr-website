/**
 * Short, reader-facing name for each service arm.
 * Team feedback: "Arm 01" means nothing to a PI landing on the page —
 * say what the arm is instead. Kept in a plain module (no components)
 * so it can be shared without tripping React Fast Refresh.
 */
export const ARM_NAMES: Record<string, string> = {
  "01": "Research development",
  "02": "Project management",
  "03": "Data management",
  "04": "AI tools",
  "05": "Community management",
};

export function armName(arm: string) {
  return ARM_NAMES[arm] ?? `Arm ${arm}`;
}
