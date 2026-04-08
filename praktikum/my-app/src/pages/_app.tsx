//import style from '@/styles/global.css';
import type { AppProps } from 'next/app';
import AppShell from '@/component/layouts/Appshell';
import Navbar from '@/component/layouts/navbar'
import { SessionProvider } from "next-auth/react";
import Script from 'next/script'; // ✅ 1. Import next/script


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* ✅ 2. Tambahkan Script Google Analytics menggunakan next/script */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XYZ1234567"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XYZ1234567');
        `}
      </Script>

      {/* Kode bawaan milikmu tetap aman di bawah sini */}
      <SessionProvider session={pageProps.session}>
        <AppShell>
          <Component {...pageProps} />
        </AppShell>
      </SessionProvider>
    </>
  );
};