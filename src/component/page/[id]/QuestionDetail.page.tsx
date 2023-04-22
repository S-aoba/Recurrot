import { useDisclosure } from '@mantine/hooks'
import { useAtom, useSetAtom } from 'jotai'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { useMutateQuestion } from '@/common/hook/useMutateQuestion'
import { useNavTab } from '@/common/hook/useNavTab'
import { useQueryCurrentUser } from '@/common/hook/useQueryCurrentUser'
import { useQuerySingleQuestion } from '@/common/hook/useQuerySingleQuestion'
import { QuestionLoading } from '@/component/ui/Loading'
import { Modal } from '@/component/ui/Modal'
import { editedQuestionAtom, questionDescriptionAtom } from '@/store/atom'

import { QuestionDetail } from './QuestionDetail'

/**
 * @package
 */

export const QuestionDetailPage = () => {
  const [isDeleteQuestionOpened, { open: handleDeleteQuestionOpen, close: handleDeleteQuestionClose }] =
    useDisclosure(false)

  const [id, setId] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      if (typeof router.query.id === 'string') {
        setId(router.query.id)
      }
    }
  }, [router])

  useNavTab('null', 'null')

  const { data: question, status: questionStatus } = useQuerySingleQuestion(id)
  const { data: currentUser, status: currentUserStatus } = useQueryCurrentUser()
  const { deleteQuestionMutation } = useMutateQuestion()

  const [editedQuestion, setEditedQuestion] = useAtom(editedQuestionAtom)
  const setDescription = useSetAtom(questionDescriptionAtom)

  const [isDeleteQuestionLoading, setIsDeleteQuestionLoading] = useState(false)

  const year = question && question.createdAt.toString().slice(0, 4)
  const month = question && question.createdAt.toString().slice(5, 7)
  const day = question && question.createdAt.toString().slice(8, 10)

  const handleSetQuestion = () => {
    if (question) {
      setDescription(question.description)
      setEditedQuestion({ ...editedQuestion, id: question.id, title: question.title, hashtags: question.hashtags })
    }
  }

  const handleDeleteQuestion = () => {
    setIsDeleteQuestionLoading(true)
    setTimeout(() => {
      if (question) {
        deleteQuestionMutation.mutate(question.id)
        setIsDeleteQuestionLoading(false)
        handleDeleteQuestionClose()
      }
    }, 500)
  }

  if (questionStatus === 'loading' || currentUserStatus === 'loading') return <QuestionLoading />
  return (
    <>
      <Head>
        <title>Recurrot - {question && question.title} </title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Modal
        opened={isDeleteQuestionOpened}
        onClose={handleDeleteQuestionClose}
        onSubmit={handleDeleteQuestion}
        buttonWord='削除する'
        modalTitle='本当に削除してもよろしいですか？'
        description='この操作は取り消せません。ご注意ください。'
        isLoading={isDeleteQuestionLoading}
      />
      {question && currentUser && year && month && day && (
        <QuestionDetail
          id={id}
          question={question}
          currentUser={currentUser}
          onSetQuestion={handleSetQuestion}
          onDeleteQuestionOpen={handleDeleteQuestionOpen}
          year={year}
          month={month}
          day={day}
        />
      )}
    </>
  )
}
