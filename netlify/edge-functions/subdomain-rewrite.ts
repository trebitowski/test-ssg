export default async function subdomainRewrite(request: Request) {
  const url = new URL(request.url);
  const hostname = url.hostname;
  const slug = extractSlug(url);

  console.log('Edge Function Execution:');
  console.log('  Request URL:', request.url);
  console.log('  Hostname:', hostname);
  console.log('  Pathname:', url.pathname);
  console.log('  Search Params:', url.searchParams.toString());
  console.log('  Extracted Slug:', slug);

  if (!slug) {
    console.log('  Action: Redirecting to Google');
    return Response.redirect('https://google.com', 302);
  }

  // Construct the new path including the hostname as the site parameter
  const newPath = `/_forms/${hostname}/${slug}`;
  const newUrl = new URL(newPath, request.url);
  console.log('  Rewritten URL:', newUrl);

  return newUrl;
}

function extractSlug(url: URL): string {
  const querySlug = url.searchParams.get('slug');
  const pathSlug = url.pathname.split('/to/').at(1);
  return querySlug ?? pathSlug ?? '';
}

export const config = {
  path: ['/to/*', '/']
};
