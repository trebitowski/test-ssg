import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const slugs: string[] =
    typeof body.slugs === 'string' ? [body.slugs] : body.slugs;

  console.log('Revalidate API Execution:');
  console.log('  Slugs:', slugs);

  if (!slugs) {
    console.log('  Action: Missing slugs');
    return NextResponse.json(
      { message: 'Slugs are required' },
      { status: 400 }
    );
  }

  try {
    slugs.forEach((slug) => {
      revalidateTag(slug);
    });
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
