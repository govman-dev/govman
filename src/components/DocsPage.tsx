"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback, memo } from "react";
import Sidebar from "./Sidebar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { SidebarGroup } from "../lib/sidebar";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

type DocsPageProps = {
  groups: SidebarGroup[];
  content?: string;
};

// Memoized search result component
const SearchResultItem = memo(
  ({
    result,
    onClose,
  }: {
    result: { href: string; title: string; excerpt: string };
    onClose: () => void;
  }) => (
    <li key={result.href}>
      <Link
        href={result.href}
        onClick={onClose}
        className="block px-3 py-2 hover:bg-blue-500/10 dark:hover:bg-blue-500/20"
      >
        <div className="text-sm font-medium text-foreground">
          {result.title}
        </div>
        <div className="text-xs text-slate-500 line-clamp-2">
          {result.excerpt}
        </div>
      </Link>
    </li>
  )
);
SearchResultItem.displayName = "SearchResultItem";

export default function DocsPage({ groups, content }: DocsPageProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = useCallback(() => setIsSidebarOpen((v) => !v), []);
  const closeSidebarOnMobile = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  // Search state
  type SearchResult = {
    slug: string;
    title: string;
    href: string;
    excerpt: string;
  };
  type SearchIndexItem = {
    slug: string;
    title: string;
    href: string;
    content: string;
  };
  
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchIndex, setSearchIndex] = useState<SearchIndexItem[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Load search index on mount
  useEffect(() => {
    fetch("/search-index.json")
      .then((res) => {
        if (!res.ok) throw new Error("Search index not found");
        return res.json();
      })
      .then((data) => setSearchIndex(data))
      .catch((err) => {
        // Silently fail in development if index not generated yet
        if (process.env.NODE_ENV === "development") {
          console.info("Search index not available. Run 'pnpm build' to generate.");
        } else {
          console.error("Failed to load search index:", err);
        }
      });
  }, []);

  // Client-side search
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setOpenSearch(false);
      return;
    }
    
    setLoading(true);
    const handle = setTimeout(() => {
      const q = query.toLowerCase();
      const matches: SearchResult[] = [];
      
      for (const doc of searchIndex) {
        const inTitle = doc.title.toLowerCase().includes(q);
        const contentLower = doc.content.toLowerCase();
        const idx = contentLower.indexOf(q);
        
        if (inTitle || idx !== -1) {
          const start = Math.max(0, idx - 80);
          const end = Math.min(doc.content.length, start + 160);
          let excerpt = doc.content.slice(start, end);
          if (start > 0) excerpt = "…" + excerpt;
          if (end < doc.content.length) excerpt = excerpt + "…";
          
          matches.push({
            slug: doc.slug,
            title: doc.title,
            href: doc.href,
            excerpt: inTitle ? doc.content.slice(0, 160) : excerpt,
          });
        }
      }
      
      // Rank: prefer title matches
      const ranked = matches
        .sort((a, b) => {
          const aInTitle = a.title.toLowerCase().includes(q);
          const bInTitle = b.title.toLowerCase().includes(q);
          if (aInTitle && !bInTitle) return -1;
          if (!aInTitle && bInTitle) return 1;
          return 0;
        })
        .slice(0, 12);
      
      setResults(ranked);
      setOpenSearch(true);
      setLoading(false);
    }, 250);
    
    return () => clearTimeout(handle);
  }, [query, searchIndex]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpenSearch(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Helpers to generate slug IDs for markdown headings - memoized for performance
  const slugify = useCallback((text: string) =>
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-"), []);
      
  const flatten = useCallback((children: React.ReactNode): string => {
    return React.Children.toArray(children)
      .map((child: any) => {
        if (typeof child === "string") return child;
        if (typeof child === "number") return String(child);
        if (child?.props?.children) return flatten(child.props.children);
        return "";
      })
      .join("");
  }, []);

  return (
    <div className="font-sans text-foreground leading-relaxed bg-background min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-background border-b border-slate-200 dark:border-slate-700 flex items-center px-6 z-50 shadow-sm" role="banner">
        <button
          className="hidden max-md:block bg-transparent border-0 text-2xl cursor-pointer text-foreground p-2"
          onClick={toggleSidebar}
          aria-label="Toggle navigation sidebar"
          aria-expanded={isSidebarOpen}
          aria-controls="sidebar"
        >
          ☰
        </button>
        <div className="flex items-center gap-2.5 text-2xl font-bold text-blue-500">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black" aria-hidden="true">
            <Image src="/govman.png" alt="Govman Logo" width={32} height={32} />
          </div>
          <Link href="/" aria-label="Govman home page">Govman</Link>
        </div>
        <div className="ml-auto flex gap-4 items-center" role="toolbar" aria-label="Header toolbar">
          <div className="relative max-md:hidden" ref={containerRef} role="search">
            <label htmlFor="doc-search" className="sr-only">Search documentation</label>
            <input
              id="doc-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query.trim().length >= 2 && setOpenSearch(true)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setOpenSearch(false);
                if (e.key === "Enter") {
                  if (results[0]) router.push(results[0].href);
                }
              }}
              className="px-4 py-2 border border-slate-200 dark:border-slate-700 bg-background text-foreground rounded-md w-64 text-sm transition-all duration-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              placeholder="Search documentation..."
              aria-autocomplete="list"
              aria-controls="search-results"
              aria-expanded={openSearch}
            />
            {openSearch && (loading || results.length > 0) && (
              <div 
                id="search-results"
                className="absolute left-0 mt-2 w-[32rem] max-w-[80vw] z-50 bg-background border border-slate-200 dark:border-slate-700 rounded-md shadow-lg"
                role="listbox"
                aria-label="Search results"
              >
                <div className="p-2 text-xs text-slate-500" role="status" aria-live="polite">
                  {loading
                    ? "Searching…"
                    : `${results.length} result${
                        results.length === 1 ? "" : "s"
                      }`}
                </div>
                {!loading && (
                  <ul className="max-h-80 overflow-auto py-1" role="listbox">
                    {results.map((r) => (
                      <SearchResultItem
                        key={r.href}
                        result={r}
                        onClose={() => setOpenSearch(false)}
                      />
                    ))}
                    {results.length === 0 && (
                      <li className="px-3 py-2 text-sm text-slate-500" role="option">
                        No results
                      </li>
                    )}
                  </ul>
                )}
              </div>
            )}
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar
        groups={groups}
        open={isSidebarOpen}
        onItemClick={closeSidebarOnMobile}
      />

      {/* Main Content */}
      <main className="ml-0 md:ml-72 mt-16 py-12 px-6 md:px-16 max-w-screen-xl" role="main">
        {content ? (
          <article className="prose prose-slate max-w-none dark:prose-invert" itemScope itemType="https://schema.org/Article">
            <ReactMarkdown
              remarkPlugins={useMemo(() => [remarkGfm], [])}
              rehypePlugins={useMemo(() => [rehypeRaw], [])}
              components={{
                h1: ({ children, ...props }) => (
                  <h1 id={slugify(flatten(children))} {...props}>
                    {children}
                  </h1>
                ),
                h2: ({ children, ...props }) => (
                  <h2 id={slugify(flatten(children))} {...props}>
                    {children}
                  </h2>
                ),
                h3: ({ children, ...props }) => (
                  <h3 id={slugify(flatten(children))} {...props}>
                    {children}
                  </h3>
                ),
                h4: ({ children, ...props }) => (
                  <h4 id={slugify(flatten(children))} {...props}>
                    {children}
                  </h4>
                ),
                h5: ({ children, ...props }) => (
                  <h5 id={slugify(flatten(children))} {...props}>
                    {children}
                  </h5>
                ),
                h6: ({ children, ...props }) => (
                  <h6 id={slugify(flatten(children))} {...props}>
                    {children}
                  </h6>
                ),
                a: ({ href, children, ...props }) => {
                  // Strip .md extension from internal links
                  if (href && href.endsWith(".md")) {
                    const cleanHref = href.replace(/\.md$/, "");
                    // If it's a relative link, make it absolute to /docs/
                    const finalHref =
                      cleanHref.startsWith("/") || cleanHref.startsWith("http")
                        ? cleanHref
                        : `/docs/${cleanHref}`;
                    return (
                      <Link href={finalHref} {...props}>
                        {children}
                      </Link>
                    );
                  }
                  // External links or links without .md
                  if (
                    href &&
                    (href.startsWith("http") || href.startsWith("https"))
                  ) {
                    return (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                      >
                        {children}
                      </a>
                    );
                  }
                  // Other internal links
                  return href ? (
                    <Link href={href} {...props}>
                      {children}
                    </Link>
                  ) : (
                    <a {...props}>{children}</a>
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </article>
        ) : (
          <div className="text-slate-600">No content available.</div>
        )}
      </main>
    </div>
  );
}
