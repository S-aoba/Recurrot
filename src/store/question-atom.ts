import { atom } from 'jotai'

import type { EditedQuestion, MainNavTabStyleType, QuestionType, SubNavTabStyleType } from '@/common/type'

export const initialQuestion: QuestionType = {
  questionId: '',
  postedUseId: '',
  title: '',
  content: '',
  postDate: '',
  hashtagList: [],
  answerList: [],
}

export const initialEditedQuestion: EditedQuestion = { id: 0, title: '', description: '' }

export const questionAtom = atom<QuestionType>(initialQuestion)
export const questionListAtom = atom<QuestionType[]>([])

export const mainNavTabStyleAtom = atom<MainNavTabStyleType>('question')
export const subNavTabStyleAtom = atom<SubNavTabStyleType>('dashboard/new-questions')

export const editedQuestionAtom = atom<EditedQuestion>(initialEditedQuestion)
export const descriptionAtom = atom<string>('')
