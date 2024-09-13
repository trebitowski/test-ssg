import { isLocal } from './helpers';
import { getRegionMeta } from './regions';

export async function fetchMetadata(slug: string, site: string) {
  const IS_LOCAL = isLocal(site);
  const customDomain = IS_LOCAL || site.endsWith('feathery.io') ? '' : site;
  const { apiUrl } = getRegionMeta(site);
  let orgSlug = 'form';
  if (!customDomain) {
    if (!IS_LOCAL) {
      const domainParts = site.split('.');
      orgSlug = domainParts[0];
      // the new NextJS deployment is to hosted-form which is the same as the old form
      if (orgSlug === 'hosted-form') orgSlug = 'form';
    } else if (!slug) {
      // IF at form.feathery.io with no slug, won't be able to fetch a form
      return { redirect: 'https://feathery.io' };
    }
  }

  const envApiUrls = {
    local: 'http://127.0.0.1:8006',
    staging: 'https://staging.feathery.io',
    production: apiUrl
  };
  const env = (process.env.NEXT_PUBLIC_BACKEND_ENV ||
    'production') as keyof typeof envApiUrls;

  const response = await fetch(
    `${envApiUrls[env]}/api/panel/slug/${orgSlug}/${slug}/?custom_domain=${customDomain}`,
    {
      next: { tags: [slug] }
    }
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
