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
  // Create a new URL object with the new path
  const newUrl = new URL(newPath, url.origin);

  // Carry through all search params from the original URL
  url.searchParams.forEach((value, key) => {
    newUrl.searchParams.append(key, value);
  });
  console.log('New URL:', newUrl);
  return newUrl;
}

export const config = {
  path: ['/to/:slug/', '/to/:slug', '/']
} satisfies Config;
