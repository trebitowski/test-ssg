import type { Metadata } from 'next';
import { getRegionMeta } from '../../../../utils/regions';

type Props = {
  params: { site: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const randomWikiUrl =
  'https://en.wikipedia.org/api/rest_v1/page/random/summary';
const maxExtractLength = 200;

export const dynamic = 'force-static';
export const dynamicParams = true;

function pickRandomIcon(input: string) {
  const ICON_COUNT = 5;
  const hash =
    input.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0) % ICON_COUNT;
  return `/icons/${hash}.png`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  return {
    title: slug,
    icons: [{ rel: 'icon', url: pickRandomIcon(slug) }]
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
      <p>Path: {`_forms/${params.site}/${params.slug}`}</p>
      <p>Region: {region}</p>
      <p>API URL: {apiUrl}</p>
      <p>
        Generated:{' '}
        {`${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}`}
      </p>
    </>
  );
}
