import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ErrorBoundary } from 'react-error-boundary';

export default function App({ Component, pageProps }: AppProps) {
  function fallbackRender({ error, resetErrorBoundary }: any) {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.

    return (
      <div role='alert'>
        <p>Something went wrong:</p>
        <pre style={{ color: 'red' }}>{error.message}</pre>
      </div>
    );
  }
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
