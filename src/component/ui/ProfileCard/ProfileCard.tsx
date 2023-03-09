import { Avatar } from '@mantine/core'

import { Button } from '@/lib/mantine'

/**
 * @package
 */

export const ProfileCard = () => {
  return (
    <div className=' grid grid-cols-12 border-t border-r-0 border-b border-l-0 border-solid border-gray-200'>
      <div className=' col-span-4 flex flex-col items-center justify-center gap-y-5 px-5'>
        <Avatar size={'lg'} radius={'xl'} variant={'outline'} />
        <Button color='blue'>変更する</Button>
      </div>
      <div className=' col-span-8 flex flex-col items-center p-5'>
        <div className=' flex w-11/12 flex-col items-start gap-y-5'>
          <label className=' flex flex-col'>
            ユーザーネーム
            <input type='url' />
          </label>
          <label className=' flex flex-col'>
            自己紹介
            <textarea className=' h-52 w-96 resize-none' />
          </label>
          <div className=' flex gap-x-3'>
            <label className=' flex flex-col'>
              Twitter
              <input type='url' />
            </label>
            <label className=' flex flex-col'>
              Github
              <input type='url' />
            </label>
          </div>
          <label className=' flex flex-col'>
            Website
            <input type='url' />
          </label>
          <Button color='blue'>変更する</Button>
        </div>
        <hr />
      </div>
    </div>
  )
}
