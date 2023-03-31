import '../../styles/globals.css'

import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import { Provider as JotaiProvider } from 'jotai'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

import { WrapperLayout } from '@/component/layout/WrapperLayout'

// import { WrapperLayout } from '@/component/layout/WrapperLayout'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  axios.defaults.withCredentials = true
  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`)
      axios.defaults.headers.common['csrf-token'] = data.csrfToken
    }
    getCsrfToken()
  }, [])

  // index.tsxのみWrapperLayoutを使わないページで,それ以外のページでは使用する処理
  const isWrapperLayout = Component.name === 'Home' ? true : false

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <JotaiProvider>
          {isWrapperLayout ? (
            <>
              <p>true</p>
              <Component {...pageProps} />
            </>
          ) : (
            <WrapperLayout>
              <p>false</p>
              <Component {...pageProps} />
            </WrapperLayout>
          )}
        </JotaiProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}
