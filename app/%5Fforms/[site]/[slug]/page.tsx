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

const default_favicon = '/favicon.ico';
const default_description = 'The most powerful no-code forms & workflows';
const default_meta_image = 'https://trebitowski.com/featheryMetaImage.png';
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = await fetchMetadata(params.slug, params.site);

  return {
    title: result.seoTitle,
    description: result.seoDescription || default_description,
    icons: [
      { rel: 'icon', url: result.favicon || default_favicon },
      { rel: 'apple-touch-icon', url: '/logo.png' }
    ],
    openGraph: {
      images: [
        {
          url: result.seoMetaImage || default_meta_image,
          width: 1200,
          height: 630
        }
      ]
    },
    manifest: '/manifest.json'
  };
}

export default async function Page({ params }: Props) {
  const site = params.site;
  const slug = params.slug;

  const redirectData = checkForHostRedirect(site);
  if (redirectData) {
    redirect(redirectData.redirect.destination);
  }

  const result = await fetchMetadata(slug, site);
  if (result.redirect) {
    redirect(result.redirect);
  }

  console.log('Building Page', {
    slug: params.slug,
    site: params.site
  });

  return (
    <Suspense>
      <FeatheryFormPage slug={slug} site={site} {...(result as any)} />
    </Suspense>
  );
}
