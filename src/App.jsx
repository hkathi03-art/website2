import { useState } from 'react'
import LandingPage from './components/LandingPage'
import CollegeList from './components/CollegeList'
import CourseList from './components/CourseList'
import CourseDetail from './components/CourseDetail'
import { colleges, projectMeta } from './data/academicData'

function App() {
  // appStage controls which screen is shown
  const [appStage, setAppStage] = useState('landing')
  const [selectedCollege, setSelectedCollege] = useState(null)
  const [selectedCourse, setSelectedCourse] = useState(null)

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

  return (
    <main className="app-shell">
      {appStage === 'landing' && (
        <LandingPage
          title={projectMeta.title}
          subtitle={projectMeta.subtitle}
          onOpenDashboard={openDashboard}
        />
      )}

      {appStage === 'dashboard' && (
        <CollegeList colleges={colleges} onSelectCollege={chooseCollege} />
      )}

      {appStage === 'courses' && selectedCollege && (
        <CourseList
          college={selectedCollege}
          onBack={goToColleges}
          onSelectCourse={chooseCourse}
        />
      )}

      {appStage === 'course-detail' && selectedCollege && selectedCourse && (
        <CourseDetail college={selectedCollege} course={selectedCourse} onBack={goToCourses} />
      )}
    </main>
  )
}

export default App
