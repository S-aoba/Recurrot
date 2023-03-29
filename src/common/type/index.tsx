import type { Answer, Question } from '@prisma/client'

import type { MAIN_URL, SUB_URL } from '../const'

export type MainUrlKeys = keyof typeof MAIN_URL
export type MainUrlVal = (typeof MAIN_URL)[MainUrlKeys]

export type SubUrlKeys = keyof typeof SUB_URL
export type SubUrlVal = (typeof SUB_URL)[SubUrlKeys]

type AnswerId = {
  id: string
}

type UserName = {
  userName: string
  email: string
}

export type QuestionAndAnswerIdListType = {
  answers: AnswerId[]
  user: UserName
} & Question

export type AnswerAndPostedUserNameType = {
  user: UserName
} & Answer

export type HashtagType = {
  hashtag: string
}

export type MainNavTabStyleType = 'auth' | 'question' | 'event' | 'information'
export type SubNavTabStyleType =
  | 'dashboard/new-questions'
  | 'dashboard/question-waiting-answers'
  | 'dashboard/my-questions'
  | 'dashboard/my-answers'
  | 'dashboard/my-profile'

////////////////////////////////////
export type EditedQuestion = {
  id: string
  title: string
  description: string
  hashtags: string[]
}

export type EditedAnswer = {
  id: string
  description: string
}
