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
      courses: {
        Row: {
          id: string
          title: string
          description: string | null
          thumbnail_url: string | null
          category_id: string | null
          level: string
          duration: number
          is_published: boolean | null
          created_at: string | null
          updated_at: string | null
          subtitle: string | null
          price: number
          lesson_count: number
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          thumbnail_url?: string | null
          category_id?: string | null
          level: string
          duration: number
          is_published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          subtitle?: string | null
          price: number
          lesson_count: number
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          thumbnail_url?: string | null
          category_id?: string | null
          level?: string
          duration?: number
          is_published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          subtitle?: string | null
          price?: number
          lesson_count?: number
        }
      }
      lessons: {
        Row: {
          id: string
          title: string
          description: string | null
          content: string | null
          course_id: string
          order_index: number
          is_published: boolean | null
          created_at: string | null
          updated_at: string | null
          code_example: string | null
          preview_content: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          content?: string | null
          course_id: string
          order_index: number
          is_published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          code_example?: string | null
          preview_content?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          content?: string | null
          course_id?: string
          order_index?: number
          is_published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          code_example?: string | null
          preview_content?: string | null
        }
      }
      slides: {
        Row: {
          id: string
          title: string
          content: string | null
          lesson_id: string
          order_index: number
          created_at: string | null
          updated_at: string | null
          code_example: string | null
          preview_content: string | null
          type: string | null
          style: Json | null
          transition: string | null
          thumbnail_url: string | null
        }
        Insert: {
          id?: string
          title: string
          content?: string | null
          lesson_id: string
          order_index: number
          created_at?: string | null
          updated_at?: string | null
          code_example?: string | null
          preview_content?: string | null
          type?: string | null
          style?: Json | null
          transition?: string | null
          thumbnail_url?: string | null
        }
        Update: {
          id?: string
          title?: string
          content?: string | null
          lesson_id?: string
          order_index?: number
          created_at?: string | null
          updated_at?: string | null
          code_example?: string | null
          preview_content?: string | null
          type?: string | null
          style?: Json | null
          transition?: string | null
          thumbnail_url?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
