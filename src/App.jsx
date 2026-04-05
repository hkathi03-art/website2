import { useMemo, useState } from 'react'
import LandingPage from './components/LandingPage'
import CollegeList from './components/CollegeList'
import CourseList from './components/CourseList'
import CourseDetail from './components/CourseDetail'
import { dashboardData } from './data/dashboardData'

function App() {
  // appStage controls which screen appears for the user.
  const [appStage, setAppStage] = useState('landing')
  const [selectedCollege, setSelectedCollege] = useState(null)
  const [selectedCourse, setSelectedCourse] = useState(null)

  // Simple beginner-friendly stage labels for top navigation/help.
  const stageLabels = {
    landing: 'Step 1: Start',
    dashboard: 'Step 2: Choose a College',
    courses: 'Step 3: Choose a Course',
    'course-detail': 'Step 4: View Students & Predictions'
  }

  const openDashboard = () => setAppStage('dashboard')

  const chooseCollege = (college) => {
    setSelectedCollege(college)
    setSelectedCourse(null)
    setAppStage('courses')
  }

  const chooseCourse = (course) => {
    setSelectedCourse(course)
    setAppStage('course-detail')
  }

  const goToColleges = () => {
    setSelectedCollege(null)
    setSelectedCourse(null)
    setAppStage('dashboard')
  }

  const goToCourses = () => {
    setSelectedCourse(null)
    setAppStage('courses')
  }

  const breadcrumb = useMemo(() => {
    const pieces = ['Home']
    if (selectedCollege) pieces.push(selectedCollege.name)
    if (selectedCourse) pieces.push(selectedCourse.name)
    return pieces.join(' / ')
  }, [selectedCollege, selectedCourse])

  return (
    <main className="app-shell">
      <header className="top-nav" aria-label="Dashboard navigation help">
        <p className="step-label">{stageLabels[appStage]}</p>
        <p className="breadcrumb">{breadcrumb}</p>
      </header>

      {appStage === 'landing' && (
        <LandingPage
          title={dashboardData.project.title}
          subtitle={dashboardData.project.subtitle}
          onOpenDashboard={openDashboard}
        />
      )}

      {appStage === 'dashboard' && (
        <CollegeList colleges={dashboardData.colleges} onSelectCollege={chooseCollege} />
      )}

      {appStage === 'courses' && selectedCollege && (
        <CourseList
          college={selectedCollege}
          onBack={goToColleges}
          onSelectCourse={chooseCourse}
        />
      )}

      {appStage === 'course-detail' && selectedCollege && selectedCourse && (
        <CourseDetail
          college={selectedCollege}
          course={selectedCourse}
          predictionNote={dashboardData.predictionNote}
          onBack={goToCourses}
        />
      )}
    </main>
  )
}

export default App
