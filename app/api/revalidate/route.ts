import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  let { slugs, domains } = await request.json();

  console.log('API - /revalidate');
  console.log('  slugs:', slugs);
  console.log('  domains:', domains);

  try {
    domains = domains ? (Array.isArray(domains) ? domains : [domains]) : [];
    slugs = slugs ? (Array.isArray(slugs) ? slugs : [slugs]) : [];

    // add apex domain if there is a custom or subdomain
    if (domains.length) {
      slugs.push('null');
    }

    // always revalidate form.feathery.io domain
    // TODO: choose domain by env var
    domains.push('form.feathery.io');
    domains.push('localhost');

    for (const domain of domains) {
      for (const slug of slugs) {
        const path = `/forms/${domain}/${slug}`;
        const tag = `${domain}-${slug}`;
        revalidatePath(path);
        revalidateTag(tag);

        console.log('API - revalidating path and tag');
        console.log('  slug:', slug);
        console.log('  domain:', domain);
        console.log('  path:', path);
        console.log('  tag:', tag);
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
