import { useMemo, useState } from 'react'
import LandingPage from './components/LandingPage'
import CollegeList from './components/CollegeList'
import CourseList from './components/CourseList'
import CourseDetail from './components/CourseDetail'
import { dashboardData } from './data/dashboardData'

function App() {
  const [screen, setScreen] = useState('landing')
  const [college, setCollege] = useState(null)
  const [course, setCourse] = useState(null)

  const breadcrumb = useMemo(() => {
    const path = ['Home']
    if (college) path.push(college.name)
    if (course) path.push(course.name)
    return path.join(' / ')
  }, [college, course])

  return (
    <main className="app">
      <header className="topbar card">
        <h2>Student Performance Dashboard</h2>
        <p>{breadcrumb}</p>
      </header>

      {screen === 'landing' && (
        <LandingPage
          title={dashboardData.projectTitle}
          subtitle={dashboardData.subtitle}
          onOpen={() => setScreen('colleges')}
        />
      )}

      {screen === 'colleges' && (
        <CollegeList
          colleges={dashboardData.colleges}
          onSelectCollege={(selected) => {
            setCollege(selected)
            setCourse(null)
            setScreen('courses')
          }}
        />
      )}

      {screen === 'courses' && college && (
        <CourseList
          college={college}
          onBack={() => {
            setCollege(null)
            setScreen('colleges')
          }}
          onSelectCourse={(selected) => {
            setCourse(selected)
            setScreen('course-detail')
          }}
        />
      )}

      {screen === 'course-detail' && college && course && (
        <CourseDetail
          college={college}
          course={course}
          note={dashboardData.predictionNote}
          onBack={() => {
            setCourse(null)
            setScreen('courses')
          }}
        />
      )}
    </main>
  )
}

export default App
