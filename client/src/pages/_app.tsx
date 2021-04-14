import 'reflect-metadata';
import '../global.css';

import { CSSReset, ThemeProvider } from '@chakra-ui/react';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { AppProvider } from '@entrypoint/app.provider';
import { theme as customTheme } from '../theme';

import { BaseLayout } from '../components/layouts';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AppProvider>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <BaseLayout {...pageProps}>
          <Component {...pageProps} />
        </BaseLayout>
      </ThemeProvider>
    </AppProvider>
  );
};

export default MyApp;

export async function getServerSideProps(ctx: any) {
  return {
    accessToken: ctx.query?.accessToken,
  };
}
