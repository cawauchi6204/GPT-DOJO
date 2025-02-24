import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // トップページを除外し、認証が必要なルートを指定
    "/((?!_next|^$|[\\/]$|sign-in|sign-up|[^?]*\\.[^?]*$).*)",
    // API routesを含める
    "/(api|trpc)(.*)",
  ],
};
