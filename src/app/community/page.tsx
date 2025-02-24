"use client";

import Layout from "@/components/layout/Layout";

export default function Community() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">コミュニティ</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* ディスカッション */}
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">ディスカッション</h2>
            <div className="space-y-4">
              <div className="p-3 md:p-4 bg-gray-50 rounded-lg">
                <div className="text-sm md:text-base text-gray-600 mb-2">
                  近日公開予定のディスカッション機能で、他の学習者と意見交換ができるようになります。
                </div>
                <div className="text-xs md:text-sm text-gray-500">
                  お楽しみに!
                </div>
              </div>
            </div>
          </div>

          {/* 質問と回答 */}
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">質問と回答</h2>
            <div className="space-y-4">
              <div className="p-3 md:p-4 bg-gray-50 rounded-lg">
                <div className="text-sm md:text-base text-gray-600 mb-2">
                  近日公開予定のQ&A機能で、分からないことを質問したり、他の人の質問に回答したりできるようになります。
                </div>
                <div className="text-xs md:text-sm text-gray-500">
                  お楽しみに!
                </div>
              </div>
            </div>
          </div>

          {/* イベント */}
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">イベント</h2>
            <div className="space-y-4">
              <div className="p-3 md:p-4 bg-gray-50 rounded-lg">
                <div className="text-sm md:text-base text-gray-600 mb-2">
                  近日公開予定のイベント機能で、オンラインミートアップやワークショップに参加できるようになります。
                </div>
                <div className="text-xs md:text-sm text-gray-500">
                  お楽しみに!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}