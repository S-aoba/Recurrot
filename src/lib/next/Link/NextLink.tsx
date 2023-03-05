import Link from 'next/link'
import type { ReactNode } from 'react'
import type { MainUrlVal, SubUrlVal } from 'type'

/**
 * @package
 */

type NextLinkProps = {
  href: MainUrlVal | SubUrlVal
  children?: ReactNode
  as?: string
  className?: string
}

export const NextLink: React.FC<NextLinkProps> = ({ href, children, as, className }) => {
  return (
    <Link href={href} as={as} className={className}>
      {children}
    </Link>
  )
}
