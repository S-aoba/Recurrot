import { Button, Tooltip } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import type { NextPage } from 'next'
import Link from 'next/link'
import type { FormEvent } from 'react'

import { UpdateForm } from '@/component/ui/Form/Question'

/**
 * @package
 */

type EditProps = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  questionId: string
}

export const Edit: NextPage<EditProps> = ({ onSubmit: handleSubmit, isLoading, questionId }) => {
  return (
    <>
      <header className=' fixed z-10 w-full bg-white shadow'>
        <div className='flex h-14 max-h-14 items-center justify-center'>
          <div className=' flex w-full max-w-[900px] items-center justify-between px-6 py-2'>
            <Tooltip label='投稿した質問一覧へ'>
              <Link href={'/dashboard/posted-questions'} className=' text-black'>
                <IconArrowLeft size={30} />
              </Link>
            </Tooltip>
            <Button
              color='blue'
              type='submit'
              className=' hover:transform-none'
              form='update'
              loading={isLoading}
              // 編集ページで内容が空になった場合は更新ボタンを押せないようにする
              disabled={questionId !== '0' ? false : true}
            >
              更新する
            </Button>
          </div>
        </div>
      </header>
      <form
        className=' flex h-fit min-h-screen flex-1 justify-center bg-[#fafafa] pt-14'
        onSubmit={handleSubmit}
        id='update'
      >
        <div className=' h-fit w-full max-w-[1200px] px-8'>
          <UpdateForm />
        </div>
      </form>
    </>
  )
}
