"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function ArtifactCopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copyText() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={copyText}
      className="inline-flex min-h-9 items-center gap-2 border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted"
    >
      {copied ? (
        <Check aria-hidden="true" className="size-3.5 text-success" />
      ) : (
        <Copy aria-hidden="true" className="size-3.5 text-primary" />
      )}
      {copied ? "Copied" : "Copy checklist"}
    </button>
  );
}
