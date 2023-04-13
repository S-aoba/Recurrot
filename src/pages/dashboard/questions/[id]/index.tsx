import { ActionIcon, Avatar, Menu, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconChevronDown, IconEdit, IconTrash } from '@tabler/icons-react'
import { useAtom, useSetAtom } from 'jotai'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { useMutateQuestion } from '@/common/hook/useMutateQuestion'
import { useQueryCurrentUser } from '@/common/hook/useQueryCurrentUser'
import { useQuerySingleQuestion } from '@/common/hook/useQuerySingleQuestion'
import { AnswerList } from '@/component/ui/Answer'
import { DetailDescription } from '@/component/ui/DetaiDescription'
import { CreateAnswerForm } from '@/component/ui/Form/Answer'
import { QuestionDetailLoading } from '@/component/ui/Loading'
import { Modal } from '@/component/ui/Modal'
import { editedQuestionAtom, navTabAtom, questionDescriptionAtom } from '@/store/question-atom'

const QuestionDetail = () => {
  const [isDeleteQuestionOpened, { open: handleDeleteQuestionOpen, close: handleDeleteQuestionClose }] =
    useDisclosure(false)

  const [id, setId] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      if (typeof router.query.id === 'string') {
        setId(router.query.id)
      }
    }
  }, [router])

  const setNavTab = useSetAtom(navTabAtom)

  useEffect(() => {
    setNavTab({ main: null, sub: null })
  }, [setNavTab])

  const { data: question, status: questionStatus } = useQuerySingleQuestion(id)
  const { data: currentUser, status: currentUserStatus } = useQueryCurrentUser()
  const { deleteQuestionMutation } = useMutateQuestion()

  const [editedQuestion, setEditedQuestion] = useAtom(editedQuestionAtom)
  const setDescription = useSetAtom(questionDescriptionAtom)

  const year = question && question.createdAt.toString().slice(0, 4)
  const month = question && question.createdAt.toString().slice(5, 7)
  const day = question && question.createdAt.toString().slice(8, 10)

  const handleSetQuestion = () => {
    if (question) {
      setDescription(question.description)
      setEditedQuestion({ ...editedQuestion, id: question.id, title: question.title, hashtags: question.hashtags })
    }
  }

  const handleDeleteQuestion = () => {
    if (question) {
      deleteQuestionMutation.mutate(question.id)
      handleDeleteQuestionClose()
    }
  }

  if (questionStatus == 'loading' || currentUserStatus === 'loading') return <QuestionDetailLoading />

  return (
    <>
      <Head>
        <title>Recurrot - 新着</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Modal
        opened={isDeleteQuestionOpened}
        onClose={handleDeleteQuestionClose}
        onSubmit={handleDeleteQuestion}
        buttonWord='削除する'
        modalTitle='本当に削除してもよろしいですか？'
      />

      {question && currentUser && (
        <main className=' flex h-fit flex-1 flex-col items-center gap-y-10 p-5'>
          <div className=' flex w-full max-w-[1200px] flex-col items-center justify-center gap-y-5'>
            <div className=' w-full border-t-0 border-r-0 border-b border-l-0 border-solid border-gray-200 bg-white px-3 sm:w-10/12'>
              <p className=' text-2xl font-semibold sm:text-3xl'>{question.title}</p>
            </div>
            <div className=' w-full border border-solid border-gray-200 p-5 sm:w-9/12'>
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
      )}
    </>
  )
}

export const getServerSideProps = async () => {
  return {
    props: {
      layout: 'WrapperLayout',
    },
  }
}

export default QuestionDetail

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
