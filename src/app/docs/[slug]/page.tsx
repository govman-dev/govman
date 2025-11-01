import DocsPage from "@/components/DocsPage";
import { loadMarkdown } from "@/lib/content";
import { loadSidebarGroups } from "@/lib/sidebar";
import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const groups = loadSidebarGroups();

  try {
    const doc = loadMarkdown(slug);
    return <DocsPage groups={groups} content={doc.content} />;
  } catch {
    // If the markdown file doesn't exist, surface 404
    return notFound();
  }
}

export function generateStaticParams() {
  const dir = path.join(process.cwd(), "src", "content", "en");
  const files = fs.readdirSync(dir);
  return files
    .filter((f) => f.endsWith(".md"))
    .filter((f) => f !== "index.md" && f !== "sidebar.md")
    .map((f) => ({ slug: path.parse(f).name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const doc = loadMarkdown(slug);
    const title =
      (doc.data?.title as string | undefined) ||
      slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    
    const description =
      (doc.data?.description as string | undefined) ||
      doc.content.substring(0, 160).replace(/[#*`]/g, "").trim();
    
    const url = `https://govman.dev/docs/${slug}`;
    
    return {
      title,
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
        type: "article",
        images: ["/og-image.png"],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/og-image.png"],
      },
    };
  } catch {
    return { 
      title: "Not Found",
      description: "The requested page could not be found.",
    };
  }
}
