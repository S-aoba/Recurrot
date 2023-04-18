import { Loader } from '@mantine/core'

import { QuestionLayout } from '@/component/layout/QuestionLayout'

export const QuestionLoading = () => {
  return (
    <QuestionLayout>
      <Loader />
    </QuestionLayout>
  )
}
