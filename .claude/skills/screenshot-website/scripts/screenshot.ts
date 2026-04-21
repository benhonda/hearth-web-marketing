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
 * Usage:
 *   bun .claude/skills/screenshot-website/scripts/screenshot.ts <url> <output.png> [--viewport <WxH>] [--wait <ms>]
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

type Viewport = { width: number; height: number };

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

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const url = argv[0];
  const outputPath = argv[1];

  if (!url || !outputPath) {
    console.error(
      "Usage: bun screenshot.ts <url> <output.png> [--viewport <WxH>] [--wait <ms>]",
    );
    process.exit(1);
  }

  if (!/\.(png|jpe?g|webp)$/.test(outputPath)) {
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
      deviceScaleFactor: 2,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    if (settleMs > 0) await page.waitForTimeout(settleMs);
    await page.screenshot({ path: outputPath, fullPage: true });
    console.log(
      `Wrote ${outputPath} (${viewport.width}x${viewport.height} @2x, full page)`,
    );
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
