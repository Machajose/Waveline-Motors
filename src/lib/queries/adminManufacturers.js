import { supabase } from "../supabaseClient"

export async function getAllManufacturersAdmin() {
  const { data, error } = await supabase.from("manufacturers").select("*").order("name")
  if (error) throw error
  return data
}

export async function getManufacturerById(id) {
  const { data, error } = await supabase.from("manufacturers").select("*").eq("id", id).single()
  if (error) throw error
  return data
}

export async function createManufacturer(manufacturer) {
  const { data, error } = await supabase.from("manufacturers").insert(manufacturer).select().single()
  if (error) throw error
  return data
}

export async function updateManufacturer(id, updates) {
  const { data, error } = await supabase.from("manufacturers").update(updates).eq("id", id).select().single()
  if (error) throw error
  return data
}

export async function deleteManufacturer(id) {
  const { error } = await supabase.from("manufacturers").delete().eq("id", id)
  if (error) throw error
}