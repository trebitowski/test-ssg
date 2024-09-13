export function isLocal(host: string) {
  const hostname = host.split(':')[0];
  return ['localhost', '127.0.0.1'].includes(hostname);
}

export function checkForHostRedirect(host: String) {
  if (host && host.endsWith('feathery.io')) {
    const domainParts = host.split('.');
    // We don't support nested subdomains
    if (domainParts.length > 3) {
      return {
        redirect: 'https://feathery.io'
      };
    }
  }
  return null;
}

export function featheryOptions(query: Record<string, any>) {
  const { _locale, _id, _cid } = query as Record<string, string>;
  const featheryOpts: Record<string, any> = {
    userTracking: 'cookie' as const,
    language: _locale
  };
  if (_locale && typeof document !== 'undefined')
    document.documentElement.lang = _locale;
  if (_id) {
    featheryOpts.userId = _id;
    featheryOpts.cacheUserId = false;
  }
  if (_cid) featheryOpts.collaboratorId = _cid;
  return featheryOpts;
}
