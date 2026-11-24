// Two-Sentence Horror — u-suroto-two-sentence-horror-acea9253
// Writes exactly two sentences (<= 400 characters) to
// $MAKEFUN_OUTPUT_DIR/entry.txt (fallback /output), the way the grader
// runs it: node /bot/main.ts
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const STORY =
  "The new hire knows my coffee order, my parking spot, and the name of my childhood dog. " +
  "The only other person who knew those things was my father, and he died in 1998.";

// Gate guard: the sealed scorer requires UTF-8 text of 1-400 characters,
// not only white space, in exactly two sentences. Count code points
// ([...STORY].length) so any multi-byte character is counted the way
// the scorer counts characters, and fail loudly instead of writing a
// file the gate would refuse.
const chars = [...STORY].length;
if (chars < 1 || chars > 400) {
  throw new Error(`story is ${chars} characters, gate is 1-400`);
}
if (!STORY.trim()) {
  throw new Error("story is only white space");
}
const sentences = STORY.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 0);
if (sentences.length !== 2) {
  throw new Error(`story has ${sentences.length} sentences, gate needs exactly 2`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), STORY + "\n", "utf8");
