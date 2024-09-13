import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug');
  console.log('Revalidate API Execution:');
  console.log('  Slug:', slug);

  if (!slug) {
    console.log('  Action: Missing slug');
    return NextResponse.json({ message: 'Slug is required' }, { status: 400 });
  }

  try {
    revalidateTag(slug);
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
