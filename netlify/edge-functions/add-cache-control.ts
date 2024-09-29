import type { Config, Context } from '@netlify/edge-functions';

export default async function handler(
  request: Request,
  context: Context
): Promise<Response> {
  // Use Netlify's built-in next() function to render the Next.js page
  const response: Response = await context.next();

  // Add your custom headers
  response.headers.set('Vary', 'Host');
  response.headers.set('Cache-Control', 'public,max-age=0,must-revalidate');

  // You can also modify the response body if needed
  // const body: string = await response.text();
  // const modifiedBody: string = modifyBodyFunction(body);
  // return new Response(modifiedBody, response);

  return response;
}

// If you uncomment the body modification part, you'll need to define this function
// function modifyBodyFunction(body: string): string {
//   // Modify the body here
//   return body;
// }

export const config: Config = {
  cache: 'manual'
};
