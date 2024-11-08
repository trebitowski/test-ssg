'use client';

import { featheryOptions } from '@/utils/helpers';
import parseQueryParams from '@/utils/queryParams';
import { getRegionMeta } from '@/utils/regions';
import FeatheryForm from './FeatheryForm';
import { useSearchParamsObject } from '@/utils/useSearchParamsObject';

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
  const searchParams = useSearchParamsObject();

  const parsedQueryParams = parseQueryParams(searchParams);
  const featheryOpts = featheryOptions(searchParams);
  const { region } = getRegionMeta(domain);

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
