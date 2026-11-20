function doPost(event) {
  try {
    const properties = PropertiesService.getScriptProperties()
    const payload = JSON.parse(event.postData.contents || "{}")
    const expectedToken = properties.getProperty("CONTACT_WEBHOOK_TOKEN")
    const recipient = properties.getProperty("CONTACT_TO_EMAIL")

    if (!expectedToken || payload.token !== expectedToken) {
      return jsonResponse({ ok: false, error: "Unauthorized." })
    }

    const name = typeof payload.name === "string" ? payload.name.trim() : ""
    const email = typeof payload.email === "string" ? payload.email.trim() : ""
    const message = typeof payload.message === "string" ? payload.message.trim() : ""

    if (!name || name.length > 120 || !email || email.length > 320 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message || message.length > 10000 ||
        !recipient) {
      return jsonResponse({ ok: false, error: "Invalid request or missing recipient configuration." })
    }

    MailApp.sendEmail({
      to: recipient,
      subject: "Waveline Motors contact message from " + name,
      body: "Name: " + name + "\nEmail: " + email + "\n\n" + message,
      replyTo: email,
      name: "Waveline Motors",
    })

    return jsonResponse({ ok: true })
  } catch (error) {
    console.error("Contact email failed:", error)
    return jsonResponse({ ok: false, error: "Message could not be sent." })
  }
}

function jsonResponse(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON)
}
