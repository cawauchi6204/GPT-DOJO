import Link from 'next/link';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">GPT Dojo</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/courses" className="text-gray-700 hover:text-indigo-600">
              コース一覧
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600">
              ダッシュボード
            </Link>
            <Link href="/community" className="text-gray-700 hover:text-indigo-600">
              コミュニティ
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-700 hover:text-indigo-600"
            >
              ログイン
            </Link>
            <Link
              href="/signup"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              無料で始める
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;