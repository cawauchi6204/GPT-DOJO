import { ClerkProvider } from '@clerk/nextjs'
import { ReactNode } from 'react'
import NoAuthHeader from '@/components/layout/NoAuthHeader'

export default function NoAuthLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <ClerkProvider>
      <div className="min-h-screen bg-gray-100">
        <NoAuthHeader />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </ClerkProvider>
  )
}
