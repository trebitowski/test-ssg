import { isLocal } from './helpers';
import { getRegionMeta } from './regions';

export async function fetchMetadata(panelSlug: string, host: string) {
  console.log('fetchMetadata', 'props', { panelSlug, host });

  const IS_LOCAL = isLocal(host);
  console.log('fetchMetadata', 'isLocal', IS_LOCAL);

  const customDomain = IS_LOCAL || host.endsWith('feathery.io') ? '' : host;
  console.log('fetchMetadata', 'customDomain', customDomain);

  const { apiUrl } = getRegionMeta(host);
  console.log('fetchMetadata', 'apiUrl', apiUrl);

  let orgSlug = 'form';
  if (!customDomain) {
    if (!IS_LOCAL) {
      const domainParts = host.split('.');
      orgSlug = domainParts[0];
      // the new NextJS deployment is to hosted-form which is the same as the old form
      if (orgSlug === 'hosted-form') orgSlug = 'form';
    } else if (!panelSlug) {
      // IF at form.feathery.io with no slug, won't be able to fetch a form
      return { redirect: 'https://feathery.io' };
    }
  }

  console.log('fetchMetadata', 'orgSlug', orgSlug);

  const envApiUrls = {
    local: 'http://127.0.0.1:8006',
    staging: 'https://staging.feathery.io',
    production: apiUrl
  };
  const env = (process.env.NEXT_PUBLIC_BACKEND_ENV ||
    'production') as keyof typeof envApiUrls;

  console.log('fetchMetadata', 'env', env);

  const response = await fetch(
    `${envApiUrls[env]}/api/panel/slug/${orgSlug}/${panelSlug}/?custom_domain=${customDomain}`
  );
  if (response.status === 404) {
    if (orgSlug === 'form') return { redirect: 'https://feathery.io' };
  } else {
    const {
      sdk_key: sdkKey,
      form_name: formName,
      form_slug: panelSlug,
      seo_title: seoTitle,
      seo_description: seoDescription,
      seo_image: seoMetaImage,
      has_auth: useAuth,
      draft,
      favicon
    } = await response.json();

    return {
      formName,
      panelSlug,
      draft,
      favicon,
      sdkKey,
      customDomain,
      seoTitle,
      seoDescription,
      seoMetaImage,
      useAuth
    };
  }
  return {};
}
