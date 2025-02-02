import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export const courseRepository = {
  async getAllCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async getCourseById(courseId: string) {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single()

    if (error) throw error
    return data
  },

  async getEnrolledCourses() {
    // TODO: ユーザーIDに基づいて登録済みのコースを取得する
    // 現時点では全てのコースを返す
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async getFeaturedCourses() {
    // TODO: おすすめのコースを取得する
    // 現時点では全てのコースを返す
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3)

    if (error) throw error
    return data
  }
}

export const lessonRepository = {
  async getLessonsByCourseId(courseId: string) {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('course_id', courseId)
      .order('order_index', { ascending: true })

    if (error) throw error
    return data
  },

  async getLessonById(lessonId: string) {
    const { data, error } = await supabase
      .from('lessons')
      .select(`
        *,
        course:courses(*)
      `)
      .eq('id', lessonId)
      .single()

    if (error) throw error
    return data
  },

  async getNextLesson(currentLessonId: string) {
    // 現在のレッスンを取得して、そのコースIDとorder_indexを取得
    const { data: currentLesson, error: currentError } = await supabase
      .from('lessons')
      .select('*')
      .eq('id', currentLessonId)
      .single()

    if (currentError) throw currentError
    if (!currentLesson) throw new Error('Lesson not found')

    // 同じコース内で、現在のorder_indexより大きい最初のレッスンを取得
    const { data: nextLesson, error: nextError } = await supabase
      .from('lessons')
      .select('*')
      .eq('course_id', currentLesson.course_id)
      .gt('order_index', currentLesson.order_index)
      .order('order_index', { ascending: true })
      .limit(1)
      .single()

    if (nextError && nextError.code !== 'PGRST116') throw nextError // PGRST116 は "結果が見つからない" エラー
    return nextLesson || null
  }
}