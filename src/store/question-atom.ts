import { atom } from 'jotai'

import type { EditedAnswer, EditedQuestion, MainNavTabStyleType, NavTab } from '@/common/type'

export const mainNavTabStyleAtom = atom<MainNavTabStyleType>('question')

const initialEditedQuestion: EditedQuestion = { id: '0', title: '', description: '', hashtags: [] }
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

const initialEditedAnswer: EditedAnswer = { id: '0', description: '' }
export const editedAnswerAtom = atom<EditedAnswer>(initialEditedAnswer)

export const navTabAtom = atom<NavTab>({ main: null, sub: null })
