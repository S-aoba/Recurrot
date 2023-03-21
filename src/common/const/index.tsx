export const MAIN_URL = {
  AUTH: '/',
  QUESTION: '/dashboard/new-questions',
  EVENT: '/dashboard/new-event',
  INFORMATION: '/dashboard/new-information',
} as const

export const SUB_URL = {
  DASHBOARD_NEW_QUESTIONS: '/dashboard/new-questions',
  DASHBOARD_QUESTIONS_WAITING_ANSWERS: '/dashboard/question-waiting-answers',
  DASHBOARD_QUESTION_DETAIL: '/dashboard/questions/[id]',
  DASHBOARD_MY_QUESTIONS: '/dashboard/my-questions',
  DASHBOARD_MY_ANSWERS: '/dashboard/my-answers',
  DASHBOARD_MY_PROFILE: '/dashboard/my-profile',
} as const
