import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  components: {
    Container: {
      sizes: {
        xl: {
          w: '100%',
          maxW: '1600px',
        },
      },
    },
  },
});
