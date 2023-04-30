import { Avatar, Tooltip } from '@mantine/core'
import { IconMessageDots } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import type { MyAnswer, MyQuestion, NewQuestion, QuestionWaitingAnswered, SearchQuestion } from '@/common/type'

/**
 * @package
 */

type CardProps = {
  question: NewQuestion | MyAnswer | MyQuestion | SearchQuestion | QuestionWaitingAnswered
  index: number
}

export const Card: React.FC<CardProps> = ({ question, index }) => {
  const { id, createdAt, title, user, codingProblem } = question
  const year = createdAt.toString().slice(0, 4)
  const month = createdAt.toString().slice(5, 7)
  const day = createdAt.toString().slice(8, 10)

  const codingProblemNumber = codingProblem.split(':')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.15, duration: 0.9 }}
    >
      <div
        key={id}
        className=' relative col-span-1 box-content flex h-fit w-60 flex-col gap-y-2 rounded-3xl border border-solid border-gray-200 bg-white p-2 shadow-md duration-500 hover:relative hover:translate-x-2 hover:-translate-y-2 hover:cursor-pointer hover:shadow-[-8px_8px_0px_0px_#171717]'
      >
        <Link
          href={`/dashboard/questions/${id}`}
          className=' absolute top-0 left-0 z-20 h-full w-full rounded-2xl'
        ></Link>
        <Image
          src={`/langIcon/${question.hashtags[0]}.svg`}
          height={40}
          width={40}
          alt={question.hashtags[0] == 'csharp' ? 'C#' : `${question.hashtags[0]}`}
          className=' absolute -top-3 -left-3 z-10 rounded-xl'
          priority
        />
        <Tooltip label={codingProblemNumber} position='top' withArrow>
          <div className=' absolute -top-3 left-10 z-20 w-fit rounded-lg bg-mainColor py-1 px-2 text-center line-clamp-1'>
            <p className=' mt-0 mb-0 text-sm text-white'>{codingProblemNumber[0]}</p>
          </div>
        </Tooltip>
        <div className=' flex flex-col'>
          <div className='flex w-full flex-col gap-y-2 pt-5 pl-6'>
            <AvatarUserName profileImage={question.user.profileImage} userName={user.userName} />
            <div className=' flex w-full gap-x-3 text-sm text-gray-500'>
              <span>
                投稿日: {year}/{month}/{day}
              </span>
              <div className=' flex items-center gap-x-1'>
                <IconMessageDots size={18} />
                <span>{question.answerCount}</span>
              </div>
            </div>
          </div>
        </div>
        <Title title={title} />
      </div>
    </motion.div>
  )
}

type TitleProps = {
  title: string
}

const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <div className=' flex h-20 items-center justify-center rounded-2xl bg-mainColor px-2'>
      <p className=' mt-0 mb-0 text-sm text-white line-clamp-3'>{title}</p>
    </div>
  )
}

type AvatarAndUserNameProps = {
  profileImage: string | null
  userName: string | null
}

const AvatarUserName: NextPage<AvatarAndUserNameProps> = ({ profileImage, userName }) => {
  return (
    <div className=' flex w-full items-center gap-x-2'>
      <Avatar src={profileImage} radius='xl' size={'sm'} className=' border border-solid border-gray-200 shadow-sm' />
      <span className=' text-sm text-gray-500 line-clamp-1'>{userName === null ? '名無しユーザー' : userName}</span>
    </div>
  )
}
