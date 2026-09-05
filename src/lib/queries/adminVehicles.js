import { supabase } from "../supabaseClient"

export async function getAllVehiclesAdmin() {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*, manufacturers(name, slug)")
    .order("created_at", { ascending: false })
  if (error) throw error
  return data
}

export async function getVehicleById(id) {
  const { data, error } = await supabase.from("vehicles").select("*").eq("id", id).single()
  if (error) throw error
  return data
}

export async function createVehicle(vehicle) {
  const { data, error } = await supabase.from("vehicles").insert(vehicle).select().single()
  if (error) throw error
  return data
}

export async function updateVehicle(id, updates) {
  const { data, error } = await supabase.from("vehicles").update(updates).eq("id", id).select().single()
  if (error) throw error
  return data
}

export async function deleteVehicle(id) {
  const { error } = await supabase.from("vehicles").delete().eq("id", id)
  if (error) throw error
}
export async function renameEvolutionGroup(oldGroup, newGroup) {
  const { error } = await supabase
    .from("vehicles")
    .update({ evolution_group: newGroup })
    .eq("evolution_group", oldGroup)

  if (error) throw error
}

export async function getVehiclesByEvolutionGroupAdmin(group) {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*, manufacturers(name, slug)")
    .eq("evolution_group", group)
    .order("year_range")

  if (error) throw error
  return data
}