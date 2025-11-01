import fs from "node:fs";
import path from "node:path";

export type SidebarItem = {
  href: string;
  label: string;
};

export type SidebarGroup = {
  title: string;
  items: SidebarItem[];
};

function toAnchorHref(filePath: string): string {
  // Normalize to POSIX separators in case of mixed input
  const normalized = filePath.replace(/\\/g, "/");
  const parsed = path.posix.parse(normalized);
  const withoutExt = path.posix.join(parsed.dir || "", parsed.name);
  return `/docs/${withoutExt}`;
}

export function loadSidebarGroups(): SidebarGroup[] {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "en",
    "sidebar.md"
  );
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split(/\r?\n/);

  const groups: SidebarGroup[] = [];
  let current: SidebarGroup | null = null;

  for (const raw of lines) {
    const line = raw.trimEnd();
    // Group line: starts with '- ' and not an item link
    const groupMatch = /^-\s+([^\[]\S.*)$/.exec(line);
    const itemMatch = /^\s*-\s*\[(.+?)\]\((.+?)\)\s*$/.exec(raw);

    if (groupMatch) {
      const title = groupMatch[1].trim();
      current = { title, items: [] };
      groups.push(current);
      continue;
    }

    if (itemMatch && current) {
      const label = itemMatch[1].trim();
      const link = itemMatch[2].trim();
      current.items.push({ label, href: toAnchorHref(link) });
      continue;
    }
  }

  return groups;
}
