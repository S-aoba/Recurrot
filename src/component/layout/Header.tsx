import { Button, TextInput } from '@mantine/core'
import { Loader } from '@mantine/core'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { FormEvent } from 'react'
import { useState } from 'react'

import { useQueryUser } from '@/common/hook/useQueryUser'

export const Header = () => {
  const queryClient = useQueryClient()

  const { data: user, status } = useQueryUser()

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
    <header className=' flex h-14 max-h-14 w-full max-w-full justify-center py-3'>
      <div className=' flex w-9/12 items-center gap-x-5'>
        <span className=' text-3xl'>Recurrot</span>
        <p>{user?.email}</p>
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
  )
}
