import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import AppShell from '@/component/layouts/Appshell';
import Navbar from '@/component/layouts/navbar'
import {SessionProvider} from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
    <AppShell>
      <Component{...pageProps} />
    </AppShell>
    </SessionProvider>
  );
};
