export type ContentType =
  | "resource"
  | "comparison"
  | "glossary"
  | "template"
  | "artifact"
  | "hub";

export type ContentState =
  | "candidate"
  | "scored"
  | "briefed"
  | "researched"
  | "artifact-selected"
  | "drafted"
  | "optimized"
  | "audited"
  | "published"
  | "indexed"
  | "measuring"
  | "refresh-needed"
  | "refreshing"
  | "retired"
  | "blocked"
  | "escalated";

export type ContentRisk = "low" | "medium" | "high";

export type AnswerUnit =
  | "AnswerBlock"
  | "KansoTake"
  | "DecisionSupport"
  | "ProofBoundary"
  | "SourceNotes"
  | "NextStep"
  | "EntitySummary";

export type ContentImage = {
  src: string;
  alt: string;
  presentation?: "standard" | "banner";
  width?: number;
  height?: number;
  audit: string;
};

export type ContentMetadata = {
  id: string;
  title: string;
  seoTitle: string;
  description: string;
  slug: string;
  canonicalPath: string;
  type: ContentType;
  tier: 1 | 2 | 3 | 4;
  pillar: string;
  state: ContentState;
  intent: string;
  risk: ContentRisk;
  jurisdiction: string;
  jurisdictionNotes?: string;
  professionalBoundary: string;
  author: string;
  reviewer: string;
  publishedAt?: string;
  lastReviewed: string;
  nextReview: string;
  primaryQuery: string;
  secondaryQueries?: string[];
  canonicalJob: string;
  artifactId?: string;
  claimManifest: string;
  answerUnits: AnswerUnit[];
  internalLinks?: string[];
  externalSources?: string[];
  heroImage?: ContentImage;
  ogImage?: string;
  schema?: string[];
};

export type ContentItem = {
  metadata: ContentMetadata;
  body: string;
  filePath: string;
  lastModified: Date;
};

export type ClaimManifest = {
  schemaVersion: 1;
  pageId: string;
  risk?: ContentRisk;
  claims: Array<{
    id: string;
    text: string;
    type: string;
    source: string;
    sourceCheckedAt?: string;
    refresh: string;
    notes?: string;
  }>;
};

export type ContentArtifact = {
  schemaVersion: 1;
  id: string;
  title: string;
  artifactType: string;
  professionalBoundary?: string;
  content?: {
    purpose?: string;
    checklist?: Array<{
      name: string;
      readyWhen?: string;
      doneWhen?: string;
      evidence?: string;
      proof?: string;
    }>;
  };
};

export type ValidationIssue = {
  file: string;
  message: string;
};
