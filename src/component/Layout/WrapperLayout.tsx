import type { ReactNode } from 'react'

import { Navigation } from '../Navigation'
import { Footer } from './Footer'
import { Header } from './Header'

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
