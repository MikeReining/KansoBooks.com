import type { ReactNode } from "react";
import Link from "next/link";

export type ArticleSection = {
  id: string;
  title: string;
};

type MarkdownBlock =
  | {
      type: "heading";
      level: 2 | 3;
      text: string;
    }
  | {
      type: "table" | "list" | "ordered-list" | "paragraph";
      raw: string;
    };

function inline(text: string): ReactNode {
  const nodes: ReactNode[] = [];
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const [, label, href] = match;
    nodes.push(
      <Link key={`${href}-${match.index}`} href={href} className="underline">
        {label}
      </Link>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : text;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isTable(block: string): boolean {
  const lines = block.split("\n");
  return (
    lines.length >= 2 &&
    lines[0].trim().startsWith("|") &&
    /^\|?[\s:-]+\|[\s|:-]+$/.test(lines[1].trim())
  );
}

function isLevelTwoHeading(
  block: MarkdownBlock,
): block is Extract<MarkdownBlock, { type: "heading" }> {
  return block.type === "heading" && block.level === 2;
}

function parseMarkdownBlocks(body: string): MarkdownBlock[] {
  return body
    .split(/\n{2,}/)
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("### ")) {
        return { type: "heading", level: 3, text: block.slice(4) };
      }

      if (block.startsWith("## ")) {
        return { type: "heading", level: 2, text: block.slice(3) };
      }

      if (isTable(block)) {
        return { type: "table", raw: block };
      }

      if (block.startsWith("- ")) {
        return { type: "list", raw: block };
      }

      if (/^\d+\. /.test(block)) {
        return { type: "ordered-list", raw: block };
      }

      return { type: "paragraph", raw: block };
    });
}

export function getArticleSections(body: string): ArticleSection[] {
  const seen = new Map<string, number>();

  return parseMarkdownBlocks(body)
    .filter(
      (block): block is Extract<MarkdownBlock, { type: "heading" }> =>
        isLevelTwoHeading(block),
    )
    .map((heading) => {
      const baseId = slugify(heading.text);
      const count = seen.get(baseId) ?? 0;
      seen.set(baseId, count + 1);

      return {
        id: count === 0 ? baseId : `${baseId}-${count + 1}`,
        title: heading.text,
      };
    });
}

function tableKind(sectionTitle: string | null): string {
  if (sectionTitle?.toLowerCase().includes("decision")) {
    return "Decision table";
  }

  if (sectionTitle?.toLowerCase().includes("10-minute exit test")) {
    return "Operator test";
  }

  return "Review table";
}

function renderTable(block: string, index: number, sectionTitle: string | null) {
  const [headerLine, , ...bodyLines] = block.split("\n");
  const headers = parseTableRow(headerLine);
  const rows = bodyLines.map(parseTableRow);

  return (
    <figure key={index} className="mt-6">
      <div className="mb-2 text-[0.6875rem] font-medium uppercase tracking-normal text-muted-foreground">
        {tableKind(sectionTitle)}
      </div>
      <div className="overflow-x-auto border-y border-border bg-card">
        <table className="w-full min-w-[44rem] border-collapse text-left text-sm text-foreground">
          <thead>
            <tr className="border-b border-border bg-muted">
              {headers.map((header, headerIndex) => (
                <th
                  key={`${header}-${headerIndex}`}
                  className="px-4 py-3 text-xs font-semibold uppercase tracking-normal text-foreground"
                >
                  {inline(header)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row, rowIndex) => (
              <tr key={`${index}-${rowIndex}`} className="align-top">
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${index}-${rowIndex}-${cellIndex}`}
                    className={
                      cellIndex === 0
                        ? "px-4 py-3 font-medium leading-6 text-foreground"
                        : "px-4 py-3 leading-6 text-muted-foreground"
                    }
                  >
                    {inline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

function renderBlock(
  block: MarkdownBlock,
  index: number,
  sectionTitle: string | null,
  sectionIds: Map<number, string>,
): ReactNode {
  if (block.type === "heading" && block.level === 3) {
    return (
      <h3 key={index} className="mt-8 text-lg font-medium text-foreground">
        {inline(block.text)}
      </h3>
    );
  }

  if (block.type === "heading" && block.level === 2) {
    return (
      <h2
        key={index}
        id={sectionIds.get(index)}
        className="scroll-mt-24 border-t border-border pt-10 text-xl font-semibold tracking-normal text-foreground"
      >
        {inline(block.text)}
      </h2>
    );
  }

  if (block.type === "table") {
    return renderTable(block.raw, index, sectionTitle);
  }

  if (block.type === "list") {
    return (
      <ul
        key={index}
        className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-foreground"
      >
        {block.raw.split("\n").map((line) => (
          <li key={line}>{inline(line.replace(/^- /, ""))}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "ordered-list") {
    return (
      <ol
        key={index}
        className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-foreground"
      >
        {block.raw.split("\n").map((line) => (
          <li key={line}>{inline(line.replace(/^\d+\. /, ""))}</li>
        ))}
      </ol>
    );
  }

  if (block.type === "heading") {
    return null;
  }

  return (
    <p key={index} className="mt-4 text-sm leading-7 text-foreground">
      {inline(block.raw)}
    </p>
  );
}

function renderProofBoundary(
  blocks: MarkdownBlock[],
  indexes: number[],
  sectionIds: Map<number, string>,
): ReactNode {
  const [headingIndex, ...bodyIndexes] = indexes;
  const heading = blocks[headingIndex];

  if (heading.type !== "heading") {
    return null;
  }

  return (
    <section
      key={headingIndex}
      id={sectionIds.get(headingIndex)}
      className="mt-10 scroll-mt-24 border-y border-border bg-warning-soft px-5 py-6 sm:px-6"
    >
      <div className="text-[0.6875rem] font-medium uppercase tracking-normal text-muted-foreground">
        Proof boundary
      </div>
      <h2 className="mt-2 text-xl font-semibold tracking-normal text-foreground">
        {inline(heading.text)}
      </h2>
      <div>
        {bodyIndexes.map((bodyIndex) =>
          renderBlock(blocks[bodyIndex], bodyIndex, heading.text, sectionIds),
        )}
      </div>
    </section>
  );
}

function renderTestModule(
  blocks: MarkdownBlock[],
  indexes: number[],
  sectionIds: Map<number, string>,
): ReactNode {
  const [headingIndex, ...bodyIndexes] = indexes;
  const heading = blocks[headingIndex];

  if (heading.type !== "heading") {
    return null;
  }

  return (
    <section
      key={headingIndex}
      id={sectionIds.get(headingIndex)}
      className="mt-10 scroll-mt-24 border border-border bg-card px-5 py-6 shadow-sm sm:px-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <div className="text-[0.6875rem] font-medium uppercase tracking-normal text-primary">
            Operator test
          </div>
          <h2 className="mt-2 text-xl font-semibold tracking-normal text-foreground">
            {inline(heading.text)}
          </h2>
        </div>
        <div className="border border-border px-3 py-1 text-xs text-muted-foreground">
          10 minutes
        </div>
      </div>
      <div>
        {bodyIndexes.map((bodyIndex) =>
          renderBlock(blocks[bodyIndex], bodyIndex, heading.text, sectionIds),
        )}
      </div>
    </section>
  );
}

export function renderMarkdown(body: string): ReactNode {
  const blocks = parseMarkdownBlocks(body);
  const sections = getArticleSections(body);
  const sectionIds = new Map<number, string>();
  let sectionCursor = 0;

  blocks.forEach((block, index) => {
    if (isLevelTwoHeading(block)) {
      sectionIds.set(index, sections[sectionCursor]?.id ?? slugify(block.text));
      sectionCursor += 1;
    }
  });

  const rendered: ReactNode[] = [];
  let currentSectionTitle: string | null = null;

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];

    if (isLevelTwoHeading(block)) {
      currentSectionTitle = block.text;

      if (/^the 10-minute exit test$/i.test(block.text)) {
        const sectionIndexes = [index];
        let cursor = index + 1;
        while (
          cursor < blocks.length &&
          !isLevelTwoHeading(blocks[cursor])
        ) {
          sectionIndexes.push(cursor);
          cursor += 1;
        }
        rendered.push(renderTestModule(blocks, sectionIndexes, sectionIds));
        index = cursor - 1;
        continue;
      }

      if (/^what you can prove$/i.test(block.text)) {
        const sectionIndexes = [index];
        let cursor = index + 1;
        while (
          cursor < blocks.length &&
          !isLevelTwoHeading(blocks[cursor])
        ) {
          sectionIndexes.push(cursor);
          cursor += 1;
        }
        rendered.push(renderProofBoundary(blocks, sectionIndexes, sectionIds));
        index = cursor - 1;
        continue;
      }
    }

    rendered.push(renderBlock(block, index, currentSectionTitle, sectionIds));
  }

  return rendered;
}
