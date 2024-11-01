import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const { slug, subdomain } = await request.json();

  const site = subdomain.replaceAll('.', '-');
  try {
    const path = `/_forms/${site}/${slug}`;
    revalidatePath(path);
    return NextResponse.json({
      revalidated: true,
      site,
      slug,
      path,
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
