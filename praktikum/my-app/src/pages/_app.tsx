import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import AppShell from '@/component/layouts/Appshell';
import Navbar from '@/component/layouts/navbar'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppShell>
      <Component{...pageProps} />
    </AppShell>
  );
};
