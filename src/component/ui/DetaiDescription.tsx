import 'prismjs/themes/prism-tomorrow.css'

import Prism from 'prismjs'
import { useEffect } from 'react'

type DetailDescriptionProps = {
  description: string
}

export const DetailDescription: React.FC<DetailDescriptionProps> = ({ description }) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return <div dangerouslySetInnerHTML={{ __html: description }}></div>
}
