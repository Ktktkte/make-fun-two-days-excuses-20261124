// two-days-excuses-20261124 — writes the entry line to the output directory.
// The entry text lives in entry.txt next to this script; it is read relative
// to the script file itself, never relative to the working directory.
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
// The excuse itself, read from the file beside this script.
const excuseLine = readFileSync(join(scriptDir, "entry.txt"), "utf8");

// Gate: the competition allows one line under 200 characters.
if (excuseLine.length < 1 || excuseLine.length > 199) {
  throw new Error(`entry must be 1-199 characters, got ${excuseLine.length}`);
}
if (excuseLine.includes("\n")) {
  throw new Error("entry must be exactly one line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), excuseLine);
