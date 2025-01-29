import Layout from '@/components/layout/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI時代のスキルを最速で学ぼう！
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              ChatGPTを使いこなして、仕事と生活を変える
            </p>
            <Link
              href="/signup"
              className="bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              無料で始める
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            GPT Dojoの特徴
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">
                分かりやすいカリキュラム
              </h3>
              <p className="text-gray-600">
                初心者から上級者まで、段階的に学べる充実したコンテンツを提供します。
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">
                実践的な演習
              </h3>
              <p className="text-gray-600">
                実際のビジネスシーンを想定した課題で、実践的なスキルが身につきます。
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">
                充実したサポート
              </h3>
              <p className="text-gray-600">
                コミュニティやメンターによるサポートで、確実に成長をサポートします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Preview Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            人気のコース
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  ChatGPT基礎講座
                </h3>
                <p className="text-gray-600 mb-4">
                  ChatGPTの基本的な使い方から効果的なプロンプトの作成方法まで学びます。
                </p>
                <Link
                  href="/courses/chatgpt-basic"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  コースの詳細を見る →
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  ビジネス活用実践
                </h3>
                <p className="text-gray-600 mb-4">
                  業務効率化やマーケティングなど、ビジネスでの実践的な活用方法を学びます。
                </p>
                <Link
                  href="/courses/business-application"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  コースの詳細を見る →
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  プロンプトエンジニアリング
                </h3>
                <p className="text-gray-600 mb-4">
                  より高度な指示の出し方や、複雑なタスクの実現方法を学びます。
                </p>
                <Link
                  href="/courses/prompt-engineering"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  コースの詳細を見る →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            受講者の声
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600 mb-4">
                「初めてAIを学ぶ人でも分かりやすく、実践的なスキルが身につきました。仕事での活用方法が具体的に理解できて良かったです。」
              </p>
              <p className="font-semibold">田中さん（会社員）</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600 mb-4">
                「コミュニティでの情報共有が活発で、他の受講生の活用事例からも多くの学びがありました。メンターのサポートも親切で助かりました。」
              </p>
              <p className="font-semibold">鈴木さん（フリーランス）</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">
            今すぐ学習を始めましょう！
          </h2>
          <Link
            href="/signup"
            className="bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            無料で始める
          </Link>
        </div>
      </section>
    </Layout>
  );
}
