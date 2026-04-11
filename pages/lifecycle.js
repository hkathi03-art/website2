import { useMemo, useState } from 'react'

const LIFE_CYCLE_STEPS = [
  {
    key: 'step-1',
    icon: 'fa-school',
    title: 'Apply to a SEVP-Certified School',
    subtitle: 'Choose and apply to a Student & Exchange Visitor Program certified school.',
    learnMore: 'Before you can study in the U.S., you need acceptance from a SEVP-certified school.',
    bullets: [
      'Research schools approved by SEVP',
      'Meet admission requirements and deadlines',
      'Submit your application and required documents',
      'Wait for your acceptance letter',
    ],
    tip: 'Apply to schools aligned with your goals and authorized to issue Form I-20.',
  },
  {
    key: 'step-2',
    icon: 'fa-file-signature',
    title: 'Receive Your Form I-20',
    subtitle: 'After acceptance, your school issues Form I-20 as your study certificate.',
    learnMore: 'Form I-20 confirms your program details, costs, and SEVIS ID.',
    bullets: [
      'Review every field for accuracy',
      'Sign the I-20 before your visa appointment',
      'Keep digital and printed copies',
      'Bring it to your interview and travel check-ins',
    ],
    tip: 'Do not lose this document—you will need it throughout your student journey.',
  },
  {
    key: 'step-3',
    icon: 'fa-credit-card',
    title: 'Pay the I-901 SEVIS Fee',
    subtitle: 'Pay your SEVIS fee at FMJfee.com before your visa interview.',
    learnMore: 'The I-901 fee supports SEVIS, the U.S. system that tracks student status.',
    bullets: [
      'Visit FMJfee.com',
      'Enter your SEVIS ID from Form I-20',
      'Pay online and save your receipt',
      'Pay at least 3 days before your visa interview',
    ],
    tip: 'Current F-1 fee is commonly $350—verify current amounts before payment.',
  },
  {
    key: 'step-4',
    icon: 'fa-passport',
    title: 'Apply for Your Student Visa',
    subtitle: 'Schedule and attend your F-1 interview at a U.S. Embassy/Consulate.',
    learnMore: 'Your F-1 visa grants permission to enter the U.S. as a full-time student.',
    bullets: [
      'Bring signed Form I-20 and SEVIS fee receipt',
      'Bring passport, DS-160 confirmation, and fee receipts',
      'Bring financial proof and academic records',
      'Explain your academic plan clearly in the interview',
    ],
    tip: 'Be honest, confident, and specific about your school and career goals.',
  },
  {
    key: 'step-5',
    icon: 'fa-plane-arrival',
    title: 'Arrive in the United States',
    subtitle: 'Enter the U.S. no earlier than 30 days before your start date.',
    learnMore: 'At entry, CBP checks your passport, F-1 visa, and signed Form I-20.',
    bullets: [
      'Carry passport, F-1 visa, and signed I-20 in hand luggage',
      'Answer CBP questions about school and program',
      'Check your I-94 record after entry',
      'Report to your international student office quickly',
    ],
    tip: 'Use your first week to complete orientation, housing, and banking setup.',
  },
  {
    key: 'step-6',
    icon: 'fa-shield-halved',
    title: 'Maintain Your Student Status',
    subtitle: 'Stay full-time, follow F-1 rules, and keep records updated.',
    learnMore: 'Maintaining status protects your ability to study, work, and travel legally.',
    bullets: [
      'Stay enrolled full-time and make degree progress',
      'Get permission before dropping below full-time',
      'Update address changes within 10 days',
      'Never work without proper authorization',
    ],
    tip: 'Stay in close contact with your international office whenever plans change.',
  },
  {
    key: 'step-7',
    icon: 'fa-briefcase',
    title: 'Explore Post-Graduation Options',
    subtitle: 'Plan OPT, transfer options, or next visa pathways before graduation.',
    learnMore: 'Early planning helps you avoid missing important filing deadlines.',
    bullets: [
      'Prepare your OPT/CPT timeline with your advisor',
      'Build resume, LinkedIn, and employer network',
      'Review STEM extension eligibility if applicable',
      'Consider transfer or graduate study options',
    ],
    tip: 'Start planning at least one semester early for best outcomes.',
  },
  {
    key: 'step-8',
    icon: 'fa-compass',
    title: 'Depart or Continue Your Journey',
    subtitle: 'Use your post-program grace period to transition correctly.',
    learnMore: 'After program completion, you generally have a 60-day grace period on F-1 status.',
    bullets: [
      'Choose OPT, transfer, or departure during the grace window',
      'Collect transcripts and recommendation letters',
      'Close or transfer key services responsibly',
      'Keep all immigration and academic records organized',
    ],
    tip: 'Stay connected with mentors and alumni for long-term support.',
  },
]

export default function LifecyclePage() {
  const [activeKey, setActiveKey] = useState(LIFE_CYCLE_STEPS[0].key)

  const activeStep = useMemo(
    () => LIFE_CYCLE_STEPS.find((step) => step.key === activeKey) || LIFE_CYCLE_STEPS[0],
    [activeKey],
  )

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

      <div className="page-body" style={{ maxWidth: 1180 }}>
        <div className="section-head" style={{ marginBottom: '1.2rem' }}>
          <h2 className="section-title">International Student Life Cycle</h2>
          <p className="section-sub" style={{ color: 'var(--text2)', maxWidth: 900 }}>
            Your complete guide to studying in the U.S., from application to graduation and beyond.
            Follow these 8 steps to make your journey smooth and stress-free.
          </p>
        </div>

        <div className="ilc-track-wrap">
          <div className="ilc-track">
            {LIFE_CYCLE_STEPS.map((step, idx) => (
              <button
                key={step.key}
                className={`ilc-card ${activeStep.key === step.key ? 'active' : ''}`}
                onClick={() => setActiveKey(step.key)}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="ilc-num">{idx + 1}</div>
                <div className="ilc-icon"><i className={`fas ${step.icon}`} /></div>
                <h3>{step.title}</h3>
                <p>{step.subtitle}</p>
              </button>
            ))}
          </div>
        </div>

        <section className="admin-panel ilc-detail">
          <div className="admin-panel-head">
            <h3>{activeStep.title}</h3>
          </div>
          <div className="ilc-learn-more">Learn More</div>
          <p className="ilc-learn-text">{activeStep.learnMore}</p>
          <ul className="ilc-list">
            {activeStep.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <p className="ilc-tip"><strong>Pro tip:</strong> {activeStep.tip}</p>
        </section>
      </div>

      <style jsx>{`
        .ilc-track-wrap {
          overflow-y: auto;
          overflow-x: hidden;
          max-height: 560px;
          padding-right: .35rem;
          margin-bottom: 1.2rem;
        }
        .ilc-track {
          display: grid;
          grid-template-columns: 1fr;
          gap: .9rem;
        }
        .ilc-card {
          position: relative;
          text-align: left;
          border: 1px solid var(--border2);
          border-radius: 14px;
          background: var(--surface);
          box-shadow: var(--shadow-sm);
          padding: 1rem;
          animation: riseIn .45s ease both;
          transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
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
        .ilc-num {
          position: absolute;
          right: .8rem;
          top: .7rem;
          font-size: .85rem;
          font-weight: 800;
          color: var(--yellow-dk);
        }
        .ilc-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: var(--yellow-lt);
          color: var(--yellow-dk);
          margin-bottom: .6rem;
        }
        .ilc-card h3 {
          font-size: .92rem;
          line-height: 1.35;
          margin-bottom: .35rem;
          color: var(--text);
        }
        .ilc-card p {
          font-size: .79rem;
          line-height: 1.45;
          color: var(--text3);
        }
        .ilc-detail {
          animation: fadeSlide .26s ease;
        }
        .ilc-learn-more {
          display: inline-flex;
          border-radius: 999px;
          padding: .18rem .65rem;
          background: var(--yellow-lt);
          color: var(--yellow-dk);
          font-size: .72rem;
          font-weight: 800;
          margin-bottom: .55rem;
        }
        .ilc-learn-text {
          color: var(--text2);
          margin-bottom: .75rem;
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
