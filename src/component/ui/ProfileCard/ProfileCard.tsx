import { Avatar, Button, FileButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useState } from 'react'
import { storage } from 'src/firebase'

import { useMutateUser } from '@/common/hook/useMutateUser'
import type { EditedUpdateMyProfile, MyProfile } from '@/common/type'

import { Modal } from '../Modal'
import { useMutateMyProfile } from './hook/useMutateMyProfile'

/**
 * @package
 */

type ProfileCardProps = {
  user: MyProfile
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const [isProfileOpened, { open: handleProfileOpen, close: handleProfileClose }] = useDisclosure(false)
  const [isDeleteUserOpened, { open: handleDeleteUserOpen, close: handleDeleteUserClose }] = useDisclosure(false)

  const { deleteUserMutation } = useMutateUser()
  const { updateMyProfileMutation } = useMutateMyProfile()

  const [editedMyProfile, setEditedMyProfile] = useState<EditedUpdateMyProfile>({
    userName: user.userName == null ? '' : user.userName,
    selfIntroduction: user.selfIntroduction == null ? '' : user.selfIntroduction,
    profileImage: user.profileImage == null ? '' : user.profileImage,
    twitterUrl: user.twitterUrl == null ? '' : user.twitterUrl,
    githubUrl: user.githubUrl == null ? '' : user.githubUrl,
    websiteUrl: user.websiteUrl == null ? '' : user.websiteUrl,
  })

  const handleSetUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedMyProfile({ ...editedMyProfile, userName: e.target.value })
  }

  const handleSetSelfIntroduction = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedMyProfile({ ...editedMyProfile, selfIntroduction: e.target.value })
  }

  const handleSetTwitterUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedMyProfile({ ...editedMyProfile, twitterUrl: e.target.value })
  }

  const handleSetGithubUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedMyProfile({ ...editedMyProfile, githubUrl: e.target.value })
  }

  const handleSetWebsiteUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedMyProfile({ ...editedMyProfile, websiteUrl: e.target.value })
  }

  const handleSubmit = () => {
    updateMyProfileMutation.mutate(editedMyProfile)
    handleProfileClose()
  }

  const handleDeleteUser = () => {
    deleteUserMutation.mutate()
    deleteObject(ref(storage, `images/${user.id}`))
    handleDeleteUserClose()
  }

  // firebase storageに画像を保存する
  const handleUploadImage = async (e: File | null) => {
    if (e == null) return
    const file = e
    const storageRef = ref(storage, `images/${user.id}`)
    uploadBytes(storageRef, file).then((snapshot) => {
      // アップロードが完了したら、画像のURLを取得し、updateUserMutation呼び出し更新する
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        const updatedMyProfile = { ...editedMyProfile, profileImage: downloadURL }
        setEditedMyProfile(updatedMyProfile)
        updateMyProfileMutation.mutate(updatedMyProfile)
      })
    })
  }

  return (
    <>
      <Modal
        opened={isProfileOpened}
        onClose={handleProfileClose}
        onSubmit={handleSubmit}
        buttonWord='変更する'
        modalTitle='プロフィールを変更する'
      />

      <Modal
        opened={isDeleteUserOpened}
        onClose={handleDeleteUserClose}
        onSubmit={handleDeleteUser}
        buttonWord='削除する'
        modalTitle='本当に削除してもよろしいですか？'
      />

      {user && (
        <div className=' w-full max-w-[700px] rounded-lg border-[3px] border-solid border-gray-200 bg-white shadow-lg'>
          <div className=' flex flex-col items-center justify-center gap-y-5 rounded-t p-5'>
            <Avatar src={user.profileImage} size={'lg'} radius={'xl'} variant={'outline'} />
            <FileButton onChange={handleUploadImage} accept='image/png,image/jpeg'>
              {(props) => {
                return (
                  <Button {...props} className=' hover:transform-none'>
                    変更する
                  </Button>
                )
              }}
            </FileButton>
          </div>
          <div className=' flex flex-col items-center p-5'>
            <div className=' flex w-11/12 flex-col gap-y-5'>
              <Input
                labelWord='ユーザーネーム'
                type='text'
                value={editedMyProfile.userName == null ? '' : editedMyProfile.userName}
                onChange={handleSetUserName}
              />
              <div className=' w-full'>
                <TextArea
                  labelWord='自己紹介'
                  value={editedMyProfile.selfIntroduction == null ? '' : editedMyProfile.selfIntroduction}
                  onChange={handleSetSelfIntroduction}
                />
              </div>
              <div className=' flex w-full flex-col gap-y-3'>
                <Input
                  labelWord='Twitter'
                  type='url'
                  value={editedMyProfile.twitterUrl == null ? '' : editedMyProfile.twitterUrl}
                  onChange={handleSetTwitterUrl}
                />

                <Input
                  labelWord='Github'
                  type='url'
                  value={editedMyProfile.githubUrl == null ? '' : editedMyProfile.githubUrl}
                  onChange={handleSetGithubUrl}
                />
              </div>
              <Input
                labelWord='Website'
                type='url'
                value={editedMyProfile.websiteUrl == null ? '' : editedMyProfile.websiteUrl}
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
