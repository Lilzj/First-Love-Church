import { useState, useEffect, useCallback } from 'react';

interface UseApiQueryOptions<T> {
  queryFn: () => Promise<T>;
  enabled?: boolean;
}

interface UseApiQueryResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useApiQuery<T>({ queryFn, enabled = true }: UseApiQueryOptions<T>): UseApiQueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await queryFn();
      setData(result);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Something went wrong';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [queryFn]);

  useEffect(() => {
    if (enabled) {
      fetch();
    }
  }, [enabled]); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, isLoading, error, refetch: fetch };
}

// Hook for mutations (create/update/delete) with loading and error state
interface UseApiMutationResult<TData, TParams> {
  mutate: (params: TParams) => Promise<TData | undefined>;
  isLoading: boolean;
  error: string | null;
}

export function useApiMutation<TData = void, TParams = void>(
  mutationFn: (params: TParams) => Promise<TData>
): UseApiMutationResult<TData, TParams> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: TParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await mutationFn(params);
      return result;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Something went wrong';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [mutationFn]);

  return { mutate, isLoading, error };
}
