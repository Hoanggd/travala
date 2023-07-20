import { NextPage } from 'next'
import type { AppProps } from 'next/app'

import { ReactElement, ReactNode } from 'react'

import { theme } from '@/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import '@/config/dayjs'
import '@/config/zod'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode
}

const queryClient = new QueryClient()

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
	pageProps: any
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page)

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<ChakraProvider theme={theme}>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
		</QueryClientProvider>
	)
}
