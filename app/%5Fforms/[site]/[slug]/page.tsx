import type { Metadata } from 'next';
import { getRegionMeta } from '../../../../utils/regions';

type Props = {
  params: { site: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateStaticParams() {
  return [];
}

async function fetchRandomWord(slug: string, site: string): Promise<string> {
  const response = await fetch(
    'https://random-word-api.herokuapp.com/word?number=1',
    {
      next: { tags: [site, slug] }
    }
  );
  const data = await response.json();
  return data[0];
}

function getAvatarUrl(input: string) {
  return `https://api.dicebear.com/9.x/icons/svg?seed=${input}&radius=50&size=32`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const random_icon = getAvatarUrl(new Date().toISOString());
  const random_word = await fetchRandomWord(params.slug, params.site);

  return {
    title: `${params.slug} - ${random_word}`,
    icons: [{ rel: 'icon', url: random_icon }]
  };
}

export default async function Page({ params }: Props) {
  const timestamp = new Date();
  const { region, apiUrl } = getRegionMeta(params.site);
  const random_word = await fetchRandomWord(params.slug, params.site);

  console.log('Building Page', {
    slug: params.slug,
    site: params.site,
    region,
    apiUrl,
    date: timestamp,
    word: random_word
  });
  return (
    <>
      <h1>Revalidation</h1>
      <p>Site: {params.site}</p>
      <p>Slug: {params.slug}</p>
      <p>Path: {`_forms/${params.site}/${params.slug}`}</p>
      <p>Region: {region}</p>
      <p>API URL: {apiUrl}</p>
      <p>Word: {random_word}</p>
      <p>
        Generated:{' '}
        {`${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}`}
      </p>
    </>
  );
}
