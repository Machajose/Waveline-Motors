export async function sendChatMessage(messages) {
  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ messages }),
    }
  )
  const data = await response.json()
  if (data.error) throw new Error(data.error)
  return data.choices[0].message.content
}