import { Flex } from '@chakra-ui/layout';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { Auth } from './components/auth.component';
import { Logo } from './components/logo.component';

export const Header = observer(() => {
  return (
    <Flex
      as="header"
      justifyContent="space-between"
      alignItems="center"
      px={12}
      py={8}
      bgColor="white"
      borderBottom="1px solid #eee"
    >
      <Logo />
      <Auth />
    </Flex>
  );
});
