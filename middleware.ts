import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/', '/to/:slug*']
};

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || 'localhost:3000';
  const pathname = request.nextUrl.pathname;

  const response = NextResponse.next();

  response.headers.set('Cache-Control', 'public, s-maxage=31536000');

  // Add hostname to tags for granular revalidation
  const tags = [
    `host-${hostname}`,
    `page-${pathname}`, // TODO: replace path with slug
    `full-${hostname}${pathname}`
  ];

  response.headers.set('x-feathery-tags', tags.join(','));
  response.headers.append('Vary', 'x-feathery-tags');
  response.headers.append('Netlify-Vary', 'x-feathery-tags');

  return response;
}
