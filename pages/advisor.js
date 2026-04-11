import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../lib/useAuth'

export default function AdvisorDashboard() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.push('/login')
      return
    }
    if ((user.role || '').toLowerCase() !== 'advisor' && !user.isAdmin) {
      router.push('/dashboard')
    }
  }, [loading, user])

  if (!user) return null

  return (
    <div className="main-wrap">
      <div className="dash-body">
        <div className="dash-welcome">
          <h1>Advisor Dashboard <span>Student Success Hub</span></h1>
          <p>Manage advising workflows, monitor student check-ins, and respond quickly to support requests.</p>
        </div>

        <div className="kpi-grid">
          <div className="kpi-card"><div className="kpi-val">12</div><div className="kpi-lbl">Advisees Assigned</div></div>
          <div className="kpi-card"><div className="kpi-val">4</div><div className="kpi-lbl">Pending Appointments</div></div>
          <div className="kpi-card"><div className="kpi-val">9</div><div className="kpi-lbl">Unread Messages</div></div>
          <div className="kpi-card"><div className="kpi-val">3</div><div className="kpi-lbl">Urgent Cases</div></div>
        </div>

        <div className="admin-grid" style={{ marginTop: '1.2rem' }}>
          <section className="admin-panel">
            <div className="admin-panel-head"><h3>Today's Priorities</h3></div>
            <ul style={{ paddingLeft: '1rem' }}>
              <li>Review OPT timelines for graduating seniors.</li>
              <li>Approve two mentorship escalation requests.</li>
              <li>Send verification follow-up email to new students.</li>
            </ul>
          </section>
          <section className="admin-panel">
            <div className="admin-panel-head"><h3>Quick Actions</h3></div>
            <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-sm" onClick={() => router.push('/messages')}>Open Messages</button>
              <button className="btn btn-outline btn-sm" onClick={() => router.push('/chatbot')}>Use Maya Assistant</button>
              <button className="btn btn-outline btn-sm" onClick={() => router.push('/admin')}>Open Admin Hub</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
