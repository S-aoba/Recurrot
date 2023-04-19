import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

import type { MyProfile } from '@/common/type'

/**
 * @package
 */

export const useQueryMyProfile = () => {
  const router = useRouter()
  const getMYProfile = async () => {
    const { data } = await axios.get<MyProfile>(`${process.env.NEXT_PUBLIC_API_URL}/user/my-profile`)
    return data
  }
  return useQuery<MyProfile, Error>({
    queryKey: ['my-profile'],
    queryFn: getMYProfile,
    staleTime: Infinity,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403) router.push('/')
    },
  })
}
