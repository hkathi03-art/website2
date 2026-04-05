import { predictFinalResult } from '../utils/predictor'

function GradeBadge({ label }) {
  return <span className={`badge badge-${label.replace('+', 'plus').toLowerCase()}`}>{label}</span>
}

function CourseDetail({ college, course, predictionNote, onBack }) {
  return (
    <section>
      <div className="section-header">
        <button type="button" className="secondary-btn" onClick={onBack}>
          ← Back to Courses
        </button>
        <h2>{college.name} / {course.name}</h2>
      </div>

      {/* Beginner note: this clarifies version-1 logic in the actual UI. */}
      <p className="info-note">{predictionNote}</p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Coursework Grade</th>
              <th>Predicted Final Result</th>
            </tr>
          </thead>
          <tbody>
            {course.students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>
                  <GradeBadge label={student.courseworkGrade} />
                </td>
                <td>{predictFinalResult(student.courseworkGrade)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default CourseDetail
