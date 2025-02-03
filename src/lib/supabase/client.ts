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
    return data || []
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
    return data || []
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
    return data || []
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
    return data || []
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
    try {
      // 現在のレッスンを取得
      const { data: currentLesson, error: currentError } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', currentLessonId)
        .single()

      if (currentError || !currentLesson) {
        console.error('Error getting current lesson:', currentError)
        return null
      }

      // 次のレッスンを取得
      const { data: nextLessons, error: nextError } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', currentLesson.course_id || '')
        .gt('order_index', currentLesson.order_index)
        .order('order_index')
        .limit(1)

      if (nextError) {
        console.error('Error getting next lesson:', nextError)
        return null
      }

      return nextLessons?.[0] || null

    } catch (error) {
      console.error('Error in getNextLesson:', error)
      return null
    }
  }
}