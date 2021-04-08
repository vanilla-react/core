import 'reflect-metadata';
import '../global.css';

import { CSSReset, ThemeProvider, theme } from '@chakra-ui/react';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { AppProvider } from '@entrypoint/app.provider';

import { BaseLayout } from '../components/layouts';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <BaseLayout {...pageProps}>
          <Component {...pageProps} />
        </BaseLayout>
      </ThemeProvider>
    </AppProvider>
  );
};

export default MyApp;

MyApp.getInitialProps = async (ctx: any) => {
  return {
    accessToken: ctx.query?.accessToken,
  };
};
