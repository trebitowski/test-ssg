const AUSTRALIA = 'au';
const CA = 'ca';
const EU = 'eu';
const US = 'us';

const hostRegionMap = {
  'haleoclinic.trebitowski.com': CA,
  'cashcofinancial.trebitowski.com': CA,
  'weel.trebitowski.com': AUSTRALIA,
  'umlautsolutions.trebitowski.com': AUSTRALIA,
  'sympatient.trebitowski.com': EU,
  'eu-customsubdomain.trebitowski.com': EU, // test org 'eu-customsubdomain'
  'au-customsubdomain.trebitowski.com': AUSTRALIA // test org 'au-customsubdomain'
} as Record<string, string>;

const apiRegionMap = {
  [CA]: 'https://api-ca.feathery.io',
  [AUSTRALIA]: 'https://api-au.feathery.io',
  [EU]: 'https://api-eu.feathery.io',
  [US]: 'https://api.feathery.io'
} as Record<string, string>;

export function getRegionMeta(host: string) {
  const region = hostRegionMap[host] ?? US;
  const apiUrl = apiRegionMap[region];
  return { region, apiUrl };
}
