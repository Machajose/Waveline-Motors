import imageCompression from "browser-image-compression"
import { supabase } from "./supabaseClient"

/**
 * Compresses an image file client-side, then uploads it to Supabase Storage.
 * Returns the public URL to store in the database.
 */
export async function compressAndUploadImage(file, folder = "vehicles") {
  const compressed = await imageCompression(file, {
    maxWidthOrHeight: 1600,
    initialQuality: 0.8,
    maxSizeMB: 0.6,
    useWebWorker: true,
    fileType: "image/jpeg",
  })

  const fileExt = "jpg"
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from("vehicle-images")
    .upload(fileName, compressed, {
      contentType: "image/jpeg",
      cacheControl: "3600",
    })

  if (uploadError) throw uploadError

  const { data } = supabase.storage.from("vehicle-images").getPublicUrl(fileName)
  return data.publicUrl
}