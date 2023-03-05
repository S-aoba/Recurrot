import '../../styles/globals.css'

import { MantineProvider } from '@mantine/core'
import { Provider as JotaiProvider } from 'jotai'
import type { AppProps } from 'next/app'

import { WrapperLayout } from '@/component/layout/WrapperLayout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <JotaiProvider>
        <WrapperLayout>
          <Component {...pageProps} />
        </WrapperLayout>
      </JotaiProvider>
    </MantineProvider>
  )
}
