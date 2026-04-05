# Student Performance Dashboard (Version 1)

This is a beginner-friendly React + Vite website for an academic project:
**Predicting Student Academic Performance Using Publicly Available Educational Data**.

## What it includes

- Landing page with project title and **Open Dashboard** button
- 3 colleges:
  - Computer Science
  - Engineering
  - Business Administration
- 2 courses inside each college
- Students with coursework grades
- Simple prediction output (final estimate + risk status)

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

## Edit data

Edit this file:

- `src/data/dashboardData.js`

## Prediction rules

Edit this file:

- `src/utils/predictor.js`

Version 1 mapping:

- A+ → likely A+ final, not at-risk
- B → likely B final, not at-risk
- C → likely C final, monitor
- D → likely D final, at-risk

## Notes

- Frontend only
- No backend
- No database
- No authentication
- Easy to extend later for Version 2 (study time, absences, previous failures)
