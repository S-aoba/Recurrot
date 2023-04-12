import { ActionIcon, Menu } from '@mantine/core'
import { IconBell, IconCircle } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

import { NotificationLoading } from '@/component/ui/Loading'

import { useMutateNotification } from './hook/useMutateNotification'
import { useQueryNotification } from './hook/useQueryNotification'

/**
 * @package
 */

export const Notification = () => {
  const { data: notification, status: notificationStatus } = useQueryNotification()
  const { updateNotificationMutation } = useMutateNotification()

  if (notificationStatus === 'loading') return <NotificationLoading />

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
          {notification && notification.length === 0 ? (
            <div className=' flex h-40 w-60 flex-col items-center justify-center gap-y-3'>
              <span className=' text-gray-400 hover:cursor-default'>まだ通知はありません</span>
              <IconBell color='gray' size={50} fill='white' stroke={0.2} />
            </div>
          ) : (
            notification &&
            notification.map((question) => {
              const handleClick = () => {
                updateNotificationMutation.mutate(question.answerId)
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
      {notification && notification.length > 0 && (
        <IconCircle fill='red' color='red' size={15} className=' absolute right-0 -top-1 z-10' />
      )}
    </div>
  )
}
