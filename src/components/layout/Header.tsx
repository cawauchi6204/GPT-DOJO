import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <Link
          href="/"
          className="text-xl md:text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
        >
          GPT Dojo
        </Link>

        <nav>
          <ul className="flex items-center space-x-2 md:space-x-6">
            {/* <li>
              <Link
                href="/dashboard"
                className="text-sm md:text-base text-gray-600 hover:text-gray-900 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                ダッシュボード
              </Link>
            </li> */}
            <li>
              <Link
                href="/courses"
                className="text-sm md:text-base text-gray-600 hover:text-gray-900 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                コース一覧
              </Link>
            </li>
            {/* <li>
              <Link
                href="/community"
                className="text-sm md:text-base text-gray-600 hover:text-gray-900 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                コミュニティ
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
}
