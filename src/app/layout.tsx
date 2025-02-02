import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";

const geistMono = localFont({
  src: [
    {
      path: "./fonts/GeistMonoVF.woff",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-geist-mono",
});

const geist = localFont({
  src: [
    {
      path: "./fonts/GeistVF.woff",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "GPT DOJO",
    template: "%s | GPT DOJO",
  },
  description: "今日から生成AIを味方にするためのプラットフォームGPT DOJO",
  keywords: ["プロンプト", "プロンプトエンジニアリング", "学習", "AI", "GPT", "教育"],
  authors: [{ name: "GPT DOJO Team" }],
  openGraph: {
    type: "website",
    siteName: "GPT DOJO",
    title: "GPT DOJO",
    description: "AIを活用したプログラミング学習プラットフォーム",
    images: [
      {
        url: "/images/ogp.png",
        width: 1200,
        height: 630,
        alt: "GPT DOJO",
      },
    ],
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "GPT DOJO",
    description: "今日から生成AIを味方にするためのプラットフォームGPT DOJO",
    images: ["/images/ogp.png"],
    creator: "@gptdojo",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
