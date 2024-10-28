// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { hostname, paths } = await request.json();

    // Revalidate the hostname tag
    if (hostname) {
      await revalidateTag(`host-${hostname}`);
    }

    // Revalidate specific paths if provided
    if (paths) {
      if (Array.isArray(paths)) {
        for (const path of paths) {
          await revalidateTag(`page-${path}`);
        }
      } else {
        await revalidateTag(`page-${paths}`);
      }
    }

    return Response.json({
      revalidated: true,
      hostname,
      paths,
      date: Date.now()
    });
  } catch (err) {
    return Response.json(
      {
        error: 'Error revalidating',
        detail: err instanceof Error ? err.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
