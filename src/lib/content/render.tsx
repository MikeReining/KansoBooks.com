import type { ReactNode } from "react";
import Link from "next/link";

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

export function renderMarkdown(body: string): ReactNode {
  const blocks = body.split(/\n{2,}/).filter(Boolean);

  return blocks.map((block, index) => {
    if (block.startsWith("### ")) {
      return (
        <h3 key={index} className="mt-8 text-lg font-medium text-foreground">
          {inline(block.slice(4))}
        </h3>
      );
    }

    if (block.startsWith("## ")) {
      return (
        <h2 key={index} className="mt-10 text-xl font-semibold text-foreground">
          {inline(block.slice(3))}
        </h2>
      );
    }

    if (isTable(block)) {
      const [headerLine, , ...bodyLines] = block.split("\n");
      const headers = parseTableRow(headerLine);
      const rows = bodyLines.map(parseTableRow);

      return (
        <div key={index} className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[42rem] border-collapse text-left text-sm text-foreground">
            <thead>
              <tr className="border-b border-border">
                {headers.map((header) => (
                  <th key={header} className="py-3 pr-4 font-medium">
                    {inline(header)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((row, rowIndex) => (
                <tr key={`${index}-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`${index}-${rowIndex}-${cellIndex}`}
                      className="py-3 pr-4 align-top leading-6 text-muted-foreground"
                    >
                      {inline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (block.startsWith("- ")) {
      return (
        <ul
          key={index}
          className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-foreground"
        >
          {block.split("\n").map((line) => (
            <li key={line}>{inline(line.replace(/^- /, ""))}</li>
          ))}
        </ul>
      );
    }

    if (/^\d+\. /.test(block)) {
      return (
        <ol
          key={index}
          className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-foreground"
        >
          {block.split("\n").map((line) => (
            <li key={line}>{inline(line.replace(/^\d+\. /, ""))}</li>
          ))}
        </ol>
      );
    }

    return (
      <p key={index} className="mt-4 text-sm leading-7 text-foreground">
        {inline(block)}
      </p>
    );
  });
}
