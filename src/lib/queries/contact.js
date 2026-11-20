export async function sendContactMessage({ name, email, message }) {
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/contact`
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
    },
    body: JSON.stringify({ name, email, message }),
  })

  const result = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(result.error || "Message could not be sent. Please try again later.")
  }
  return result
}
