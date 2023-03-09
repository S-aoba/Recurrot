export const MAIN_URL = {
  TOP: '/',
  QUESTION_DETAIL: 'questions/[questionId]',
  EVENT: '/event',
  INFORMATION: '/information',
  DASHBOARD_QUESTIONS: '/dashboard/questions',
} as const

export const SUB_URL = {
  NEW_QUESTIONS: '/',
  QUESTION_WAITING_ANSWERS: '/question-waiting-answers',
  DASHBOARD_QUESTIONS: '/dashboard/questions',
  DASHBOARD_ANSWERS: '/dashboard/answers',
  DASHBOARD_PROFILE: '/dashboard/profile',
} as const
