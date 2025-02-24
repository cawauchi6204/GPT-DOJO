/**
 * 認証が不要なパブリックルート
 */
export const publicRoutes = [
  '/',               // トップページ
  '/sign-in/*',      // サインインページ
  '/sign-up/*',      // サインアップページ
];

/**
 * 認証が必要なプライベートルート
 */
export const privateRoutes = [
  '/dashboard',      // ダッシュボード
  '/courses',        // コース一覧
  '/courses/*',      // コース詳細
  '/study',          // 学習ページ
  '/community',      // コミュニティ
];

/**
 * 認証後のリダイレクト先
 */
export const DEFAULT_LOGIN_REDIRECT = '/dashboard';
