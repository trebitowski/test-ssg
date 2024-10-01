import type { Config, Context } from '@netlify/edge-functions';

export default async function handler(
  request: Request,
  context: Context
): Promise<Response> {
  console.log(
    `Edge function running for path: ${new URL(request.url).pathname}`
  );

  // Use Netlify's built-in next() function to render the Next.js page
  const response: Response = await context.next();

  // Create a new response with the original body and status
  const newResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText
  });

  // Copy all original headers
  response.headers.forEach((value, key) => {
    newResponse.headers.set(key, value);
  });

  // Modify the Vary header to include X-Forwarded-Host
  const varyHeaders = newResponse.headers.get('Vary') || '';
  newResponse.headers.set(
    'Vary',
    varyHeaders ? `${varyHeaders},X-Forwarded-Host` : 'X-Forwarded-Host'
  );

  // Set the Cache-Control header
  newResponse.headers.set('Cache-Control', 'public,s-maxage=31536000,durable');

  // Log the modified headers
  console.log('Headers modified:');
  console.log('  Vary:', newResponse.headers.get('Vary'));
  console.log('  Cache-Control:', newResponse.headers.get('Cache-Control'));
  console.log('  X-Forwarded-Host:', request.headers.get('X-Forwarded-Host'));

  return newResponse;
}

export const config: Config = {
  path: '/to/:slug'
};
