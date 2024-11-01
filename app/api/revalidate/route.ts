import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const { slug, site } = await request.json();

  try {
    const path = `/forms/${site}/${slug}`;
    revalidatePath(path);
    console.log('API - revalidate');
    console.log('  slug:', slug);
    console.log('  site:', site);
    console.log('  path:', path);

    return NextResponse.json({
      revalidated: true,
      now: Date.now()
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    );
  }
}
