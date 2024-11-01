// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

if (process.env.NODE_ENV === 'production' && false) {
  Sentry.init({
    dsn: 'https://c3df0711879648529e540e2adb26b4da@o400594.ingest.sentry.io/6078176',
    enableTracing: false,
    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false
  });
}
