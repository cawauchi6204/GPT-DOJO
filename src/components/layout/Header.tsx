import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center text-xl md:text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
        >
          <span>GPT Dojo</span>
          <Image
            src="/images/dog_mono.png"
            alt="GPT Dojo"
            width={50}
            height={50}
            className="ml-2 mb-2"
          />
        </Link>

        <nav>
          <ul className="flex items-center space-x-2 md:space-x-6">
            <li>
              <Link
                href="/courses"
                className="text-sm md:text-base text-gray-600 hover:text-gray-900 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                コース一覧
              </Link>
            </li>
            <li>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base">
                    ログイン
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox:
                        "w-8 h-8 md:w-10 md:h-10",
                    },
                  }}
                  afterSignOutUrl="/"
                />
              </SignedIn>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
