import { supabase } from "../supabaseClient"

export async function getVehiclesByManufacturerSlug(manufacturerSlug) {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*, manufacturers!inner(slug)")
    .eq("manufacturers.slug", manufacturerSlug)
    .eq("is_published", true)
    .order("created_at")

  if (error) throw error
  return data
}

export async function getAllVehicles() {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*, manufacturers(name, slug)")
    .eq("is_published", true)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function getVehicleBySlug(slug) {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*, manufacturers(name, slug)")
    .eq("slug", slug)
    .single()

  if (error) throw error
  return data
}

export async function getFeaturedVehicles() {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*, manufacturers(name, slug)")
    .eq("is_published", true)
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(4)

  if (error) throw error
  return data
}

export async function getCarOfTheDay() {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*, manufacturers(name, slug)")
    .eq("is_published", true)
    .eq("is_car_of_the_day", true)
    .limit(1)
    .maybeSingle()

  if (error) throw error
  return data
}
export async function getVehiclesForSale() {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*, manufacturers(name, slug)")
    .eq("is_published", true)
    .eq("is_for_sale", true)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}