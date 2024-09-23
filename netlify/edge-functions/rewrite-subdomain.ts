import type { Config, Context } from '@netlify/functions';

export default async function subdomainRewrite(
  request: Request,
  context: Context
) {
  const url = new URL(request.url);
  const site = url.hostname;
  // Extract slug from context.params
  let slug = context.params.slug || '';
  // Trim trailing slash from slug if present
  slug = slug.replace(/\/$/, '');

  if (!slug) {
    slug = url.searchParams.get('slug') || '';
  }
  console.log('Edge Function Execution:');
  console.log('  Request URL:', request.url);
  console.log('  Site:', site);
  console.log('  Pathname:', url.pathname);
  console.log('  Search Params:', url.searchParams.toString());
  console.log('  Extracted Slug:', slug);

  const newPath = `/_forms/${site}/${slug}`;
  const newUrl = new URL(newPath, url);
  console.log('  Rewritten URL:', newUrl.href);

  console.log('  Action: Redirecting to rewritten URL');
  return newUrl;
}

export const config = {
  path: ['/to/:slug/', '/to/:slug', '/']
} satisfies Config;
