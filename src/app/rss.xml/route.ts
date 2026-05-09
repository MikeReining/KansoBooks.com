import { getPublishedContentItems } from "@/lib/content";

const siteUrl = "https://kansobooks.com";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const items = getPublishedContentItems();
  const body = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>KansoBooks</title>
    <link>${siteUrl}</link>
    <description>Books-readiness, accountant handoff, and AI bookkeeping with proof.</description>
${items
  .map(
    (item) => `    <item>
      <title>${escapeXml(item.metadata.title)}</title>
      <link>${siteUrl}${item.metadata.canonicalPath}</link>
      <guid>${siteUrl}${item.metadata.canonicalPath}</guid>
      <description>${escapeXml(item.metadata.description)}</description>
      <pubDate>${item.lastModified.toUTCString()}</pubDate>
    </item>`,
  )
  .join("\n")}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
    },
  });
}
