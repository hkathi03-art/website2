import { predictFromCoursework } from '../utils/predictor'

function GradeBadge({ label }) {
  return <span className={`badge badge-${label.replace('+', 'plus').toLowerCase()}`}>{label}</span>
}

function RiskBadge({ label }) {
  const key = label.toLowerCase().replace(' ', '-')
  return <span className={`badge risk-${key}`}>{label}</span>
}

function CourseDetail({ college, course, predictionNote, onBack }) {
  const predictionRows = course.students.map((student) => ({
    ...student,
    prediction: predictFromCoursework(student.courseworkGrade)
  }))

  const atRiskCount = predictionRows.filter((row) => row.prediction.riskStatus === 'At-risk').length

  return (
    <section>
      <div className="section-header">
        <button type="button" className="secondary-btn" onClick={onBack}>
          ← Back to Courses
        </button>
        <h2>{college.name} / {course.name}</h2>
      </div>

      <p className="info-note">{predictionNote}</p>
      <p className="course-summary">At-risk students in this course: {atRiskCount}</p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Coursework Grade</th>
              <th>Final Estimate</th>
              <th>Risk Status</th>
            </tr>
          </thead>
          <tbody>
            {predictionRows.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>
                  <GradeBadge label={student.courseworkGrade} />
                </td>
                <td>{student.prediction.finalEstimate}</td>
                <td>
                  <RiskBadge label={student.prediction.riskStatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default CourseDetail
