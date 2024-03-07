'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

let browserClient: QueryClient | undefined = undefined

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  })

const getQueryClient = () =>
  typeof window === 'undefined' || !browserClient
    ? makeQueryClient()
    : browserClient

export default function Providers({ children }: React.PropsWithChildren) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
