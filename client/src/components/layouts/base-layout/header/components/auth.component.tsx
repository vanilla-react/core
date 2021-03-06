import { Box, Flex } from '@chakra-ui/layout';
import { GithubLogin } from './github-login.component';
import { observer } from 'mobx-react-lite';
import { Dropdown } from './dropdown.component';
import { useProviders } from '@entrypoint/useProviders.hook';

export const Auth = observer(() => {
  const { authService } = useProviders();

  if (authService.isAuthenticated) {
    return (
      <Box>
        <Flex alignItems="center">
          <Dropdown />
        </Flex>
      </Box>
    );
  }

  return (
    <Box>
      <GithubLogin />
    </Box>
  );
});
