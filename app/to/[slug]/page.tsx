import type { Metadata } from 'next';
import { headers } from 'next/headers';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const headersList = headers();
  const host = headersList.get('host');

  return {
    title: `${host ?? 'none'} - ${params.slug}`
  };
}

export const dynamic = 'force-dynamic';

export default async function Page({ params }: Props) {
  const headersList = headers();
  const host = headersList.get('host');
  console.log('Building Page', {
    slug: params.slug,
    host: host
  });
  const time = new Date().toLocaleTimeString();
  return (
    <div>
      <p>Proof of concept (2)</p>
      <p>{`host=${host ?? 'none'}`}</p>
      <p>{`slug=${params.slug}`}</p>
      <p>{`time=${time}`}</p>
    </div>
  );
}
