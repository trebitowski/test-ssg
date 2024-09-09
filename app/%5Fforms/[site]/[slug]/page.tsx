import type { Metadata } from 'next';

type Props = {
  params: { site: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const randomWikiUrl =
  'https://en.wikipedia.org/api/rest_v1/page/random/summary';
const maxExtractLength = 200;

export const dynamic = 'force-static';
export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  return {
    title: slug
  };
}

export default async function Page({ params }: Props) {
  const time = Date.now();

  return (
    <>
      <h1>Revalidation</h1>
      <p>Site: {params.site}</p>
      <p>Slug: {params.slug}</p>
      <p>Generated: {new Date(time).toLocaleTimeString()}</p>
      <RandomWikiArticle />
    </>
  );
}

async function RandomWikiArticle() {
  const randomWiki = await fetch(randomWikiUrl, {
    cache: 'force-cache'
  });

  const content = await randomWiki.json();
  let extract = content.extract;
  if (extract.length > maxExtractLength) {
    extract =
      extract.slice(0, extract.slice(0, maxExtractLength).lastIndexOf(' ')) +
      ' [...]';
  }

  return (
    <div className='bg-white text-neutral-600 card my-6 max-w-2xl'>
      <div className='card-title text-3xl px-8 pt-8'>{content.title}</div>
      <div className='card-body py-4'>
        <div className='text-lg font-bold'>{content.description}</div>
        <p className='italic'>{extract}</p>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href={content.content_urls.desktop.page}
        >
          From Wikipedia
        </a>
      </div>
    </div>
  );
}
