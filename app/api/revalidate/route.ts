import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  console.log('[revalidate]');
  //   const secret = request.nextUrl.searchParams.get('secret');
  const site = request.nextUrl.searchParams.get('site');
  const slug = request.nextUrl.searchParams.get('slug');
  console.log('Revalidate API Execution:');
  console.log('  Site:', site);
  console.log('  Slug:', slug);
  //   // Check for secret to confirm this is a valid request
  //   if (secret !== process.env.REVALIDATION_SECRET) {
  //     return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  //   }

  if (!site) {
    console.log('  Action: Error no site');

    return NextResponse.json({ message: 'Site is required' }, { status: 400 });
  }
  if (!slug) {
    console.log('  Action: Error no slug');

    return NextResponse.json({ message: 'Slug is required' }, { status: 400 });
  }

  const path = `_forms/${site}/${slug}`;
  console.log('  Path:', path);

  try {
    // This will revalidate the page and update the cache
    revalidatePath(path);
    console.log('  Revalidated:', path);

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.log('  Error:', err);

    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    );
  }
}
