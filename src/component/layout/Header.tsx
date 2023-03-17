import { Button, Menu } from '@mantine/core'
import { IconCalendarEvent, IconZoomQuestion } from '@tabler/icons-react'
import { useAtomValue } from 'jotai'

import { isAuthenticatedAtom } from '@/store/auth-atom'

export const Header = () => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom)

  return (
    <header className=' flex h-14 max-h-14 w-full max-w-full justify-center py-3'>
      <div className=' flex w-9/12 items-center gap-x-5'>
        <span className=' text-3xl'>Recurrot</span>
        {isAuthenticated ? (
          <Menu shadow='md' width={200}>
            <Menu.Target>
              <Button className=' hover:transform-none'>投稿する</Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<IconZoomQuestion size={14} />} component='a' href='/questions/post'>
                質問する
              </Menu.Item>
              <Menu.Item icon={<IconCalendarEvent size={14} />} component='a' href='/'>
                イベントを投稿する
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <>
            <Button className=' hover:transform-none'>ログイン</Button>
            <Button className=' hover:transform-none'>新規登録</Button>
          </>
        )}
      </div>
    </header>
  )
}
