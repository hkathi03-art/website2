// =========================================
// Version 1 Rules (Coursework Only)
// =========================================
// We keep this intentionally simple for beginners.

const predictionRules = {
  'A+': { finalEstimate: 'Likely A+ in final', riskStatus: 'Not at-risk' },
  B: { finalEstimate: 'Likely B in final', riskStatus: 'Not at-risk' },
  C: { finalEstimate: 'Likely C in final', riskStatus: 'Monitor' },
  D: { finalEstimate: 'Likely D in final', riskStatus: 'At-risk' }
}

export function predictFromCoursework(courseworkGrade) {
  return (
    predictionRules[courseworkGrade] || {
      finalEstimate: 'No prediction available',
      riskStatus: 'Unknown'
    }
  )
}
