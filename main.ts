// SPDX-License-Identifier: MIT
// Copies entry.png from the repo root to the output directory.
// The output directory is MAKEFUN_OUTPUT_DIR when set, else /output.
// Deterministic: the same bytes every run.
import { copyFileSync, existsSync, statSync } from "node:fs";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.png");
copyFileSync(join(here, "entry.png"), outPath);
if (!existsSync(outPath)) throw new Error("entry.png was not written to " + outDir);
console.log("wrote " + outPath + " (" + statSync(outPath).size + " bytes)");
