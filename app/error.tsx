'use client';

export default function Error({
  error
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
}
