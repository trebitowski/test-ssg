import pkgJson from './package.json';

// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

if (process.env.NODE_ENV === 'production' && false) {
  Sentry.init({
    dsn: 'https://c3df0711879648529e540e2adb26b4da@o400594.ingest.sentry.io/6078176',

    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 0.1,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,

    release: pkgJson.dependencies['@feathery/react'],

    replaysOnErrorSampleRate: 1.0,

    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.1,

    ignoreErrors: [
      'NetworkError: A network error occurred.',
      'A network error occurred.'
    ],

    // You can remove this option if you're not planning to use the Sentry Session Replay feature:
    integrations: [
      // new Sentry.Replay({
      //   // Additional Replay configuration goes in here, for example:
      //   maskAllText: true,
      //   blockAllMedia: true
      // }),
      new Sentry.BrowserTracing()
    ],
    beforeSend(event, hint) {
      const error: any = hint.originalException;
      // If stack is at 'eval', it is an unhandled logic rule error and don't send to sentry
      // gtm.js is a common spammy error (e.g. athenago head code)
      if (['eval', 'gtm.js'].some((key) => error?.stack?.includes(key))) {
        return null;
      }
      // TODO: handle recaptcha errors
      // all other unhandled errors go to Sentry
      return event;
    }
  });
}
