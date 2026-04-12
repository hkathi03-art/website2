const LIFECYCLE_REFERENCE = [
  '1) Apply to a SEVP-Certified School',
  '2) Receive Your Form I-20',
  '3) Pay the I-901 SEVIS Fee',
  '4) Apply for Your Student Visa',
  '5) Arrive in the United States',
  '6) Maintain Your Student Status',
  '7) Explore Post-Graduation Options',
  '8) Depart or Continue Your Journey',
].join('\n')

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { message, history = [] } = req.body
  if (!message) return res.status(400).json({ error: 'No message' })

  const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY

  const systemInstruction = `You are Maya, the official assistant for the BSU International Portal.
Only provide guidance that matches the current portal experience and student-support scope.

Current portal modules:
- Authentication with email verification and role-aware dashboards (student, admin/staff)
- Student dashboard and admin oversight dashboard
- Housing listings and mentorship connection workflows
- Messaging center and lifecycle roadmap page (dedicated page, not a resource link)
- AI support via this chatbot for visa, housing, finance, health, and career questions

Lifecycle page stages (must match exactly when users ask):
${LIFECYCLE_REFERENCE}

Trusted BSU support contacts to use when needed:
- International Student Office: iso@bowiestate.edu | (301) 860-4000
- Housing Office: housing@bowiestate.edu
- Career Services: career@bowiestate.edu
- Financial Aid: finaid@bowiestate.edu

Rules:
- Never mention advisor dashboards, advisor roles, demo logins, fake credentials, or outdated pages.
- If the user asks about a process step-by-step, provide numbered steps.
- If uncertain, say what you are unsure about and direct the user to the correct office.
- Keep responses practical and concise.
- Use bold for key terms and bullet points for checklists.
- Be encouraging and professional.`

  try {
    if (!OPENROUTER_KEY) {
      console.error('Missing OPENROUTER_API_KEY')
      return res.status(200).json({ reply: null })
    }

    const priorMessages = history
      .slice(-10)
      .map((item) => ({
        role: item.role === 'model' ? 'assistant' : 'user',
        content: item.parts?.[0]?.text || '',
      }))
      .filter((item) => item.content.trim().length > 0)

    const messages = [
      { role: 'system', content: systemInstruction },
      ...priorMessages,
      { role: 'user', content: message },
    ]

    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${OPENROUTER_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://bowiestate.edu',
          'X-Title': 'BSU International Student Portal',
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o-mini',
          messages,
          temperature: 0.35,
          max_tokens: 900,
        }),
      },
    )

    if (!response.ok) {
      const err = await response.text()
      console.error('OpenRouter error:', err)
      return res.status(200).json({ reply: null })
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content

    return res.status(200).json({ reply: reply || null })
  } catch (e) {
    console.error('Chat API error:', e)
    return res.status(200).json({ reply: null })
  }
}
