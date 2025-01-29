-- ユーザーテーブル
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(255),
    role VARCHAR(20) DEFAULT 'user', -- user, admin, mentor
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- コースカテゴリーテーブル
CREATE TABLE course_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- コーステーブル
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES course_categories(id),
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT,
    level VARCHAR(20) NOT NULL, -- beginner, intermediate, advanced
    duration INTEGER NOT NULL, -- 分単位
    thumbnail_url VARCHAR(255),
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- レッスンテーブル
CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT, -- レッスンの内容（Markdown形式）
    type VARCHAR(20) NOT NULL, -- lecture, exercise
    order_index INTEGER NOT NULL, -- レッスンの順序
    duration INTEGER NOT NULL, -- 分単位
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- スライドテーブル
CREATE TABLE slides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID REFERENCES lessons(id),
    title VARCHAR(255) NOT NULL,
    content TEXT,
    code_example TEXT,
    preview_content TEXT,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ユーザーの進捗テーブル
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    course_id UUID REFERENCES courses(id),
    lesson_id UUID REFERENCES lessons(id),
    status VARCHAR(20) NOT NULL, -- not_started, in_progress, completed
    progress_percentage INTEGER DEFAULT 0,
    last_accessed_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, course_id, lesson_id)
);

-- 学習履歴テーブル
CREATE TABLE learning_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    course_id UUID REFERENCES courses(id),
    lesson_id UUID REFERENCES lessons(id),
    action_type VARCHAR(50) NOT NULL, -- started_lesson, completed_lesson, submitted_exercise
    details JSONB, -- アクションの詳細情報
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 演習の提出テーブル
CREATE TABLE exercise_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    lesson_id UUID REFERENCES lessons(id),
    content TEXT NOT NULL, -- 提出されたコードや回答
    status VARCHAR(20) NOT NULL, -- pending, approved, needs_revision
    feedback TEXT, -- メンターからのフィードバック
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 達成バッジテーブル
CREATE TABLE achievement_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    criteria JSONB, -- 獲得条件
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ユーザーの獲得バッジテーブル
CREATE TABLE user_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    badge_id UUID REFERENCES achievement_badges(id),
    acquired_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, badge_id)
);

-- コメント・質問テーブル
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    lesson_id UUID REFERENCES lessons(id),
    parent_id UUID REFERENCES comments(id), -- 返信の場合
    content TEXT NOT NULL,
    is_question BOOLEAN DEFAULT false,
    is_resolved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- インデックス
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_course_id ON user_progress(course_id);
CREATE INDEX idx_learning_history_user_id ON learning_history(user_id);
CREATE INDEX idx_learning_history_course_id ON learning_history(course_id);
CREATE INDEX idx_comments_lesson_id ON comments(lesson_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);