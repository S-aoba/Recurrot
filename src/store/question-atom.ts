import { atom } from 'jotai'

import type { EditedAnswer, EditedQuestion, MainNavTabStyleType, QuestionType, SubNavTabStyleType } from '@/common/type'

export const initialQuestion: QuestionType = {
  questionId: '',
  postedUseId: '',
  title: '',
  content: '',
  postDate: '',
  hashtagList: [],
  answerList: [],
}

export const questionAtom = atom<QuestionType>(initialQuestion)
export const questionListAtom = atom<QuestionType[]>([])

export const mainNavTabStyleAtom = atom<MainNavTabStyleType>('question')
export const subNavTabStyleAtom = atom<SubNavTabStyleType>('dashboard/new-questions')

export const initialEditedQuestion: EditedQuestion = { id: 0, title: '', description: '' }
export const editedQuestionAtom = atom<EditedQuestion>(initialEditedQuestion)
export const descriptionAtom = atom<string>('')

export const initialEditedAnswer: EditedAnswer = { id: 0, description: '' }
export const editedAnswerAtom = atom<EditedAnswer>(initialEditedAnswer)
