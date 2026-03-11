import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,       // 1 min — data stays fresh
      gcTime: 5 * 60 * 1000,      // 5 min — cache kept in memory
      retry: 1,                    // retry failed requests once
      refetchOnWindowFocus: false, // don't refetch when tab regains focus
    },
    mutations: {
      retry: 0,                    // don't retry failed mutations
    },
  },
})