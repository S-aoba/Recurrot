import { COLOR } from '@/common/const'

export const QuestionLoading = () => {
  return (
    <main className=' flex h-fit flex-1 justify-center bg-[] py-3'>
      <div className='flex justify-center'>
        <div className={`h-8 w-8 animate-spin rounded-lg bg-[${COLOR.main}] `}></div>
      </div>
    </main>
  )
}
