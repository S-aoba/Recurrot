import { Button, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconArrowLeft } from '@tabler/icons-react'
import { useAtomValue } from 'jotai'
import Head from 'next/head'
import Link from 'next/link'

import { QuestionForm } from '@/component/ui/Form/Question'
import { editedQuestionAtom, isQuestionDisabledAtom } from '@/store/question-atom'

const QuestionPost = () => {
  const editedQuestion = useAtomValue(editedQuestionAtom)
  const isQuestionReady = useAtomValue(isQuestionDisabledAtom)

  const [isOpened, { open: handleOpen, close: handleClose }] = useDisclosure(false)

  return (
    <>
      <Head>
        <title>Recurrot - 新着</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className=' fixed z-10 w-full bg-white shadow'>
        <div className='flex h-14 max-h-14 items-center justify-center'>
          <div className=' flex w-full max-w-[900px] items-center justify-between px-6 py-2'>
            <Tooltip label='自分の質問一覧へ'>
              <Link href={'/dashboard/my-questions'} className=' text-black'>
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
              {editedQuestion.id === '0' ? '投稿する' : '更新する'}
            </Button>
          </div>
        </div>
      </header>
      <main className=' flex h-fit min-h-screen flex-1 justify-center  pt-14'>
        <div className=' h-fit w-full max-w-[1200px] px-8'>
          <QuestionForm isOpened={isOpened} onHandleClose={handleClose} />
        </div>
      </main>
    </>
  )
}

export default QuestionPost
