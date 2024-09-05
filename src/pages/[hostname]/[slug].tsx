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
  if (!params) throw new Error('No path parameters found');

  const time = Date.now();
  const { hostname, slug } = params;

  const redirect = checkForHostRedirect(hostname as string);
  if (redirect) return redirect;

  return { props: { slug, hostname, time } as Props };
};

export default FeatheryTestPage;
