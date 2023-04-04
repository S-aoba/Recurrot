import Link from 'next/link'

import { useGetWindowSize } from '@/common/hook/useGetWindowSize'

export const Footer = () => {
  const windowSize = useGetWindowSize()
  return (
    <footer className=' flex justify-center border-t border-r-0 border-b-0 border-l-0 border-solid border-gray-200 py-5'>
      <div className=' flex w-full max-w-[1200px] items-center justify-between px-4'>
        {windowSize.width >= 959 && (
          <Link href={'/dashboard/new-questions'} className=' text-2xl text-black no-underline hover:cursor-pointer'>
            Recurrot
          </Link>
        )}
        <div className=' flex w-full flex-col items-center whitespace-nowrap text-center text-sm text-gray-600 sm:flex-row'>
          <div className=' flex w-full flex-wrap justify-center gap-x-5'>
            <Link href={'/dashboard/new-questions'} className=' block text-black no-underline hover:cursor-pointer'>
              利用規約
            </Link>
            <Link href={'/dashboard/new-questions'} className=' block text-black no-underline hover:cursor-pointer'>
              プライバシー
            </Link>
            <Link href={'/dashboard/new-questions'} className=' block text-black no-underline hover:cursor-pointer'>
              特定取引法に基づく表示
            </Link>
            <Link href={'/dashboard/new-questions'} className=' block text-black no-underline hover:cursor-pointer'>
              お問い合わせ
            </Link>
          </div>
          <p>Copyright © 2023 Recurrot,Inc All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}
