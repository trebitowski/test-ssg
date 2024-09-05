import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * 1. index page
     * 2. /to/[slug]
     */
    '/',
    '/to/:slug'
  ]
};

/**
 * Middleware that rewrites the following URLs to add a hostname path:
 *   - /to/[slug]
 *   - /?slug=[slug]
 * To:
 *   - /[hostname]/to/[slug]
 * Useful for hosting multiple sites on the same domain.
 *
 * Note: The user sees the original url, since this is a rewritten url, not a redirect.
 */
export default async function middleware(req: NextRequest) {
  const originalUrl = req.nextUrl;
  console.log('middleware', 'originalUrl', originalUrl);

  const hostname = originalUrl.hostname;
  console.log('middleware', 'hostname', hostname);

  // slug can either be a path or a query param /to/[slug] or ?slug=[slug]
  const slug =
    originalUrl.searchParams.get('slug') ?? originalUrl.pathname.split('/')[2];
  console.log('middleware', 'slug', slug);

  const searchParams = new URLSearchParams(originalUrl.searchParams);
  console.log('middleware', 'searchParams: before', searchParams);
  searchParams.delete('slug');
  searchParams.delete('hostname');
  console.log('middleware', 'searchParams: after', searchParams);
  const searchParamsPath =
    searchParams.toString().length > 0 ? `?${searchParams}` : '';
  console.log('middleware', 'searchParamsPath', searchParamsPath);

  const newPath = `/${hostname}/to/${slug}${searchParamsPath}`;
  console.log('middleware', 'newPath', newPath);
  return NextResponse.rewrite(new URL(newPath, req.url));
}
