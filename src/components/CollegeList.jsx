function CollegeList({ colleges, onSelectCollege }) {
  return (
    <section>
      <h2>Colleges</h2>
      <div className="card-grid">
        {colleges.map((college) => (
          <button
            key={college.id}
            className="card"
            type="button"
            onClick={() => onSelectCollege(college)}
          >
            <h3>{college.name}</h3>
            <p>{college.courses.length} courses</p>
          </button>
        ))}
      </div>
    </section>
  )
}

export default CollegeList
