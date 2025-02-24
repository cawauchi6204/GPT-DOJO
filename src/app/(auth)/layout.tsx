import { ClerkProvider } from '@clerk/nextjs'
import { ReactNode } from 'react'
import { Layout } from '@/components/layout/Layout'

export default function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <ClerkProvider>
      <Layout>
        {children}
      </Layout>
    </ClerkProvider>
  )
}
