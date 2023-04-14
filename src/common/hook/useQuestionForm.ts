import { useAtom, useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'

import { useDescriptionEditor } from '@/common/hook/useDescriptionEditor'
import {
  editedQuestionAtom,
  questionDescriptionAtom,
  resetEditedQuestionAtom,
  resetQuestionDescriptionAtom,
} from '@/store/atom'

export const useQuestionForm = () => {
  const router = useRouter()

  const editedQuestion = useAtomValue(editedQuestionAtom)
  const description = useAtomValue(questionDescriptionAtom)
  const [_, resetEditedQuestion] = useAtom(resetEditedQuestionAtom)
  const [__, resetDescription] = useAtom(resetQuestionDescriptionAtom)
  const { questionEditor } = useDescriptionEditor()

  // フォームの入力中に画面をリロードした場合、アラートを表示する
  const handleBeforeUnload = useCallback(
    (e: BeforeUnloadEvent) => {
      if (editedQuestion.title !== '' || editedQuestion.hashtags.length !== 0 || description) {
        e.preventDefault()
        // 表示する文字はブラウザで規定されているためから文字を設定する
        e.returnValue = ''
        return true
      }
    },
    [editedQuestion, description]
  )

  // handleBeforePopStateをuseCallbackで定義する
  const handleBeforePopState = useCallback(() => {
    if (editedQuestion.title !== '' || editedQuestion.hashtags.length !== 0 || description) {
      const isOK = window.confirm('入力中の内容が失われますが、よろしいですか？')
      if (isOK && questionEditor) {
        resetEditedQuestion()
        questionEditor.commands.setContent('')
        resetDescription()
        return true
      }
      // 履歴スタックの最新に、現在のURLを追加して、URLを変更しないようにする
      router.events.emit('routeChangeComplete', router.asPath, router.asPath)
      return false
    }
    return true
  }, [editedQuestion, description, questionEditor, resetEditedQuestion, resetDescription, router])

  useEffect(() => {
    // ページコンポーネントのマウント時に、beforePopState関数を登録する
    router.beforePopState(handleBeforePopState)
    window.addEventListener('beforeunload', handleBeforeUnload)

    // beforePopState関数をアンマウントするために、コンポーネントのクリーンアップ関数で呼び出す
    return () => {
      router.beforePopState(() => {
        return true
      })
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [router, handleBeforePopState, handleBeforeUnload, description])
}
