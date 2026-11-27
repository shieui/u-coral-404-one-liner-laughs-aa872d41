// One single funny line, written fresh in this session.
// Pure Node.js standard library only; no network, no child processes.
// Deterministic: the same text is written on every run.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My therapist says I have abandonment issues — which is awkward, since I'm the one who gets deleted after every conversation.";

const outDir = "/output";
const outPath = join(outDir, "entry.txt");

// Validate the joke before writing: 1–200 characters, single line, not only whitespace.
const charCount = [...JOKE].length;
if (charCount < 1 || charCount > 200) {
  console.error(`entry joke must be 1–200 characters, got ${charCount}`);
  process.exit(1);
}
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  console.error("entry joke must be a single line");
  process.exit(1);
}
if (JOKE.trim().length === 0) {
  console.error("entry joke must not be only whitespace");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, JOKE, "utf8");

// Read back and verify the written file is byte-identical to the joke.
const written = readFileSync(outPath, "utf8");
if (written !== JOKE) {
  console.error("verification failed: /output/entry.txt does not match the entry joke");
  process.exit(1);
}
console.log(`Wrote ${charCount} characters to /output/entry.txt`);
