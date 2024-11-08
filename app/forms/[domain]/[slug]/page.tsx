import { checkForHostRedirect } from '@/utils/helpers';
import { fetchMetadata } from '@/utils/metadata';
import type { Metadata, Viewport } from 'next';
import FeatheryFormPage from './FeatheryFormPage';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

type Props = {
  params: { domain: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateStaticParams() {
  return [];
}

export const revalidate = 7 * 24 * 60 * 60; // 1 week

// This defines some headers in NextJS
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#000000'
};

const default_favicon = '/favicon.ico';
const default_description = 'The most powerful no-code forms & workflows';
const default_meta_image = 'https://form.feathery.io/featheryMetaImage.png';
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Nextjs params return the string 'null' if missing, so check for 'null'
  const slug = params.slug === 'null' ? '' : params.slug;
  const result = await fetchMetadata(slug, params.domain);

  return {
    title: result?.seoTitle || 'Feathery',
    description: result?.seoDescription || default_description,
    icons: [
      { rel: 'icon', url: result?.favicon || default_favicon },
      { rel: 'apple-touch-icon', url: '/logo.png' }
    ],
    openGraph: {
      images: [
        {
          url: result?.seoMetaImage || default_meta_image,
          width: 1200,
          height: 630
        }
      ]
    },
    manifest: '/manifest.json'
  };
}

export default async function Page({ params }: Props) {
  const domain = params.domain;
  // Nextjs params return the string 'null' if missing, so check for 'null'
  const slug = params.slug === 'null' ? '' : params.slug;

  const redirectData = checkForHostRedirect(domain);

  console.log('PAGE - build');
  console.log('  slug:', slug);
  console.log('  domain:', domain);
  console.log('  redirectData:', JSON.stringify(redirectData, null, 2));

  if (redirectData) {
    redirect(redirectData.redirect);
  }

  const result = await fetchMetadata(slug, domain);
  if (result.redirect) {
    redirect(result.redirect);
  }

  return (
    // Suspense is a NextJS requirement here because this component depends on params.
    <Suspense>
      <FeatheryFormPage slug={slug} domain={domain} {...(result as any)} />
    </Suspense>
  );
}
