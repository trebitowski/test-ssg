import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/', '/to/:slug*']
};

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || 'localhost:3000';
  const pathname = request.nextUrl.pathname;

  const response = NextResponse.next();

  // Add hostname to tags for granular revalidation
  const tags = [`host-${hostname}`, `page-${pathname}`];

  response.headers.set('x-feathery-tags', tags.join(','));

  // Cache for a long time since we'll use on-demand revalidation
  response.headers.set('Cache-Control', 'public, s-maxage=31536000');

  // Vary cache by hostname
  response.headers.append('Vary', 'x-feathery-tags');

  return response;
}
