import parseQueryParams from '@/utils/queryParams';
import { useRouter } from 'next/router';
import { getRegionMeta } from '@/utils/regions';

export type Props = {
  host: string;
  panelSlug: string;
  time: number;
};

export default function FeatheryTestPage({ host, panelSlug, time }: Props) {
  const router = useRouter();
  const parsedQueryParams = parseQueryParams(router.query);
  const { region, apiUrl } = getRegionMeta(host);

  return (
    <>
      <div>
        <p>Date: {new Date(time).toLocaleDateString()}</p>
        <p>Time: {new Date(time).toLocaleTimeString()}</p>
        <p>Host: {host}</p>
        <p>Slug: {panelSlug}</p>
        <p>Region: {region}</p>
        <p>API: {apiUrl}</p>
        <p>Params:</p>
        <pre>{JSON.stringify(parsedQueryParams, null, 2)}</pre>
      </div>
    </>
  );
}
