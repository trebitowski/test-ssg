import TestPage, { Props } from '@/components/TestPage';

import type { GetStaticProps, GetStaticPaths } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
  // generate no slugs at build, but cache them after first visit
  return {
    paths: [],
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params) throw new Error('No path parameters found');

  const time = Date.now();
  const { site, slug } = params;
  console.log('getStaticProps', 'site', site);
  console.log('getStaticProps', 'slug', slug);
  console.log('getStaticProps', 'time', time);

  return { props: { slug, site, time } as Props };
};

export default TestPage;
