import { atom } from 'jotai'

import type { MainNavTabStyleType, QuestionType, SubNavTabStyleType } from '@/common/type'

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

export const mainNavTabStyleAtom = atom<MainNavTabStyleType>('questions')
export const subNavTabStyleAtom = atom<SubNavTabStyleType>('new-questions')

export const editedQuestionAtom = atom({ id: 0, title: '', description: '' })
