import type { Config, Context } from '@netlify/functions';

export default async function subdomainRewrite(
  request: Request,
  context: Context
) {
  const url = new URL(request.url);
  const site = url.hostname;
  const slug = context.params.slug ?? url.searchParams.get('slug');

  console.log('Edge Function Execution:');
  console.log('  Request URL:', request.url);
  console.log('  Site:', site);
  console.log('  Pathname:', url.pathname);
  console.log('  Search Params:', url.searchParams.toString());
  console.log('  Extracted Slug:', slug);

  if (!slug) {
    console.log('  Action: Redirecting to Feathery homepage');
    return Response.redirect('https://feathery.io', 302);
  }

  const newPath = `/_forms/${slug}/${site}`;
  const newUrl = new URL(newPath, url);
  console.log('  Rewritten URL:', newUrl.href);

  console.log('  Action: Redirecting to rewritten URL');
  return newUrl;
}

export const config = {
  path: ['/to/:slug', '/']
} satisfies Config;
