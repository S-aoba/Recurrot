import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

import type { SingleQuestion } from '@/common/type'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  const response = await axios.get<SingleQuestion>(`${process.env.NEXT_PUBLIC_API_URL}/question/${id}`, {
    headers: {
      cookie: req.headers.cookie,
    },
  })
  return res.status(200).json(response.data)
}

export default handler
