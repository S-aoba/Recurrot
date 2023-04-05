import { Avatar, Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import type { User } from '@prisma/client'
import { useState } from 'react'

import { useMutateUser } from '@/common/hook/useMutateUser'

import { Modal } from '../Modal'

/**
 * @package
 */

type ProfileCardProps = {
  user: Omit<User, 'hashedPassword'>
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const [isProfileOpened, { open: handleProfileOpen, close: handleProfileClose }] = useDisclosure(false)
  const [isDeleteUserOpened, { open: handleDeleteUserOpen, close: handleDeleteUserClose }] = useDisclosure(false)

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

  const handleSubmit = () => {
    updateUserMutation.mutate(editedUser)
    handleProfileClose()
  }

  const handleDeleteUser = () => {
    deleteUserMutation.mutate()
    handleDeleteUserClose()
  }

  return (
    <>
      <Modal opened={isProfileOpened} onClose={handleProfileClose} onSubmit={handleSubmit}>
        変更する
      </Modal>
      <Modal opened={isDeleteUserOpened} onClose={handleDeleteUserClose} onSubmit={handleDeleteUser}>
        削除する
      </Modal>

      {user && (
        <div className=' grid rounded-lg border-2 border-solid border-gray-200 shadow-sm sm:grid-cols-12'>
          <div className=' mx-10 flex flex-col items-center justify-center gap-y-5 border-r-0 border-b-2 border-l-0 border-t-0 border-solid border-gray-200 py-5 px-5 sm:col-span-4 sm:mx-0 sm:my-10 sm:border-r sm:border-l-0 sm:border-t-0 sm:border-b-0 sm:py-0'>
            <Avatar size={'lg'} radius={'xl'} variant={'outline'} />
            <Button color='blue' disabled>
              変更する
            </Button>
          </div>
          <div className=' flex flex-col items-center p-5 sm:col-span-8'>
            <div className=' flex w-11/12 flex-col items-start gap-y-5'>
              <Input
                labelWord='ユーザーネーム'
                type='text'
                value={editedUser.userName == null ? '' : editedUser.userName}
                onChange={handleSetUserName}
              />
              <div className=' w-full'>
                <TextArea
                  labelWord='自己紹介'
                  value={editedUser.selfIntroduction == null ? '' : editedUser.selfIntroduction}
                  onChange={handleSetSelfIntroduction}
                />
              </div>
              <div className=' flex w-full flex-col gap-y-3 sm:flex-row sm:gap-x-3'>
                <Input
                  labelWord='Twitter'
                  type='url'
                  value={editedUser.twitterUrl == null ? '' : editedUser.twitterUrl}
                  onChange={handleSetTwitterUrl}
                />

                <Input
                  labelWord='Github'
                  type='url'
                  value={editedUser.githubUrl == null ? '' : editedUser.githubUrl}
                  onChange={handleSetGithubUrl}
                />
              </div>
              <Input
                labelWord='Website'
                type='url'
                value={editedUser.websiteUrl == null ? '' : editedUser.websiteUrl}
                onChange={handleSetWebsiteUrl}
              />
              <div className=' flex w-full justify-between'>
                <Button color='blue' type='button' onClick={handleProfileOpen} className=' hover:transform-none'>
                  変更する
                </Button>
                <Button color='red' type='button' className=' hover:transform-none' onClick={handleDeleteUserOpen}>
                  ユーザーを削除する
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

type InputProps = {
  labelWord: string
  type?: 'text' | 'url'
  value: string | null
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({ labelWord, type, value, onChange: handleOnChange }) => {
  return (
    <label className=' flex flex-col'>
      {labelWord}
      <input
        type={type}
        value={value == null ? '' : value}
        onChange={handleOnChange}
        className=' w-full rounded-md border-2 border-solid border-gray-200 p-3'
      />
    </label>
  )
}

type TextProps = {
  labelWord: string
  value: string | null
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextArea: React.FC<TextProps> = ({ labelWord, value, onChange: handleOnChange }) => {
  return (
    <label className=' flex flex-col'>
      {labelWord}
      <textarea
        className=' h-52 w-full resize-none rounded-md border-2 border-solid border-gray-200 p-3'
        value={value == null ? '' : value}
        onChange={handleOnChange}
      />
    </label>
  )
}
