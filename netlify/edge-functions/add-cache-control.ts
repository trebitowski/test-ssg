import type { Config, Context } from '@netlify/edge-functions';

export default async function handler(
  _request: Request,
  context: Context
): Promise<Response> {
  const response: Response = await context.next();

  const varyHeaders = response.headers.get('Vary');
  response.headers.set('Vary', `${varyHeaders},Host`);
  response.headers.set('Cache-Control', 'public,max-age=0,must-revalidate');

  console.log('add-cache-control Run');
  console.log('  Response:', JSON.stringify(response, null, 2));
  return response;
}

export const config: Config = {
  cache: 'manual'
};
