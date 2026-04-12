import { useMemo, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const LIFE_CYCLE_STEPS = [
  {
    key: 'step-1',
    icon: 'fa-school',
    title: 'Apply to a SEVP-Certified School',
    subtitle: 'Choose and apply to a Student & Exchange Visitor Program (SEVP) certified school.',
    learnMore: 'Before you can study in the U.S., you must first be accepted by a school that is SEVP-certified and authorized to enroll F-1 students.',
    bullets: [
      'Research SEVP-approved schools that match your goals.',
      'Prepare and submit all required application documents.',
      'Track deadlines and admission decisions carefully.',
      'Keep your acceptance letter for next immigration steps.',
    ],
    tip: 'Pick programs that align with your long-term study and career plans.',
  },
  {
    key: 'step-2',
    icon: 'fa-file-lines',
    title: 'Receive Your Form I-20',
    subtitle: 'Once accepted, your school issues Form I-20, your official certificate to study in the U.S.',
    learnMore: 'Your I-20 contains your SEVIS ID, program dates, and financial details. You need this document for your visa interview and travel.',
    bullets: [
      'Check all details on the I-20 for accuracy.',
      'Sign your I-20 before your visa appointment.',
      'Save both digital and printed copies.',
      'Carry it for your interview and U.S. entry.',
    ],
    tip: 'If any information is wrong, contact your school immediately for correction.',
  },
  {
    key: 'step-3',
    icon: 'fa-dollar-sign',
    title: 'Pay the I-901 SEVIS Fee',
    subtitle: 'Pay the required SEVIS fee online at FMJfee.com before your visa appointment.',
    learnMore: 'The I-901 SEVIS fee is required for F-1 visa processing and must be paid before your visa interview date.',
    bullets: [
      'Go to FMJfee.com.',
      'Enter your SEVIS ID from Form I-20.',
      'Complete payment and print your receipt.',
      'Bring the receipt to your visa interview.',
    ],
    tip: 'Pay early so your payment can be reflected in the system before interview day.',
  },
  {
    key: 'step-4',
    icon: 'fa-earth-americas',
    title: 'Apply for Your Student Visa',
    subtitle: 'Schedule and attend your visa interview at the U.S. Embassy or Consulate in your country.',
    learnMore: 'At your visa interview, you must show clear academic intent, financial support, and complete documentation.',
    bullets: [
      'Complete your DS-160 application.',
      'Pay all required visa fees.',
      'Bring passport, I-20, and SEVIS receipt.',
      'Prepare concise answers about your study plan.',
    ],
    tip: 'Be clear, honest, and confident when discussing your academic goals.',
  },
  {
    key: 'step-5',
    icon: 'fa-plane-arrival',
    title: 'Arrive in the United States',
    subtitle: 'Fly to the U.S. no more than 30 days before your program start date with your I-20 and visa.',
    learnMore: 'U.S. Customs and Border Protection will review your immigration documents at entry. Keep all originals accessible in your carry-on.',
    bullets: [
      'Travel with passport, visa, and signed I-20.',
      'Answer port-of-entry questions accurately.',
      'Check your I-94 record after arrival.',
      'Attend orientation and school check-in on time.',
    ],
    tip: 'Do not enter earlier than the 30-day F-1 entry window.',
  },
  {
    key: 'step-6',
    icon: 'fa-book-open',
    title: 'Maintain Your Student Status',
    subtitle: 'Stay enrolled full-time, follow all regulations, and keep your status active throughout your studies.',
    learnMore: 'Maintaining status is essential to remain legally in the U.S. and keep future options such as CPT, OPT, and transfers.',
    bullets: [
      'Remain full-time each semester unless authorized otherwise.',
      'Keep your passport and I-20 valid.',
      'Report address changes within required timelines.',
      'Never work without proper authorization.',
    ],
    tip: 'Use the support team and mentorship network whenever your situation changes.',
  },
  {
    key: 'step-7',
    icon: 'fa-briefcase',
    title: 'Explore Post-Graduation Options',
    subtitle: 'After graduation, you can work in your field, extend your stay, or transfer to a new program.',
    learnMore: 'Planning early gives you better options for OPT, graduate study, transfer, or long-term career pathways.',
    bullets: [
      'Create your OPT timeline early.',
      'Prepare resume, interview, and job search documents.',
      'Review transfer or graduate program deadlines.',
      'Use career services and mentor guidance regularly.',
    ],
    tip: 'Start post-graduation planning at least one semester in advance.',
  },
  {
    key: 'step-8',
    icon: 'fa-right-from-bracket',
    title: 'Depart or Continue Your Journey',
    subtitle: 'You have 60 days after graduation to leave the U.S. or begin another authorized program.',
    learnMore: 'The F-1 grace period allows you to transition, but all next steps must be taken before the window closes.',
    bullets: [
      'Choose departure, transfer, or status continuation options.',
      'Collect records and complete school checkout items.',
      'Maintain legal status throughout your transition period.',
      'Stay connected with mentors for long-term guidance.',
    ],
    tip: 'Track your grace period dates carefully and act early.',
  },
]

const WORK_REQUIREMENTS = [
  {
    title: 'On-Campus Work',
    icon: '📚',
    text: 'You can work on campus up to 20 hours per week while school is in session, and full-time during breaks.',
  },
  {
    title: 'Off-Campus Work',
    icon: '🌍',
    text: "Off-campus employment requires authorization from USCIS. Don't work off-campus without permission!",
  },
  {
    title: 'CPT & OPT',
    icon: '💼',
    text: 'Curricular Practical Training (CPT) and Optional Practical Training (OPT) must be approved by your school and must relate to your major.',
  },
]

export default function LifecyclePage() {
  const router = useRouter()
  const [activeKey, setActiveKey] = useState(LIFE_CYCLE_STEPS[0].key)
  const [expandedKey, setExpandedKey] = useState(LIFE_CYCLE_STEPS[0].key)

  useEffect(() => {
    const { stage } = router.query
    if (!stage) return
    const matched = LIFE_CYCLE_STEPS.find((step) => step.key === String(stage))
    if (matched) {
      setActiveKey(matched.key)
      setExpandedKey(matched.key)
    }
  }, [router.query])

  const activeStep = useMemo(
    () => LIFE_CYCLE_STEPS.find((step) => step.key === activeKey) || LIFE_CYCLE_STEPS[0],
    [activeKey],
  )

  const progressPct = Math.round(((LIFE_CYCLE_STEPS.findIndex((s) => s.key === activeStep.key) + 1) / LIFE_CYCLE_STEPS.length) * 100)
  const toggleExpanded = (stepKey) => {
    setActiveKey(stepKey)
    setExpandedKey((prev) => (prev === stepKey ? null : stepKey))
  }

  return (
    <div className="main-wrap">
      <div className="page-banner">
        <div className="page-banner-inner">
          <div>
            <h1 className="page-title">Your Journey <em>Starts Here</em></h1>
            <p className="page-sub">International Student Life Cycle</p>
          </div>
        </div>
      </div>

      <div className="page-body" style={{ maxWidth: 1220 }}>
        <div className="section-head" style={{ marginBottom: '1rem' }}>
          <h2 className="section-title">International Student Life Cycle</h2>
          <p className="section-sub" style={{ color: 'var(--text2)', maxWidth: 930 }}>
            Follow each stage in order and click any card to view detailed action steps, practical guidance, and next decisions.
          </p>
        </div>

        <div className="ilc-layout">
          <div className="ilc-track-wrap">
            <div className="ilc-track">
              {LIFE_CYCLE_STEPS.map((step, idx) => (
                <article
                  key={step.key}
                  className={`ilc-card ${activeStep.key === step.key ? 'active' : ''} ${expandedKey === step.key ? 'expanded' : ''}`}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <button
                    className="ilc-card-trigger"
                    onClick={() => toggleExpanded(step.key)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        toggleExpanded(step.key)
                      }
                    }}
                    aria-expanded={expandedKey === step.key}
                    aria-controls={`ilc-details-${step.key}`}
                  >
                    <div className="ilc-icon-wrap">
                      <div className="ilc-icon"><i className={`fas ${step.icon}`} /></div>
                      <div className="ilc-num">{idx + 1}</div>
                    </div>
                    <div className="ilc-copy">
                      <h3>{step.title}</h3>
                      <p>{step.subtitle}</p>
                      <span className="ilc-link">{expandedKey === step.key ? 'Hide Details' : 'Learn More'}</span>
                    </div>
                    <i className={`fas fa-angle-down ilc-chevron ${expandedKey === step.key ? 'open' : ''}`} />
                  </button>
                  <div
                    id={`ilc-details-${step.key}`}
                    className={`ilc-inline-detail ${expandedKey === step.key ? 'open' : ''}`}
                    aria-hidden={expandedKey !== step.key}
                  >
                    <div className="ilc-inline-detail-inner">
                      <div className="ilc-inline-head">
                        <div className="ilc-learn-more">Detailed Guidance</div>
                        <button
                          className="ilc-close-btn"
                          onClick={() => setExpandedKey(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              setExpandedKey(null)
                            }
                          }}
                          aria-label={`Close details for ${step.title}`}
                        >
                          <i className="fas fa-xmark" />
                        </button>
                      </div>
                      <p className="ilc-learn-text">{step.learnMore}</p>
                      <ul className="ilc-list">
                        {step.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                      <p className="ilc-tip"><strong>Pro tip:</strong> {step.tip}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="ilc-side-panel">
            <h3><i className="fas fa-circle-info" /> Work Requirements</h3>
            <p className="ilc-side-sub">(F-1 Students Only)</p>
            <div className="ilc-side-list">
              {WORK_REQUIREMENTS.map((item) => (
                <div key={item.title} className="ilc-side-item">
                  <div className="ilc-side-title">{item.icon} {item.title}</div>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
            <p className="ilc-warning">⚠️ Working without authorization can result in losing your student status. Always check with your international office first.</p>
          </aside>
        </div>

        <div className="ilc-progress-wrap" aria-live="polite">
          <div className="ilc-progress-pill">Journey Progress: {progressPct}%</div>
          <p>Active Stage: <strong>{activeStep.title}</strong></p>
        </div>

        <section className="ilc-mentor-cta">
          <div className="ilc-mentor-icon"><i className="fas fa-briefcase" /></div>
          <h3>Need Help Navigating Your Journey?</h3>
          <p>
            Connect with experienced mentors who have been through the same process. Get personalized guidance and answers to all your questions.
          </p>
          <button className="btn btn-primary" onClick={() => router.push('/mentorship')}>Talk to a Mentor</button>
        </section>
      </div>

      <style jsx>{`
        .ilc-layout {
          display: grid;
          grid-template-columns: 1.55fr .75fr;
          gap: 1rem;
          align-items: start;
          margin-bottom: 1rem;
        }
        .ilc-track-wrap {
          overflow-y: auto;
          overflow-x: hidden;
          max-height: 730px;
          padding-right: .35rem;
        }
        .ilc-track {
          display: grid;
          grid-template-columns: 1fr;
          gap: .9rem;
        }
        .ilc-card {
          text-align: left;
          border: 1px solid var(--border2);
          border-radius: 16px;
          background: var(--surface);
          box-shadow: var(--shadow-sm);
          padding: .95rem 1rem;
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: .8rem;
          align-items: start;
          animation: riseIn .45s ease both;
          transition: transform .24s ease, box-shadow .24s ease, border-color .24s ease;
          overflow: hidden;
        }
        .ilc-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
          border-color: rgba(245,197,24,.55);
        }
        .ilc-card.active {
          border-color: var(--yellow);
          box-shadow: 0 0 0 2px rgba(245,197,24,.25), var(--shadow-md);
        }
        .ilc-card.expanded {
          transform: scale(1.01);
          box-shadow: 0 0 0 2px rgba(245,197,24,.32), 0 16px 36px rgba(8,15,40,.18);
        }
        .ilc-card-trigger {
          all: unset;
          cursor: pointer;
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: .8rem;
          align-items: start;
          padding: .95rem 1rem;
        }
        .ilc-card-trigger:focus-visible {
          outline: 2px solid var(--yellow);
          outline-offset: -2px;
          border-radius: 16px;
        }
        .ilc-icon-wrap {
          display: grid;
          gap: .15rem;
          justify-items: center;
          min-width: 60px;
        }
        .ilc-num {
          font-size: .78rem;
          font-weight: 800;
          color: var(--yellow-dk);
        }
        .ilc-icon {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: var(--yellow-lt);
          color: var(--yellow-dk);
        }
        .ilc-copy h3 {
          font-size: 1rem;
          line-height: 1.35;
          margin-bottom: .35rem;
          color: var(--text);
        }
        .ilc-copy p {
          font-size: .9rem;
          line-height: 1.5;
          color: var(--text3);
          margin-bottom: .65rem;
        }
        .ilc-link {
          font-weight: 800;
          color: var(--yellow-dk);
          font-size: .9rem;
        }
        .ilc-chevron {
          color: var(--yellow-dk);
          margin-top: .15rem;
          transition: transform .25s ease;
        }
        .ilc-chevron.open {
          transform: rotate(180deg);
        }
        .ilc-side-panel {
          border: 1px solid rgba(245, 197, 24, .42);
          border-radius: 16px;
          padding: 1rem;
          background: linear-gradient(180deg, color-mix(in srgb, var(--bg2) 78%, transparent), color-mix(in srgb, var(--surface) 86%, transparent));
        }
        .ilc-side-panel h3 {
          margin: 0;
          display: flex;
          align-items: center;
          gap: .5rem;
          color: var(--text);
        }
        .ilc-side-sub {
          margin: .2rem 0 .8rem;
          color: var(--yellow-dk);
          font-weight: 700;
          font-size: .86rem;
        }
        .ilc-side-item + .ilc-side-item {
          margin-top: .8rem;
        }
        .ilc-side-title {
          font-weight: 700;
          color: var(--text);
          margin-bottom: .15rem;
        }
        .ilc-side-item p {
          color: var(--text2);
          margin: 0;
          line-height: 1.5;
        }
        .ilc-warning {
          border-top: 1px solid var(--border2);
          margin-top: .9rem;
          padding-top: .7rem;
          color: var(--text3);
          font-style: italic;
        }
        .ilc-progress-wrap {
          margin: .2rem 0 1.2rem;
          display: flex;
          align-items: center;
          gap: .7rem;
          flex-wrap: wrap;
          color: var(--text2);
        }
        .ilc-progress-wrap p {
          margin: 0;
        }
        .ilc-progress-pill {
          border-radius: 999px;
          padding: .22rem .62rem;
          background: var(--yellow-lt);
          color: var(--yellow-dk);
          font-size: .8rem;
          font-weight: 800;
        }
        .ilc-inline-detail {
          max-height: 0;
          opacity: 0;
          transition: max-height .35s ease, opacity .25s ease;
          pointer-events: none;
        }
        .ilc-inline-detail.open {
          max-height: 460px;
          opacity: 1;
          pointer-events: auto;
        }
        .ilc-inline-detail-inner {
          margin: 0 .85rem .85rem;
          border: 1px solid var(--border2);
          background: var(--bg2);
          border-radius: 14px;
          padding: .8rem .9rem .85rem;
        }
        .ilc-inline-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: .6rem;
        }
        .ilc-learn-more {
          display: inline-flex;
          border-radius: 999px;
          padding: .18rem .65rem;
          background: var(--yellow-lt);
          color: var(--yellow-dk);
          font-size: .72rem;
          font-weight: 800;
        }
        .ilc-close-btn {
          width: 28px;
          height: 28px;
          border: 1px solid var(--border2);
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: var(--text2);
          background: var(--surface);
          cursor: pointer;
          transition: background .2s ease, color .2s ease, transform .2s ease;
        }
        .ilc-close-btn:hover {
          background: var(--yellow-lt);
          color: var(--yellow-dk);
          transform: scale(1.06);
        }
        .ilc-close-btn:focus-visible {
          outline: 2px solid var(--yellow);
          outline-offset: 2px;
        }
        .ilc-learn-text {
          color: var(--text2);
          margin: .45rem 0 .75rem;
        }
        .ilc-list {
          padding-left: 1.05rem;
          margin-bottom: .85rem;
          color: var(--text2);
        }
        .ilc-list li {
          margin-bottom: .36rem;
        }
        .ilc-tip {
          color: var(--text2);
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: .7rem .85rem;
        }
        .ilc-mentor-cta {
          background: var(--surface);
          border: 1px solid var(--border2);
          box-shadow: var(--shadow-sm);
          border-radius: 18px;
          padding: 2.2rem 1rem;
          text-align: center;
          margin-bottom: 1.2rem;
        }
        .ilc-mentor-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto .8rem;
          border-radius: 50%;
          background: var(--yellow-lt);
          display: grid;
          place-items: center;
          color: var(--yellow-dk);
          font-size: 1.5rem;
        }
        .ilc-mentor-cta h3 {
          margin: 0 0 .5rem;
          font-size: clamp(1.4rem, 2.4vw, 2.2rem);
        }
        .ilc-mentor-cta p {
          max-width: 760px;
          margin: 0 auto 1rem;
          color: var(--text2);
          line-height: 1.5;
        }
        @media (max-width: 1000px) {
          .ilc-layout {
            grid-template-columns: 1fr;
          }
          .ilc-track-wrap {
            max-height: 620px;
          }
        }
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
