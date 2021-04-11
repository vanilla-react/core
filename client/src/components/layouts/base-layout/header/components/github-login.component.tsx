import { useProviders } from '@/entrypoint/useProviders.hook';
import { Button, Link } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { FaGithub } from 'react-icons/fa';

export const GithubLogin = observer(() => {
  const { config } = useProviders();

  return (
    <Link href={config.BASE_URL + 'auth'}>
      <Button
        aria-label="login with github"
        leftIcon={<FaGithub style={{ marginTop: '.2rem' }} />}
        py={8}
      >
        Login with Github
      </Button>
    </Link>
  );
});
