import type { Metadata } from 'next';
import { getRegionMeta } from '../../../../utils/regions';

type Props = {
  params: { site: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const dynamic = 'force-static';
export const dynamicParams = true;

function pickRandomIcon(input: string) {
  const ICON_COUNT = 5;
  const hash =
    input.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0) % ICON_COUNT;
  return `/icons/${hash}.ico`;
}

function getAvatarUrl(input: string) {
  return `https://api.dicebear.com/9.x/icons/svg?seed=${input}&radius=50&size=32`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const timestamp = new Date().toISOString();
  return {
    title: slug,
    icons: [{ rel: 'icon', url: getAvatarUrl(timestamp) }]
  };
}

export default async function Page({ params }: Props) {
  const timestamp = new Date();
  const { region, apiUrl } = getRegionMeta(params.site);
  console.log('Building Page', {
    slug: params.slug,
    site: params.site,
    region,
    apiUrl,
    date: timestamp
  });
  return (
    <>
      <h1>Revalidation</h1>
      <p>Site: {params.site}</p>
      <p>Slug: {params.slug}</p>
      <p>Path: {`_forms/${params.slug}/${params.site}`}</p>
      <p>Region: {region}</p>
      <p>API URL: {apiUrl}</p>
      <p>
        Generated:{' '}
        {`${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}`}
      </p>
    </>
  );
}
