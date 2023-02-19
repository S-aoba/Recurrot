import type { ReactNode } from 'react'

import { Footer } from './Footer'
import { Header } from './Header'
import { Navigation } from './Navigation'

type WrapperLayoutProps = {
  children: ReactNode
}

export const WrapperLayout = ({ children }: WrapperLayoutProps) => {
  return (
    <div className=' flex h-screen w-screen flex-col'>
      <Header />
      <Navigation />
      {children}
      <Footer />
    </div>
  )
}
