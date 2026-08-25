import { supabase } from "../supabaseClient"

export async function getManufacturers() {
  const { data, error } = await supabase
    .from("manufacturers")
    .select("*")
    .order("name")

  if (error) throw error
  return data
}

export async function getManufacturerBySlug(slug) {
  const { data, error } = await supabase
    .from("manufacturers")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) throw error
  return data
}