import type { Metadata } from 'next';
import { getRegionMeta } from '../../../../utils/regions';

type Props = {
  params: { site: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const dynamic = 'force-static';
export const dynamicParams = true;

async function fetchRandomWord(slug: string): Promise<string> {
  const response = await fetch(
    'https://random-word-api.herokuapp.com/word?number=1',
    {
      next: { tags: [slug] }
    }
  );
  const data = await response.json();
  return data[0];
}

function getAvatarUrl(input: string) {
  return `https://api.dicebear.com/9.x/icons/svg?seed=${input}&radius=50&size=32`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const timestamp = new Date().toISOString();

  const word = await fetchRandomWord(slug);
  return {
    title: `${slug} - ${word}`,
    icons: [{ rel: 'icon', url: getAvatarUrl(timestamp) }]
  };
}

export default async function Page({ params }: Props) {
  const timestamp = new Date();
  const { region, apiUrl } = getRegionMeta(params.site);
  const word = await fetchRandomWord(params.slug);

  console.log('Building Page', {
    slug: params.slug,
    site: params.site,
    region,
    apiUrl,
    date: timestamp,
    word
  });
  return (
    <>
      <h1>Revalidation</h1>
      <p>Site: {params.site}</p>
      <p>Slug: {params.slug}</p>
      <p>Path: {`_forms/${params.slug}/${params.site}`}</p>
      <p>Region: {region}</p>
      <p>API URL: {apiUrl}</p>
      <p>Word: {word}</p>
      <p>
        Generated:{' '}
        {`${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}`}
      </p>
    </>
  );
}
