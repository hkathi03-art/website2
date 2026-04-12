import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'

const FALLBACKS = [
  { keys:['lifecycle','life cycle','journey stages','stages'], ans:`**International Student Life Cycle (8 stages):**
1. Apply to a SEVP-Certified School
2. Receive Your Form I-20
3. Pay the I-901 SEVIS Fee
4. Apply for Your Student Visa
5. Arrive in the United States
6. Maintain Your Student Status
7. Explore Post-Graduation Options
8. Depart or Continue Your Journey

Open the **Lifecycle** page for full stage-by-stage details and action checklists.` },
  { keys:['cpt','curricular practical'], ans:`**CPT (Curricular Practical Training)** lets you work off-campus BEFORE graduation when the job is tied to your degree.\n\n**Rules:**\n• Must be authorized by your DSO (not USCIS)\n• Job must relate directly to your major\n• 12+ months full-time CPT = ineligible for OPT\n• Apply at the ISO office with a job offer letter\n\n📧 iso@bowiestate.edu | ☎️ (301) 860-4000` },
  { keys:['opt','optional practical'], ans:`**OPT (Optional Practical Training)** gives F-1 students up to **12 months** of work authorization after graduation. STEM majors get a **24-month STEM extension** (36 months total).\n\n**Timeline:**\n• Apply up to 90 days BEFORE graduation\n• No later than 60 days AFTER graduation\n• USCIS takes 3–5 months — apply EARLY!\n\n**Steps:** Visit ISO → I-20 OPT recommendation → File I-765 → Pay $410 fee → Wait for EAD card` },
  { keys:['housing','apartment','rent','lease','live'], ans:`**BSU Housing Options:**\n\n🏛️ **On-Campus (most affordable)**\n• Christa McAuliffe Hall — $760/mo\n• Tubman-Mays Hall — $680/mo\n\n🏢 **Off-Campus (popular)**\n• Terrapin Ridge — $1,275/mo, 1.3 mi\n• Campus Walk Studio — $980/mo, 0.8 mi\n• Bowie Townhomes — $1,650/mo, 2.4 mi\n• Capitol Heights Apts — $875/mo, 4.2 mi\n\nBrowse the **Housing** tab for photos, filters, and student-posted listings!` },
  { keys:['visa','f-1','f1','status','maintain','i-20'], ans:`**Maintaining F-1 Status:**\n\n✅ **You must:**\n• Enroll full-time (12+ credits undergrad / 9+ grad)\n• Keep I-20 valid — renew before it expires\n• Report address changes to ISO within 10 days\n• Get travel signature before leaving the US\n\n❌ **Never:**\n• Drop below full-time without DSO permission\n• Work off-campus without CPT/OPT authorization\n\n📧 iso@bowiestate.edu` },
  { keys:['tax','taxes','1040','filing','sprintax'], ans:`**US Taxes for F-1 Students:**\n\n• File **Form 8843** every year (even with $0 income)\n• File **Form 1040-NR** if you had any US income\n• Deadline: April 15\n• Use **Sprintax** — BSU provides discounted access\n• W-2s arrive from employers in January\n\n⚠️ **Never use TurboTax** — it doesn't support 1040-NR and can cause big problems` },
  { keys:['scholarship','scholarships','financial aid','funding','award','awards'], ans:`**Scholarships for BSU International Students:**\n\n🎓 **BSU Awards:**\n• International Student Merit Award\n• Global Excellence Scholarship\n• Department-specific scholarships\n\n🌍 **External:**\n• Fulbright Program (fully funded, prestigious)\n• AAUW International Fellowships\n• Country-specific embassy programs\n• IIE (Institute of International Education) grants\n\nApply October–November for the next academic year.\n📧 finaid@bowiestate.edu` },
  { keys:['bank','account','ssn','money','chase','capital one'], ans:`**Banking for International Students:**\n\n**You'll need:** Passport + visa, I-20, US address, student ID\n\n**Best options:**\n• **Capital One 360** — often no SSN required\n• **Chase** — branches near BSU campus\n• **Wise** — great for international transfers\n• **Revolut** — digital, no SSN needed\n\n**Getting an SSN:** You need a job first (on-campus works). Bring offer letter + passport + I-20 to the nearest Social Security Administration office.` },
  { keys:['health','insurance','ship','medical','doctor'], ans:`**Health Insurance at BSU:**\n\n• All full-time students are auto-enrolled in the BSU SHIP plan (Aetna)\n• You can waive if you have comparable coverage — deadline is in the first few weeks of each semester\n\n**On-Campus Health Center:** Basic care, referrals, vaccines, free/low-cost for enrolled students\n\n**Mental Health Counseling:** Free — call (301) 860-4164\n\n📧 healthservices@bowiestate.edu` },
  { keys:['work','job','campus','employment','20 hours'], ans:`**Working as an F-1 Student:**\n\n✅ **On-campus (no extra authorization):**\n• Up to 20 hours/week during the semester\n• Full-time during official school breaks\n• Library, dining, labs, TA positions, research\n\n✅ **Off-campus (authorization required):**\n• CPT — before graduation, tied to your degree\n• OPT — after graduation, 12 months (36 for STEM)\n\n❌ Working off-campus without authorization = F-1 status violation\n\n📧 career@bowiestate.edu` },
]

const DEFAULT_REPLY = `I'm **Maya**, your BSU international student guide! 🎓\n\nI can help you with:\n• **Visa & Status** — F-1 rules, travel, address changes\n• **Work Auth** — CPT, OPT, on-campus jobs\n• **Housing** — on/off-campus options and tips\n• **Finance** — scholarships, banking, taxes\n• **Health** — insurance, campus services\n• **Career** — internships, networking, job search\n\nTry asking something specific! For urgent matters:\n📧 iso@bowiestate.edu | 📞 (301) 860-4000`

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function getFallback(msg) {
  const lower = msg.toLowerCase()
  const scored = FALLBACKS.map((f) => {
    const score = f.keys.reduce((acc, key) => {
      const regex = new RegExp(`\\b${escapeRegex(key.toLowerCase())}\\b`, 'g')
      const matches = lower.match(regex)
      if (!matches) return acc
      const keywordWeight = Math.max(1, key.length / 4)
      return acc + matches.length * keywordWeight
    }, 0)
    return { ans: f.ans, score }
  }).filter((entry) => entry.score > 0)

  if (!scored.length) return null
  scored.sort((a, b) => b.score - a.score)
  return scored[0].ans
}

function getOfficeContact(msg = '') {
  const lower = msg.toLowerCase()
  if (/(housing|apartment|lease|rent|room|transport)/.test(lower)) {
    return { label: 'Connect with Housing Office', email: 'housing@bowiestate.edu' }
  }
  if (/(scholarship|funding|financial aid|tax|taxes|1040|bank|credit)/.test(lower)) {
    return { label: 'Connect with Financial Aid', email: 'finaid@bowiestate.edu' }
  }
  if (/(cpt|opt|job|career|internship|employment|resume)/.test(lower)) {
    return { label: 'Connect with Career Services', email: 'career@bowiestate.edu' }
  }
  if (/(health|insurance|ship|medical|doctor|counseling)/.test(lower)) {
    return { label: 'Connect with Health Services', email: 'healthservices@bowiestate.edu' }
  }
  return { label: 'Connect with International Office', email: 'iso@bowiestate.edu' }
}

function formatText(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>')
}

function now() {
  return new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })
}

export default function Chatbot() {
  const router = useRouter()
  const [messages, setMessages] = useState([
    { role:'bot', text:`Hi! I'm **Maya**, your BSU international student guide 🎓\n\nAsk me about visa rules, CPT/OPT, housing, scholarships, health insurance, banking, taxes, or anything about life at Bowie State.\n\nWhat's on your mind?`, ts: now() }
  ])
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [officeContact, setOfficeContact] = useState(getOfficeContact())
  const bodyRef = useRef()

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [messages, typing])

  async function send(preset) {
    const text = preset || input.trim()
    if (!text || typing) return
    setInput('')
    setOfficeContact(getOfficeContact(text))

    const newMsgs = [...messages, { role:'user', text, ts: now() }]
    setMessages(newMsgs)
    const newHistory = [...history, { role:'user', parts:[{text}] }]
    setHistory(newHistory)
    setTyping(true)

    try {
      const localReply = getFallback(text)
      if (localReply) {
        setMessages(prev => [...prev, { role:'bot', text: localReply, ts: now() }])
        setHistory(prev => [...prev, { role:'model', parts:[{text:localReply}] }])
        return
      }

      const res = await fetch('/api/chat', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ message: text, history: newHistory })
      })
      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      const reply = data.reply || DEFAULT_REPLY
      setMessages(prev => [...prev, { role:'bot', text: reply, ts: now() }])
      setHistory(prev => [...prev, { role:'model', parts:[{text:reply}] }])
      // Track conversation count
      try { localStorage.setItem('bsu-chat-count', String((parseInt(localStorage.getItem('bsu-chat-count')||'0')+1))) } catch {}
    } catch {
      const fallback = getFallback(text) || DEFAULT_REPLY
      setMessages(prev => [...prev, { role:'bot', text: fallback, ts: now() }])
      setHistory(prev => [...prev, { role:'model', parts:[{text:fallback}] }])
    } finally {
      setTyping(false)
    }
  }

  const CHIPS = [
    { label:'🛂 F-1 Visa Status',     msg:'How do I maintain my F-1 visa status?' },
    { label:'🏠 Find Housing',         msg:'What housing options are near BSU?' },
    { label:'💼 CPT/OPT Help',         msg:'How do I apply for CPT authorization?' },
    { label:'🏦 Banking Setup',        msg:'How do I open a US bank account as an international student?' },
    { label:'🎓 Scholarships',         msg:'What scholarships are available for international students at BSU?' },
    { label:'📊 US Taxes',             msg:'How do I file taxes as an F-1 international student?' },
    { label:'❤️ Health Insurance',     msg:'What are the health insurance requirements at BSU?' },
    { label:'💼 On-Campus Work',       msg:'Can F-1 students work on campus and how many hours?' },
    { label:'🧭 Lifecycle Stages',      msg:'List the exact 8 international student lifecycle stages.' },
  ]

  return (
    <div className="main-wrap">
      <div className="ai-page">
        <div className="ai-max-w">
          <div className="ai-card">
            <div className="ai-header">
              <div className="ai-av">🎓</div>
              <div className="ai-header-info">
                <h3>Maya — Your BSU Guide</h3>
                <p>Powered by Google Gemini · Grounded in portal lifecycle and mentoring guidance</p>
              </div>
              <div className="ai-badge">
                <span style={{width:7,height:7,background:'#4ade80',borderRadius:'50%',display:'inline-block'}}/>
                Online
              </div>
            </div>

            <div className="ai-body" ref={bodyRef}>
              {messages.map((m, i) => (
                <div key={i} className={`msg-row ${m.role === 'user' ? 'sent' : 'recv'}`}>
                  <div className="msg-bubble" dangerouslySetInnerHTML={{__html: m.role === 'bot' ? formatText(m.text) : m.text}}/>
                  {m.ts && <div className="msg-time">{m.ts}</div>}
                </div>
              ))}
              {typing && (
                <div className="typing-dots">
                  <span/><span/><span/>
                </div>
              )}
            </div>

            <div className="ai-chips">
              {CHIPS.map(c => (
                <button key={c.label} className="quick-chip" onClick={() => send(c.msg)}>{c.label}</button>
              ))}
            </div>

            <div className="ai-office-cta">
              <a className="office-btn" href={`mailto:${officeContact.email}`}>
                <i className="fas fa-envelope" /> {officeContact.label}
              </a>
            </div>

            <div className="ai-input-bar">
              <input
                className="chat-field"
                placeholder="Ask Maya anything about BSU or international student life…"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
              />
              <button className="chat-send" onClick={() => send()} disabled={typing}>
                <i className="fas fa-paper-plane"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
