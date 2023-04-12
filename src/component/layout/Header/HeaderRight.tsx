import { ActionIcon, Avatar, Button, Menu, TextInput } from '@mantine/core'
import { IconLogout, IconQuestionMark, IconSearch } from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { FormEvent } from 'react'
import { useState } from 'react'

import { useGetWindowSize } from '@/common/hook/useGetWindowSize'
import { useMutateUser } from '@/common/hook/useMutateUser'
import { HeaderRightLoading } from '@/component/ui/Loading'

import { useQueryHeaderRight } from './hook/useQueryHeaderRight'
import { Notification } from './Notification'

/**
 * @package
 */

export const HeaderRight = () => {
  const { data: headerRight, status: headerRightStatus } = useQueryHeaderRight()

  const [isOpen, setIsOpen] = useState(false)
  const windowSize = useGetWindowSize()

  const handleOpenSearchBar = () => {
    setIsOpen(!isOpen)
  }

  if (headerRightStatus === 'loading') return <HeaderRightLoading />

  return (
    <div className=' flex w-6/12 items-center gap-x-4'>
      {windowSize.width > 992 ? (
        <SearchQuestionForm formClassName=' flex w-full gap-x-3' className=' w-full' />
      ) : (
        <div className=' flex w-full justify-end'>
          <ActionIcon className=' hover:transform-none hover:bg-blue-500'>
            <IconSearch color='black' size={25} className=' hover:cursor-pointer' onClick={handleOpenSearchBar} />
          </ActionIcon>
          {isOpen && <SearchQuestionForm className=' absolute right-4 top-[3.6rem] w-11/12' setIsOpen={setIsOpen} />}
        </div>
      )}
      <Notification />
      {headerRight && <LoginUserIcon userIconURL={headerRight.profileImage === null ? '' : headerRight.profileImage} />}
      {windowSize.width > 770 && <QuestionPostButton />}
    </div>
  )
}

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
