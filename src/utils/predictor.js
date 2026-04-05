// Version 1 simple prediction rules.
// This is intentionally easy to understand and update later.

const predictionRules = {
  'A+': 'Likely A+ in final',
  B: 'Likely B in final',
  C: 'Likely C in final',
  D: 'At-risk / Likely D in final'
}

export function predictFinalResult(courseworkGrade) {
  return predictionRules[courseworkGrade] || 'No prediction available'
}
