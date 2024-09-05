import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/', '/to/:slug']
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

  const hostname = req.headers.get('host');
  console.log('middleware', 'hostname', hostname);
  console.log('middleware', 'real hostname', req.headers.get('hostname'));

  const slug =
    originalUrl.searchParams.get('slug') ??
    originalUrl.pathname.split('/to/').splice(1).join('/to/');
  console.log('middleware', 'slug', slug);

  if (!hostname || !slug) {
    return NextResponse.redirect('https://feathery.io');
  }

  const currentHost = hostname;

  const searchParams = new URLSearchParams(originalUrl.searchParams);
  const searchParamsPath =
    searchParams.toString().length > 0 ? `?${searchParams}` : '';

  const newPath = `/${currentHost}/${slug}${searchParamsPath}`;
  console.log('middleware', 'newPath', newPath);
  console.log('middleware', 'newUrl', new URL(newPath, req.url));
  return NextResponse.rewrite(new URL(newPath, req.url));
}
