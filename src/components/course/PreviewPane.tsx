'use client';

interface PreviewPaneProps {
  content: string;
}

export default function PreviewPane({ content }: PreviewPaneProps) {
  return (
    <div className="bg-white rounded-lg p-3 md:p-4 shadow-lg">
      <div className="flex items-center mb-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="ml-2 text-xs md:text-sm text-gray-500">プレビュー</span>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="preview-content text-sm md:text-base"
      />
    </div>
  );
}