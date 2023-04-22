import { atom } from 'jotai/vanilla'

import type { EditedAnswer, EditedQuestion, MainNavTab, SubNavTab } from '@/common/type'

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

// export const navTabAtom = atom<NavTab>({ main: null, sub: null })

// editedQuestionAtom questionDescriptionAtomのすべての値がセットされたらfalseを返す
export const isQuestionDisabledAtom = atom((get) => {
  const { title, hashtags } = get(editedQuestionAtom)
  const questionDescription = get(questionDescriptionAtom)
  if (title !== '' && hashtags.length !== 0 && questionDescription !== '') return false
  return true
})

// editedQuestionAtom questionDescriptionAtomのすべての値をリセットする
export const resetQuestionAtom = atom(null, (_, set) => {
  set(resetEditedQuestionAtom)
  set(resetQuestionDescriptionAtom)
})

export const isLoadingAtom = atom<boolean>(false)

export const isActiveTabAtom = atom<SubNavTab>('null')
export const isMainActiveTabAtom = atom<MainNavTab>('null')
