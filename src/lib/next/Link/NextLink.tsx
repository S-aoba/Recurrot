import Link from 'next/link'
import type { ReactNode } from 'react'

import type { UrlVal } from '@/component/type'

/**
 * @package
 */

type NextLinkProps = {
  href: UrlVal
  children: ReactNode
}

export const NextLink: React.FC<NextLinkProps> = ({ href, children }) => {
  return <Link href={href}>{children}</Link>
}
