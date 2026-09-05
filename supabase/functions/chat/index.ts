import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js@2"

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
)

async function checkRateLimit(identifier: string, endpoint: string, maxRequests: number, windowMinutes: number) {
  const windowStart = new Date(Date.now() - windowMinutes * 60 * 1000).toISOString()

  const { count } = await supabaseAdmin
    .from("rate_limits")
    .select("*", { count: "exact", head: true })
    .eq("identifier", identifier)
    .eq("endpoint", endpoint)
    .gte("created_at", windowStart)

  if (count !== null && count >= maxRequests) {
    return false
  }

  await supabaseAdmin.from("rate_limits").insert({ identifier, endpoint })
  return true
}

const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY")

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders })
  }

  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown"
const allowed = await checkRateLimit(clientIp, "chat", 10, 1) // 10 requests per minute per IP

if (!allowed) {
  return new Response(JSON.stringify({ error: "Too many requests. Please wait a moment and try again." }), {
    status: 429,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  })
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