#!/usr/bin/env bun
/**
 * Generic website screenshot script bundled with the screenshot-website skill.
 *
 * Takes a full-page screenshot of any URL to a PNG (or jpg/webp) using
 * Playwright's Chromium. Sets prefers-reduced-motion: reduce so reveal-on-scroll
 * animations render in their final state — without this, a full-page capture
 * of an animated site gets the hero and leaves every below-the-fold section
 * stuck at opacity:0.
 *
 * Output is capped at --max-dim px in both width and height (default 1900) so
 * the PNG stays under Anthropic's 2000px many-image limit. If the captured
 * image exceeds the cap, we downscale via Chromium's <canvas> (no extra
 * dependency). --max-dim 0 disables the cap.
 *
 * Usage:
 *   bun .claude/skills/screenshot-website/scripts/screenshot.ts <url> <output.png> [--viewport <WxH>] [--wait <ms>] [--max-dim <px>]
 *
 * Examples:
 *   bun <skill>/screenshot.ts http://localhost:3000/ /tmp/home.png
 *   bun <skill>/screenshot.ts http://localhost:4321/pricing /tmp/pricing.png
 *   bun <skill>/screenshot.ts http://localhost:5173/ /tmp/m.png --viewport 390x844
 *
 * Requires `playwright` to be importable from the target repo. If the repo
 * doesn't have it, add it once: `bun add -d playwright`. Browser binaries
 * are a separate download — run `bunx playwright install chromium` once per
 * machine. On Linux devcontainers, system libs may also be needed; see the
 * skill's SKILL.md "First-time setup" and "Common failure modes" sections.
 */

import { writeFileSync } from "node:fs";

type Viewport = { width: number; height: number };
type OutMime = "png" | "jpeg" | "webp";

const DEFAULT_MAX_DIM = 1900; // safety margin under the 2000px API limit

function parseViewport(raw: string | undefined, fallback: Viewport): Viewport {
  if (!raw) return fallback;
  const match = raw.match(/^(\d+)x(\d+)$/);
  if (!match) {
    throw new Error(`Invalid --viewport "${raw}". Expected format like 1440x900.`);
  }
  return { width: Number(match[1]), height: Number(match[2]) };
}

function parseIntFlag(raw: string | undefined, fallback: number): number {
  if (!raw) return fallback;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) {
    throw new Error(`Invalid numeric flag "${raw}".`);
  }
  return n;
}

function getOutputMime(outputPath: string): OutMime {
  if (/\.png$/i.test(outputPath)) return "png";
  if (/\.jpe?g$/i.test(outputPath)) return "jpeg";
  if (/\.webp$/i.test(outputPath)) return "webp";
  throw new Error(`Unsupported output extension for "${outputPath}".`);
}

function readPngSize(buffer: Buffer): { width: number; height: number } {
  // PNG IHDR chunk: width at bytes 16-19, height at 20-23 (big-endian).
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const url = argv[0];
  const outputPath = argv[1];

  if (!url || !outputPath) {
    console.error(
      "Usage: bun screenshot.ts <url> <output.png> [--viewport <WxH>] [--wait <ms>] [--max-dim <px>]",
    );
    process.exit(1);
  }

  if (!/\.(png|jpe?g|webp)$/i.test(outputPath)) {
    throw new Error(
      `Output path must end in .png / .jpg / .jpeg / .webp — got "${outputPath}".`,
    );
  }

  const viewportIndex = argv.indexOf("--viewport");
  const viewport = parseViewport(
    viewportIndex >= 0 ? argv[viewportIndex + 1] : undefined,
    { width: 1440, height: 900 },
  );

  const waitIndex = argv.indexOf("--wait");
  const settleMs = parseIntFlag(
    waitIndex >= 0 ? argv[waitIndex + 1] : undefined,
    1500,
  );

  const maxDimIndex = argv.indexOf("--max-dim");
  // 0 = disable the cap; anything else must be a positive pixel count.
  const maxDim = parseIntFlag(
    maxDimIndex >= 0 ? argv[maxDimIndex + 1] : undefined,
    DEFAULT_MAX_DIM,
  );

  const outMime = getOutputMime(outputPath);

  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch (err) {
    console.error(
      "Could not import `playwright`. This script needs playwright as a dep in the current repo.\n" +
      "Fix: `bun add -d playwright` (or `npm i -D playwright`), then rerun.",
    );
    throw err;
  }

  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({
      viewport,
      // DPR 1 keeps the source image within Anthropic's 2000px limit for
      // typical desktop viewports; oversize full-page captures get resized
      // below. (Previously DPR 2 meant a 1440px viewport produced a 2880px
      // image that tripped the many-image limit on every call.)
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    if (settleMs > 0) await page.waitForTimeout(settleMs);

    // Always capture PNG so we can measure dimensions from the IHDR chunk,
    // then optionally downscale and/or transcode before writing to disk.
    const shot = await page.screenshot({ fullPage: true, type: "png" });
    const { width: srcW, height: srcH } = readPngSize(shot);

    const needsResize = maxDim > 0 && (srcW > maxDim || srcH > maxDim);
    const needsTranscode = outMime !== "png";

    if (!needsResize && !needsTranscode) {
      writeFileSync(outputPath, shot);
      console.log(`Wrote ${outputPath} (${srcW}x${srcH}, full page)`);
      return;
    }

    const scale = needsResize ? Math.min(maxDim / srcW, maxDim / srcH) : 1;
    const dstW = Math.max(1, Math.round(srcW * scale));
    const dstH = Math.max(1, Math.round(srcH * scale));

    // Re-use the same browser to downscale/transcode via <canvas>, so we
    // don't drag in sharp/ImageMagick. Serve the PNG bytes from a mocked
    // origin (avoids data-URL size limits that bite on tall full-page
    // captures) and draw into a resized canvas.
    const resizer = await context.newPage();
    const resizeOrigin = "http://screenshot-resize.local";
    await resizer.route(`${resizeOrigin}/**`, async (route) => {
      const path = new URL(route.request().url()).pathname;
      if (path === "/shot.png") {
        await route.fulfill({ body: shot, contentType: "image/png" });
      } else {
        await route.fulfill({
          body: "<!doctype html><html><body></body></html>",
          contentType: "text/html",
        });
      }
    });
    await resizer.goto(`${resizeOrigin}/index.html`);

    const outB64 = await resizer.evaluate(
      async ({ src, w, h, mime }) => {
        const img = new Image();
        img.src = src;
        await img.decode();
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("2d canvas context unavailable");
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, w, h);
        const dataUrl =
          mime === "image/jpeg"
            ? canvas.toDataURL(mime, 0.92)
            : canvas.toDataURL(mime);
        // Chromium returns "data:," when toDataURL fails (OOM, canvas too
        // large, tainted canvas). Catch that here so we don't write junk.
        if (!dataUrl.startsWith(`data:${mime};base64,`)) {
          throw new Error(
            `canvas.toDataURL(${mime}) failed; got "${dataUrl.slice(0, 32)}".`,
          );
        }
        return dataUrl.slice(`data:${mime};base64,`.length);
      },
      { src: `${resizeOrigin}/shot.png`, w: dstW, h: dstH, mime: `image/${outMime}` },
    );
    await resizer.close();

    writeFileSync(outputPath, Buffer.from(outB64, "base64"));

    if (needsResize) {
      console.log(
        `Wrote ${outputPath} (${dstW}x${dstH}, resized from ${srcW}x${srcH} to fit under ${maxDim}px)`,
      );
    } else {
      console.log(`Wrote ${outputPath} (${dstW}x${dstH}, full page)`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
