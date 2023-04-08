import type { Answer, Question, User } from '@prisma/client'

import type { MAIN_URL, SUB_URL } from '../const'

export type MainUrlKeys = keyof typeof MAIN_URL
export type MainUrlVal = (typeof MAIN_URL)[MainUrlKeys]

export type SubUrlKeys = keyof typeof SUB_URL
export type SubUrlVal = (typeof SUB_URL)[SubUrlKeys]

type AnswerId = {
  id: string
}

type UserInfo = {
  userName: string
  email: string
  profileImage: string
}

export type QuestionAndAnswerIdListType = {
  answers: AnswerId[]
  user: UserInfo
} & Question

export type AnswerAndPostedUserInfoType = {
  user: UserInfo
} & Answer

export type UnreadAnswer = {
  questionId: string
  questionTitle: string
  answerId: string
}

export type UserType = {
  unreadAnswers?: UnreadAnswer[]
} & User

export type HashtagType = {
  hashtag: string
}

export type MainNavTabStyleType = 'auth' | 'question' | 'event' | 'information'

////////////////////////////////////

type MainNavTab = 'questions' | 'event' | 'information' | null

type SubNavTab = 'new-questions' | 'question-waiting-answers' | 'my-questions' | 'my-answers' | 'my-profile' | null

export type NavTab = {
  main: MainNavTab
  sub: SubNavTab
}

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
