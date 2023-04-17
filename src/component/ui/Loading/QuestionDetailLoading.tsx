import { Skeleton } from '@mantine/core'

export const QuestionDetailLoading = () => {
  return (
    <main className=' flex h-fit flex-1 flex-col items-center gap-y-10 p-5'>
      <div className=' flex w-full max-w-[1200px] flex-col items-center justify-center gap-y-5'>
        <div className=' w-full bg-white px-3 sm:w-10/12'>
          <Skeleton height={30} />
        </div>
        <div className=' w-full border border-solid border-gray-200 p-5 sm:w-9/12'>
          <div className=' py-5'>
            <div className=' flex items-center justify-between border-t-0 border-r-0 border-b border-l-0 border-solid border-gray-200 pb-2'>
              <div className=' flex items-center gap-x-2 text-sm'>
                <Skeleton height={20} width={100} circle />
                <div className=' flex gap-x-2'>
                  <Skeleton height={20} width={100} />
                  <Skeleton height={20} width={100} />
                </div>
              </div>
            </div>
            <div className=' flex flex-col gap-y-5 py-5'>
              <Skeleton height={20} width={300} />
              <Skeleton height={20} width={400} />
              <Skeleton height={20} width={600} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
