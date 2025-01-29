import Layout from '@/components/layout/Layout';
import Link from 'next/link';

export default function Dashboard() {
  // ダミーデータ
  const currentCourses = [
    {
      id: 'chatgpt-basic',
      title: 'ChatGPT基礎講座',
      progress: 60,
      nextLesson: 'プロンプトの基本構造',
    },
    {
      id: 'business-application',
      title: 'ビジネス活用実践',
      progress: 30,
      nextLesson: 'マーケティングでの活用',
    },
  ];

  const recommendedCourses = [
    {
      id: 'prompt-engineering',
      title: 'プロンプトエンジニアリング',
      description: 'より高度な指示の出し方を学ぶ',
    },
    {
      id: 'creative-writing',
      title: 'クリエイティブライティング',
      description: 'AIを活用した文章作成テクニック',
    },
  ];

  const achievements = [
    {
      id: 1,
      title: '基礎コース修了',
      date: '2024/01/15',
      badge: '🎓',
    },
    {
      id: 2,
      title: '課題を10個達成',
      date: '2024/01/20',
      badge: '🏆',
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">マイダッシュボード</h1>
          <Link
            href="/courses"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            新しいコースを探す
          </Link>
        </div>

        {/* 学習進捗セクション */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">学習中のコース</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentCourses.map((course) => (
              <div key={course.id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>進捗状況</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  次のレッスン: {course.nextLesson}
                </p>
                <Link
                  href={`/courses/${course.id}`}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  続きから学習する →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* おすすめコースセクション */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">おすすめのコース</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedCourses.map((course) => (
              <div key={course.id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <Link
                  href={`/courses/${course.id}`}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  コースの詳細を見る →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 実績セクション */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">最近の実績</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="p-4 flex items-center">
                  <span className="text-2xl mr-4">{achievement.badge}</span>
                  <div>
                    <h3 className="font-semibold">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}