import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/', '/to/:path*']
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.nextUrl.host;
  const slug = extractSlug(url);

  if (!slug) {
    return NextResponse.redirect('https://google.com');
  }

  // Construct the new path including the hostname as the site parameter
  const newPath = `/_forms/${hostname}/${slug}`;

  // Create a new URL for the rewrite, maintaining the original URL's protocol and host
  const rewriteUrl = new URL(newPath, url.origin);

  console.log('Middleware - Original URL:', url.toString());
  console.log('Middleware - Rewrite URL:', rewriteUrl.toString());

  // Always rewrite to the new URL
  return NextResponse.rewrite(rewriteUrl);
}

function extractSlug(url: URL): string {
  const querySlug = url.searchParams.get('slug');
  const pathSlug = url.pathname.split('/to/').at(1);
  return querySlug ?? pathSlug ?? '';
}
