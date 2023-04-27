export const MAIN_URL = {
  AUTH: '/',
  QUESTION: '/dashboard/new-questions',
  QUESTION_POST: '/dashboard/questions/post',
  EVENT: '/dashboard/new-event',
  INFORMATION: '/dashboard/new-information',
} as const

export const SUB_URL = {
  DASHBOARD_NEW_QUESTIONS: '/dashboard/new-questions',
  DASHBOARD_QUESTIONS_WAITING_ANSWERS: '/dashboard/question-waiting-answers',
  DASHBOARD_QUESTION_DETAIL: '/dashboard/questions/[id]',
  DASHBOARD_POSTED_QUESTIONS: '/dashboard/posted-questions',
  DASHBOARD_QUESTIONS_ANSWERED: '/dashboard/questions-answered',
  DASHBOARD_MY_PROFILE: '/dashboard/my-profile',
} as const

export const COLOR = {
  main: '#7B86AA',
}
