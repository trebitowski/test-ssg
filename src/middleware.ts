import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    {
      source: '/to/:path*',
      missing: [
        { type: 'query', key: 'slug' },
        { type: 'query', key: 'site' }
      ]
    },
    {
      source: '/',
      missing: [{ type: 'query', key: 'site' }]
    }
  ]
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = url.host;

  // Check if this request has already been processed by the middleware
  if (url.pathname.startsWith('/_forms/')) {
    return NextResponse.next();
  }

  const slug = extractSlug(url);

  console.log('Middleware Execution:');
  console.log('  URL:', url.toString());
  console.log('  Hostname:', hostname);
  console.log('  Pathname:', url.pathname);
  console.log('  Search Params:', url.searchParams.toString());
  console.log('  Extracted Slug:', slug);

  if (!slug) {
    console.log('  Action: Redirecting to Google');
    return NextResponse.redirect('https://google.com');
  }

  // Construct the new path including the hostname as the site parameter
  const newPath = `/_forms/${hostname}/${slug}`;

  console.log('Middleware - Original URL:', url.toString());
  url.search = '';
  url.pathname = newPath;

  console.log('Middleware - Rewrite URL:', url.toString());

  // Always rewrite to the new URL
  return NextResponse.rewrite(url);
}

function extractSlug(url: URL): string {
  const querySlug = url.searchParams.get('slug');
  const pathSlug = url.pathname.split('/to/').at(1);
  return querySlug ?? pathSlug ?? '';
}
