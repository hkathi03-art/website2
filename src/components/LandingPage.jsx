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
