// Version 1 rules-based predictor.

const rules = {
  'A+': { finalEstimate: 'Likely A+ in final', riskStatus: 'Not at-risk' },
  B: { finalEstimate: 'Likely B in final', riskStatus: 'Not at-risk' },
  C: { finalEstimate: 'Likely C in final', riskStatus: 'Monitor' },
  D: { finalEstimate: 'Likely D in final', riskStatus: 'At-risk' }
}

export function predictFromCoursework(grade) {
  return rules[grade] || { finalEstimate: 'No estimate', riskStatus: 'Unknown' }
}
