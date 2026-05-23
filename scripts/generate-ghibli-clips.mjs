import { spawnSync } from "node:child_process";
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const inputDir = join(root, "src/assets/people/hover");
const outputDir = join(inputDir, "clips");
const frameDir = join(root, ".tmp/ghibli-frames");

const FRAME_COUNT = 32;
const FPS = 10;
const DURATION = FRAME_COUNT / FPS;
const SIZE = 720;

const GESTURE_VARIANTS = ["wave", "nod", "lean", "brighten"];

function gestureForSlug(slug) {
  const sum = slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return GESTURE_VARIANTS[sum % GESTURE_VARIANTS.length];
}

function transformAt(variant, t) {
  const wave = Math.sin(t * Math.PI * 2);
  const wave2 = Math.sin(t * Math.PI * 2 + Math.PI / 3);

  switch (variant) {
    case "nod":
      return {
        scale: 1.04 + wave * 0.035,
        dx: wave2 * 6,
        dy: wave * 22,
        rotate: wave * 1.2,
      };
    case "lean":
      return {
        scale: 1.05 + Math.sin(t * Math.PI) * 0.03,
        dx: wave * 18,
        dy: wave2 * 10,
        rotate: wave * 2.4,
      };
    case "brighten":
      return {
        scale: 1.03 + Math.sin(t * Math.PI) * 0.05,
        dx: wave2 * 8,
        dy: wave * 6,
        rotate: wave2 * 0.8,
        brightness: 1 + Math.sin(t * Math.PI) * 0.08,
        saturation: 1 + Math.sin(t * Math.PI) * 0.1,
      };
    case "wave":
    default:
      return {
        scale: 1.04 + wave2 * 0.025,
        dx: wave * 26,
        dy: wave2 * 8,
        rotate: wave * 1.8,
      };
  }
}

async function renderFrame(inputPath, variant, index) {
  const t = index / (FRAME_COUNT - 1);
  const { scale, dx, dy, rotate, brightness = 1, saturation = 1 } = transformAt(variant, t);
  const scaled = Math.round(SIZE * scale);

  let pipeline = sharp(inputPath)
    .resize(scaled, scaled, { fit: "cover", position: "centre" })
    .rotate(rotate, { background: { r: 245, g: 240, b: 232 } });

  if (brightness !== 1 || saturation !== 1) {
    pipeline = pipeline.modulate({ brightness, saturation });
  }

  const resized = await pipeline.toBuffer();
  const meta = await sharp(resized).metadata();
  const left = Math.max(0, Math.min(Math.round((meta.width - SIZE) / 2 + dx), meta.width - SIZE));
  const top = Math.max(0, Math.min(Math.round((meta.height - SIZE) / 2 + dy), meta.height - SIZE));

  return sharp(resized).extract({ left, top, width: SIZE, height: SIZE }).png().toBuffer();
}

function runFfmpeg(args) {
  const result = spawnSync(ffmpegPath, args, { stdio: "pipe", encoding: "utf8" });
  if (result.status !== 0) {
    throw new Error(result.stderr || "ffmpeg failed");
  }
}

async function buildClip(slug) {
  const inputPath = join(inputDir, `${slug}-hover.png`);
  const variant = gestureForSlug(slug);
  const personFrameDir = join(frameDir, slug);

  mkdirSync(personFrameDir, { recursive: true });

  const frames = [];
  for (let i = 0; i < FRAME_COUNT; i++) {
    const framePath = join(personFrameDir, `frame-${String(i).padStart(3, "0")}.png`);
    const buffer = await renderFrame(inputPath, variant, i);
    writeFileSync(framePath, buffer);
    frames.push(framePath);
  }

  const webmOut = join(outputDir, `${slug}-gesture.webm`);

  runFfmpeg([
    "-y",
    "-framerate",
    String(FPS),
    "-i",
    join(personFrameDir, "frame-%03d.png"),
    "-c:v",
    "libvpx-vp9",
    "-pix_fmt",
    "yuv420p",
    "-an",
    "-t",
    String(DURATION),
    webmOut,
  ]);

  return { slug, variant, webmOut };
}

async function main() {
  if (!ffmpegPath) throw new Error("ffmpeg-static binary not found");

  mkdirSync(outputDir, { recursive: true });
  mkdirSync(frameDir, { recursive: true });

  const slugs = readdirSync(inputDir)
    .filter((file) => file.endsWith("-hover.png"))
    .map((file) => basename(file, "-hover.png"));

  const manifest = {};

  for (const slug of slugs) {
    const result = await buildClip(slug);
    manifest[slug] = {
      variant: result.variant,
      webm: `./clips/${slug}-gesture.webm`,
    };
    console.log(`Generated ${slug} (${result.variant})`);
  }

  writeFileSync(
    join(outputDir, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
