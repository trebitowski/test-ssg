export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body style={{ padding: '2rem' }}>{children}</body>
    </html>
  );
}
