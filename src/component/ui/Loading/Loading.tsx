import { Loader } from '@mantine/core'

export const HeaderRightLoading = () => {
  return (
    <main className=' flex h-fit flex-1 items-center justify-center'>
      <Loader variant='bars' size='xl' />
    </main>
  )
}