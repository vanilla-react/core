import { Container, Flex } from '@chakra-ui/layout';
import { observer } from 'mobx-react-lite';
import { Auth } from './components/auth.component';
import { Logo } from './components/logo.component';
import { Searchbar } from './components/searchbar.component';
import { CreatePost } from './components/create-post.component';
import { useProviders } from '@/entrypoint/useProviders.hook';

export const Header = observer(() => {
  const { authService } = useProviders();

  return (
    <Flex
      as="header"
      justifyContent="space-between"
      alignItems="center"
      py={8}
      bgColor="white"
      borderBottom="1px solid #eee"
    >
      <Container
        size="xl"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex alignItems="center">
          <Logo />
        </Flex>
        <Searchbar />
        <Flex alignItems="center">
          {authService.isAuthenticated && <CreatePost />}
          <Auth />
        </Flex>
      </Container>
    </Flex>
  );
});
