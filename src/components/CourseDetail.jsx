import { predictFromCoursework } from '../utils/predictor'

function GradeBadge({ grade }) {
  return <span className={`badge grade-${grade.replace('+', 'plus').toLowerCase()}`}>{grade}</span>
}

function RiskBadge({ status }) {
  return <span className={`badge risk-${status.toLowerCase().replace(' ', '-')}`}>{status}</span>
}

function CourseDetail({ college, course, note, onBack }) {
  const rows = course.students.map((student) => ({
    ...student,
    prediction: predictFromCoursework(student.courseworkGrade)
  }))

  return (
    <section>
      <div className="section-head">
        <button className="ghost-btn" type="button" onClick={onBack}>← Back to Courses</button>
        <h2>{college.name} / {course.name}</h2>
      </div>

      <p className="note">{note}</p>

      <div className="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Coursework</th>
              <th>Final Estimate</th>
              <th>Risk Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td><GradeBadge grade={student.courseworkGrade} /></td>
                <td>{student.prediction.finalEstimate}</td>
                <td><RiskBadge status={student.prediction.riskStatus} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default CourseDetail
