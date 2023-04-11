import { Skeleton } from '@mantine/core'

export const HeaderRightLoading = () => {
  return (
    <div className=' flex w-6/12 items-center justify-end gap-x-4'>
      <Skeleton height={30} width={300} />
      <Skeleton height={30} circle />
      <Skeleton height={30} circle />
      <Skeleton height={30} width={60} />
    </div>
  )
}
