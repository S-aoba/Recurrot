import type { ReactNode } from 'react'

import { Navigation } from '../ui/Navigation'
import { Footer } from './Footer'
import { Header } from './Header'

type WrapperLayoutProps = {
  children: ReactNode
}

export const WrapperLayout = ({ children }: WrapperLayoutProps) => {
  return (
    <div className=' flex min-h-screen  w-full flex-col'>
      <Header />
      <Navigation />
      {children}
      <Footer />
    </div>
  )
}
