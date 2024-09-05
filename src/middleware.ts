import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/', '/to/:slug*']
};

export default async function middleware(req: NextRequest) {
  console.log('Original query params:', req.nextUrl.searchParams.toString());
  console.log('Original URL:', req.url);
  console.log('Pathname:', req.nextUrl.pathname);
  console.log('Search Params:', req.nextUrl.searchParams.toString());
  console.log(
    'Headers:',
    JSON.stringify(Object.fromEntries(req.headers), null, 2)
  );

  const domain = extractDomain(req);
  const slug = extractSlug(req);
  console.log('middleware', 'domain', domain);
  console.log('middleware', 'slug', slug);

  if (!slug) {
    return NextResponse.redirect('https://google.com');
  }

  const searchParams = extractSearchParams(req);
  const path = `/_forms/${domain}/${slug}${searchParams}`;
  const newUrl = new URL(path, req.url);

  newUrl.searchParams.delete('site');
  newUrl.searchParams.delete('slug');

  console.log('middleware', 'path', path);
  console.log('middleware', 'newUrl', newUrl);
  console.log('middleware', 'compare', newUrl.href, req.url);

  // prevent unnecessary rewrites
  if (newUrl.href === req.url) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL(path, req.url), {
    request: {
      headers: req.headers
    }
  });
}

function extractDomain(req: NextRequest): string {
  const protocol = req.headers.get('x-forwarded-proto') || 'http';
  const hostname = req.headers.get('host');
  return hostname ? `${protocol}://${hostname}` : '';
}
function extractSearchParams(req: NextRequest): string {
  const searchParams = new URLSearchParams(req.nextUrl.searchParams);
  searchParams.delete('slug');
  searchParams.delete('site');
  const searchString = searchParams.toString();
  return searchString ? `?${searchString}` : '';
}

function extractSlug(req: NextRequest): string {
  // extract slug from query params
  const querySlug = req.nextUrl.searchParams.get('slug');
  // extract slug from path `/to/:path*`
  const pathSlug = req.nextUrl.pathname.split('/to/')[1];

  return querySlug ?? pathSlug ?? '';
}
