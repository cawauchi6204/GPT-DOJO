export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          password_hash: string
          display_name: string
          avatar_url: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          display_name: string
          avatar_url?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          display_name?: string
          avatar_url?: string | null
          role?: string
          updated_at?: string
        }
      }
      course_categories: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
        }
      }
      courses: {
        Row: {
          id: string
          category_id: string
          title: string
          subtitle: string | null
          description: string | null
          level: string
          duration: number
          thumbnail_url: string | null
          is_published: boolean
          created_at: string
          updated_at: string
          category?: Database['public']['Tables']['course_categories']['Row']
          lessons?: (Database['public']['Tables']['lessons']['Row'] & {
            slides: Database['public']['Tables']['slides']['Row'][]
          })[]
        }
        Insert: {
          id?: string
          category_id: string
          title: string
          subtitle?: string | null
          description?: string | null
          level: string
          duration: number
          thumbnail_url?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          title?: string
          subtitle?: string | null
          description?: string | null
          level?: string
          duration?: number
          thumbnail_url?: string | null
          is_published?: boolean
          updated_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string | null
          content: string | null
          type: string
          order_index: number
          duration: number
          created_at: string
          updated_at: string
          course?: Database['public']['Tables']['courses']['Row']
          slides?: Database['public']['Tables']['slides']['Row'][]
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          description?: string | null
          content?: string | null
          type: string
          order_index: number
          duration: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          description?: string | null
          content?: string | null
          type?: string
          order_index?: number
          duration?: number
          updated_at?: string
        }
      }
      slides: {
        Row: {
          id: string
          lesson_id: string
          title: string
          content: string | null
          code_example: string | null
          preview_content: string | null
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          lesson_id: string
          title: string
          content?: string | null
          code_example?: string | null
          preview_content?: string | null
          order_index: number
          created_at?: string
        }
        Update: {
          id?: string
          lesson_id?: string
          title?: string
          content?: string | null
          code_example?: string | null
          preview_content?: string | null
          order_index?: number
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          course_id: string
          lesson_id: string
          status: string
          progress_percentage: number
          last_accessed_at: string | null
          completed_at: string | null
          created_at: string
          updated_at: string
          lesson?: Database['public']['Tables']['lessons']['Row']
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          lesson_id: string
          status: string
          progress_percentage?: number
          last_accessed_at?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          lesson_id?: string
          status?: string
          progress_percentage?: number
          last_accessed_at?: string | null
          completed_at?: string | null
          updated_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          parent_id: string | null
          content: string
          is_question: boolean
          is_resolved: boolean
          created_at: string
          updated_at: string
          user?: Database['public']['Tables']['users']['Row']
          replies?: Database['public']['Tables']['comments']['Row'][]
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          parent_id?: string | null
          content: string
          is_question?: boolean
          is_resolved?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          parent_id?: string | null
          content?: string
          is_question?: boolean
          is_resolved?: boolean
          updated_at?: string
        }
      }
    }
  }
}