# Predicting Student Academic Performance Using Publicly Available Educational Data

A simple beginner-friendly React dashboard for viewing colleges, courses, students, coursework grades, and a basic prediction for final results.

## What the app does

- Shows a landing page with the project title first.
- Lets you open a dashboard and browse:
  1. Colleges
  2. Courses in a college
  3. Students in a course
- Shows each student’s coursework grade and a **Version 1** predicted final result.

## Version 1 prediction logic (simple rules)

- A+ coursework → Likely A+ in final
- B coursework → Likely B in final
- C coursework → Likely C in final
- D coursework → At-risk / Likely D in final

## Important project choices

- No backend
- No database
- No authentication
- No extra libraries
- Local mock data only (easy to edit)

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Open the local URL shown in terminal (usually `http://localhost:5173`).

## Edit data (single dedicated file)

All editable sample content is in:

- `src/data/dashboardData.js`

Edit this one file to change:

- Project title/subtitle
- Colleges
- Courses
- Students
- Coursework grades
- Prediction note text shown in the UI

## Change prediction behavior

Edit:

- `src/utils/predictor.js`

The mapping in `predictionRules` controls the displayed estimate.

## Simple project structure

```text
student-performance-dashboard/
├─ src/
│  ├─ App.jsx
│  ├─ styles.css
│  ├─ data/
│  │  └─ dashboardData.js
│  ├─ utils/
│  │  └─ predictor.js
│  └─ components/
│     ├─ LandingPage.jsx
│     ├─ CollegeList.jsx
│     ├─ CourseList.jsx
│     └─ CourseDetail.jsx
├─ index.html
├─ package.json
└─ vite.config.js
```

## Version 2 idea

In Version 2, we can improve prediction realism by using:

- study time
- absences
- previous failures

Suggested path:

1. Add these fields per student in `src/data/dashboardData.js`.
2. Update `src/utils/predictor.js` to use a small weighted scoring rule.
3. Show output as `At-risk` vs `Not at-risk` (and optional confidence label).

This keeps the same frontend structure and still avoids backend complexity at first.
