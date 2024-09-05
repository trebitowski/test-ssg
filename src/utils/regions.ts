const AUSTRALIA = 'au';
const CA = 'ca';
const EU = 'eu';
const US = 'us';

const hostRegionMap = {
  'haleoclinic.feathery.io': CA,
  'cashcofinancial.feathery.io': CA,
  'weel.feathery.io': AUSTRALIA,
  'umlautsolutions.feathery.io': AUSTRALIA,
  'sympatient.feathery.io': EU,
  'eu-customsubdomain.feathery.io': EU, // test org 'eu-customsubdomain'
  'au-customsubdomain.feathery.io': AUSTRALIA // test org 'au-customsubdomain'
} as Record<string, string>;

const apiRegionMap = {
  [CA]: 'https://api-ca.feathery.io',
  [AUSTRALIA]: 'https://api-au.feathery.io',
  [EU]: 'https://api-eu.feathery.io',
  [US]: 'https://api.feathery.io',
} as Record<string, string>;

export function getRegionMeta(host: string) {
  const region = hostRegionMap[host] ?? US;
  const apiUrl = apiRegionMap[region];
  return { region, apiUrl };
}
