import type { MAIN_URL, SUB_URL } from '../const'

export type MainUrlKeys = keyof typeof MAIN_URL
export type MainUrlVal = (typeof MAIN_URL)[MainUrlKeys]

export type SubUrlKeys = keyof typeof SUB_URL
export type SubUrlVal = (typeof SUB_URL)[SubUrlKeys]

export type NewQuestion = {
  id: string
  createdAt: Date
  updatedAt: Date
  title: string
  hashtags: string[]
  codingProblem: string
  user: {
    userName: string
    profileImage: string | null
  }
  answerCount: number
}
export type QuestionWaitingAnswered = NewQuestion

export type MyAnswer = NewQuestion
export type MyQuestion = NewQuestion
export type SearchQuestion = NewQuestion
export type AnswerType = {
  id: string
  createdAt: Date
  updatedAt: Date
  description: string
  questionId: string
  userId: string
  user: {
    userName: string
    profileImage: string | null
  }
}

export type SingleQuestion = {
  id: string
  createdAt: Date
  updatedAt: Date
  title: string
  description: string
  hashtags: string[]
  codingProblem: string
  userId: string
  user: {
    userName: string
    profileImage: string | null
  }
}

export type Notification = {
  questionId: string
  questionTitle: string
  answerId: string
  answerUserProfileImage: string | null
}

export type MyProfile = {
  id: string
  userName: string | null
  selfIntroduction: string | null
  profileImage: string | null
  twitterUrl: string | null
  githubUrl: string | null
  websiteUrl: string | null
}

export type EditedUpdateMyProfile = {
  userName: string | null
  selfIntroduction: string | null
  profileImage: string | null
  twitterUrl: string | null
  githubUrl: string | null
  websiteUrl: string | null
}

export type CurrentUser = {
  id: string
  profileImage: string | null
}

export type HashtagType = {
  hashtag: string
}

export type MainNavTab = 'questions' | 'event' | 'information' | 'null'

export type SubNavTab =
  | 'new-questions'
  | 'question-waiting-answers'
  | 'posted-questions'
  | 'questions-answered'
  | 'my-profile'
  | 'null'

export type EditedQuestion = {
  id: string
  title: string
  description: string
  hashtags: string[]
  codingProblem: string
}

export type EditedAnswer = {
  id: string
  description: string
}
