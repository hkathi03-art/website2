// Single source of editable demo data for the whole dashboard.
// Keep grade values to: A+, B, C, D.

export const dashboardData = {
  projectTitle: 'Predicting Student Academic Performance Using Publicly Available Educational Data',
  subtitle: 'Advisor-facing dashboard (Version 1 demo)',
  predictionNote:
    'Version 1 estimate: this uses coursework grade only (simple rules), not a full ML model yet.',
  colleges: [
    {
      id: 'cs',
      name: 'Computer Science',
      courses: [
        {
          id: 'cs1',
          name: 'Introduction to Programming',
          students: [
            { id: 'cs1s1', name: 'Alice Johnson', courseworkGrade: 'A+' },
            { id: 'cs1s2', name: 'Brian Lee', courseworkGrade: 'B' },
            { id: 'cs1s3', name: 'Carla Gomez', courseworkGrade: 'C' }
          ]
        },
        {
          id: 'cs2',
          name: 'Data Structures',
          students: [
            { id: 'cs2s1', name: 'Daniel Smith', courseworkGrade: 'B' },
            { id: 'cs2s2', name: 'Eva Brown', courseworkGrade: 'A+' },
            { id: 'cs2s3', name: 'Farhan Ali', courseworkGrade: 'D' }
          ]
        }
      ]
    },
    {
      id: 'eng',
      name: 'Engineering',
      courses: [
        {
          id: 'eng1',
          name: 'Engineering Mathematics',
          students: [
            { id: 'eng1s1', name: 'Grace Martin', courseworkGrade: 'A+' },
            { id: 'eng1s2', name: 'Hector Davis', courseworkGrade: 'C' },
            { id: 'eng1s3', name: 'Ivy Wilson', courseworkGrade: 'B' }
          ]
        },
        {
          id: 'eng2',
          name: 'Thermodynamics',
          students: [
            { id: 'eng2s1', name: 'Jason Miller', courseworkGrade: 'D' },
            { id: 'eng2s2', name: 'Karla Thomas', courseworkGrade: 'B' },
            { id: 'eng2s3', name: 'Liam White', courseworkGrade: 'C' }
          ]
        }
      ]
    },
    {
      id: 'bus',
      name: 'Business Administration',
      courses: [
        {
          id: 'bus1',
          name: 'Principles of Management',
          students: [
            { id: 'bus1s1', name: 'Maya Clark', courseworkGrade: 'B' },
            { id: 'bus1s2', name: 'Noah Walker', courseworkGrade: 'C' },
            { id: 'bus1s3', name: 'Olivia Hall', courseworkGrade: 'A+' }
          ]
        },
        {
          id: 'bus2',
          name: 'Marketing Fundamentals',
          students: [
            { id: 'bus2s1', name: 'Paul Young', courseworkGrade: 'D' },
            { id: 'bus2s2', name: 'Queen Adams', courseworkGrade: 'B' },
            { id: 'bus2s3', name: 'Ryan Scott', courseworkGrade: 'A+' }
          ]
        }
      ]
    }
  ]
}
