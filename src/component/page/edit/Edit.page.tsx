import { useAtom, useAtomValue } from 'jotai'
import Head from 'next/head'
import type { FormEvent } from 'react'
import { useState } from 'react'

import { useDescriptionEditor } from '@/common/hook/useDescriptionEditor'
import { useMutateQuestion } from '@/common/hook/useMutateQuestion'
import { editedQuestionAtom, questionDescriptionAtom } from '@/store/atom'

import { Edit } from './Edit'

/**
 * @package
 */

export const EditPage = () => {
  const editedQuestion = useAtomValue(editedQuestionAtom)

  const [isLoading, setIsLoading] = useState(false)

  const [description, _] = useAtom(questionDescriptionAtom)

  const { questionEditor } = useDescriptionEditor()

  const { updateQuestionMutation } = useMutateQuestion()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    if (questionEditor && editedQuestion.id !== '0') {
      // 1秒後にupdateQuestionMutationを実行する
      setTimeout(() => {
        updateQuestionMutation.mutate({
          id: editedQuestion.id,
          title: editedQuestion.title,
          description,
          hashtags: editedQuestion.hashtags,
        })
        questionEditor.commands.setContent('')
      }, 1000)
    }
  }
  return (
    <>
      <Head>
        <title>Recurrot - 編集</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Edit onSubmit={handleSubmit} isLoading={isLoading} questionId={editedQuestion.id} />
    </>
  )
}
