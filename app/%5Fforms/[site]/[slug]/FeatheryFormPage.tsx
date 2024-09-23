'use client';

import { featheryOptions } from '@/utils/helpers';
import parseQueryParams from '@/utils/queryParams';
import { getRegionMeta } from '@/utils/regions';
import { useSearchParams } from 'next/navigation';
import FeatheryForm from './FeatheryForm';

export type Props = {
  site: string;
  slug: string;
  draft: boolean;
  useAuth: boolean;
  sdkKey?: string;
  customDomain: string;
};

export default function FeatheryFormPage() {
  const searchParams = useSearchParams();
  const parsedQueryParams = parseQueryParams(searchParams);
  const featheryOpts = featheryOptions(searchParams);

  console.log('searchParams', searchParams);
  return (
    <>
      <pre>{JSON.stringify(searchParams, null, 2)}</pre>
      <pre>{JSON.stringify(parsedQueryParams, null, 2)}</pre>
      <pre>{JSON.stringify(featheryOpts, null, 2)}</pre>
    </>
  );
}
