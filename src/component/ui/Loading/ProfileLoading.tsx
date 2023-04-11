import { Skeleton } from '@mantine/core'

export const ProfileLoading = () => {
  return (
    <main className=' flex h-fit flex-1 justify-center'>
      <div className=' flex w-full max-w-[1200px] justify-center px-8 '>
        <div className=' flex h-fit w-full items-center justify-center py-5 '>
          <div className=' w-full max-w-[700px] rounded-lg border-[3px] border-solid border-gray-200 shadow-lg'>
            <div className=' flex flex-col items-center justify-center gap-y-5 rounded-t bg-[#1976d2] p-5'>
              <Skeleton height={65} width={50} circle />
              <Skeleton height={35} width={80} />
            </div>
            <div className=' flex flex-col items-center p-5'>
              <div className=' flex w-11/12 flex-col items-start gap-y-5'>
                <Skeleton height={50} className=' w-full' />
                <div className=' w-full'>
                  <Skeleton height={300} className=' w-full' />
                </div>
                <div className=' flex w-full flex-col gap-y-3'>
                  <Skeleton height={50} width={50} className=' w-full' />
                  <Skeleton height={50} width={50} className=' w-full' />
                </div>
                <Skeleton height={50} width={50} className=' w-full' />
                <div className=' flex w-full justify-between'>
                  <Skeleton height={30} width={80} />
                  <Skeleton height={30} width={150} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
