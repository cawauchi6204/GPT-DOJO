import type { Metadata } from 'next'
import { Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GPT Dojo - ChatGPTの使い方を楽しく学べるオンライン学習プラットフォーム',
  description: 'ChatGPTの基礎から応用まで、実践的なスキルを楽しく学べるオンライン学習プラットフォーム。初心者から上級者まで、段階的に学習できるカリキュラムを提供しています。',
  keywords: 'ChatGPT, AI学習, プロンプトエンジニアリング, オンライン学習, プログラミング学習',
  authors: [{ name: 'GPT Dojo Team' }],
  openGraph: {
    title: 'GPT Dojo - ChatGPTの使い方を楽しく学べるオンライン学習プラットフォーム',
    description: 'ChatGPTの基礎から応用まで、実践的なスキルを楽しく学べるオンライン学習プラットフォーム。',
    url: 'https://gpt-dojo.com',
    siteName: 'GPT Dojo',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GPT Dojo',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GPT Dojo - ChatGPTの使い方を楽しく学べるオンライン学習プラットフォーム',
    description: 'ChatGPTの基礎から応用まで、実践的なスキルを楽しく学べるオンライン学習プラットフォーム。',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  )
}
