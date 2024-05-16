import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      gcTime: 24 * 60 * 60 * 1000,
      refetchOnReconnect: true,
    },
  },
});

export default queryClient;