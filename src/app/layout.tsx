import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vibe Coding Course - Build Your MVP in 30 Days",
  description: "Learn to build and launch your MVP in 30 days with modern web technologies. Master React, Next.js, and full-stack development from concept to deployment.",
  keywords: [
    "coding course",
    "MVP development",
    "React",
    "Next.js",
    "full-stack development",
    "web development",
    "30-day bootcamp",
    "coding bootcamp",
    "JavaScript",
    "TypeScript"
  ],
  authors: [{ name: "Vibe Coding Course" }],
  creator: "Vibe Coding Course",
  publisher: "Vibe Coding Course",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://vibe-coding-course.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vibe Coding Course - Build Your MVP in 30 Days",
    description: "Learn to build and launch your MVP in 30 days with modern web technologies. Master React, Next.js, and full-stack development from concept to deployment.",
    url: "https://vibe-coding-course.com",
    siteName: "Vibe Coding Course",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vibe Coding Course - Build Your MVP in 30 Days",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe Coding Course - Build Your MVP in 30 Days",
    description: "Learn to build and launch your MVP in 30 days with modern web technologies. Master React, Next.js, and full-stack development from concept to deployment.",
    images: ["/og-image.jpg"],
    creator: "@vibecoding",
    site: "@vibecoding",
  },
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
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
