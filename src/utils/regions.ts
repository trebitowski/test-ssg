const AUSTRALIA = 'au';
const CA = 'ca';
const EU = 'eu';
const US = 'us';

const hostRegionMap = {
  'ca.trebitowski.com': CA,
  'au.trebitowski.com': AUSTRALIA,
  'eu.trebitowski.com': EU,
  'us.trebitowski.com': US
} as Record<string, string>;

const apiRegionMap = {
  [CA]: 'https://api-ca.trebitowski.com',
  [AUSTRALIA]: 'https://api-au.trebitowski.com',
  [EU]: 'https://api-eu.trebitowski.com',
  [US]: 'https://api.trebitowski.com'
} as Record<string, string>;

export function getRegionMeta(host: string) {
  // default to US if host is not in hostRegionMap
  const region = hostRegionMap[host] ?? US;
  const apiUrl = apiRegionMap[region];
  return { region, apiUrl };
}
