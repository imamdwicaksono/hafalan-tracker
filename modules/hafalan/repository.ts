import { supabase } from "@/lib/supabase/client"

export const HafalanRepo = {
  async create(data: any) {
    return supabase.from("hafalan_entries").insert([data])
  },

  async list(user_id: string) {
    return supabase
      .from("hafalan_entries")
      .select("*")
      .eq("user_id", user_id)
      .order("tanggal", { ascending: false })
  }
}