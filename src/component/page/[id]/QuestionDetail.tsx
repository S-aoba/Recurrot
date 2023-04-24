import { Avatar } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import type { NextPage } from 'next'
import { useState } from 'react'

import type { CurrentUser, SingleQuestion } from '@/common/type'
import { DetailDescription } from '@/component/page/[id]/DetailDescription'
import { CreateAnswerForm } from '@/component/ui/Form/Answer'
import { Modal } from '@/component/ui/Modal'

import { AnswerList } from './AnswerList'
import { HashtagList } from './HashTagList'
import { QuestionMenu } from './QuestionMenu'
import { useQuestionDetail } from './useQuestionDetail'

/**
 * @package
 */

type QuestionDetailProps = {
  id: string
  question: SingleQuestion
  currentUser: CurrentUser
}

export const QuestionDetail: NextPage<QuestionDetailProps> = ({ id, question, currentUser }) => {
  const year = question.createdAt.toString().slice(0, 4)
  const month = question.createdAt.toString().slice(5, 7)
  const day = question.createdAt.toString().slice(8, 10)

  const [isDeleteQuestionOpened, { open: handleDeleteQuestionOpen, close: handleDeleteQuestionClose }] =
    useDisclosure(false)

  const [isDeleteQuestionLoading, setIsDeleteQuestionLoading] = useState(false)

  const { handleSetQuestion, handleDeleteQuestion } = useQuestionDetail({
    question,
    setIsDeleteQuestionLoading,
    handleDeleteQuestionClose,
  })

  return (
    <>
      <Modal
        opened={isDeleteQuestionOpened}
        onClose={handleDeleteQuestionClose}
        onSubmit={handleDeleteQuestion}
        buttonWord='削除する'
        modalTitle='本当に削除してもよろしいですか？'
        description='この操作は取り消せません。ご注意ください。'
        isLoading={isDeleteQuestionLoading}
      />
      <main className=' flex h-fit flex-1 flex-col items-center gap-y-10 bg-[#fafafa] p-5'>
        <div className=' flex w-full max-w-[850px] flex-col items-center justify-center gap-y-5'>
          <div className=' w-full px-3'>
            <p className=' text-2xl font-semibold sm:text-3xl'>{question.title}</p>
          </div>
          <div className=' w-full rounded-md border-gray-200 bg-white p-5 shadow'>
            <div className=' py-5'>
              <div className=' flex items-center justify-between border-t-0 border-r-0 border-b border-l-0 border-solid border-gray-200 pb-2'>
                <div className=' flex items-center gap-x-2 text-sm'>
                  <Avatar src={question.user.profileImage} radius={'xl'} />
                  <div className=' flex gap-x-2'>
                    <span>{question.user.userName === null ? '名無しユーザー' : question.user.userName}</span>
                    <span>
                      投稿日: {year} / {month} / {day}
                    </span>
                  </div>
                </div>
                {currentUser.id === question.userId && (
                  <QuestionMenu onSetQuestion={handleSetQuestion} onDeleteQuestionOpen={handleDeleteQuestionOpen} />
                )}
              </div>
              <div className=' flex gap-x-5 py-5'>
                {question.hashtags.map((hashtag: string) => {
                  return <HashtagList key={hashtag} hashtag={hashtag} />
                })}
              </div>
              <DetailDescription description={question.description} />
            </div>
          </div>

          <AnswerList questionId={id} userId={currentUser.id} />

          <div className=' flex w-full flex-col justify-center'>
            <div>
              <p className=' text-xl'>あなたの回答</p>
              <CreateAnswerForm questionId={question.id} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
