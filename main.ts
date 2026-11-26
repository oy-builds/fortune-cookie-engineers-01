// Fortune Cookie Funnies for Engineers — entry program (Node 22, zero deps).
// Writes one fortune-cookie line for a software engineer to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt),
// enforcing the kit gate: UTF-8, 1-120 chars, not only whitespace, single line.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const FORTUNE =
  "You will fix a bug today that you wrote last year at 2 a.m. — and you will do it again.";

function validate(line) {
  if (typeof line !== "string" || line.length === 0) {
    throw new Error("fortune must be non-empty");
  }
  if (line.trim().length === 0) {
    throw new Error("fortune must not be only whitespace");
  }
  if (line.length > 120) {
    throw new Error(`fortune is ${line.length} chars, over the 120-char gate`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("fortune must be a single line");
  }
  // Must round-trip as UTF-8.
  const bytes = Buffer.from(line, "utf8");
  if (bytes.toString("utf8") !== line) {
    throw new Error("fortune is not valid UTF-8 text");
  }
}

function main() {
  validate(FORTUNE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, FORTUNE, "utf8");
  console.log(`wrote ${FORTUNE.length} chars to ${outPath}`);
}

main();
