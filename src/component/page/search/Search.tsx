import type { NextPage } from 'next'

import type { SearchQuestion } from '@/common/type'
import { Card } from '@/component/ui/Card'

/**
 * @package
 */

type SearchProps = {
  searchQuestionList: SearchQuestion[]
}

export const Search: NextPage<SearchProps> = ({ searchQuestionList }) => {
  return (
    <>
      {searchQuestionList.map((question: SearchQuestion, index) => {
        return <Card key={index} question={question} />
      })}
    </>
  )
}
