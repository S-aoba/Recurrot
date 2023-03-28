import { Avatar, Button } from '@mantine/core'
import type { User } from '@prisma/client'
// import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'

import { useMutateUser } from '@/common/hook/useMutateUser'

/**
 * @package
 */

type ProfileCardProps = {
  user: Omit<User, 'hashedPassword'>
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const { updateUserMutation, deleteUserMutation } = useMutateUser()

  const [editedUser, setEditedUser] = useState<
    Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'email' | 'hashedPassword'>
  >({
    userName: user.userName == null ? '' : user.userName,
    selfIntroduction: user.selfIntroduction == null ? '' : user.selfIntroduction,
    profileImage: user.profileImage == null ? '' : user.profileImage,
    twitterUrl: user.twitterUrl == null ? '' : user.twitterUrl,
    githubUrl: user.githubUrl == null ? '' : user.githubUrl,
    websiteUrl: user.websiteUrl == null ? '' : user.websiteUrl,
  })

  const handleSetUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedUser({ ...editedUser, userName: e.target.value })
  }

  const handleSetSelfIntroduction = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedUser({ ...editedUser, selfIntroduction: e.target.value })
  }

  const handleSetTwitterUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedUser({ ...editedUser, twitterUrl: e.target.value })
  }

  const handleSetGithubUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedUser({ ...editedUser, githubUrl: e.target.value })
  }

  const handleSetWebsiteUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedUser({ ...editedUser, websiteUrl: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateUserMutation.mutate(editedUser)
  }

  const handleDeleteUser = () => {
    deleteUserMutation.mutate()
  }

  return (
    <>
      {user && (
        <div className=' grid grid-cols-12 border-t border-r-0 border-b border-l-0 border-solid border-gray-200'>
          <div className=' col-span-4 flex flex-col items-center justify-center gap-y-5 px-5'>
            <Avatar size={'lg'} radius={'xl'} variant={'outline'} />
            <Button color='blue' disabled>
              変更する
            </Button>
          </div>
          <form className=' col-span-8 flex flex-col items-center p-5' onSubmit={handleSubmit}>
            <div className=' flex w-11/12 flex-col items-start gap-y-5'>
              <label className=' flex flex-col'>
                ユーザーネーム
                <input
                  type='text'
                  value={editedUser.userName == null ? '' : editedUser.userName}
                  onChange={handleSetUserName}
                />
              </label>
              <label className=' flex flex-col'>
                自己紹介
                <textarea
                  className=' h-52 w-96 resize-none'
                  value={editedUser.selfIntroduction == null ? '' : editedUser.selfIntroduction}
                  onChange={handleSetSelfIntroduction}
                />
              </label>
              <div className=' flex gap-x-3'>
                <label className=' flex flex-col'>
                  Twitter
                  <input
                    type='url'
                    value={editedUser.twitterUrl == null ? '' : editedUser.twitterUrl}
                    onChange={handleSetTwitterUrl}
                  />
                </label>
                <label className=' flex flex-col'>
                  Github
                  <input
                    type='url'
                    value={editedUser.githubUrl == null ? '' : editedUser.githubUrl}
                    onChange={handleSetGithubUrl}
                  />
                </label>
              </div>
              <label className=' flex flex-col'>
                Website
                <input
                  type='url'
                  value={editedUser.websiteUrl == null ? '' : editedUser.websiteUrl}
                  onChange={handleSetWebsiteUrl}
                />
              </label>
              <div className=' flex w-full justify-between'>
                <Button color='blue' type='submit' className=' hover:transform-none'>
                  変更する
                </Button>
                <Button color='red' type='button' className=' hover:transform-none' onClick={handleDeleteUser}>
                  ユーザーを削除する
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
