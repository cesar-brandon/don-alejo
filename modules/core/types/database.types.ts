export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      menu_day: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: string
          state: boolean | null
          updated_at: string | null
          user_del: string | null
          user_reg: string | null
          user_upd: string | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          state?: boolean | null
          updated_at?: string | null
          user_del?: string | null
          user_reg?: string | null
          user_upd?: string | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          state?: boolean | null
          updated_at?: string | null
          user_del?: string | null
          user_reg?: string | null
          user_upd?: string | null
        }
        Relationships: []
      }
      menu_day_product: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: string
          menu_day_id: string | null
          price: number | null
          product_id: string | null
          state: boolean | null
          stock: number | null
          update_at: string | null
          user_del: string | null
          user_reg: string | null
          user_upd: string | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          menu_day_id?: string | null
          price?: number | null
          product_id?: string | null
          state?: boolean | null
          stock?: number | null
          update_at?: string | null
          user_del?: string | null
          user_reg?: string | null
          user_upd?: string | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          menu_day_id?: string | null
          price?: number | null
          product_id?: string | null
          state?: boolean | null
          stock?: number | null
          update_at?: string | null
          user_del?: string | null
          user_reg?: string | null
          user_upd?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menu_day_products_menu_day_id_fkey"
            columns: ["menu_day_id"]
            isOneToOne: false
            referencedRelation: "menu_day"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menu_day_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      order: {
        Row: {
          created_at: string
          customer_name: string | null
          deleted_at: string | null
          id: string
          order_number: string | null
          order_type: number | null
          payment_type: number | null
          state: boolean | null
          status: number | null
          table_number: number | null
          total: number | null
          updated_at: string | null
          user_del: string | null
          user_reg: string | null
          user_upd: string | null
        }
        Insert: {
          created_at?: string
          customer_name?: string | null
          deleted_at?: string | null
          id?: string
          order_number?: string | null
          order_type?: number | null
          payment_type?: number | null
          state?: boolean | null
          status?: number | null
          table_number?: number | null
          total?: number | null
          updated_at?: string | null
          user_del?: string | null
          user_reg?: string | null
          user_upd?: string | null
        }
        Update: {
          created_at?: string
          customer_name?: string | null
          deleted_at?: string | null
          id?: string
          order_number?: string | null
          order_type?: number | null
          payment_type?: number | null
          state?: boolean | null
          status?: number | null
          table_number?: number | null
          total?: number | null
          updated_at?: string | null
          user_del?: string | null
          user_reg?: string | null
          user_upd?: string | null
        }
        Relationships: []
      }
      order_item: {
        Row: {
          created_at: string
          deleted_at: string | null
          description: string | null
          id: string
          observations: string | null
          order_id: string | null
          price: number | null
          product_id: string | null
          quantity: number | null
          state: boolean | null
          subtotal: number | null
          updated_at: string | null
          user_del: string | null
          user_reg: string | null
          user_upd: string | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          observations?: string | null
          order_id?: string | null
          price?: number | null
          product_id?: string | null
          quantity?: number | null
          state?: boolean | null
          subtotal?: number | null
          updated_at?: string | null
          user_del?: string | null
          user_reg?: string | null
          user_upd?: string | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          observations?: string | null
          order_id?: string | null
          price?: number | null
          product_id?: string | null
          quantity?: number | null
          state?: boolean | null
          subtotal?: number | null
          updated_at?: string | null
          user_del?: string | null
          user_reg?: string | null
          user_upd?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_item_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "order"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_item_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      product: {
        Row: {
          created_at: string
          deleted_at: string | null
          description: string | null
          id: string
          id_product_group: string | null
          name: string
          price: number
          state: boolean | null
          updated_at: string | null
          user_del: string | null
          user_reg: string | null
          user_upd: string | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          id_product_group?: string | null
          name: string
          price: number
          state?: boolean | null
          updated_at?: string | null
          user_del?: string | null
          user_reg?: string | null
          user_upd?: string | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          id_product_group?: string | null
          name?: string
          price?: number
          state?: boolean | null
          updated_at?: string | null
          user_del?: string | null
          user_reg?: string | null
          user_upd?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_id_product_group_fkey"
            columns: ["id_product_group"]
            isOneToOne: false
            referencedRelation: "product_group"
            referencedColumns: ["id"]
          },
        ]
      }
      product_group: {
        Row: {
          created_at: string
          deleted_at: string | null
          description: string | null
          id: string
          name: string | null
          state: boolean | null
          updated_at: string | null
          user_del: string | null
          user_reg: string | null
          user_upd: string | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          name?: string | null
          state?: boolean | null
          updated_at?: string | null
          user_del?: string | null
          user_reg?: string | null
          user_upd?: string | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          name?: string | null
          state?: boolean | null
          updated_at?: string | null
          user_del?: string | null
          user_reg?: string | null
          user_upd?: string | null
        }
        Relationships: []
      }
      profile: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          role: string
          state: boolean | null
          updated_at: string | null
          user_del: string | null
          user_reg: string | null
          user_upd: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          role?: string
          state?: boolean | null
          updated_at?: string | null
          user_del?: string | null
          user_reg?: string | null
          user_upd?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: string
          state?: boolean | null
          updated_at?: string | null
          user_del?: string | null
          user_reg?: string | null
          user_upd?: string | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
