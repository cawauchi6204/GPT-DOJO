import { clerkMiddleware } from "@clerk/nextjs/server"

// clerkMiddlewareを直接エクスポート
export default clerkMiddleware()

export const config = {
  matcher: [
    // プライベートルートを保護
    '/dashboard',
    '/courses/:path*',
    '/study/:path*',
    '/community/:path*',
    // Clerkが必要とする静的アセット
    '/((?!.+\\.[\\w]+$|_next).*)',
    // APIルート
    '/(api|trpc)(.*)',
  ],
}
