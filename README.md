# Predicting Student Academic Performance Using Publicly Available Educational Data

A lightweight, beginner-friendly React website that reflects the same academic-performance prediction idea from the project proposal and Sprint 1 context.

## Context used from project documents

This simplified website uses your proposal + Sprint 1 only for naming and context:

- advisor-facing dashboard concept
- at-risk vs not-at-risk framing
- important Sprint 1 signals: study time, absences, previous failures

The implementation stays intentionally simple (Version 1 rules only).

## What this website does

- Shows a landing page with the project title.
- Lets the user open a simple advisor dashboard.
- Shows 3 colleges and 2 courses per college.
- Shows students in each course with:
  - coursework grade
  - predicted final estimate
  - risk status (At-risk / Monitor / Not at-risk)

## Version 1 prediction logic

Version 1 uses **coursework grade only**:

- A+ → likely A+ final, Not at-risk
- B → likely B final, Not at-risk
- C → likely C final, Monitor
- D → likely D final, At-risk

## Project rules kept simple

- No backend
- No database
- No authentication
- No extra libraries
- Local editable data only

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL shown in terminal (usually `http://localhost:5173`).

## Edit the data (single file)

Use this file:

- `src/data/dashboardData.js`

You can edit:

- title/subtitle
- colleges/courses/students
- coursework grades
- UI prediction note
- Sprint 1 context note/signals

## Update prediction behavior

Edit:

- `src/utils/predictor.js`

## Version 2 idea (later)

To align more closely with Sprint 1 findings, Version 2 can add:

- study time
- absences
- previous failures

Possible path:

1. Add these fields per student in `src/data/dashboardData.js`.
2. Replace grade-only rules with a small weighted risk score in `src/utils/predictor.js`.
3. Keep the same simple UI while improving prediction realism.
