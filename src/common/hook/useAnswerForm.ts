import { useAtom, useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'

import { useDescriptionEditor } from '@/common/hook/useDescriptionEditor'
import { answerDescriptionAtom, resetAnswerDescriptionAtom } from '@/store/question-atom'

export const useAnswerForm = () => {
  const router = useRouter()
  const description = useAtomValue(answerDescriptionAtom)

  const { answerEditor } = useDescriptionEditor()

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
      if (isOK && answerEditor) {
        resetAnswerDescription()
        answerEditor.commands.setContent('')
        return true
      }
      // 履歴スタックの最新に、現在のURLを追加して、URLを変更しないようにする
      router.events.emit('routeChangeComplete', router.asPath, router.asPath)
      return false
    }
    return true
  }, [description, resetAnswerDescription, answerEditor, router])

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
