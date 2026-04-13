import { useMemo, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const JOURNEY_ROUTES = [
  { href: '/', label: 'Home', tip: 'Start from Home for a quick overview and featured updates.' },
  { href: '/dashboard', label: 'Dashboard', tip: 'Start here to see your progress and next priorities.' },
  { href: '/lifecycle', label: 'Lifecycle', tip: 'Follow each stage in order with practical checklists.' },
  { href: '/resources', label: 'Resources', tip: 'Open verified links for scholarships, CPT/OPT, taxes, and more.' },
  { href: '/mentorship', label: 'Mentorship', tip: 'Connect with mentors for one-on-one guidance.' },
  { href: '/chatbot', label: 'Maya Chat', tip: 'Ask Maya anything and use quick office links when needed.' },
]

export default function JourneyGuide() {
  const router = useRouter()
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    setDismissed(localStorage.getItem('bsu-journey-guide-dismissed') === '1')
  }, [])

  const currentIndex = useMemo(() => {
    const idx = JOURNEY_ROUTES.findIndex((item) => item.href === router.pathname)
    return idx === -1 ? 0 : idx
  }, [router.pathname])

  const current = JOURNEY_ROUTES[currentIndex]
  const prev = JOURNEY_ROUTES[(currentIndex - 1 + JOURNEY_ROUTES.length) % JOURNEY_ROUTES.length]
  const next = JOURNEY_ROUTES[(currentIndex + 1) % JOURNEY_ROUTES.length]

  if (dismissed || router.pathname === '/login') return null

  return (
    <div className="journey-guide" role="complementary" aria-label="Journey navigation helper">
      <div className="journey-popup">
        <p><strong>{current.label} Tip:</strong> {current.tip}</p>
        <button
          type="button"
          className="journey-dismiss"
          onClick={() => {
            setDismissed(true)
            localStorage.setItem('bsu-journey-guide-dismissed', '1')
          }}
        >
          Got it
        </button>
      </div>
      <div className="journey-arrows">
        <button type="button" onClick={() => router.push(prev.href)} aria-label={`Go to ${prev.label}`}>
          <i className="fas fa-arrow-left" /> {prev.label}
        </button>
        <button type="button" onClick={() => router.push(next.href)} aria-label={`Go to ${next.label}`}>
          {next.label} <i className="fas fa-arrow-right" />
        </button>
      </div>
    </div>
  )
}
