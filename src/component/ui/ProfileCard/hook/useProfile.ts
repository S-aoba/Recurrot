import { deleteObject, ref } from 'firebase/storage'

import { useMutateUser } from '@/common/hook/useMutateUser'
import type { EditedUpdateMyProfile } from '@/common/type'
import { storage } from '@/firebase'

import { useMutateMyProfile } from './useMutateMyProfile'

export const useProfile = (
  editedMyProfile: EditedUpdateMyProfile,
  setEditedMyProfile: React.Dispatch<React.SetStateAction<EditedUpdateMyProfile>>,
  handleProfileClose: () => void,
  handleDeleteUserClose: () => void,
  userId: string,
  profileImage: string | null
) => {
  const { updateMyProfileMutation } = useMutateMyProfile()

  const { deleteUserMutation } = useMutateUser()

  const handleSetProfileItem = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const profileItem = e.target.name
    setEditedMyProfile({ ...editedMyProfile, [profileItem]: e.target.value })
  }

  const handleSubmit = () => {
    updateMyProfileMutation.mutate(editedMyProfile)
    handleProfileClose()
  }

  const handleDeleteUser = async () => {
    // プロフィール画像があれば削除
    if (profileImage !== null) {
      await deleteObject(ref(storage, `images/${userId}`))
    }
    deleteUserMutation.mutate()
    handleDeleteUserClose()
  }

  return { handleSetProfileItem, handleSubmit, handleDeleteUser }
}
