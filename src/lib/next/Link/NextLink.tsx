import Link from 'next/link'
import type { ReactNode } from 'react'

import type { MainUrlVal, SubUrlVal } from '@/common/type'

/**
 * @package
 */

type NextLinkProps = {
  href: MainUrlVal | SubUrlVal
  children?: ReactNode
  as?: string
  className?: string
  onClick?: () => void
}

export const NextLink: React.FC<NextLinkProps> = ({ href, children, as, className, onClick: handleOnClick }) => {
  return (
    <Link href={href} as={as} className={className} onClick={handleOnClick}>
      {children}
    </Link>
  )
}
