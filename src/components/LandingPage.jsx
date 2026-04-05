// Landing page is intentionally small for beginners.
// It only shows project intro and one clear action.
function LandingPage({ title, subtitle, onOpenDashboard }) {
  return (
    <section className="landing">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <button type="button" onClick={onOpenDashboard}>
        Open Dashboard
      </button>
    </section>
  )
}

export default LandingPage
