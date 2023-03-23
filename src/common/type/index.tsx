import type { MAIN_URL, SUB_URL } from '../const'

export type MainUrlKeys = keyof typeof MAIN_URL
export type MainUrlVal = (typeof MAIN_URL)[MainUrlKeys]

export type SubUrlKeys = keyof typeof SUB_URL
export type SubUrlVal = (typeof SUB_URL)[SubUrlKeys]

export type QuestionType = {
  questionId: string
  postedUseId: string
  title: string
  content: string
  postDate: string
  hashtagList: HashtagType[]
  answerList: string[]
}

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
  id: number
  title: string
  description: string
}
