import { Button, Skeleton, TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'

import { useGetWindowSize } from '@/common/hook/useGetWindowSize'

export const HeaderRightLoading = () => {
  const windowSize = useGetWindowSize()

  return (
    <div className=' flex w-6/12 items-center justify-end gap-x-4'>
      {windowSize.width > 992 ? (
        <TextInput placeholder='質問を検索する' className=' w-full' />
      ) : (
        <div className=' flex w-full justify-end'>
          <IconSearch color='black' size={25} />
        </div>
      )}
      <div>
        <Skeleton height={28} circle />
      </div>
      <div>
        <Skeleton height={36} circle />
      </div>
      {windowSize.width > 770 && (
        <Button type='button' disabled>
          質問する
        </Button>
      )}
    </div>
  )
}
