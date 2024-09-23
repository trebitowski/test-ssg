import type { Config, Context } from '@netlify/functions';

export default async function subdomainRewrite(
  request: Request,
  context: Context
) {
  const url = new URL(request.url);
  const site = url.hostname;

  // Extract slug from context.params
  let slug =
    context.params.slug ||
    url.searchParams.get('slug') ||
    url.pathname.split('/').filter(Boolean)[1];

  if (!slug) {
    slug = 'null';
  }

  const newPath = `/_forms/${site}/${slug}`;
  console.log('New URL:', new URL(newPath, url));
  return new URL(newPath, url);
}

export const config = {
  path: ['/to/:slug/', '/to/:slug', '/']
} satisfies Config;
