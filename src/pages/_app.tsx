import '../../styles/globals.css'
import 'react-toastify/dist/ReactToastify.min.css'

import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import { Provider as JotaiProvider } from 'jotai'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

import { WrapperLayout } from '@/component/layout/WrapperLayout'
import { ToastContainer } from '@/component/ui/Toast'

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

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <JotaiProvider>
          <ToastContainer />
          <WrapperLayout>
            <Component {...pageProps} />
          </WrapperLayout>
        </JotaiProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}
