import { isLocal } from './helpers';
import { getRegionMeta } from './regions';

const ONE_WEEK_SECONDS = 7 * 24 * 60 * 60;

export async function fetchMetadata(slug: string, site: string) {
  site = site.replaceAll('trebitowski.com', 'feathery.io');
  console.log('Fetch Metadata Execution:');
  console.log('  Site:', site);
  console.log('  Slug:', slug);

  const IS_LOCAL = isLocal(site);
  console.log('  IS_LOCAL:', IS_LOCAL);

  const customDomain = IS_LOCAL || site.endsWith('feathery.io') ? '' : site;

  console.log('  Custom Domain:', customDomain);
  const { apiUrl } = getRegionMeta(site);
  console.log('  API URL:', apiUrl);
  let orgSlug = 'form';
  console.log('  Org Slug:', orgSlug);
  if (!customDomain) {
    if (!IS_LOCAL) {
      const domainParts = site.split('.');
      orgSlug = domainParts[0];
      // the new NextJS deployment is to hosted-form which is the same as the old form
      if (orgSlug === 'hosted-form') orgSlug = 'form';
      console.log('  Org Slug:', orgSlug);
    } else if (!slug) {
      console.log('  Action: Redirecting to Feathery homepage');
      // IF at form.feathery.io with no slug, won't be able to fetch a form
      return { redirect: 'https://feathery.io' };
    }
  }

  const envApiUrls = {
    local: 'http://127.0.0.1:8006',
    staging: 'https://staging.feathery.io',
    production: apiUrl
  };
  // const env = (process.env.NEXT_PUBLIC_BACKEND_ENV ||
  //   'production') as keyof typeof envApiUrls;
  console.log('abc', process.env.NEXT_PUBLIC_BACKEND_ENV);
  console.log('dev', process.env.BACKEND_ENV);
  const env = 'staging';
  console.log('  Env:', env);
  console.log(
    '  Fetch:',
    `${envApiUrls[env]}/api/panel/slug/${orgSlug}/${slug}/?custom_domain=${customDomain}`
  );
  const response = await fetch(
    `${envApiUrls[env]}/api/panel/slug/${orgSlug}/${slug}/?custom_domain=${customDomain}`,
    {
      next: { tags: [slug], revalidate: ONE_WEEK_SECONDS }
    }
  );
  console.log('  Response:', response);
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
