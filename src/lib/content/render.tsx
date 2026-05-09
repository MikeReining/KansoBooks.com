import type { ReactNode } from "react";

function inline(text: string): ReactNode {
  return text;
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

    return (
      <p key={index} className="mt-4 text-sm leading-7 text-foreground">
        {inline(block)}
      </p>
    );
  });
}
