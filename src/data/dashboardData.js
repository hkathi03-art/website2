// =========================================
// Dashboard Data (Single Dedicated Data File)
// =========================================
// Beginner note:
// - Edit this file when you want to change title, colleges, courses, or students.
// - Keep grade values to: A+, B, C, D for version 1.

export const dashboardData = {
  project: {
    title: 'Predicting Student Academic Performance Using Publicly Available Educational Data',
    subtitle: 'Simple advisor-facing dashboard using local mock data.'
  },
  predictionNote:
    'Note: This prediction is a basic Version 1 estimate using coursework grade only.',
  colleges: [
    {
      id: 'cs',
      name: 'Computer Science',
      courses: [
        {
          id: 'cs101',
          name: 'Introduction to Programming',
          students: [
            { id: 's1', name: 'Alice Johnson', courseworkGrade: 'A+' },
            { id: 's2', name: 'Brian Lee', courseworkGrade: 'B' },
            { id: 's3', name: 'Carla Gomez', courseworkGrade: 'C' }
          ]
        },
        {
          id: 'cs201',
          name: 'Data Structures',
          students: [
            { id: 's4', name: 'Daniel Smith', courseworkGrade: 'B' },
            { id: 's5', name: 'Eva Brown', courseworkGrade: 'A+' },
            { id: 's6', name: 'Farhan Ali', courseworkGrade: 'D' }
          ]
        }
      ]
    },
    {
      id: 'eng',
      name: 'Engineering',
      courses: [
        {
          id: 'eng101',
          name: 'Engineering Mathematics',
          students: [
            { id: 's7', name: 'Grace Martin', courseworkGrade: 'A+' },
            { id: 's8', name: 'Hector Davis', courseworkGrade: 'C' },
            { id: 's9', name: 'Ivy Wilson', courseworkGrade: 'B' }
          ]
        },
        {
          id: 'eng202',
          name: 'Thermodynamics',
          students: [
            { id: 's10', name: 'Jason Miller', courseworkGrade: 'D' },
            { id: 's11', name: 'Karla Thomas', courseworkGrade: 'B' },
            { id: 's12', name: 'Liam White', courseworkGrade: 'C' }
          ]
        }
      ]
    },
    {
      id: 'bus',
      name: 'Business Administration',
      courses: [
        {
          id: 'bus101',
          name: 'Principles of Management',
          students: [
            { id: 's13', name: 'Maya Clark', courseworkGrade: 'B' },
            { id: 's14', name: 'Noah Walker', courseworkGrade: 'C' },
            { id: 's15', name: 'Olivia Hall', courseworkGrade: 'A+' }
          ]
        },
        {
          id: 'bus203',
          name: 'Marketing Fundamentals',
          students: [
            { id: 's16', name: 'Paul Young', courseworkGrade: 'D' },
            { id: 's17', name: 'Queen Adams', courseworkGrade: 'B' },
            { id: 's18', name: 'Ryan Scott', courseworkGrade: 'A+' }
          ]
        }
      ]
    }
  ]
}
