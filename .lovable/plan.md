## Goal

Replace the current single floating ribbon with a layered "constellation → ribbon" hero background that visually expresses many investigators and ideas converging into one coordinated program.

## Approach

Generate one new hero background asset and update the Hero section in `src/routes/index.tsx` to layer it correctly. Keep all headline/body copy, marquee, and chrome untouched. Also fix the SSR hydration mismatch from the recently edited paragraph.

## Asset

Generate `src/assets/hero-constellation.png` (premium quality, 1920×1080, transparent background) with this prompt direction:

- Left third: airy field of small soft dots/nodes in pink, purple, and pale blue — sparse, decorative, varied opacity.
- Middle: dots begin connecting via very thin, faint lines; small clusters form.
- Middle-right: lines converge into several translucent ribbon strands (coral → magenta → indigo → teal gradient), with soft blur and gentle shadow.
- Right: strands broaden into elegant flowing ribbons exiting the right edge horizontally and slightly diagonally.
- Overall: light, airy, depth via layering/transparency, no text, no UI.

Keep the existing `ribbon.png` in the repo as a fallback but stop rendering it on the home hero.

## Code changes — `src/routes/index.tsx` Hero only

1. Replace the `<img src={ribbonImg} … />` with `<img src={constellationImg} … />` positioned to span the full hero:
   - `absolute inset-0 w-full h-full object-cover object-right opacity-90 pointer-events-none select-none`
   - Keep the subtle `animate-[float_22s_ease-in-out_infinite]` on a wrapper (not the img) so motion stays gentle.
2. Add a left-side readability gradient overlay so the headline/body never compete with the dots:
   - `absolute inset-0 bg-gradient-to-r from-cream via-cream/80 to-transparent`
   - Sits above the image, below the content.
3. Remove the existing bottom-left gradient blob and faint grid (the new asset replaces that visual interest); keep the marquee strip untouched.
4. Ensure the content container stays `relative z-10` so text renders above overlays.

## Hydration fix

The runtime error is a stale SSR cache of the old paragraph. The current source already has the new copy, so a fresh build resolves it — no code change required beyond saving the file. Will verify by reloading after the edit.

## Out of scope

- No changes to internal service pages, About, chrome, or styles.css tokens.
- No new dependencies or animations beyond the existing `float` keyframe.

## Files touched

- `src/assets/hero-constellation.png` (new)
- `src/routes/index.tsx` (Hero section only)
