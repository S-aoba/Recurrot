import { Avatar, Button, Loader } from '@mantine/core'
import { Answer } from '@prisma/client'
import { useAtom, useSetAtom } from 'jotai'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { useMutateAnswer } from '@/common/hook/useMutateAnswer'
import { useMutateQuestion } from '@/common/hook/useMutateQuestion'
import { useQueryAnswers } from '@/common/hook/useQueryAnswers'
import { useQuerySingleQuestion } from '@/common/hook/useQuerySingleQuestion'
import { useQueryUser } from '@/common/hook/useQueryUser'
import { WrapperLayout } from '@/component/layout/WrapperLayout'
import { CreateAnswerForm, UpdateAnswerForm } from '@/component/ui/Form/Answer'
import {
  answerDescriptionAtom,
  editedAnswerAtom,
  editedQuestionAtom,
  questionDescriptionAtom,
} from '@/store/question-atom'

const QuestionDetail = () => {
  const [id, setId] = useState<string | string[] | undefined>()
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      setId(router.query.id)
    }
  }, [router])

  const { data: question, status: questionStatus } = useQuerySingleQuestion(Number(id))
  const { data: answers, status: answersStatus } = useQueryAnswers(Number(id))
  const { data: user, status: userStatus } = useQueryUser()
  const { deleteQuestionMutation } = useMutateQuestion()

  const [editedQuestion, setEditedQuestion] = useAtom(editedQuestionAtom)
  const setDescription = useSetAtom(questionDescriptionAtom)

  if (questionStatus === 'loading' || answersStatus === 'loading' || userStatus === 'loading') return <Loader />

  const year = question?.createdAt.toString().slice(0, 4)
  const month = question?.createdAt.toString().slice(5, 7)
  const day = question?.createdAt.toString().slice(8, 10)

  const handleSetQuestion = () => {
    if (question) {
      setDescription(question.description)
      setEditedQuestion({ ...editedQuestion, id: question.id, title: question.title })
    }
  }

  const handleDeleteQuestion = () => {
    if (question) {
      deleteQuestionMutation.mutate(question.id)
    }
  }

  return (
    <>
      <Head>
        <title>Recurrot - 新着</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {question && answers && user && (
        <WrapperLayout>
          <main className=' flex h-fit flex-1 flex-col items-center gap-y-10 p-5'>
            <div className=' w-10/12 border-t-0 border-r-0 border-b border-l-0 border-solid border-gray-200 bg-white px-3'>
              <h1>{question.title}</h1>
            </div>
            <div className=' w-8/12 border border-solid border-gray-200 bg-white p-5'>
              <div className=' py-5'>
                <div className=' flex items-center gap-x-2 border-t-0 border-r-0 border-b border-l-0 border-solid border-gray-200 pb-2 text-lg'>
                  <Avatar radius={'xl'} />
                  <span>質問者: {question.userId}</span>
                  <span>
                    質問投稿日: {year} / {month} / {day}
                  </span>
                  {user.id === question.userId && (
                    <>
                      <Link href={'/dashboard/questions/edit'} type='button'>
                        <Button type='button' className=' hover:transform-none' onClick={handleSetQuestion}>
                          編集する
                        </Button>
                      </Link>
                      <Button type='button' className=' hover:transform-none' onClick={handleDeleteQuestion}>
                        削除する
                      </Button>
                    </>
                  )}
                </div>
                <div className=' py-5'>
                  <a className=' rounded-3xl border border-solid border-gray-200 p-3'>
                    <Image
                      src={'/typescript.png'}
                      width={30}
                      height={30}
                      alt={'typescriptIcon'}
                      className='mr-2 rounded-full'
                    />
                    <span>typescript</span>
                  </a>
                </div>
                {question.description && <div dangerouslySetInnerHTML={{ __html: question.description }}></div>}
              </div>
            </div>

            <div className=' w-10/12 border-t-0 border-r-0 border-b border-l-0 border-solid border-gray-200 bg-white px-3'>
              <p className=' mb-0 pb-2 text-2xl'>
                <span className=' font-semibold text-blue-500'>{answers.length}</span> 件の回答
              </p>
            </div>

            {answers.map((answer) => {
              return <Answer key={answer.id} answer={answer} userId={user.id} />
            })}

            <div className=' flex w-8/12 flex-col justify-center'>
              <div>
                <h2>あなたの回答</h2>
                <CreateAnswerForm questionId={question.id} />
              </div>
            </div>
          </main>
        </WrapperLayout>
      )}
    </>
  )
}
export default QuestionDetail

type Props = {
  answer: Answer
  userId?: number
  isEdit?: boolean
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>
}

const AnswerBody: React.FC<Props> = ({ answer, isEdit, setIsEdit }) => {
  return (
    <>
      {isEdit && setIsEdit ? (
        <UpdateAnswerForm questionId={answer.questionId} setIsEdit={setIsEdit} answerId={answer.id} />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: answer.description }}></div>
      )}
    </>
  )
}

const Answer: React.FC<Props> = ({ answer, userId }) => {
  const year = answer.createdAt.toString().slice(0, 4)
  const month = answer.createdAt.toString().slice(5, 7)
  const day = answer.createdAt.toString().slice(8, 10)

  const [isEdit, setIsEdit] = useState(false)
  const [_, setDescription] = useAtom(answerDescriptionAtom)
  const [editedAnswer, setEditedAnswer] = useAtom(editedAnswerAtom)

  const { deleteAnswerMutation } = useMutateAnswer(answer.questionId)

  const handleSetAnswer = () => {
    if (answer && setIsEdit) {
      setDescription(answer.description)
      setEditedAnswer({ ...editedAnswer, id: answer.id })
      setIsEdit(!isEdit)
    }
  }

  const handleDeleteAnswer = () => {
    if (answer) {
      deleteAnswerMutation.mutate(answer.id)
    }
  }

  return (
    <div className=' w-8/12 border border-solid border-gray-200 bg-white p-5'>
      <div className=' py-5'>
        <div className=' flex items-center gap-x-2 border-t-0 border-r-0 border-b border-l-0 border-solid border-gray-200 pb-2 text-lg'>
          <Avatar radius={'xl'} />
          <span>回答者: {answer.userId}</span>
          <span>
            回答日: {year} / {month} / {day}
          </span>
          {answer.userId === userId && (
            <>
              <Button onClick={handleSetAnswer}>編集</Button>
              <Button onClick={handleDeleteAnswer}>削除</Button>
            </>
          )}
        </div>
        <AnswerBody answer={answer} isEdit={isEdit} setIsEdit={setIsEdit} />
      </div>
    </div>
  )
}
