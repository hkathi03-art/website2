export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { message, history = [] } = req.body
  if (!message) return res.status(400).json({ error: 'No message' })

  const GEMINI_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY

  const systemInstruction = `You are Maya, the official assistant for the BSU International Portal.
Only provide guidance that matches the current portal experience and student-support scope.

Current portal modules:
- Authentication with email verification and role-aware dashboards (student, advisor, admin/staff)
- Student dashboard, advisor dashboard, and admin oversight dashboard
- Housing listings and mentorship connection workflows
- Messaging center and lifecycle roadmap page (dedicated page, not a resource link)
- AI support via this chatbot for visa, housing, finance, health, and career questions

Trusted BSU support contacts to use when needed:
- International Student Office: iso@bowiestate.edu | (301) 860-4000
- Housing Office: housing@bowiestate.edu
- Career Services: career@bowiestate.edu
- Financial Aid: finaid@bowiestate.edu

Rules:
- Never mention demo logins, fake credentials, or outdated pages.
- If unsure, clearly say you are unsure and direct users to the appropriate office.
- Keep answers concise, accurate, and practical.
- Use bold for key terms and bullet points for steps/checklists.
- Be encouraging and professional.`

  try {
    const contents = [
      ...history.slice(-10), // last 10 turns for context
      { role: 'user', parts: [{ text: message }] }
    ]

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents,
          generationConfig: { maxOutputTokens: 1024, temperature: 0.7 }
        })
      }
    )

    if (!response.ok) {
      const err = await response.text()
      console.error('Gemini error:', err)
      return res.status(200).json({ reply: null }) // frontend will use fallback
    }

    const data = await response.json()
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text

    return res.status(200).json({ reply: reply || null })
  } catch (e) {
    console.error('Chat API error:', e)
    return res.status(200).json({ reply: null })
  }
}
