import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// コース関連の操作
export const courseRepository = {
  // コース一覧を取得（カテゴリー情報含む）
  async getAllCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        category:course_categories(*)
      `)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // コース詳細を取得（レッスンとスライド情報含む）
  async getCourseById(courseId: string) {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        category:course_categories(*),
        lessons(
          *,
          slides(*)
        )
      `)
      .eq('id', courseId)
      .single()
    
    if (error) throw error
    return data
  }
}

// レッスン関連の操作
export const lessonRepository = {
  // レッスン詳細を取得（スライド情報含む）
  async getLessonById(lessonId: string) {
    const { data, error } = await supabase
      .from('lessons')
      .select(`
        *,
        course:courses(*),
        slides(*)
      `)
      .eq('id', lessonId)
      .single()
    
    if (error) throw error
    return data
  },

  // コースに属するレッスン一覧を取得
  async getLessonsByCourseId(courseId: string) {
    const { data, error } = await supabase
      .from('lessons')
      .select(`
        *,
        slides(*)
      `)
      .eq('course_id', courseId)
      .order('order_index', { ascending: true })
    
    if (error) throw error
    return data
  }
}

// 進捗関連の操作
export const progressRepository = {
  // ユーザーの進捗状況を取得
  async getUserProgress(userId: string, courseId: string) {
    const { data, error } = await supabase
      .from('user_progress')
      .select(`
        *,
        lesson:lessons(*)
      `)
      .eq('user_id', userId)
      .eq('course_id', courseId)
    
    if (error) throw error
    return data
  },

  // 進捗を更新
  async updateProgress(
    userId: string,
    courseId: string,
    lessonId: string,
    progress: {
      status: string,
      progress_percentage: number
    }
  ) {
    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        course_id: courseId,
        lesson_id: lessonId,
        status: progress.status,
        progress_percentage: progress.progress_percentage,
        last_accessed_at: new Date().toISOString()
      })
    
    if (error) throw error
    return data
  }
}

// コメント関連の操作
export const commentRepository = {
  // レッスンのコメントを取得
  async getCommentsByLessonId(lessonId: string) {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        user:users!inner(*),
        replies:comments(*)
      `)
      .eq('lesson_id', lessonId)
      .is('parent_id', null)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // コメントを投稿
  async createComment(
    userId: string,
    lessonId: string,
    content: string,
    isQuestion: boolean = false,
    parentId: string | null = null
  ) {
    const { data, error } = await supabase
      .from('comments')
      .insert({
        user_id: userId,
        lesson_id: lessonId,
        parent_id: parentId,
        content,
        is_question: isQuestion
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}