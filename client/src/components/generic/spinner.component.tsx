import { Box, Spinner as ChakraSpinner } from '@chakra-ui/react';

export const Spinner: React.FC = () => {
  return (
    <Box
      background="#fff"
      position="fixed"
      top={0}
      left={0}
      h="100vh"
      w="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <ChakraSpinner />
    </Box>
  );
};
