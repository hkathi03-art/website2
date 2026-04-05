# Predicting Student Academic Performance Using Publicly Available Educational Data

A beginner-friendly React + Vite dashboard that shows colleges, courses, students, coursework grades, and a simple predicted final result.

## What this app does

- Shows a landing page with the project title.
- Opens a dashboard of 3 colleges:
  - Computer Science
  - Engineering
  - Business Administration
- Shows exactly 2 courses inside each college.
- Shows students in each course with:
  - Coursework grade (A+, B, C, D)
  - Predicted final result using a simple rules-based model

## Version 1 prediction logic

- A+ coursework → Likely A+ in final
- B coursework → Likely B in final
- C coursework → Likely C in final
- D coursework → At-risk / Likely D in final

## Tech stack

- React (frontend)
- Vite (dev server + build)
- Plain local JavaScript data file (easy to edit)
- Simple CSS (no backend, no database, no login)

## How to run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npm run dev
   ```
3. Open the URL shown in your terminal (usually `http://localhost:5173`).

## How to edit the data

All project data is in:

- `src/data/academicData.js`

Edit this file to change:

- Colleges
- Courses
- Students
- Coursework grades

### Data format used

- `colleges` (array)
  - each college has `id`, `name`, `courses`
- each `course` has `id`, `name`, `students`
- each `student` has `id`, `name`, `courseworkGrade`

Allowed grade values for version 1:

- `A+`
- `B`
- `C`
- `D`

## How to change prediction behavior

Edit:

- `src/utils/predictor.js`

You can update the mapping rules in `predictionRules`.

## Project structure

```text
student-performance-dashboard/
├─ index.html
├─ package.json
├─ vite.config.js
├─ src/
│  ├─ App.jsx
│  ├─ main.jsx
│  ├─ styles.css
│  ├─ data/
│  │  └─ academicData.js
│  ├─ utils/
│  │  └─ predictor.js
│  └─ components/
│     ├─ LandingPage.jsx
│     ├─ CollegeList.jsx
│     ├─ CourseList.jsx
│     └─ CourseDetail.jsx
└─ README.md
```

## Suggested Version 2 (more realistic features)

In version 2, replace the simple grade-only rule with features from your Sprint 1 context:

- Study time
- Absences
- Previous failures

Potential next step:

- Add these fields per student in `academicData.js`
- Create a basic weighted scoring function in `predictor.js`
- Show risk status: `At-risk` or `Not at-risk`
- Later, you can plug in a trained classification model while keeping the same UI structure
