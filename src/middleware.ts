import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/', '/to/:slug+']
};

export default async function middleware(req: NextRequest) {
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

  return NextResponse.rewrite(newUrl);
}

function extractDomain(req: NextRequest): string {
  const hostname = req.headers.get('host');
  return hostname ? `${hostname}` : '';
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
  // extract slug from path `/to/:slug`
  const pathSlug = req.nextUrl.pathname.split('/to/').splice(1).join('/to/');

  return querySlug ?? pathSlug;
}
