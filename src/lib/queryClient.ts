import { QueryClient } from '@tanstack/react-query';

// Cliente de consulta para React Query
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchOnWindowFocus: false,
      retry: false
    },
  },
});