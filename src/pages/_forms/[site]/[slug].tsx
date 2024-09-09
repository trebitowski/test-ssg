import TestPage, { Props } from '@/components/TestPage';

import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params
}) => {
  const time = Date.now();
  const site = params?.site as string;
  const slug = params?.slug as string;

  return { props: { site, slug, time } as Props };
};

export default TestPage;
