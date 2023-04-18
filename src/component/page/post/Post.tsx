import { Button, Tooltip } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import type { NextPage } from 'next'
import Link from 'next/link'

import { QuestionForm } from '@/component/ui/Form/Question'

/**
 * @package
 */

type PostProps = {
  onHandleOpen: () => void
  isQuestionReady: boolean
  onHandleClick: () => void
}

export const Post: NextPage<PostProps> = ({
  onHandleOpen: handleOpen,
  isQuestionReady,
  onHandleClick: handleOnClick,
}) => {
  return (
    <>
      <header className=' fixed z-10 w-full bg-white shadow'>
        <div className='flex h-14 max-h-14 items-center justify-center'>
          <div className=' flex w-full max-w-[900px] items-center justify-between px-6 py-2'>
            <Tooltip label='自分の質問一覧へ'>
              <Link href={'/dashboard/my-questions'} className=' text-black' onClick={handleOnClick}>
                <IconArrowLeft size={30} />
              </Link>
            </Tooltip>
            <Button
              color='blue'
              type='button'
              onClick={handleOpen}
              className=' hover:transform-none'
              disabled={isQuestionReady}
            >
              投稿する
            </Button>
          </div>
        </div>
      </header>
      <main className=' flex h-fit min-h-screen flex-1 justify-center bg-[#fafafa] pt-14'>
        <div className=' h-fit w-full max-w-[1200px] px-8'>
          <QuestionForm />
        </div>
      </main>
    </>
  )
}
