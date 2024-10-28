import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${new Date().toISOString()} - ${params.slug}`
  };
}
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#000000'
};

export default async function Page({ params }: Props) {
  console.log('Building Page', {
    slug: params.slug
  });
  const headersList = headers();
  const host = headersList.get('host') || 'localhost:3000';
  return (
    <div>
      <p>Proof of concept</p>
      <p>{`time=${new Date().toISOString()}`}</p>
      <p>{`host=${host}`}</p>
      <p>{`slug=${params.slug}`}</p>
    </div>
  );
}
