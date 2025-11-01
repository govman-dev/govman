import DocsPage from "@/components/DocsPage";
import { loadMarkdown } from "@/lib/content";
import { loadSidebarGroups } from "@/lib/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Govman - The Simplest, Fastest Go Version Manager",
  description:
    "Govman is the simplest, fastest, and most reliable Go version manager. Install, manage, and switch between Go versions effortlessly with cross-platform support.",
  alternates: {
    canonical: "https://govman.dev",
  },
};

export default function Home() {
  const groups = loadSidebarGroups();
  const doc = loadMarkdown("index");
  return <DocsPage groups={groups} content={doc.content} />;
}
