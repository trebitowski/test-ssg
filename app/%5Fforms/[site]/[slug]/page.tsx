import { checkForHostRedirect } from '@/utils/helpers';
import { fetchMetadata } from '@/utils/metadata';
import type { Metadata, Viewport } from 'next';
import FeatheryFormPage from './FeatheryFormPage';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

type Props = {
  params: { site: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateStaticParams() {
  return [];
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#000000'
};

export default async function Page({ params }: Props) {
  console.log('Building Page', {
    slug: params.slug,
    site: params.site
  });

  return (
    <Suspense>
      <p>{`slug=${params.slug} site=${params.site}`}</p>
    </Suspense>
  );
}
