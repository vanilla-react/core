import { CSSReset, ThemeProvider, theme } from '@chakra-ui/react';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { AppProvider } from '../contexts/app.context';

import '../global.css';
import { BaseLayout } from '../layouts';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <AppProvider>
        <BaseLayout {...pageProps}>
          <Component {...pageProps} />
        </BaseLayout>
      </AppProvider>
    </ThemeProvider>
  );
};

export default MyApp;

MyApp.getInitialProps = async (ctx: any) => {
  console.log(ctx);
  return {
    accessToken: ctx.query?.accessToken,
  };
};
