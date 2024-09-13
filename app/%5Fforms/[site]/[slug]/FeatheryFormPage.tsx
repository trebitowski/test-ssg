'use client';

import { featheryOptions } from '@/utils/helpers';
import parseQueryParams from '@/utils/queryParams';
import { getRegionMeta } from '@/utils/regions';
import { useRouter } from 'next/router';
import FeatheryForm from './FeatheryForm';

export type Props = {
  site: string;
  slug: string;
  draft: boolean;
  useAuth: boolean;
  sdkKey?: string;
  customDomain: string;
};

export default function FeatheryFormPage({
  site,
  slug,
  draft = false,
  useAuth = false,
  sdkKey = '',
  customDomain = ''
}: Props) {
  const router = useRouter();
  const parsedQueryParams = parseQueryParams(router.query);
  const featheryOpts = featheryOptions(router.query);
  const { region } = getRegionMeta(site);

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
