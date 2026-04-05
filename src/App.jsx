import { useMemo, useState } from 'react'
import LandingPage from './components/LandingPage'
import CollegeList from './components/CollegeList'
import CourseList from './components/CourseList'
import CourseDetail from './components/CourseDetail'
import { dashboardData } from './data/dashboardData'

function App() {
  const [appStage, setAppStage] = useState('landing')
  const [selectedCollege, setSelectedCollege] = useState(null)
  const [selectedCourse, setSelectedCourse] = useState(null)

  const stageLabels = {
    landing: 'Step 1: Project Overview',
    dashboard: 'Step 2: Select College',
    courses: 'Step 3: Select Course',
    'course-detail': 'Step 4: Review Student Prediction'
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
        <h2 className="project-mini-title">{dashboardData.project.shortTitle}</h2>
        <p className="step-label">{stageLabels[appStage]}</p>
        <p className="breadcrumb">{breadcrumb}</p>
      </header>

      {appStage === 'landing' && (
        <LandingPage
          title={dashboardData.project.fullTitle}
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

      <footer className="context-footer">
        <strong>Sprint 1 context:</strong> {dashboardData.sprintOneContext.note} Key signals: 
        {dashboardData.sprintOneContext.keySignals.join(', ')}.
      </footer>
    </main>
  )
}

export default App
