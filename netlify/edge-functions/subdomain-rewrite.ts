import type { Config, Context } from '@netlify/edge-functions';
import { CacheHeaders } from 'cdn-cache-control';

export default async function subdomainRewrite(
  request: Request,
  context: Context
) {
  const url = new URL(request.url);
  const hostname = url.hostname;
  const slug = context.params.slug ?? url.searchParams.get('slug');

  console.log('Edge Function Execution:');
  console.log('  Request URL:', request.url);
  console.log('  Hostname:', hostname);
  console.log('  Pathname:', url.pathname);
  console.log('  Search Params:', url.searchParams.toString());
  console.log('  Extracted Slug:', slug);
  const headers = new CacheHeaders().tag(hostname, `${hostname}-${slug}`);
  console.log('  Headers:', headers);

  if (!slug) {
    console.log('  Action: Redirecting to Google');
    return Response.redirect('https://google.com', 302);
  }

  const newPath = `${hostname}/_forms/${hostname}/${slug}`;
  const newUrl = new URL(newPath, url);
  console.log('  Rewritten URL:', newUrl.href);

  return newUrl;
}

export const config = {
  path: ['/to/:slug', '/']
} satisfies Config;
