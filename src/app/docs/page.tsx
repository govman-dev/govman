import type { Metadata } from "next";

import DocsPage from "@/components/DocsPage";
import { loadMarkdown } from "@/lib/content";
import { loadSidebarGroups } from "@/lib/sidebar";

export default function DocsIndexPage() {
  const groups = loadSidebarGroups();
  const doc = loadMarkdown("index");
  return <DocsPage groups={groups} content={doc.content} />;
}

export function generateMetadata(): Metadata {
  try {
    const doc = loadMarkdown("index");
    const title = (doc.data?.title as string | undefined) || "Documentation";
    return { title };
  } catch {
    return { title: "Documentation" };
  }
}
