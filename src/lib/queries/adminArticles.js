import { supabase } from "../supabaseClient"

export async function getAllArticlesAdmin() {
  const { data, error } = await supabase.from("articles").select("*").order("created_at", { ascending: false })
  if (error) throw error
  return data
}

export async function getArticleById(id) {
  const { data, error } = await supabase.from("articles").select("*").eq("id", id).single()
  if (error) throw error
  return data
}

export async function createArticle(article) {
  const { data, error } = await supabase.from("articles").insert(article).select().single()
  if (error) throw error
  return data
}

export async function updateArticle(id, updates) {
  const { data, error } = await supabase.from("articles").update(updates).eq("id", id).select().single()
  if (error) throw error
  return data
}

export async function deleteArticle(id) {
  const { error } = await supabase.from("articles").delete().eq("id", id)
  if (error) throw error
}