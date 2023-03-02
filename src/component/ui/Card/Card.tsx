import { Avatar } from '@mantine/core'
import { IconMessageCircle2 } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

/**
 * @package
 */

export const Card = () => {
  return (
    <>
      {dummyQuestionItemList.map((dummyQuestionItem) => {
        return (
          <div
            key={dummyQuestionItem.userName}
            className=' col-span-1 h-64 w-80 border border-solid border-gray-300 bg-white'
          >
            <Link href={'/questions/1'} className=' absolute block h-64 w-80'></Link>
            <div className=' px row-span-2 flex items-center'>
              <div className=' p-5'>
                <Image src={'/typescript.png'} height={95} width={95} alt={'typescript'} className=' rounded-xl' />
              </div>
              <div className='w-full p-2'>
                <div className=' flex w-full items-center gap-x-3 py-3'>
                  <Avatar radius='xl' />
                  <span>{dummyQuestionItem.userName}</span>
                </div>
                <div className=' flex w-full items-center gap-x-3 pb-3'>
                  <span>{dummyQuestionItem.postedDate}</span>
                  <div className=' flex items-center gap-x-1'>
                    <IconMessageCircle2 />
                    <span>{dummyQuestionItem.replayCount}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className=' row-span-4 p-3 text-lg'>
              <p className=' line-clamp-3'>{dummyQuestionItem.questionTitle}</p>
            </div>
          </div>
        )
      })}
    </>
  )
}

type DummyQuestionItemType = {
  userName: string
  postedDate: string
  questionTitle: string
  replayCount: number
}

const dummyQuestionItemList: DummyQuestionItemType[] = [
  {
    userName: 'Aoba',
    postedDate: '2023/1/18',
    questionTitle:
      'この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れ',
    replayCount: 5,
  },
  {
    userName: 'test10',
    postedDate: '2023/1/19',
    questionTitle:
      'この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れ',
    replayCount: 2,
  },
  {
    userName: 'test0',
    postedDate: '2023/1/19',
    questionTitle:
      'この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れ',
    replayCount: 4,
  },
  {
    userName: 'test1',
    postedDate: '2023/1/19',
    questionTitle: 'この文章はダミーです。文字の大きさ、量、字間、行間',
    replayCount: 4,
  },
  {
    userName: 'test2',
    postedDate: '2023/1/19',
    questionTitle: 'この文章はダミーです。文字の大きさ、量、字間、行間',
    replayCount: 4,
  },
  {
    userName: 'test3',
    postedDate: '2023/1/19',
    questionTitle: 'この文章はダミーです。文字の大きさ、量、字間、行間',
    replayCount: 4,
  },
  {
    userName: 'test4',
    postedDate: '2023/1/19',
    questionTitle:
      'この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れ',
    replayCount: 4,
  },
]
