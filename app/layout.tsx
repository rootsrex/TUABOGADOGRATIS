export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2635121191048828" 
          crossOrigin="anonymous">
        </script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}