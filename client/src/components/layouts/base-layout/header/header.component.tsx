import { Container, Flex } from '@chakra-ui/layout';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { Auth } from './components/auth.component';
import { Logo } from './components/logo.component';
import { Searchbar } from './components/searchbar.component';
import { CreateSnippet } from './components/create-snippet.component';

export const Header = observer(() => {
  return (
    <Flex
      as="header"
      justifyContent="space-between"
      alignItems="center"
      px={[4, 4, 8, 12]}
      py={8}
      bgColor="white"
      borderBottom="1px solid #eee"
    >
      <Container w="100%" maxW="1600px" display="flex" alignItems="center">
        <Flex w="100%" alignItems="center">
          <Logo />
          <Searchbar />
        </Flex>
        <CreateSnippet />
        <Auth />
      </Container>
    </Flex>
  );
});
