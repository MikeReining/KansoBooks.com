import path from "node:path";

export const rootDirectory = process.cwd();
export const contentDirectory = path.join(rootDirectory, "content");

export const contentSections = [
  "resources",
  "comparisons",
  "glossary",
  "templates",
] as const;

export const contentSectionToType = {
  resources: ["resource", "hub"],
  comparisons: ["comparison"],
  glossary: ["glossary"],
  templates: ["template", "artifact"],
} as const;

export const staticContentRoutes = [
  "/resources",
  "/comparisons",
  "/glossary",
  "/templates",
] as const;
