import '../../styles/globals.css'

import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'

import { WrapperLayout } from '@/component/Layout/WrapperLayout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <WrapperLayout>
        <Component {...pageProps} />
      </WrapperLayout>
    </MantineProvider>
  )
}
