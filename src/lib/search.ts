import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

type SearchIndexItem = {
  slug: string;
  title: string;
  href: string;
  content: string;
};

function toPlainText(markdown: string): string {
  let text = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^\)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/^#+\s*/gm, "")
    .replace(/[\*_]{1,3}([^\*_]+)[\*_]{1,3}/g, "$1")
    .replace(/\r?\n/g, " ");
  return text.replace(/\s+/g, " ").trim();
}

function titleFromContent(raw: string, filename: string): string {
  const firstHeading = /^#\s+(.+)$/m.exec(raw);
  if (firstHeading) return firstHeading[1].trim();
  const base = path.parse(filename).name;
  return base.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function generateSearchIndex(): SearchIndexItem[] {
  const dir = path.join(process.cwd(), "src", "content", "en");
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && f !== "sidebar.md");

  return files.map((file) => {
    const full = path.join(dir, file);
    const raw = fs.readFileSync(full, "utf-8");
    
    try {
      const parsed = matter(raw);
      const title =
        (parsed.data?.title as string | undefined) ||
        titleFromContent(parsed.content, file);
      const slug = path.parse(file).name;
      const content = toPlainText(parsed.content);
      
      return {
        slug,
        title,
        href: slug === "index" ? "/" : `/docs/${slug}`,
        content,
      };
    } catch {
      const slug = path.parse(file).name;
      const title = titleFromContent(raw, file);
      const content = toPlainText(raw);
      
      return {
        slug,
        title,
        href: slug === "index" ? "/" : `/docs/${slug}`,
        content,
      };
    }
  });
}
