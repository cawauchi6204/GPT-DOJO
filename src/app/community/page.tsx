import Layout from '@/components/layout/Layout';
import Link from 'next/link';

export default function Community() {
  // ダミーデータ
  const discussions = [
    {
      id: 1,
      title: 'ChatGPTを使った効率的な文章作成のコツ',
      author: '山田太郎',
      replies: 15,
      views: 234,
      category: 'テクニック共有',
      lastActivity: '1時間前',
    },
    {
      id: 2,
      title: 'プロンプトエンジニアリングの基本的な考え方について',
      author: '鈴木花子',
      replies: 23,
      views: 456,
      category: '質問・相談',
      lastActivity: '3時間前',
    },
    {
      id: 3,
      title: '【成功事例】AIを活用した業務効率化の実践例',
      author: '佐藤次郎',
      replies: 45,
      views: 789,
      category: '事例共有',
      lastActivity: '1日前',
    },
  ];

  const mentors = [
    {
      id: 1,
      name: '田中博士',
      role: 'AIスペシャリスト',
      expertise: ['プロンプトエンジニアリング', 'ビジネス活用'],
      rating: 4.9,
      reviews: 128,
    },
    {
      id: 2,
      name: '伊藤めぐみ',
      role: 'クリエイティブディレクター',
      expertise: ['コンテンツ制作', 'マーケティング'],
      rating: 4.8,
      reviews: 95,
    },
  ];

  const categories = [
    '質問・相談',
    'テクニック共有',
    '事例共有',
    'キャリア相談',
    'イベント情報',
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">コミュニティ</h1>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            新しい投稿を作成
          </button>
        </div>

        {/* メインコンテンツ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ディスカッション一覧 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">最近のディスカッション</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {discussions.map((discussion) => (
                  <div key={discussion.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link
                          href={`/community/discussion/${discussion.id}`}
                          className="text-lg font-semibold text-indigo-600 hover:text-indigo-800"
                        >
                          {discussion.title}
                        </Link>
                        <div className="mt-1 text-sm text-gray-600">
                          <span>投稿者: {discussion.author}</span>
                          <span className="mx-2">•</span>
                          <span>{discussion.lastActivity}</span>
                        </div>
                      </div>
                      <span className="px-2 py-1 text-sm bg-indigo-100 text-indigo-800 rounded">
                        {discussion.category}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      <span className="mr-4">💬 {discussion.replies} 件の返信</span>
                      <span>👀 {discussion.views} views</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* サイドバー */}
          <div className="space-y-6">
            {/* カテゴリー */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">カテゴリー</h2>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* メンター紹介 */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">おすすめメンター</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {mentors.map((mentor) => (
                  <div key={mentor.id} className="p-4">
                    <div className="flex items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold">{mentor.name}</h3>
                        <p className="text-sm text-gray-600">{mentor.role}</p>
                        <div className="mt-1 text-sm">
                          <span className="text-yellow-500">★</span>
                          <span className="ml-1">{mentor.rating}</span>
                          <span className="ml-2 text-gray-500">
                            ({mentor.reviews} レビュー)
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {mentor.expertise.map((exp) => (
                            <span
                              key={exp}
                              className="px-2 py-1 text-xs bg-gray-100 rounded"
                            >
                              {exp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}