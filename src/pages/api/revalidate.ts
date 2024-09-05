import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Revalidates a list of pages, given as query parameters.
 * @queryParam domain string or array of strings The domain(s) to revalidate.
 * @queryParam slug string or array of strings The slug(s) to revalidate.
 * @returns {Promise<void>}
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // TODO: set up a secret to validate revalidation
  //   if (req.query.secret !== process.env.REVALIDATE_SECRET) {
  //     return res.status(401).json({ error: 'Invalid token' });
  //   }

  if (!req.query.slug) {
    return res.status(400).json({ error: 'Missing slug' });
  }

  if (!req.query.domain) {
    return res.status(400).json({ error: 'Missing domain' });
  }

  try {
    const domains =
      typeof req.query.domain === 'string'
        ? [req.query.domain]
        : req.query.domain;

    const slugs =
      typeof req.query.slug === 'string' ? [req.query.slug] : req.query.slug;

    const pages = [];
    for (const domain of domains) {
      for (const slug of slugs) {
        pages.push(`/_forms/${domain}/${slug}`);
      }
    }

    await Promise.all(
      pages.map(async (page) => {
        try {
          await res.revalidate(page);
        } catch (e) {
          console.error(e);
        }
      })
    );

    return res.status(200).end('revalidated');
  } catch {
    return res.status(500).json({ error: 'Error while revalidating' });
  }
}
