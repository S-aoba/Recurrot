import { Skeleton } from '@mantine/core'

import { QuestionLayout } from '@/component/layout/QuestionLayout'

export const QuestionLoading = () => {
  return (
    <QuestionLayout>
      {[...Array(6)].map((_, index) => {
        return (
          <div
            key={index}
            className=' col-span-1 box-content flex h-64 w-80 flex-col gap-y-2 rounded-2xl border-[3px] border-solid border-gray-200 bg-white p-3 shadow-lg'
          >
            <div className=' flex h-2/4 justify-between pl-2'>
              <div className=' flex h-full items-center'>
                <Skeleton height={50} width={50} circle />
              </div>
              <div className='flex w-full flex-col px-4 py-2'>
                <div className=' flex w-full items-center gap-x-3 py-3'>
                  <Skeleton height={30} width={30} circle />
                  <Skeleton height={5} width={100} />
                </div>
                <div className=' flex w-full items-center gap-x-3 p-2 text-sm '>
                  <Skeleton height={5} width={100} />
                  <div className=' flex items-center gap-x-1'>
                    <Skeleton height={15} width={10} circle animate={false} />
                    <Skeleton height={10} width={20} />
                  </div>
                </div>
              </div>
            </div>
            <div className=' flex h-2/4 flex-col items-start justify-center gap-y-3 rounded-2xl bg-[#1976d2] px-2'>
              <Skeleton height={10} width={100} />
              <Skeleton height={10} width={150} />
              <Skeleton height={10} width={200} />
            </div>
          </div>
        )
      })}
    </QuestionLayout>
  )
}
