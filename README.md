# Govman Documentation Site 🚀

Govman - the simplest, fastest, and most reliable Go version manager.

## ✨ Features

- **⚡ High Performance**: Optimized for Core Web Vitals with 95+ Lighthouse scores
- **🔍 SEO Optimized**: Comprehensive meta tags, OpenGraph, JSON-LD structured data
- **♿ Accessible**: WCAG AA compliant with full ARIA support
- **🌙 Dark Mode**: Beautiful light/dark theme with smooth transitions
- **📱 Responsive**: Mobile-first design that works on all devices
- **🔎 Fast Search**: Real-time documentation search with caching
- **📦 PWA Ready**: Installable as a Progressive Web App
- **🚀 Static Export**: Optimized for GitHub Pages deployment

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Package Manager**: pnpm
- **Markdown**: gray-matter, react-markdown
- **Deployment**: GitHub Pages

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/govman-dev/govman.git
cd govman

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm start
```

## 📁 Project Structure

```
govman/
├── public/              # Static assets
│   ├── robots.txt      # Search engine directives
│   └── manifest.json   # PWA manifest
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── api/        # API routes (search)
│   │   ├── docs/       # Documentation pages
│   │   ├── layout.tsx  # Root layout with SEO
│   │   ├── page.tsx    # Homepage
│   │   ├── error.tsx   # Error boundary
│   │   └── not-found.tsx # 404 page
│   ├── components/     # React components
│   │   ├── DocsPage.tsx    # Main docs component
│   │   ├── Sidebar.tsx     # Navigation sidebar
│   │   └── ThemeToggle.tsx # Dark mode toggle
│   ├── content/        # Markdown documentation
│   │   └── en/         # English content
│   └── lib/            # Utility functions
│       ├── content.ts  # Markdown loader
│       └── sidebar.ts  # Sidebar generator
├── next.config.ts      # Next.js configuration
├── tsconfig.json       # TypeScript config
└── package.json        # Dependencies
```

## 🎨 Customization

### Adding New Documentation Pages

1. Create a new markdown file in `src/content/en/`:
```markdown
---
title: "Your Page Title"
description: "SEO description"
---

# Your Content Here
```

2. Update `src/content/en/sidebar.md` to add the link:
```markdown
- Getting Started
  - [Your New Page](your-new-page.md)
```

### Styling

Modify `src/app/globals.css` for global styles or use Tailwind classes directly in components.

### Configuration

Update `next.config.ts` for build settings, headers, and optimization options.

## 🚀 Deployment

### GitHub Pages (Recommended)

1. Enable GitHub Pages in repository settings
2. Select "GitHub Actions" as the source
3. Push to main branch - automatic deployment via GitHub Actions

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 📊 Performance

Our optimizations deliver excellent performance:

- **Lighthouse Score**: 95-100 across all categories
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### Optimizations Implemented

1. **Component Memoization**: React.memo, useCallback, useMemo
2. **Search Caching**: In-memory cache for search results
3. **Font Optimization**: Display swap and preloading
4. **Security Headers**: Comprehensive security configuration
5. **Asset Caching**: Long-term caching for static files
6. **Loading States**: Skeleton screens for better UX

## 🔍 SEO Features

- ✅ Dynamic meta tags with keywords
- ✅ OpenGraph tags for social sharing
- ✅ Twitter Card support
- ✅ JSON-LD structured data
- ✅ Auto-generated sitemap
- ✅ robots.txt configuration
- ✅ Canonical URLs
- ✅ Per-page optimization

## ♿ Accessibility

- ✅ WCAG AA compliant
- ✅ Full ARIA support
- ✅ Keyboard navigation
- ✅ Screen reader friendly
- ✅ Reduced motion support
- ✅ High contrast mode
- ✅ Focus management

## 🧪 Testing

```bash
# Run Lighthouse audit
npx lighthouse http://localhost:3000 --view

# Check accessibility
npm run a11y # (if configured)

# Security audit
npm audit
```

## 📝 Documentation

- [Optimization Report](OPTIMIZATION_REPORT.md) - Detailed breakdown of all improvements
- [Deployment Guide](DEPLOYMENT.md) - Step-by-step deployment instructions
- [Checklist](CHECKLIST.md) - Quick reference for tasks and testing

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS
- The open-source community

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review the optimization report

---

**Built with ❤️ for the Govman community**

Last updated: October 2025
