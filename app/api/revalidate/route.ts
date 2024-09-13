import { NextRequest, NextResponse } from 'next/server';
import { purgeCache } from '@netlify/functions';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  console.log('[revalidate]');
  const slug = request.nextUrl.searchParams.get('slug');
  const site = request.nextUrl.searchParams.get('site');
  console.log('Revalidate API Execution:');
  console.log('  Slug:', slug);

  if (!slug) {
    console.log('  Action: Missing slug');
    return NextResponse.json({ message: 'Slug is required' }, { status: 400 });
  }

  if (!site) {
    console.log('  Action: Missing site');
    return NextResponse.json({ message: 'Site is required' }, { status: 400 });
  }

  const path = `/_forms/${slug}/${site}/`;
  console.log('  Path:', path);

  const cacheTag = `${slug}-${site}`;
  console.log('  Cache Tag:', cacheTag);

  try {
    // This will revalidate the page and update the cache
    revalidatePath(path);
    purgeCache({ tags: [cacheTag] });
    console.log('  Action: Revalidated and purged');
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.log('  Action: Error revalidating');
    console.log('  Error:', err);
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    );
  }
}
