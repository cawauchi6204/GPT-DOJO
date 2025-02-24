import { clerkMiddleware } from "@clerk/nextjs/server";
 
// Protect all routes except public ones
export default clerkMiddleware();

export const config = {
  matcher: [
    /*
     * 以下のパスを除外して、それ以外のすべてのパスを保護:
     * - _next/static (静的ファイル)
     * - _next/image (画像最適化ファイル)
     * - favicon.ico (ファビコン)
     * - public folder
     * - /sign-in (サインインページ)
     * - /sign-up (サインアップページ)
     * - / (トップページ)
     */
    "/((?!_next/static|_next/image|favicon.ico|public|sign-in|sign-up|$).*)",
    /*
     * 明示的に保護するパス:
     * - /study
     * - /dashboard
     * - /courses
     */
    "/study/:path*",
    "/dashboard/:path*",
    "/courses/:path*",
  ],
};
