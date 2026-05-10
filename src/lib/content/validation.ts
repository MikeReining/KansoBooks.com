import fs from "node:fs";
import path from "node:path";

import { contentSections, rootDirectory } from "./paths";
import {
  getAllContentItems,
  getKnownInternalPaths,
  readClaimManifest,
  readYamlFile,
} from "./loader";
import type { ContentItem, ValidationIssue } from "./types";

type CanonicalJobs = {
  jobs: Array<{ id: string }>;
};

type ClaimTruth = {
  forbiddenPhrases?: string[];
};

type ImageAudit = {
  status?: string;
  imageType?: string;
  assetPath?: string;
  promptPath?: string;
  checks?: Record<string, boolean>;
};

const requiredAnswerUnits = [
  "AnswerBlock",
  "KansoTake",
  "DecisionSupport",
  "ProofBoundary",
  "SourceNotes",
  "NextStep",
] as const;

const allowedAutopublishPrefixes = [
  "content/",
  "public/content/",
  "public/og/",
  "docs/content-runs/",
  "src/content/",
  "src/lib/content/",
  "scripts/content/",
];

function existsRelative(relativePath: string): boolean {
  return fs.existsSync(path.join(rootDirectory, relativePath));
}

function publicAssetExists(src: string): boolean {
  return src.startsWith("/") && existsRelative(path.join("public", src));
}

function assetFileName(src: string): string {
  return path.basename(src);
}

function localSourceExists(source: string): boolean {
  const [sourcePath] = source.split("#");
  return sourcePath.length > 0 && existsRelative(sourcePath);
}

function sourceResolves(source: string): boolean {
  if (source.startsWith("http")) {
    try {
      new URL(source);
      return true;
    } catch {
      return false;
    }
  }

  return localSourceExists(source);
}

function validateMetadata(item: ContentItem, jobs: Set<string>): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const { metadata } = item;

  if (!jobs.has(metadata.canonicalJob)) {
    issues.push({
      file: item.filePath,
      message: `Unknown canonical job: ${metadata.canonicalJob}`,
    });
  }

  if (!metadata.canonicalPath.startsWith("/")) {
    issues.push({
      file: item.filePath,
      message: "canonicalPath must start with /",
    });
  }

  if (metadata.state === "published" && !metadata.publishedAt) {
    issues.push({
      file: item.filePath,
      message: "Published content must set publishedAt",
    });
  }

  if (metadata.tier <= 2) {
    for (const answerUnit of requiredAnswerUnits) {
      if (!metadata.answerUnits.includes(answerUnit)) {
        issues.push({
          file: item.filePath,
          message: `Missing required answer unit: ${answerUnit}`,
        });
      }
    }
  }

  if (metadata.risk !== "low" && !metadata.answerUnits.includes("EntitySummary")) {
    issues.push({
      file: item.filePath,
      message: "Medium and high risk pages need EntitySummary",
    });
  }

  if (!metadata.claimManifest || !existsRelative(metadata.claimManifest)) {
    issues.push({
      file: item.filePath,
      message: `Missing claim manifest: ${metadata.claimManifest}`,
    });
  }

  if (metadata.artifactId) {
    const artifactPath = path.join(
      rootDirectory,
      "content",
      "_artifacts",
      `${metadata.artifactId}.yml`,
    );
    const artifactMarkdownPath = path.join(
      rootDirectory,
      "content",
      "_artifacts",
      `${metadata.artifactId}.md`,
    );

    if (!fs.existsSync(artifactPath) && !fs.existsSync(artifactMarkdownPath)) {
      issues.push({
        file: item.filePath,
        message: `Artifact ID does not resolve: ${metadata.artifactId}`,
      });
    }
  }

  if (metadata.heroImage) {
    if (!metadata.heroImage.src) {
      issues.push({
        file: item.filePath,
        message: "heroImage.src is required when heroImage is set",
      });
    } else if (!publicAssetExists(metadata.heroImage.src)) {
      issues.push({
        file: item.filePath,
        message: `heroImage asset does not resolve: ${metadata.heroImage.src}`,
      });
    }

    if (!metadata.heroImage.alt?.trim()) {
      issues.push({
        file: item.filePath,
        message: "heroImage.alt is required when heroImage is set",
      });
    } else if (metadata.heroImage.alt.trim().length < 50) {
      issues.push({
        file: item.filePath,
        message: "heroImage.alt must be descriptive for SEO and accessibility",
      });
    }

    if (!assetFileName(metadata.heroImage.src).includes(metadata.slug)) {
      issues.push({
        file: item.filePath,
        message: "heroImage filename must include the content slug",
      });
    }

    if (
      metadata.heroImage.presentation &&
      !["standard", "banner"].includes(metadata.heroImage.presentation)
    ) {
      issues.push({
        file: item.filePath,
        message: "heroImage.presentation must be standard or banner",
      });
    }

    if (!metadata.heroImage.audit || !existsRelative(metadata.heroImage.audit)) {
      issues.push({
        file: item.filePath,
        message: `heroImage audit does not resolve: ${metadata.heroImage.audit}`,
      });
    } else {
      const audit = readYamlFile<ImageAudit>(metadata.heroImage.audit);
      const expectedAssetPath = path.join("public", metadata.heroImage.src);

      if (audit.status !== "approved") {
        issues.push({
          file: metadata.heroImage.audit,
          message: "heroImage audit status must be approved",
        });
      }

      if (audit.imageType !== "hero") {
        issues.push({
          file: metadata.heroImage.audit,
          message: "heroImage audit imageType must be hero",
        });
      }

      if (audit.assetPath !== expectedAssetPath) {
        issues.push({
          file: metadata.heroImage.audit,
          message: `heroImage audit assetPath must be ${expectedAssetPath}`,
        });
      }

      if (!audit.promptPath || !existsRelative(audit.promptPath)) {
        issues.push({
          file: metadata.heroImage.audit,
          message: `heroImage promptPath does not resolve: ${audit.promptPath}`,
        });
      }

      for (const check of [
        "improvesComprehension",
        "notDecorativeFiller",
        "noPrivateData",
        "noRealBrands",
        "noCloudImplication",
        "noFakeDashboard",
        "cropSafe",
        "seoFilename",
        "altText",
      ]) {
        if (audit.checks?.[check] !== true) {
          issues.push({
            file: metadata.heroImage.audit,
            message: `heroImage audit check must pass: ${check}`,
          });
        }
      }
    }
  }

  if (metadata.ogImage && !publicAssetExists(metadata.ogImage)) {
    issues.push({
      file: item.filePath,
      message: `ogImage asset does not resolve: ${metadata.ogImage}`,
    });
  }

  return issues;
}

function validateClaims(item: ContentItem): ValidationIssue[] {
  if (!item.metadata.claimManifest || !existsRelative(item.metadata.claimManifest)) {
    return [];
  }

  const manifest = readClaimManifest(item.metadata.claimManifest);
  const issues: ValidationIssue[] = [];

  if (manifest.pageId !== item.metadata.id) {
    issues.push({
      file: item.metadata.claimManifest,
      message: `Claim manifest pageId ${manifest.pageId} does not match ${item.metadata.id}`,
    });
  }

  for (const claim of manifest.claims) {
    if (!claim.source) {
      issues.push({
        file: item.metadata.claimManifest,
        message: `Claim ${claim.id} has no source`,
      });
    }

    if (!sourceResolves(claim.source)) {
      issues.push({
        file: item.metadata.claimManifest,
        message: `Claim ${claim.id} source does not resolve: ${claim.source}`,
      });
    }

    if (
      ["pricing", "competitor", "tax-legal", "crawler-policy"].includes(
        claim.type,
      ) &&
      !claim.sourceCheckedAt
    ) {
      issues.push({
        file: item.metadata.claimManifest,
        message: `Claim ${claim.id} requires sourceCheckedAt`,
      });
    }
  }

  return issues;
}

function validateSources(item: ContentItem): ValidationIssue[] {
  return (item.metadata.externalSources ?? []).flatMap((source) => {
    return sourceResolves(source)
      ? []
      : [{ file: item.filePath, message: `Source does not resolve: ${source}` }];
  });
}

function validateInternalLinks(item: ContentItem): ValidationIssue[] {
  const knownPaths = getKnownInternalPaths();
  return (item.metadata.internalLinks ?? []).flatMap((link) =>
    knownPaths.has(link)
      ? []
      : [{ file: item.filePath, message: `Internal link does not resolve: ${link}` }],
  );
}

function hrefResolves(href: string, knownPaths: Set<string>): boolean {
  if (href.startsWith("#")) {
    return true;
  }

  if (href.startsWith("http")) {
    try {
      new URL(href);
      return true;
    } catch {
      return false;
    }
  }

  return knownPaths.has(href);
}

function validateMarkdownLinks(item: ContentItem): ValidationIssue[] {
  const knownPaths = getKnownInternalPaths();
  const issues: ValidationIssue[] = [];
  const markdownLinkPattern = /\[[^\]]+\]\(([^)]+)\)/g;

  for (const match of item.body.matchAll(markdownLinkPattern)) {
    const href = match[1]?.trim();
    if (href && !hrefResolves(href, knownPaths)) {
      issues.push({
        file: item.filePath,
        message: `Markdown link does not resolve: ${href}`,
      });
    }
  }

  return issues;
}

function validatePresentationLinks(): ValidationIssue[] {
  const knownPaths = getKnownInternalPaths();
  const requiredContentChromeLinks = [
    "/",
    "/manifesto",
    "/resources/how-to-know-books-are-done",
    "/resources/accountant-ready-books",
  ];

  return requiredContentChromeLinks.flatMap((href) =>
    knownPaths.has(href)
      ? []
      : [{
          file: "src/lib/content/components.tsx",
          message: `Presentation link does not resolve: ${href}`,
        }],
  );
}

function validateForbiddenPhrases(item: ContentItem, phrases: string[]): ValidationIssue[] {
  const text = `${item.metadata.title}\n${item.metadata.description}\n${item.body}`.toLowerCase();

  return phrases.flatMap((phrase) =>
    text.includes(phrase.toLowerCase())
      ? [{ file: item.filePath, message: `Forbidden phrase found: ${phrase}` }]
      : [],
  );
}

function validateDuplicateJobs(items: ContentItem[]): ValidationIssue[] {
  const byJob = new Map<string, ContentItem[]>();
  for (const item of items) {
    byJob.set(item.metadata.canonicalJob, [
      ...(byJob.get(item.metadata.canonicalJob) ?? []),
      item,
    ]);
  }

  return [...byJob.entries()].flatMap(([job, matches]) =>
    matches.length > 1
      ? matches.map((item) => ({
          file: item.filePath,
          message: `Canonical job ${job} is used by ${matches.length} pages`,
        }))
      : [],
  );
}

export function validateContent(): ValidationIssue[] {
  for (const section of contentSections) {
    const sectionPath = path.join(rootDirectory, "content", section);
    if (!fs.existsSync(sectionPath)) {
      return [{ file: sectionPath, message: "Missing content section" }];
    }
  }

  const items = getAllContentItems();
  const jobs = readYamlFile<CanonicalJobs>("content/_data/canonical-jobs.yml");
  const claimTruth = readYamlFile<ClaimTruth>("content/_truth/claims.yml");
  const jobIds = new Set(jobs.jobs.map((job) => job.id));
  const phrases = claimTruth.forbiddenPhrases ?? [];

  return [
    ...items.flatMap((item) => validateMetadata(item, jobIds)),
    ...items.flatMap(validateClaims),
    ...items.flatMap(validateSources),
    ...items.flatMap(validateInternalLinks),
    ...items.flatMap(validateMarkdownLinks),
    ...validatePresentationLinks(),
    ...items.flatMap((item) => validateForbiddenPhrases(item, phrases)),
    ...validateDuplicateJobs(items),
  ];
}

export function validateAutopublishPaths(paths: string[]): ValidationIssue[] {
  return paths.flatMap((changedPath) => {
    const normalized = changedPath.replaceAll("\\", "/");
    return allowedAutopublishPrefixes.some((prefix) => normalized.startsWith(prefix))
      ? []
      : [{ file: changedPath, message: "Path is outside the autopublish allowlist" }];
  });
}
