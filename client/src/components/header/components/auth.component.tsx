import { useProviders } from '../../../hooks/useProviders';

import { Box, Flex, Text } from '@chakra-ui/layout';
import { GithubLogin } from './github-login.component';
import { observer } from 'mobx-react-lite';
import { Dropdown } from './dropdown.component';

export const Auth = observer(() => {
  const { authService } = useProviders();

  if (authService.isAuthenticated) {
    return (
      <Box>
        <Flex alignItems="center">
          <Text mr={4} fontWeight="bold" fontSize="1.1rem">
            {authService.user!.name}
          </Text>
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
