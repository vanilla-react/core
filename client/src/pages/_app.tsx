import { CSSReset, theme, ThemeProvider } from '@chakra-ui/react';
import { AppProvider } from '../contexts/app.context';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </ThemeProvider>
  );
}

export default MyApp;
