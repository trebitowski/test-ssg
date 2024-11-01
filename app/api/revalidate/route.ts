import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  let { slugs, domains } = await request.json();

  if (!slugs || (Array.isArray(slugs) && slugs.length === 0)) {
    return NextResponse.json(
      { message: 'Missing slugs parameter' },
      { status: 400 }
    );
  }

  if (!domains || (Array.isArray(domains) && domains.length === 0)) {
    return NextResponse.json(
      { message: 'Missing domains parameter' },
      { status: 400 }
    );
  }

  try {
    domains = Array.isArray(domains) ? domains : [domains];
    slugs = Array.isArray(slugs) ? slugs : [slugs];

    for (const domain of domains) {
      for (const slug of slugs) {
        const path = `/forms/${domain}/${slug}`;
        revalidatePath(path);
        console.log('API - revalidate');
        console.log('  slug:', slug);
        console.log('  domain:', domain);
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
