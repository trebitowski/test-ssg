import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function isBlacklisted(ip?: string): boolean {
  return ip != null && ['203.12.218.182'].includes(ip);
}
export function middleware(request: NextRequest) {
  const ip =
    request.ip || request.headers.get('x-forwarded-for')?.split(',')[0];
  if (isBlacklisted(ip)) {
    return new NextResponse(null, { status: 403 });
  }

  const url = request.nextUrl;
  let site = request.headers.get('host') || '';

  // Extract slug from various possible sources
  let slug = '';
  const pathParts = url.pathname.split('/').filter(Boolean);
  if (pathParts[0] === 'to' && pathParts[1]) {
    slug = pathParts[1];
  } else {
    slug = url.searchParams.get('slug') || url.searchParams.get('_slug') || '';
  }

  if (!slug) {
    // handle old case where nextjs would stringify param automatically
    slug = 'null';
  }

  const newPath = `/forms/${site}/${slug}`;

  const newUrl = new URL(newPath, url.origin);

  url.searchParams.forEach((value, key) => {
    newUrl.searchParams.append(key, value);
  });

  return NextResponse.rewrite(newUrl);
}

export const config = {
  matcher: ['/to/:slug*', '/']
};
