import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
)

function jsonResponse(body: Record<string, string>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  })
}

async function checkRateLimit(identifier: string) {
  const windowStart = new Date(Date.now() - 60 * 60 * 1000).toISOString()
  const { count, error: readError } = await supabaseAdmin
    .from("rate_limits")
    .select("*", { count: "exact", head: true })
    .eq("identifier", identifier)
    .eq("endpoint", "contact")
    .gte("created_at", windowStart)

  if (readError) return "unavailable"
  if (count !== null && count >= 5) return "limited"

  const { error: insertError } = await supabaseAdmin
    .from("rate_limits")
    .insert({ identifier, endpoint: "contact" })
  return insertError ? "unavailable" : "allowed"
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders })
  }
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed." }, 405)

  try {
    const body = await request.json()
    const name = typeof body.name === "string" ? body.name.trim() : ""
    const email = typeof body.email === "string" ? body.email.trim() : ""
    const message = typeof body.message === "string" ? body.message.trim() : ""

    if (!name || name.length > 120 || !email || email.length > 320 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message || message.length > 10000) {
      return jsonResponse({ error: "Please provide a valid name, email, and message." }, 400)
    }

    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
    const rateLimit = await checkRateLimit(clientIp)
    if (rateLimit === "limited") return jsonResponse({ error: "Too many messages. Please try again later." }, 429)
    if (rateLimit === "unavailable") return jsonResponse({ error: "Message service is temporarily unavailable." }, 503)

    const scriptUrl = Deno.env.get("GOOGLE_SCRIPT_URL")
    const webhookToken = Deno.env.get("GOOGLE_SCRIPT_TOKEN")
    if (!scriptUrl || !webhookToken) {
      console.error("Google Apps Script contact configuration is incomplete.")
      return jsonResponse({ error: "Message service is not configured yet." }, 503)
    }

    const scriptResponse = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: webhookToken,
        name,
        email,
        message,
      }),
    })

    const scriptResult = await scriptResponse.json().catch(() => ({}))
    if (!scriptResponse.ok || !scriptResult.ok) {
      console.error("Google Apps Script rejected contact email with status", scriptResponse.status)
      return jsonResponse({ error: "Message could not be sent. Please try again later." }, 502)
    }

    return jsonResponse({ message: "Message sent." })
  } catch (error) {
    console.error("Contact function failed:", error instanceof Error ? error.message : "Unknown error")
    return jsonResponse({ error: "Message could not be sent. Please try again later." }, 500)
  }
})
