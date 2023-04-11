import Image from 'next/image'

import { HeaderRight } from './HeaderRight'

/**
 * @package
 */

export const Header = () => {
  return (
    <header className=' flex h-14 max-h-14 items-center justify-center'>
      <div className=' flex w-full max-w-[1200px] items-center justify-between px-8'>
        <Image src='/logo.svg' height={70} width={150} alt='Recurrot' priority />
        {/* height:{windowSize.height} width:{windowSize.width} */}
        <HeaderRight />
      </div>
    </header>
  )
}
