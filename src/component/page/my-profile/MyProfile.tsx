import type { NextPage } from 'next'

import type { MyProfile as MyProfileType } from '@/common/type'
import { ProfileCard } from '@/component/ui/ProfileCard'

type MyProfileProps = {
  myProfile: MyProfileType
}

export const MyProfile: NextPage<MyProfileProps> = ({ myProfile }) => {
  return (
    <main className=' flex h-fit flex-1 justify-center bg-[#fafafa]'>
      <div className=' flex w-full max-w-[1200px] justify-center px-8 '>
        <div className=' flex h-fit w-full items-center justify-center py-5 '>
          {myProfile && <ProfileCard myProfile={myProfile} />}
        </div>
      </div>
    </main>
  )
}
