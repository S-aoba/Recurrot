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

const initialEditedQuestion: EditedQuestion = { id: 0, title: '', description: '' }
export const editedQuestionAtom = atom<EditedQuestion>(initialEditedQuestion)
export const resetEditedQuestionAtom = atom(null, (_, set) => {
  return set(editedQuestionAtom, initialEditedQuestion)
})

export const questionDescriptionAtom = atom<string>('')
export const resetQuestionDescriptionAtom = atom(null, (_, set) => {
  set(questionDescriptionAtom, '')
})

export const answerDescriptionAtom = atom<string>('')
export const resetAnswerDescriptionAtom = atom(null, (_, set) => {
  set(answerDescriptionAtom, '')
})

const initialEditedAnswer: EditedAnswer = { id: 0, description: '' }
export const editedAnswerAtom = atom<EditedAnswer>(initialEditedAnswer)
