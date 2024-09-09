import { revalidateTag } from 'next/cache';

export const metadata = {
  title: 'On-Demand Revalidation'
};

const tagName = 'randomWiki';
const randomWikiUrl =
  'https://en.wikipedia.org/api/rest_v1/page/random/summary';
const maxExtractLength = 200;

export default async function Page() {
  async function revalidateWiki() {
    'use server';
    revalidateTag(tagName);
  }

  return (
    <>
      <h1>Revalidation Basics</h1>
      <form className='mt-4' action={revalidateWiki}>
        <button>Revalidate</button>
      </form>
      <RandomWikiArticle />
    </>
  );
}

async function RandomWikiArticle() {
  const randomWiki = await fetch(randomWikiUrl, {
    next: { tags: [tagName] }
  });

  const time = Date.now();

  const content = await randomWiki.json();
  let extract = content.extract;
  if (extract.length > maxExtractLength) {
    extract =
      extract.slice(0, extract.slice(0, maxExtractLength).lastIndexOf(' ')) +
      ' [...]';
  }

  return (
    <div className='bg-white text-neutral-600 card my-6 max-w-2xl'>
      <div className='card-title text-3xl px-8 pt-8'>
        {content.title} - {new Date(time).toLocaleTimeString()}
      </div>
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
