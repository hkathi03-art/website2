function CourseList({ college, onBack, onSelectCourse }) {
  return (
    <section>
      <div className="section-head">
        <button className="ghost-btn" type="button" onClick={onBack}>← Back to Colleges</button>
        <h2>{college.name}</h2>
      </div>

      <div className="grid">
        {college.courses.map((course) => (
          <button key={course.id} className="card list-card" type="button" onClick={() => onSelectCourse(course)}>
            <h3>{course.name}</h3>
            <p>{course.students.length} students</p>
          </button>
        ))}
      </div>
    </section>
  )
}

export default CourseList
