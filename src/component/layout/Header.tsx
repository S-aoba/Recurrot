import { Button } from '@mantine/core'
import { Loader } from '@mantine/core'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import router from 'next/router'

import { useQueryUser } from '@/common/hook/useQueryUser'

export const Header = () => {
  const queryClient = useQueryClient()
  const { data: user, status } = useQueryUser()
  if (status === 'loading') return <Loader />

  const handleLogout = async () => {
    queryClient.removeQueries(['user'])
    queryClient.removeQueries(['questions'])
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`)
    router.push('/')
  }
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
      </div>
    </header>
  )
}
