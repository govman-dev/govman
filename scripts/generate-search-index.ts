import { generateSearchIndex } from "@/lib/search";
import fs from "node:fs";
import path from "node:path";

// This script generates a static search index and sitemap at build time
function generateSearchIndexFile() {
  const searchIndex = generateSearchIndex();
  const outputPath = path.join(process.cwd(), "public", "search-index.json");
  
  fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2));
  
  console.log(`✓ Generated search index with ${searchIndex.length} documents`);
}

function generateSitemap() {
  const searchIndex = generateSearchIndex();
  const baseUrl = "https://govman.dev";
  const currentDate = new Date().toISOString();
  
  const urls = [
    // Homepage
    `  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`,
    // All doc pages
    ...searchIndex
      .filter(doc => doc.slug !== "index")
      .map(doc => `  <url>
    <loc>${baseUrl}${doc.href}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`)
  ];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
  
  const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
  fs.writeFileSync(sitemapPath, sitemap);
  
  console.log(`✓ Generated sitemap with ${urls.length} URLs`);
}

// Run both generators
function main() {
  generateSearchIndexFile();
  generateSitemap();
}

// Run if called directly
if (require.main === module) {
  main();
}

export default main;
