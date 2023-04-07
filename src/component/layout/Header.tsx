import { ActionIcon, Avatar, Button, Menu, TextInput } from '@mantine/core'
import { Loader } from '@mantine/core'
import { IconBell, IconCircle, IconLogout, IconQuestionMark, IconSearch } from '@tabler/icons-react'
import { QueryCache } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import router, { useRouter } from 'next/router'
import type { FormEvent } from 'react'
import { useState } from 'react'

import { useGetWindowSize } from '@/common/hook/useGetWindowSize'
import { useMutateUser } from '@/common/hook/useMutateUser'
import { useQueryUser } from '@/common/hook/useQueryUser'
import type { UnreadAnswer } from '@/common/type'

export const Header = () => {
  const { data: user, status } = useQueryUser()
  const [isOpen, setIsOpen] = useState(false)
  const windowSize = useGetWindowSize()

  const handleOpenSearchBar = () => {
    setIsOpen(!isOpen)
  }

  if (status === 'loading') return <Loader />

  return (
    <header className=' flex h-14 max-h-14 items-center justify-center bg-blue-500'>
      <div className=' flex w-full max-w-[1200px] items-center justify-between px-8'>
        <div className=' flex items-center'>
          <h2 className=' text-gray-100'>Recurrot</h2>
        </div>
        {/* height:{windowSize.height} width:{windowSize.width} */}
        <div className=' flex w-6/12 items-center gap-x-4'>
          {windowSize.width > 992 ? (
            <SearchQuestionForm formClassName=' flex w-full gap-x-3' className=' w-full' />
          ) : (
            <div className=' flex w-full justify-end'>
              <ActionIcon className=' hover:transform-none hover:bg-blue-500'>
                <IconSearch color='white' size={25} className=' hover:cursor-pointer' onClick={handleOpenSearchBar} />
              </ActionIcon>
              {isOpen && (
                <SearchQuestionForm className=' absolute right-4 top-[3.6rem] w-11/12' setIsOpen={setIsOpen} />
              )}
            </div>
          )}
          {user && user.unreadAnswers && <Notification unreadAnswers={user.unreadAnswers} />}
          <LoginUserIcon />
          {windowSize.width > 770 && <QuestionPostButton />}
        </div>
      </div>
    </header>
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
          <ActionIcon className=' hover:transform-none hover:bg-blue-500'>
            <IconBell color='gray' size={30} fill='white' stroke={0.5} className=' hover:cursor-pointer' />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown className=' text-center'>
          {unreadAnswers.map((question) => {
            const handleClick = () => {
              updateReadAnswerMutation.mutate(question.answerId)
            }
            return (
              <Menu.Item key={question.answerId}>
                <Link
                  href={`/dashboard/questions/${question.questionId}`}
                  className=' my-2 block py-3 text-center'
                  onClick={handleClick}
                >
                  {question.questionTitle}に回答がありました
                </Link>
                <hr className=' border border-solid border-gray-200' />
              </Menu.Item>
            )
          })}
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
      <Button type='button' variant='light' className=' text-gray-600 hover:transform-none'>
        質問する
      </Button>
    </Link>
  )
}

// /////////////////////////////////////////////////////////////////////////////////
const LoginUserIcon = () => {
  const windowSize = useGetWindowSize()

  const handleLogout = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`)
    const queryCache = new QueryCache()
    queryCache.clear()
    router.push('/')
  }

  return (
    <Menu>
      <Menu.Target>
        <Avatar color='cyan' radius='xl' className=' hover: cursor-pointer'>
          MK
        </Avatar>
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
