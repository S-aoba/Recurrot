import { useAtomValue } from 'jotai'
import Head from 'next/head'
import { useState } from 'react'

import { editedQuestionAtom } from '@/store/atom'

import { Edit } from './Edit'
import { useEdit } from './useEdit'

/**
 * @package
 */

export const EditPage = () => {
  const editedQuestion = useAtomValue(editedQuestionAtom)

  const [isUpdateQuestionLoading, setIsUpdateQuestionLoading] = useState(false)

  const { handleDiscardChangesAndRedirectToPostedQuestions, handleUpdateQuestion } = useEdit({
    setIsUpdateQuestionLoading,
  })

  return (
    <>
      <Head>
        <title>Recurrot - 編集</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Edit
        onSubmit={handleUpdateQuestion}
        isLoading={isUpdateQuestionLoading}
        questionId={editedQuestion.id}
        onClick={handleDiscardChangesAndRedirectToPostedQuestions}
      />
    </>
  )
}
