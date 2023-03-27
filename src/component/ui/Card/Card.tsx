import { Avatar } from '@mantine/core'
import { IconMessageDots } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

import type { QuestionAndAnswerIdListType } from '@/common/type'

/**
 * @package
 */

type CardProps = {
  question: QuestionAndAnswerIdListType
}

export const Card: React.FC<CardProps> = ({ question }) => {
  const { id, createdAt, title, userId } = question
  const year = createdAt.toString().slice(0, 4)
  const month = createdAt.toString().slice(5, 7)
  const day = createdAt.toString().slice(8, 10)

  return (
    <div key={id} className=' col-span-1 h-64 w-80 border border-solid border-gray-300 bg-white'>
      <Link href={'/dashboard/questions/[id]'} as={`questions/${id}`} className=' absolute block h-64 w-80'></Link>
      <div className=' px row-span-2 flex items-center'>
        <div className=' p-5'>
          <Image src={'/typescript.png'} height={95} width={95} alt={'typescript'} className=' rounded-xl' />
        </div>
        <div className='w-full p-2'>
          <div className=' flex w-full items-center gap-x-3 py-3'>
            <Avatar radius='xl' />
            <span>userId: {userId}</span>
          </div>
          <div className=' flex w-full flex-col items-end gap-x-3 pb-3'>
            <span>投稿日: {`${year} / ${month} / ${day}`}</span>
            <div className=' flex gap-x-1'>
              <IconMessageDots />
              <span>{question.answers.length}</span>
            </div>
          </div>
        </div>
      </div>
      <div className=' row-span-4 p-3 text-lg'>
        <p className=' line-clamp-3'>{title}</p>
      </div>
    </div>
  )
}
