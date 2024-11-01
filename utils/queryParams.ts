// Slug and domain is automatically included by NextJs in router.query so we need to ignore.
// The other keys are reserved for Feathery internal usage
const IGNORE_QUERY_KEYS = ['slug', 'domain', '_slug', '_locale', '_id', '_cid'];

const parseQueryParams = (queryParams: Record<string, any>) => {
  const filteredQueryParams = Object.keys(queryParams).filter(
    (key) => !key.includes('feathery_') && !IGNORE_QUERY_KEYS.includes(key)
  );

  return filteredQueryParams.reduce(
    (obj, key) => ({ ...obj, [key]: queryParams[key] }),
    {}
  );
};

export default parseQueryParams;
