import { supabase } from "../supabaseClient"

export async function getLatestArticles(limit = 3) {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

export async function getAllPublishedArticles() {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}