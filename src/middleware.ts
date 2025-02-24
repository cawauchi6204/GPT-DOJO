import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { authRoutes, publicRoutes } from './constants/auth';

const isPublicRoute = (pathname: string) => {
  return publicRoutes.includes(pathname) ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/public/') ||
    pathname.startsWith('/images/') ||
    pathname === '/favicon.ico';
};

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const pathname = req.nextUrl.pathname;

  // セッションの更新
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 認証ルートにいて、すでにログインしている場合はダッシュボードにリダイレクト
  if (authRoutes.includes(pathname)) {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return res;
  }

  // パブリックルートの場合は認証不要
  if (isPublicRoute(pathname)) {
    return res;
  }

  // 認証が必要なルートで、セッションがない場合はサインインページにリダイレクト
  if (!session) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
