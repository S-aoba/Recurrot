import { Avatar, Button, Menu, TextInput } from '@mantine/core'
import { Loader } from '@mantine/core'
import { IconBell, IconCircle } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { FormEvent } from 'react'
import { useState } from 'react'

import { useMutateUser } from '@/common/hook/useMutateUser'
import { useQueryUser } from '@/common/hook/useQueryUser'

export const Header = () => {
  const queryClient = useQueryClient()

  const { data: user, status } = useQueryUser()
  const { updateReadAnswerMutation } = useMutateUser()
  const router = useRouter()

  const [searchWord, setSearchWord] = useState('')

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push({
      pathname: '/dashboard/search',
      query: { q: searchWord },
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value)
  }

  const handleLogout = async () => {
    queryClient.removeQueries(['user'])
    queryClient.removeQueries(['questions'])
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`)
    router.push('/')
  }

  if (status === 'loading') return <Loader />

  return (
    <>
      {user && (
        <header className=' flex h-14 max-h-14 w-full max-w-full justify-center py-3'>
          <div className=' flex w-9/12 items-center gap-x-5'>
            <span className=' text-3xl'>Recurrot</span>
            <div className=' flex items-center gap-x-2'>
              <Avatar radius={'lg'} />
              <Menu shadow='md' width={200}>
                <Menu.Target>
                  <IconBell color='gray' className=' p-2 hover:cursor-pointer' />
                </Menu.Target>
                <Menu.Dropdown className=' text-center'>
                  {user.unreadAnswers &&
                    user.unreadAnswers.map((question) => {
                      const handleClick = () => {
                        updateReadAnswerMutation.mutate(question.answerId)
                      }
                      return (
                        <div key={question.answerId}>
                          <Link
                            href={`/dashboard/questions/${question.questionId}`}
                            className=' my-2 block py-3 text-center'
                            onClick={handleClick}
                          >
                            {question.questionTitle}に回答がありました
                          </Link>
                          <hr className=' border border-solid border-gray-200' />
                        </div>
                      )
                    })}
                </Menu.Dropdown>
              </Menu>
              {user && user.unreadAnswers && user.unreadAnswers.length > 0 && (
                <IconCircle fill='blue' color='blue' size={15} className=' -ml-4 -mt-3 mr-4' />
              )}
            </div>
            <Link href='/dashboard/questions/post'>
              <Button type='button' className=' hover:transform-none'>
                質問する
              </Button>
            </Link>
            <Button type='button' className=' hover:transform-none' onClick={handleLogout}>
              ログアウト
            </Button>
            <form className=' flex gap-x-3' onSubmit={handleSearch}>
              <TextInput value={searchWord} onChange={handleChange} placeholder='質問を検索する' />
            </form>
          </div>
        </header>
      )}
    </>
  )
}
