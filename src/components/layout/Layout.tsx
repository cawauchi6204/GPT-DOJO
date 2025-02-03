import { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
  hideHeader?: boolean;
}

export const Layout = ({ children, hideFooter = false, hideHeader = false }: LayoutProps) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${hideFooter ? 'overflow-hidden' : ''}`}>
      {!hideHeader && <Header />}
      <main className={`pt-16 ${hideFooter ? 'h-[calc(100vh-64px)]' : ''}`}>
        {children}
      </main>
      {!hideFooter && (
        <footer className="bg-[#f6f6f6] text-black py-6 md:py-8 mt-8 md:mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3 md:mb-4">GPT Dojo</h3>
                <p className="text-sm md:text-base text-gray-400">
                  ChatGPTの使い方をハンズオン形式で学べるオンライン学習プラットフォーム
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 md:mb-4">リンク</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/about" className="text-sm md:text-base text-gray-400 hover:text-white">
                      会社概要
                    </a>
                  </li>
                  <li>
                    <a href="/terms" className="text-sm md:text-base text-gray-400 hover:text-white">
                      利用規約
                    </a>
                  </li>
                  <li>
                    <a href="/privacy" className="text-sm md:text-base text-gray-400 hover:text-white">
                      プライバシーポリシー
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 md:mb-4">お問い合わせ</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/contact" className="text-sm md:text-base text-gray-400 hover:text-white">
                      お問い合わせフォーム
                    </a>
                  </li>
                  <li>
                    <a href="/faq" className="text-sm md:text-base text-gray-400 hover:text-white">
                      よくある質問
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-700 text-center">
              <p className="text-sm md:text-base text-gray-400">&copy; {new Date().getFullYear()} GPT Dojo. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;