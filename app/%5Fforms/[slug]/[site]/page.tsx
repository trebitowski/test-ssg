import type { Metadata } from 'next';
import { getRegionMeta } from '../../../../utils/regions';

type Props = {
  params: { site: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const dynamic = 'force-static';
export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  return {
    title: `Form - ${slug}`
  };
}

export default async function Page({ params }: Props) {
  const timestamp = new Date();
  const { region, apiUrl } = getRegionMeta(params.site);
  console.log('Building Page', {
    slug: params.slug,
    site: params.site,
    region,
    apiUrl,
    date: timestamp
  });
  return (
    <>
      <h1>Revalidation</h1>
      <p>Site: {params.site}</p>
      <p>Slug: {params.slug}</p>
      <p>Path: {`_forms/${params.site}/${params.slug}`}</p>
      <p>Region: {region}</p>
      <p>API URL: {apiUrl}</p>
      <p>
        Generated:{' '}
        {`${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}`}
      </p>
    </>
  );
}