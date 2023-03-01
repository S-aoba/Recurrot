import Head from 'next/head'

import { Card } from '@/component/ui/Card'

const answers = () => {
  return (
    <>
      <Head>
        <title>userName - Recurrot</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className=' flex h-fit justify-center'>
        <div className=' grid w-9/12 grid-cols-3 gap-10 py-5'>
          <Card />
        </div>
      </main>
    </>
  )
}
export default answers
