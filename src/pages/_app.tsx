import '../../styles/globals.css'

import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider as JotaiProvider } from 'jotai'
import type { AppProps } from 'next/app'

import { WrapperLayout } from '@/component/layout/WrapperLayout'

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        // Todo:ダークモード,ライトモードの切り替え
        colorScheme: 'light',
      }}
    >
      <QueryClientProvider client={queryClient}>
        <JotaiProvider>
          <WrapperLayout>
            <Component {...pageProps} />
          </WrapperLayout>
        </JotaiProvider>
      </QueryClientProvider>
    </MantineProvider>
  )
}
