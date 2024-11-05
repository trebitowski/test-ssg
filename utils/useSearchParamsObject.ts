import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

type SearchParamValue = string | string[] | undefined;

export function useSearchParamsObject<
  T extends Record<string, SearchParamValue>
>() {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const params: Record<string, SearchParamValue> = {};

    if (!searchParams) return {} as T;

    const entries = Array.from(searchParams);
    for (const [key, value] of entries) {
      if (key in params) {
        if (Array.isArray(params[key])) {
          params[key].push(value);
        } else {
          params[key] = [params[key] as string, value];
        }
      } else {
        const allValues = searchParams.getAll(key);
        params[key] = allValues.length > 1 ? allValues : value;
      }
    }

    return params as T;
  }, [searchParams]);
}
