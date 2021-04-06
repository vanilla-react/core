import { useProviders } from '../../../hooks/useProviders';

import { Box, Flex, Text } from '@chakra-ui/layout';
import { Avatar } from './avatar.component';
import { GithubLogin } from './github-login.component';
import { observer } from 'mobx-react-lite';

export const Auth = observer(() => {
  const { authService } = useProviders();

  if (authService.isAuthenticated) {
    return (
      <Box>
        <Flex alignItems="center">
          <Text mr={4} fontWeight="bold" fontSize="1.1rem">
            {authService.user!.name}
          </Text>
          <Avatar name={authService.user!.name} />
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
