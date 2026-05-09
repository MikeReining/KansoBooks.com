import { validateAutopublishPaths, validateContent } from "../../src/lib/content";

const [, , mode, ...paths] = process.argv;
const issues =
  mode === "--path-guard" ? validateAutopublishPaths(paths) : validateContent();

if (issues.length > 0) {
  for (const issue of issues) {
    console.error(`${issue.file}: ${issue.message}`);
  }
  process.exit(1);
}

console.log(
  mode === "--path-guard"
    ? "Autopublish path guard passed."
    : "Content validation passed.",
);
