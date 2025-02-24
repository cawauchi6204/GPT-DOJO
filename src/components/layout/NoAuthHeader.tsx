import Image from 'next/image'
import Link from 'next/link'

const NoAuthHeader = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/dog_mono.png"
              alt="GPT Dojo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-bold text-gray-900">GPT Dojo</span>
          </Link>
          <nav>
            <ul className="flex items-center space-x-4">
              <li>
                <Link
                  href="/sign-in"
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  ログイン
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-up"
                  className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                >
                  新規登録
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default NoAuthHeader
