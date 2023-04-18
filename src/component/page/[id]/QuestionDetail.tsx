import { ActionIcon, Avatar, Menu, Tooltip } from '@mantine/core'
import { IconChevronDown, IconEdit, IconTrash } from '@tabler/icons-react'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import type { CurrentUser, SingleQuestion } from '@/common/type'
import { AnswerList } from '@/component/ui/Answer'
import { DetailDescription } from '@/component/ui/DetailDescription'
import { CreateAnswerForm } from '@/component/ui/Form/Answer'

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
                <div className=' flex items-center justify-center gap-x-2'>
                  <Tooltip label='編集する'>
                    <Link
                      href={'/dashboard/questions/edit'}
                      type='button'
                      className=' flex justify-center text-black no-underline'
                    >
                      <IconEdit size={23} className=' hover:cursor-pointer' onClick={handleSetQuestion} />
                    </Link>
                  </Tooltip>
                  <Menu>
                    <Menu.Target>
                      <ActionIcon className=' hover:transform-none'>
                        <IconChevronDown color='black' size={23} className=' hover:cursor-pointer' />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item onClick={handleDeleteQuestionOpen} icon={<IconTrash size={14} />}>
                        削除する
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </div>
              )}
            </div>
            <div className=' flex gap-x-5 py-5'>
              {question.hashtags &&
                question.hashtags.map((hashtag) => {
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

type HashtagListProps = {
  hashtag: string
}

const HashtagList: React.FC<HashtagListProps> = ({ hashtag }) => {
  return (
    <Link
      href={'/dashboard/new-questions'}
      key={hashtag}
      className=' flex items-center rounded-3xl border border-solid border-gray-200 px-3 py-1 text-black no-underline'
    >
      <Image
        src={`/langIcon/${hashtag}.svg`}
        width={20}
        height={20}
        alt={hashtag == 'csharp' ? 'C#' : `${hashtag}`}
        className='mr-2 rounded-full'
      />
      {hashtag == 'csharp' ? 'C#' : hashtag}
    </Link>
  )
}
