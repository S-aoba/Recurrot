import { Avatar } from '@mantine/core'
import { IconMessageDots } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

import type { MyAnswer, MyQuestion, NewQuestion, SearchQuestion } from '@/common/type'

/**
 * @package
 */

type CardProps = {
  question: NewQuestion | MyAnswer | MyQuestion | SearchQuestion
}

export const Card: React.FC<CardProps> = ({ question }) => {
  const { id, createdAt, title, user } = question
  const year = createdAt.toString().slice(0, 4)
  const month = createdAt.toString().slice(5, 7)
  const day = createdAt.toString().slice(8, 10)

  return (
    <div
      key={id}
      className=' relative col-span-1 box-content flex h-60 w-60 flex-col gap-y-2 rounded-3xl border border-solid border-gray-200 bg-white p-2 shadow-md duration-500 hover:relative hover:translate-x-2 hover:-translate-y-2 hover:cursor-pointer hover:shadow-[-8px_8px_0px_0px_#171717]'
    >
      <Link href={`/dashboard/questions/${id}`} className=' absolute top-0 left-0 h-full w-full rounded-2xl'></Link>
      <div className=' flex justify-between pl-2'>
        <div className=' flex h-full items-center'>
          <Image
            src={`/langIcon/${question.hashtags[0]}.svg`}
            height={40}
            width={40}
            alt={question.hashtags[0] == 'csharp' ? 'C#' : `${question.hashtags[0]}`}
            className=' rounded-xl'
            priority
          />
        </div>
        <div className='flex w-full flex-col px-4 py-2'>
          <div className=' flex w-full items-center gap-x-2 py-3'>
            <Avatar
              src={question.user.profileImage}
              radius='xl'
              size={'sm'}
              className=' border border-solid border-gray-200 shadow-sm'
            />
            <span className=' text-sm text-gray-500 line-clamp-1'>
              {user.userName === null ? '名無しユーザー' : user.userName}
            </span>
          </div>
          <div className=' flex w-full flex-col gap-x-3 p-2 text-sm text-gray-500'>
            <span>投稿日: {`${year}/${month}/${day}`}</span>
            <div className=' flex items-center gap-x-1'>
              <IconMessageDots size={18} />
              <span>{question.answerCount}</span>
            </div>
          </div>
        </div>
      </div>
      <Title title={title} />
    </div>
  )
}

type TitleProps = {
  title: string
}

const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <div className=' flex h-32 items-center justify-center rounded-2xl bg-mainColor px-2'>
      <p className='text-sm text-white line-clamp-3'>{title}</p>
    </div>
  )
}
