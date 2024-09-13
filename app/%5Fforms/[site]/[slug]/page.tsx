import { checkForHostRedirect } from '@/utils/helpers';
import { fetchMetadata } from '@/utils/metadata';
import type { Metadata } from 'next';
import FeatheryFormPage from './FeatheryFormPage';

type Props = {
  params: { site: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateStaticParams() {
  return [];
}

const default_favicon = '/favicon.ico';
const default_description = 'The most powerful no-code forms & workflows';
const default_meta_image = '/featheryMetaImage.png';
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = await fetchMetadata(params.slug, params.site);

  return {
    title: result.seoTitle,
    description: result.seoDescription || default_description,
    viewport: 'width=device-width, initial-scale=1',
    icons: [
      { rel: 'icon', url: result.favicon || default_favicon },
      { rel: 'apple-touch-icon', url: '/logo.png' }
    ],
    themeColor: '#000000',
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

  const redirect = checkForHostRedirect(site);
  if (redirect) return redirect;

  const result = await fetchMetadata(slug, site);
  if (result.redirect)
    return {
      redirect: {
        destination: result.redirect,
        permanent: false
      }
    };

  console.log('Building Page', {
    slug: params.slug,
    site: params.site
  });

  return <FeatheryFormPage slug={slug} site={site} {...(result as any)} />;
}
