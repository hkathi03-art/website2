function LandingPage({ title, subtitle, onOpen }) {
  return (
    <section className="landing card">
      <p className="eyebrow">Academic Performance Project</p>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <button onClick={onOpen} type="button">Open Dashboard</button>
    </section>
  )
}

export default LandingPage
