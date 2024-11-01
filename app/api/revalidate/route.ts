import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const { slug, site } = await request.json();

  try {
    const path = `/forms/${site}/${slug}`;
    revalidatePath(path);
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
