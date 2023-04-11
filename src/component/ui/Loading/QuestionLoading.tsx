import { Skeleton } from '@mantine/core'

import { QuestionLayout } from '@/component/layout/QuestionLayout'

export const QuestionLoading = () => {
  return (
    <QuestionLayout>
      {[...Array(6)].map((_, index) => {
        return <Skeleton key={index} radius='lg' className=' h-64 w-80' />
      })}
    </QuestionLayout>
  )
}
