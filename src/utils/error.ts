// Global handlers for uncaught exceptions and unhandled rejections.
// Certain errors
// are handled here and logged to the console as appropriate.  This especially
// includes errors in custom logic code.
//
// Note: Async custom logic code errors need to be caught at the global level since
// custom user logic is not required to return a promise.  If a promise is not
// returned, the error will not be caught by the calling code, but instead
// will be an unhandled rejection.
//
interface ErrorReason {
  message: string;
  stack: string;
}
const handleGlobalError = (e: PromiseRejectionEvent | ErrorEvent) => {
  const errorReason: ErrorReason =
    (e as PromiseRejectionEvent).reason ?? (e as ErrorEvent).error;
  // If stack is at 'eval', it is a logic rule error.
  // gtm.js is a common spammy error (e.g. athenago head code)
  // Note this only works for unhandledrejection events, not error events.
  ['eval', 'gtm.js'].forEach((key) => {
    if (errorReason?.stack?.includes(key)) {
      console.warn(
          'Error caught while running custom logic. Error Message: ',
          errorReason.message ?? ''
      );
      e.preventDefault(); // Prevent the error in the log
    }
  })
};

export function catchGlobalErrors() {
  window.addEventListener('unhandledrejection', handleGlobalError);
  window.addEventListener('error', handleGlobalError);
}
