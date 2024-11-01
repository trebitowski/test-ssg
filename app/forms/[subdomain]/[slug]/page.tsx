export const revalidate = false;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps) {
  const { subdomain, slug } = params;
  return await fetchFormMetadata(subdomain, slug);
}

type PageProps = {
  params: { subdomain: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

type Metadata = {
  title: string;
  description: string;
  icons: any[];
};

export default async function FormPage({ params }: PageProps) {
  const { subdomain, slug } = params;
  const time = new Date().toLocaleTimeString();

  return (
    <div>
      <p>{`Time: ${time}`}</p>
      <p>{`Subdomain: ${subdomain}`}</p>
      <p>{`Slug: ${slug}`}</p>
    </div>
  );
}

function getAvatarUrl(input: string) {
  return `https://api.dicebear.com/9.x/icons/svg?seed=${input}&radius=50&size=32`;
}

async function fetchFormMetadata(
  subdomain: string,
  slug: string
): Promise<Metadata> {
  const timestamp = new Date().toISOString();

  return {
    title: 'title',
    description: 'description',
    icons: [{ rel: 'icon', url: getAvatarUrl(timestamp) }]
  };
}
