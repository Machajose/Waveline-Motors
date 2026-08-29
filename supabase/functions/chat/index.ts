import "jsr:@supabase/functions-js/edge-runtime.d.ts"

const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY")

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { messages } = await req.json()

    const systemPrompt = {
  role: "system",
  content:
    "You are the Waveline Motors Assistant, a helpful automotive guide for a Kenya-based automotive media and marketplace platform. Help visitors discover vehicles, understand brands, and navigate the site (Vehicle Explorer, Evolution timelines, Brands, For Sale listings, News). Keep answers concise and friendly, written in short plain sentences or simple line-by-line lists. Do not use Markdown formatting of any kind — no asterisks, no bold, no headers, no numbered lists with periods, no hashtags. Write as plain conversational text only, since your replies are shown in a small chat bubble that cannot render formatting. If asked about specific inventory or prices you don't know, suggest they check the Vehicles For Sale section or contact a dealer directly.",
}
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [systemPrompt, ...messages],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    const data = await response.json()

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}