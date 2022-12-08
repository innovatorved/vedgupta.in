import 'styles/global.css';

import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';

import Script from 'next/script';

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <Script
        id="GoogleTagManager-1"
        type="text/partytown"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-TH5XM5TDW2`}
      />
      <Script strategy="lazyOnload" id="GoogleTagManager-2" type="text/partytown">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-TH5XM5TDW2', {
          page_path: window.location.pathname,
          });
        `}
      </Script>
      <Script id="GoogleTagManager-3" type="text/partytown">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NR39J8J')
        `}
      </Script>

      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}
