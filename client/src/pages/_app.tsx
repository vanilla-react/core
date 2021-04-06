import { CSSReset, ThemeProvider, theme } from '@chakra-ui/react';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { AppProvider } from '../contexts/app.context';

import '../global.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </ThemeProvider>
  );
};

export default MyApp;
