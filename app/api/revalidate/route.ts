import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const { slug, site } = await request.json();

  if (!site || (Array.isArray(site) && site.length === 0)) {
    return NextResponse.json(
      { message: 'Missing site parameter' },
      { status: 400 }
    );
  }

  if (!slug || (Array.isArray(slug) && slug.length === 0)) {
    return NextResponse.json(
      { message: 'Missing slug parameter' },
      { status: 400 }
    );
  }

  try {
    const sites = Array.isArray(site) ? site : [site];
    const slugs = Array.isArray(slug) ? slug : [slug];

    for (const currentSite of sites) {
      for (const currentSlug of slugs) {
        const path = `/forms/${currentSite}/${currentSlug}`;
        revalidatePath(path);
        console.log('API - revalidate');
        console.log('  slug:', currentSlug);
        console.log('  site:', currentSite);
        console.log('  path:', path);
      }
    }

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
