import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://govman.dev"),
  title: {
    default: "Govman - The Simplest, Fastest Go Version Manager",
    template: "%s | Govman Documentation",
  },
  description:
    "Govman is the simplest, fastest, and most reliable Go version manager. Install, manage, and switch between Go versions effortlessly with cross-platform support.",
  keywords: [
    "go",
    "golang",
    "version manager",
    "govman",
    "go version",
    "gvm",
    "go installation",
    "development tools",
    "golang tools",
  ],
  authors: [{ name: "Govman Team" }],
  creator: "Govman Team",
  publisher: "Govman",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://govman.dev",
    siteName: "Govman Documentation",
    title: "Govman - The Simplest, Fastest Go Version Manager",
    description:
      "Govman is the simplest, fastest, and most reliable Go version manager. Install, manage, and switch between Go versions effortlessly with cross-platform support.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Govman - Go Version Manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Govman - The Simplest, Fastest Go Version Manager",
    description:
      "Govman is the simplest, fastest, and most reliable Go version manager. Install, manage, and switch between Go versions effortlessly.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://govman.dev",
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Govman Documentation",
    description:
      "The simplest, fastest, and most reliable Go version manager documentation",
    url: "https://govman.dev",
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: "Govman",
      url: "https://govman.dev",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var m=localStorage.getItem('theme');if(m==='dark'){document.documentElement.classList.add('dark')}}catch{}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Govman" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
