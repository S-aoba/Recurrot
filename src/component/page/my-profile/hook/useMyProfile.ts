import { deleteObject, ref } from 'firebase/storage'
import { useState } from 'react'

import { useMutateUser } from '@/common/hook/useMutateUser'
import type { EditedUpdateMyProfile } from '@/common/type'
import { storage } from '@/firebase/config'

import { useMutateMyProfile } from './useMutateMyProfile'

/**
 * @package
 */

export const useMyProfile = (
  editedMyProfile: EditedUpdateMyProfile,
  setEditedMyProfile: React.Dispatch<React.SetStateAction<EditedUpdateMyProfile>>,
  handleDeleteUserClose: () => void,
  userId: string,
  profileImage: string | null
) => {
  const [isLoading, setIsLoading] = useState(false)

  const { updateMyProfileMutation } = useMutateMyProfile()

  const { deleteUserMutation } = useMutateUser()

  const handleSetProfileItem = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const profileItem = e.target.name
    setEditedMyProfile({ ...editedMyProfile, [profileItem]: e.target.value })
  }

  const handleSubmit = () => {
    // 1秒後にupdateMyProfileMutationを実行
    setIsLoading(true)
    setTimeout(() => {
      updateMyProfileMutation.mutate(editedMyProfile)
      setIsLoading(false)
    }, 1000)
  }

  const handleDeleteUser = async () => {
    // プロフィール画像があれば削除
    if (profileImage !== null) {
      await deleteObject(ref(storage, `images/${userId}`))
    }
    deleteUserMutation.mutate()
    handleDeleteUserClose()
  }

  return { handleSetProfileItem, handleSubmit, handleDeleteUser, isLoading }
}
