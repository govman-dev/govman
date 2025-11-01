import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: "export",
  
  // Optimize images
  images: {
    unoptimized: true, // Required for static export
  },

  // Enable compression
  compress: true,

  // Performance optimizations
  reactStrictMode: true,
  
  // Optimize production builds
  productionBrowserSourceMaps: false,

  // Configure trailing slashes for consistent URLs
  trailingSlash: false,

  // Disable x-powered-by header for security
  poweredByHeader: false,

  // Generate ETags for better caching
  generateEtags: true,

  // Configure headers for security and performance
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.{jpg,jpeg,png,gif,svg,ico,webp}",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
