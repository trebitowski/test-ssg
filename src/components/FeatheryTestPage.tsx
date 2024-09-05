import parseQueryParams from '@/utils/queryParams';
import { useRouter } from 'next/router';
import { getRegionMeta } from '@/utils/regions';

export type Props = {
  hostname: string;
  slug: string;
  time: number;
};

export default function FeatheryTestPage({ hostname, slug, time }: Props) {
  const router = useRouter();
  const parsedQueryParams = parseQueryParams(router.query);
  const { region, apiUrl } = getRegionMeta(hostname);

  return (
    <>
      <div>
        <p>Date: {new Date(time).toLocaleDateString()}</p>
        <p>Time: {new Date(time).toLocaleTimeString()}</p>
        <p>Host: {hostname}</p>
        <p>Slug: {slug}</p>
        <p>Region: {region}</p>
        <p>API: {apiUrl}</p>
        <p>Params:</p>
        <pre>{JSON.stringify(parsedQueryParams, null, 2)}</pre>
      </div>
    </>
  );
}
