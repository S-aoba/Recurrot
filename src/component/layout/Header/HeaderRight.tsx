import { ActionIcon, Avatar, Button, Menu, TextInput } from '@mantine/core'
import { IconBell, IconCircle, IconLogout, IconQuestionMark, IconSearch } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { FormEvent } from 'react'
import { useState } from 'react'

import { useGetWindowSize } from '@/common/hook/useGetWindowSize'
import { useMutateUser } from '@/common/hook/useMutateUser'
import { useQueryUser } from '@/common/hook/useQueryUser'
import type { UnreadAnswer } from '@/common/type'
import { HeaderRightLoading } from '@/component/ui/Loading'

export const HeaderRight = () => {
  const { data: user, status } = useQueryUser()

  const [isOpen, setIsOpen] = useState(false)
  const windowSize = useGetWindowSize()

  const handleOpenSearchBar = () => {
    setIsOpen(!isOpen)
  }

  if (status === 'loading') return <HeaderRightLoading />

  return (
    <>
      <div className=' flex w-6/12 items-center gap-x-4'>
        {windowSize.width > 992 ? (
          <SearchQuestionForm formClassName=' flex w-full gap-x-3' className=' w-full' />
        ) : (
          <div className=' flex w-full justify-end'>
            <ActionIcon className=' hover:transform-none hover:bg-blue-500'>
              <IconSearch color='white' size={25} className=' hover:cursor-pointer' onClick={handleOpenSearchBar} />
            </ActionIcon>
            {isOpen && <SearchQuestionForm className=' absolute right-4 top-[3.6rem] w-11/12' setIsOpen={setIsOpen} />}
          </div>
        )}
        {user && user.unreadAnswers && <Notification unreadAnswers={user.unreadAnswers} />}
        {user && <LoginUserIcon userIconURL={user.profileImage === null ? '' : user.profileImage} />}
        {windowSize.width > 770 && <QuestionPostButton />}
      </div>
    </>
  )
}

// /////////////////////////////////////////////////////////////////////////////////
type NotificationProps = {
  unreadAnswers: UnreadAnswer[]
}
const Notification: React.FC<NotificationProps> = ({ unreadAnswers }) => {
  const { updateReadAnswerMutation } = useMutateUser()

  return (
    <div className=' relative flex items-center'>
      <Menu>
        <Menu.Target>
          <ActionIcon className=' hover:transform-none hover:bg-white'>
            <IconBell
              color='gray'
              size={30}
              fill='white'
              stroke={0.5}
              className=' hover:cursor-pointer hover:fill-blue-500 hover:stroke-blue-500'
            />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown className=' mt-1 -ml-3 rounded-2xl p-4 shadow'>
          <Menu.Label>通知</Menu.Label>
          {unreadAnswers.length === 0 ? (
            <div className=' flex h-40 w-60 flex-col items-center justify-center gap-y-3'>
              <span className=' text-gray-400 hover:cursor-default'>まだ通知はありません</span>
              <IconBell color='gray' size={50} fill='white' stroke={0.2} />
            </div>
          ) : (
            unreadAnswers.map((question) => {
              const handleClick = () => {
                updateReadAnswerMutation.mutate(question.answerId)
              }
              return (
                <Link
                  key={question.answerId}
                  href={`/dashboard/questions/${question.questionId}`}
                  className=' flex h-40 w-60 border-b border-l-0 border-t-0 border-r-0 border-solid border-gray-300 px-5 py-3 text-black no-underline hover:cursor-pointer hover:bg-gray-100'
                  onClick={handleClick}
                >
                  <div className=' flex items-center'>
                    {question && question.answerUserProfileImage && (
                      <Image
                        src={question.answerUserProfileImage}
                        width={60}
                        height={60}
                        className=' rounded-full'
                        alt='userIcon'
                      />
                    )}
                  </div>
                  <div className=' flex w-full flex-col items-center justify-center p-3'>
                    <span className=' line-clamp-2'>{question.questionTitle}</span>
                    <span className=' text-sm'>について回答がありました。</span>
                  </div>
                </Link>
              )
            })
          )}
        </Menu.Dropdown>
      </Menu>
      {unreadAnswers.length > 0 && (
        <IconCircle fill='red' color='red' size={15} className=' absolute right-0 -top-1 z-10' />
      )}
    </div>
  )
}

// /////////////////////////////////////////////////////////////////////////////////

type SearchQuestionFormProps = {
  formClassName?: string
  className: string
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchQuestionForm: React.FC<SearchQuestionFormProps> = ({ formClassName, className, setIsOpen }) => {
  const router = useRouter()

  const [searchWord, setSearchWord] = useState('')

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (setIsOpen) setIsOpen(false)
    router.push({
      pathname: '/dashboard/search',
      query: { q: searchWord },
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value)
  }
  return (
    <form className={formClassName} onSubmit={handleSearch}>
      <TextInput value={searchWord} onChange={handleChange} placeholder='質問を検索する' className={className} />
    </form>
  )
}

// /////////////////////////////////////////////////////////////////////////////////
const QuestionPostButton = () => {
  return (
    <Link href='/dashboard/questions/post'>
      <Button type='button' className=' hover:transform-none'>
        質問する
      </Button>
    </Link>
  )
}

// /////////////////////////////////////////////////////////////////////////////////

type LoginUserIconProps = {
  userIconURL: string | null
}

const LoginUserIcon: React.FC<LoginUserIconProps> = ({ userIconURL }) => {
  const windowSize = useGetWindowSize()
  const { logoutMutation } = useMutateUser()
  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <Menu>
      <Menu.Target>
        <Avatar src={userIconURL} color='cyan' radius='xl' className=' hover: cursor-pointer' />
      </Menu.Target>
      <Menu.Dropdown>
        {windowSize.width <= 770 && (
          <Menu.Item icon={<IconQuestionMark size={14} />}>
            <Link href='/dashboard/questions/post' className=' text-black no-underline'>
              質問する
            </Link>
          </Menu.Item>
        )}
        <Menu.Item icon={<IconLogout size={14} />} onClick={handleLogout}>
          ログアウト
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
