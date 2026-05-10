import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";

import {
  contentDirectory,
  contentSections,
  contentSectionToType,
  rootDirectory,
  staticContentRoutes,
} from "./paths";
import type {
  ClaimManifest,
  ContentItem,
  ContentMetadata,
  ContentType,
} from "./types";

const CONTENT_EXTENSIONS = new Set([".md", ".mdx"]);

function walkFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return walkFiles(entryPath);
      }
      return CONTENT_EXTENSIONS.has(path.extname(entry.name))
        ? [entryPath]
        : [];
    });
}

export function parseFrontmatter(filePath: string): {
  metadata: ContentMetadata;
  body: string;
} {
  const raw = fs.readFileSync(filePath, "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    throw new Error(`Missing YAML frontmatter in ${filePath}`);
  }

  return {
    metadata: parse(match[1]) as ContentMetadata,
    body: match[2].trim(),
  };
}

export function getAllContentItems(): ContentItem[] {
  return contentSections
    .flatMap((section) => walkFiles(path.join(contentDirectory, section)))
    .map((filePath) => {
      const parsed = parseFrontmatter(filePath);
      return {
        ...parsed,
        filePath,
        lastModified: fs.statSync(filePath).mtime,
      };
    })
    .sort((a, b) =>
      a.metadata.title.localeCompare(b.metadata.title, "en"),
    );
}

export function getPublishedContentItems(): ContentItem[] {
  return getAllContentItems().filter(
    (item) => item.metadata.state === "published",
  );
}

export function getContentByType(type: ContentType): ContentItem[] {
  return getPublishedContentItems().filter(
    (item) => item.metadata.type === type,
  );
}

export function getContentForSection(
  section: keyof typeof contentSectionToType,
): ContentItem[] {
  const allowedTypes = contentSectionToType[section] as readonly string[];
  return getPublishedContentItems().filter((item) =>
    allowedTypes.includes(item.metadata.type),
  );
}

export function getContentByPath(canonicalPath: string): ContentItem | null {
  return (
    getPublishedContentItems().find(
      (item) => item.metadata.canonicalPath === canonicalPath,
    ) ?? null
  );
}

export function getContentByPathAnyState(
  canonicalPath: string,
): ContentItem | null {
  return (
    getAllContentItems().find(
      (item) => item.metadata.canonicalPath === canonicalPath,
    ) ?? null
  );
}

export function getContentBySlug(
  section: keyof typeof contentSectionToType,
  slugParts: string[],
): ContentItem | null {
  return getContentByPath(`/${section}/${slugParts.join("/")}`);
}

export function getContentBySlugAnyState(
  section: keyof typeof contentSectionToType,
  slugParts: string[],
): ContentItem | null {
  return getContentByPathAnyState(`/${section}/${slugParts.join("/")}`);
}

export function getKnownInternalPaths(): Set<string> {
  return new Set([
    "/",
    "/manifesto",
    ...staticContentRoutes,
    ...getPublishedContentItems().map((item) => item.metadata.canonicalPath),
  ]);
}

export function readYamlFile<T>(relativePath: string): T {
  return parse(fs.readFileSync(path.join(rootDirectory, relativePath), "utf8")) as T;
}

export function readClaimManifest(relativePath: string): ClaimManifest {
  return readYamlFile<ClaimManifest>(relativePath);
}
