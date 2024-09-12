import { NextRequest, NextResponse } from 'next/server';
import { purgeCache } from '@netlify/functions';

export async function POST(request: NextRequest) {
  console.log('[revalidate]');
  const slug = request.nextUrl.searchParams.get('slug');
  console.log('Revalidate API Execution:');
  console.log('  Slug:', slug);

  if (!slug) {
    console.log('  Action: Error no slug');
    return NextResponse.json({ message: 'Slug is required' }, { status: 400 });
  }

  const cacheTag = `${slug}`;

  try {
    // This will revalidate the page and update the cache
    purgeCache({ tags: [cacheTag] });
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
