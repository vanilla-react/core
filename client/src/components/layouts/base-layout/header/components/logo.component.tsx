import { Box, Heading } from '@chakra-ui/react';
import Link from 'next/link';

export const Logo = () => (
  <Box display={['none', 'none', 'none', 'block']} cursor="pointer">
    <Link href="/">
      <Heading color="pink.400">VR</Heading>
    </Link>
  </Box>
);
