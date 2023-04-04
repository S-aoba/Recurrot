import type { ReactNode } from 'react'

import { Footer } from './Footer'
import { Header } from './Header'
import { Navigation } from './Navigation'

type WrapperLayoutProps = {
  children: ReactNode
}

export const WrapperLayout = ({ children }: WrapperLayoutProps) => {
  return (
    <div className=' flex min-h-screen w-full flex-col'>
      <Header />
      <Navigation />
      {children}
      <Footer />
    </div>
  )
}
