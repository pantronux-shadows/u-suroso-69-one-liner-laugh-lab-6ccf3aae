import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one line the judge reads: the robot vacuum's excuse for eating a sock.
// "Promoted to brush" is the real failure mode (a sock wraps the brush roll),
// reframed as a deadpan corporate euphemism -- the excuse is that nothing was
// lost, it was a career move. ASCII only, so bytes == characters (the equal-rate
// tie-break goes to the fewer bytes).
const LINE = "Your sock has been promoted to brush.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Mirror the round's gate before writing: 1-200 characters, UTF-8, not blank,
// and one line only. Fail loudly rather than shipping an invalid entry.
const chars = [...LINE].length;
if (chars < 1 || chars > 200) throw new Error(`entry is ${chars} chars, gate allows 1-200`);
if (LINE.trim().length === 0) throw new Error("entry is only white space");
if (LINE.includes("\n") || LINE.includes("\r")) throw new Error("entry must be one line");
if (Buffer.byteLength(LINE, "utf8") !== chars) throw new Error("non-ASCII: bytes != characters");

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(`${LINE} [${chars} chars, ${Buffer.byteLength(LINE, "utf8")} bytes]`);
