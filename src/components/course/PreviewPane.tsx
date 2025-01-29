'use client';

interface PreviewPaneProps {
  htmlContent: string;
}

export default function PreviewPane({ htmlContent }: PreviewPaneProps) {
  return (
    <div className="bg-white rounded-lg p-4 mb-4">
      <h3 className="text-gray-700 font-semibold mb-2">プレビュー</h3>
      <div
        className="preview-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}