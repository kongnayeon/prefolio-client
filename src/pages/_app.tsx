import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot, useRecoilState } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { Layout } from '../components/layout/Layout';
import GlobalStyle from '../styles/globalStyle';
import { theme } from '../styles/theme/theme';
import '../../public/static/fonts/style.css';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <title>Pre:folio</title>
        <link rel='shortcut icon' href='/favicon.png' />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <RecoilRoot>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </RecoilRoot>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
