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

  // Modify the Vary header
  const varyHeaders = newResponse.headers.get('Vary') || '';
  newResponse.headers.set('Vary', varyHeaders ? `${varyHeaders},Host` : 'Host');

  // Set the Cache-Control header
  newResponse.headers.set('Cache-Control', 'public,max-age=0,must-revalidate');

  console.log('Headers modified:');
  console.log('  Vary:', newResponse.headers.get('Vary'));
  console.log('  Cache-Control:', newResponse.headers.get('Cache-Control'));

  return newResponse;
}

export const config: Config = {
  path: '/*'
};
