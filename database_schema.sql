-- ユーザーのシードデータ
INSERT INTO users (email, password_hash, display_name, role) VALUES
('admin@example.com', '$2a$10$K.0HwpsoPDGaB/atFBmmXOGTw4ceeg33ewhqzKF.5GTb.nZJxMhQe', '管理者', 'admin'),
('mentor@example.com', '$2a$10$K.0HwpsoPDGaB/atFBmmXOGTw4ceeg33ewhqzKF.5GTb.nZJxMhQe', 'メンター', 'mentor'),
('user@example.com', '$2a$10$K.0HwpsoPDGaB/atFBmmXOGTw4ceeg33ewhqzKF.5GTb.nZJxMhQe', '一般ユーザー', 'user');

-- カテゴリーのシードデータ
INSERT INTO course_categories (id, name, description) VALUES
('11111111-1111-1111-1111-111111111111', 'プログラミング基礎', 'プログラミングの基本的な概念を学ぶコース'),
('22222222-2222-2222-2222-222222222222', 'フロントエンド開発', 'Webフロントエンド開発に関するコース'),
('33333333-3333-3333-3333-333333333333', 'バックエンド開発', 'Webバックエンド開発に関するコース');

-- コースのシードデータ
INSERT INTO courses (id, category_id, title, subtitle, description, level, duration, is_published) VALUES
('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'JavaScript入門', 'プログラミングの第一歩', 'JavaScriptの基本から応用まで学びます', 'beginner', 300, true),
('55555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222', 'React基礎', 'モダンなUI開発', 'Reactの基本的な使い方を学びます', 'intermediate', 420, true),
('66666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333', 'Node.js入門', 'サーバーサイド開発', 'Node.jsを使ったサーバー開発の基礎を学びます', 'beginner', 360, true);

-- レッスンのシードデータ
INSERT INTO lessons (id, course_id, title, description, content, type, order_index, duration) VALUES
('77777777-7777-7777-7777-777777777777', '44444444-4444-4444-4444-444444444444', '変数と定数', '変数と定数の基本', '# 変数と定数\n\nJavaScriptにおける変数と定数の使い方を学びます。', 'lecture', 1, 30),
('88888888-8888-8888-8888-888888888888', '44444444-4444-4444-4444-444444444444', '関数', '関数の基本', '# 関数\n\n関数の定義と呼び出し方を学びます。', 'lecture', 2, 45),
('99999999-9999-9999-9999-999999999999', '44444444-4444-4444-4444-444444444444', '配列', '配列の操作', '# 配列\n\n配列の基本的な操作方法を学びます。', 'exercise', 3, 60);

-- スライドテーブルの更新
ALTER TABLE slides
ADD COLUMN type VARCHAR(50) NOT NULL DEFAULT 'content', -- title, content, code, image, etc
ADD COLUMN style JSONB DEFAULT '{}', -- background_color, theme, layout, etc
ADD COLUMN thumbnail_url VARCHAR(255),
ADD COLUMN transition VARCHAR(50) DEFAULT 'slide'; -- slide, fade, etc

-- 既存のスライドのtypeを'content'に設定
UPDATE slides SET type = 'content' WHERE type IS NULL;

-- コメント追加
COMMENT ON COLUMN slides.type IS 'スライドの種類（title: タイトル, content: 通常コンテンツ, code: コード, image: 画像等）';
COMMENT ON COLUMN slides.style IS 'スライドのスタイル設定（背景色、テーマ、レイアウト等）';
COMMENT ON COLUMN slides.thumbnail_url IS 'プレビュー用サムネイル画像のURL';
COMMENT ON COLUMN slides.transition IS 'スライド遷移のアニメーション';

-- スライドのシードデータ
INSERT INTO slides (lesson_id, title, content, code_example, preview_content, order_index, type, style, transition) VALUES
('77777777-7777-7777-7777-777777777777', '変数の宣言', '変数の宣言方法について学びます。', 'let message = "Hello";', '変数を使って値を格納する方法を説明します。', 1, 'content', '{"background_color": "#f5f5f5", "theme": "light"}', 'slide'),
('77777777-7777-7777-7777-777777777777', '定数の宣言', '定数の宣言方法について学びます。', 'const PI = 3.14;', '定数を使って変更不可能な値を定義する方法を説明します。', 2, 'code', '{"background_color": "#1e1e1e", "theme": "dark"}', 'fade'),
('88888888-8888-8888-8888-888888888888', '関数の定義', '関数の定義方法について学びます。', 'function greet(name) {\n  return `Hello, ${name}!`;\n}', '関数を定義して処理をまとめる方法を説明します。', 1, 'content', '{"background_color": "#ffffff", "theme": "light"}', 'slide');

-- 達成バッジのシードデータ
INSERT INTO achievement_badges (name, description, criteria) VALUES
('初心者プログラマー', '最初のコースを完了', '{"course_completed": 1}'),
('JavaScript マスター', 'JavaScript入門コースを完了', '{"specific_course_completed": "44444444-4444-4444-4444-444444444444"}'),
('勤勉な学習者', '10レッスンを完了', '{"lessons_completed": 10}');

-- コメントのシードデータ
INSERT INTO comments (user_id, lesson_id, content, is_question) VALUES
((SELECT id FROM users WHERE email = 'user@example.com'), '77777777-7777-7777-7777-777777777777', '変数のスコープについてもう少し詳しく説明していただけますか？', true),
((SELECT id FROM users WHERE email = 'mentor@example.com'), '77777777-7777-7777-7777-777777777777', 'グローバルスコープとローカルスコープの違いについて補足説明させていただきます。', false);