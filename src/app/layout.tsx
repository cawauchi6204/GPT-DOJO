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

const defaultDescription = "GPT Dojoは、ChatGPTの使い方をハンズオン形式で学べるオンライン学習プラットフォームです。初心者から上級者まで、ステップバイステップで学習できます。";
const defaultOgImage = {
  url: "/images/ogp.png",
  width: 800,
  height: 600,
  alt: "GPT DOJO",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "GPT DOJO - 今日から生成AIを味方にしよう",
    template: "%s | GPT DOJO",
  },
  description: defaultDescription,
  keywords: ["プロンプト", "プロンプトエンジニアリング", "学習", "AI", "GPT", "教育"],
  authors: [{ name: "GPT DOJO Team" }],
  openGraph: {
    type: "website",
    siteName: "GPT DOJO",
    title: "GPT DOJO - 今日から生成AIを味方にしよう",
    description: defaultDescription,
    images: [defaultOgImage],
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "GPT DOJO - 今日から生成AIを味方にしよう",
    description: defaultDescription,
    images: [defaultOgImage.url],
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
