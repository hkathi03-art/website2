// Step 3: select a course inside the chosen college.
function CourseList({ college, onBack, onSelectCourse }) {
  return (
    <section>
      <div className="section-header">
        <button type="button" className="secondary-btn" onClick={onBack}>
          ← Back to Colleges
        </button>
        <h2>{college.name}</h2>
      </div>

      <p>Select a course to view students and predicted final results.</p>

      <div className="card-grid">
        {college.courses.map((course) => (
          <button
            key={course.id}
            className="card"
            type="button"
            onClick={() => onSelectCourse(course)}
          >
            <h3>{course.name}</h3>
            <p>{course.students.length} students</p>
          </button>
        ))}
      </div>
    </section>
  )
}

export default CourseList
