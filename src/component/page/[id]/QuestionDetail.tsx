import { Avatar } from '@mantine/core'
import type { NextPage } from 'next'

import type { CurrentUser, SingleQuestion } from '@/common/type'
import { AnswerList } from '@/component/ui/Answer'
import { DetailDescription } from '@/component/ui/DetailDescription'
import { CreateAnswerForm } from '@/component/ui/Form/Answer'

import { HashtagList } from './HashTagList'
import { QuestionMenu } from './QuestionMenu'

/**
 * @package
 */

type QuestionDetailProps = {
  id: string
  question: SingleQuestion
  currentUser: CurrentUser
  onSetQuestion: () => void
  onDeleteQuestionOpen: () => void
  year: string
  month: string
  day: string
}

export const QuestionDetail: NextPage<QuestionDetailProps> = ({
  id,
  question,
  currentUser,
  onSetQuestion: handleSetQuestion,
  onDeleteQuestionOpen: handleDeleteQuestionOpen,
  year,
  month,
  day,
}) => {
  return (
    <main className=' flex h-fit flex-1 flex-col items-center gap-y-10 bg-[#fafafa] p-5'>
      <div className=' flex w-full max-w-[1200px] flex-col items-center justify-center gap-y-5'>
        <div className=' w-full px-3 sm:w-10/12'>
          <p className=' text-2xl font-semibold sm:text-3xl'>{question.title}</p>
        </div>
        <div className=' w-full rounded-md border-gray-200 bg-white p-5 shadow sm:w-9/12'>
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

        <div className=' flex w-full flex-col justify-center sm:w-9/12'>
          <div>
            <p className=' text-xl'>あなたの回答</p>
            <CreateAnswerForm questionId={question.id} />
          </div>
        </div>
      </div>
    </main>
  )
}
