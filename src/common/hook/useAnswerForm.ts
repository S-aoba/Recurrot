import type { Editor } from '@tiptap/react'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'

import { resetAnswerDescriptionAtom } from '@/store/question-atom'

export const useAnswerForm = (description: string, editor: Editor | null) => {
  const router = useRouter()
  const [_, resetAnswerDescription] = useAtom(resetAnswerDescriptionAtom)

  const handleBeforeUnload = useCallback(
    (e: BeforeUnloadEvent) => {
      if (description !== '') {
        e.preventDefault()
        e.returnValue = ''
        return true
      }
    },
    [description]
  )
  const handleBeforePopState = useCallback(() => {
    if (description !== '') {
      const isOK = window.confirm('入力中の内容が失われますが、よろしいですか？')
      if (isOK && editor) {
        resetAnswerDescription()
        editor.commands.setContent('')
        return true
      }
      // 履歴スタックの最新にhttp://localhost:3000/dashboard/questions/postを追加する
      window.history.pushState({}, '', '/dashboard/questions/post')
      return false
    }
    return true
  }, [description, resetAnswerDescription, editor])

  useEffect(() => {
    router.beforePopState(handleBeforePopState)

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      router.beforePopState(() => {
        return true
      })
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [handleBeforeUnload, handleBeforePopState, router])
}
