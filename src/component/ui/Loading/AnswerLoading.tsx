import { Skeleton } from '@mantine/core'

export const AnswerLoading = () => {
  return (
    <>
      <div className=' w-full border-t-0 border-r-0 border-b border-l-0 border-solid border-gray-200 bg-white px-3 sm:w-10/12'>
        <Skeleton height={50} mb={5} />
      </div>
      <div className=' w-full border border-solid border-gray-200 bg-white p-5 sm:w-9/12'>
        <div className=' py-5'>
          <div className=' border-t-0 border-r-0 border-b border-l-0 border-solid border-gray-200 pb-2'>
            <div className=' flex w-full gap-x-2 pb-2'>
              <Skeleton height={20} circle />
              <Skeleton height={20} width={100} />
            </div>
          </div>
          <Skeleton height={600} mt={10} />
        </div>
      </div>
    </>
  )
}
