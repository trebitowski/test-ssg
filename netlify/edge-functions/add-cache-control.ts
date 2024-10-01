import type { Config, Context } from '@netlify/edge-functions';

export default async function handler(
  _request: Request,
  context: Context
): Promise<Response> {
  const response: Response = await context.next();

  const varyHeaders = response.headers.get('Vary');
  response.headers.set('Vary', `${varyHeaders},Host`);
  response.headers.set('Cache-Control', 'public,max-age=0,must-revalidate');

  return response;
}

export const config: Config = {
  cache: 'manual'
};
