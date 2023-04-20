import { Button, Tooltip } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import type { NextPage } from 'next'

import { CreateForm } from '@/component/ui/Form/Question'

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
  onHandleClick: handleDiscardChangesAndRedirectToPostedQuestions,
}) => {
  return (
    <>
      <header className=' fixed z-10 w-full bg-white shadow'>
        <div className='flex h-14 max-h-14 items-center justify-center'>
          <div className=' flex w-full max-w-[900px] items-center justify-between px-6 py-2'>
            <Tooltip label='投稿した質問一覧へ'>
              <IconArrowLeft
                size={30}
                onClick={handleDiscardChangesAndRedirectToPostedQuestions}
                className=' hover:cursor-pointer'
              />
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
          <CreateForm />
        </div>
      </main>
    </>
  )
}
