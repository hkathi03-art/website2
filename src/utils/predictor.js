// =========================================
// Version 1 Prediction Rules (Very Simple)
// =========================================
// We use coursework grade only for now.
// In Version 2, this file can include studyTime, absences,
// and previousFailures without changing the rest of the UI.

const predictionRules = {
  'A+': 'Likely A+ in final',
  B: 'Likely B in final',
  C: 'Likely C in final',
  D: 'At-risk / Likely D in final'
}

export function predictFinalResult(courseworkGrade) {
  return predictionRules[courseworkGrade] || 'No prediction available'
}
