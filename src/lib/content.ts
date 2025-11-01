import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type MarkdownDoc = {
  content: string;
  data: Record<string, unknown>;
};

export function loadMarkdown(slug: string): MarkdownDoc {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "en",
    `${slug}.md`
  );
  const raw = fs.readFileSync(filePath, "utf-8");
  try {
    const parsed = matter(raw);
    return {
      content: parsed.content,
      data: parsed.data as Record<string, unknown>,
    };
  } catch (err) {
    // Fallback: return raw content if front-matter parsing fails
    return { content: raw, data: {} };
  }
}
