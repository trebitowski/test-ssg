import { checkForHostRedirect } from '@/utils/helpers';
import FeatheryTestPage, { Props } from '@/components/FeatheryTestPage';

import type { GetStaticProps, GetStaticPaths } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
  // generate no slugs at build, but cache them after first visit
  return {
    paths: [],
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  console.log('getStaticProps', 'params', params);

  const time = Date.now();

  let host = params?.hostname || '';
  if (Array.isArray(host)) {
    host = host[0];
  }

  const redirect = checkForHostRedirect(host);
  if (redirect) return redirect;

  let panelSlug = params?.slug ?? '';
  if (Array.isArray(panelSlug)) {
    panelSlug = panelSlug[0];
  }

  // const result = await fetchMetadata(panelSlug, host);
  // console.log('getStaticProps', 'result', result);

  // if (result.redirect)
  //   return {
  //     redirect: {
  //       destination: result.redirect,
  //       permanent: false
  //     }
  //   };

  return { props: { panelSlug, host, time } as Props };
};

export default FeatheryTestPage;
