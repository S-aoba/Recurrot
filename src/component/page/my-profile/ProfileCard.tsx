import { Avatar, Button, FileButton, Textarea, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useState } from 'react'
import { storage } from 'src/firebase/config'

import type { EditedUpdateMyProfile, MyProfile } from '@/common/type'

import { Modal } from '../../ui/Modal'
import { useMutateMyProfile, useMyProfile } from './hook'

/**
 * @package
 */

type ProfileCardProps = {
  myProfile: MyProfile
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ myProfile }) => {
  const [isDeleteUserOpened, { open: handleDeleteUserOpen, close: handleDeleteUserClose }] = useDisclosure(false)

  const { updateMyProfileMutation } = useMutateMyProfile()

  const [editedMyProfile, setEditedMyProfile] = useState<EditedUpdateMyProfile>({
    userName: myProfile.userName == null ? '' : myProfile.userName,
    selfIntroduction: myProfile.selfIntroduction == null ? '' : myProfile.selfIntroduction,
    profileImage: myProfile.profileImage == null ? '' : myProfile.profileImage,
    twitterUrl: myProfile.twitterUrl == null ? '' : myProfile.twitterUrl,
    githubUrl: myProfile.githubUrl == null ? '' : myProfile.githubUrl,
    websiteUrl: myProfile.websiteUrl == null ? '' : myProfile.websiteUrl,
  })

  const { handleSetProfileItem, handleSubmit, handleDeleteUser, isLoading } = useMyProfile(
    editedMyProfile,
    setEditedMyProfile,
    handleDeleteUserClose,
    myProfile.id,
    myProfile.profileImage
  )

  // firebase storageに画像を保存する
  const handleUploadImage = async (e: File | null) => {
    if (e == null) return
    const file = e
    const storageRef = ref(storage, `images/${myProfile.id}`)
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
        opened={isDeleteUserOpened}
        onClose={handleDeleteUserClose}
        onSubmit={handleDeleteUser}
        buttonWord='削除する'
        modalTitle='本当に削除してもよろしいですか？'
        description='この操作は取り消せません。ご注意ください。'
      />

      {myProfile && (
        <div className=' w-full max-w-[700px] rounded-md bg-white shadow-lg'>
          <div className=' flex flex-col items-center justify-center gap-y-5 rounded-t p-5'>
            <Avatar
              src={myProfile.profileImage}
              size={'lg'}
              radius={'xl'}
              variant={'outline'}
              className=' border border-solid border-gray-200 shadow-sm'
            />
            <FileButton onChange={handleUploadImage} accept='image/png,image/jpeg'>
              {(props) => {
                return (
                  <Button {...props} className=' hover:transform-none' disabled={isLoading}>
                    変更する
                  </Button>
                )
              }}
            </FileButton>
          </div>
          <div className=' flex flex-col items-center p-5'>
            <div className=' flex w-11/12 flex-col gap-y-5'>
              <TextInput
                label='ユーザーネーム'
                type='text'
                name='userName'
                value={editedMyProfile.userName == null ? '' : editedMyProfile.userName}
                onChange={handleSetProfileItem}
              />
              <div className=' w-full'>
                <Textarea
                  name='selfIntroduction'
                  label='自己紹介'
                  styles={{ input: { height: '13rem' } }}
                  value={editedMyProfile.selfIntroduction == null ? '' : editedMyProfile.selfIntroduction}
                  onChange={handleSetProfileItem}
                />
              </div>
              <div className=' flex w-full flex-col gap-y-3'>
                <TextInput
                  label='Twitter'
                  type='url'
                  name='twitterUrl'
                  value={editedMyProfile.twitterUrl == null ? '' : editedMyProfile.twitterUrl}
                  onChange={handleSetProfileItem}
                />

                <TextInput
                  label='Github'
                  type='url'
                  name='githubUrl'
                  value={editedMyProfile.githubUrl == null ? '' : editedMyProfile.githubUrl}
                  onChange={handleSetProfileItem}
                />
              </div>
              <TextInput
                label='Website'
                type='url'
                name='websiteUrl'
                value={editedMyProfile.websiteUrl == null ? '' : editedMyProfile.websiteUrl}
                onChange={handleSetProfileItem}
              />
              <div className=' flex w-full justify-between'>
                <Button
                  color='blue'
                  type='button'
                  onClick={handleSubmit}
                  className=' hover:transform-none'
                  loading={isLoading}
                >
                  {isLoading ? '更新中' : '更新する'}
                </Button>
                <Button
                  color='red'
                  type='button'
                  className=' hover:transform-none'
                  onClick={handleDeleteUserOpen}
                  disabled={isLoading}
                >
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
