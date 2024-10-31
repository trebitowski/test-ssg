import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Make metadata static per host+slug combination
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const headersList = headers();
  const host = headersList.get('host') || 'localhost:3000';

  return {
    title: `${host} - ${params.slug}` // Remove dynamic date
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#000000'
};

// Force the page to be treated as static
export const dynamic = 'force-static';

export default async function Page({ params }: Props) {
  console.log('Building Page', {
    slug: params.slug
  });
  const headersList = headers();
  const host = headersList.get('host') || 'localhost:3000';

  // Remove dynamic date, use a static timestamp if needed
  return (
    <div>
      <p>Proof of concept (2)</p>
      <p>{`host=${host}`}</p>
      <p>{`slug=${params.slug}`}</p>
    </div>
  );
}
