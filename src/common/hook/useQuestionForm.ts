import type { Editor } from '@tiptap/react'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'

import { resetEditedQuestionAtom, resetQuestionDescriptionAtom } from '@/store/question-atom'

import type { EditedQuestion } from '../type'

export const useQuestionForm = (editedQuestion: EditedQuestion, description: string, editor: Editor | null) => {
  const router = useRouter()

  const [, resetEditedQuestion] = useAtom(resetEditedQuestionAtom)
  const [_, resetDescription] = useAtom(resetQuestionDescriptionAtom)

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
      if (isOK && editor) {
        resetEditedQuestion()
        editor.commands.setContent('')
        resetDescription()
        return true
      }
      // 履歴スタックの最新にhttp://localhost:3000/dashboard/questions/postを追加する
      window.history.pushState({}, '', '/dashboard/questions/post')
      return false
    }
    return true
  }, [editedQuestion, description, editor, resetEditedQuestion, resetDescription])

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
