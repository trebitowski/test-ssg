'use client';

import { featheryOptions } from '@/utils/helpers';
import parseQueryParams from '@/utils/queryParams';
import { getRegionMeta } from '@/utils/regions';
import { useSearchParams } from 'next/navigation';
import FeatheryForm from './FeatheryForm';

export type Props = {
  domain: string;
  slug: string;
  draft: boolean;
  useAuth: boolean;
  sdkKey?: string;
  customDomain: string;
};

export default function FeatheryFormPage({
  domain,
  slug,
  draft = false,
  useAuth = false,
  sdkKey = '',
  customDomain = ''
}: Props) {
  const searchParams = useSearchParams();
  const parsedQueryParams = parseQueryParams(searchParams);
  const featheryOpts = featheryOptions(searchParams);
  domain = domain.replaceAll('trebitowski.com', 'feathery.io');
  const { region } = getRegionMeta(domain);

  console.log('searchParams', searchParams);
  console.log('parsedQueryParams', parsedQueryParams);
  return (
    <>
      {slug && (
        <FeatheryForm
          formId={slug}
          useAuth={useAuth}
          draft={draft}
          sdkKey={sdkKey}
          region={region}
          parsedQueryParams={parsedQueryParams}
          featheryOpts={featheryOpts}
          customDomain={customDomain}
        />
      )}
    </>
  );
}
