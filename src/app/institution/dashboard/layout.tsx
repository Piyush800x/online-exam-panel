'use client';

interface Props {
    children: React.ReactNode;
}

const RootLayout: React.FC <Props> = ({ children } ) => {
    return (
      <html lang="tr">
        <head />
        <body>
          {children}
        </body>
      </html>
    )
}
  
export default RootLayout