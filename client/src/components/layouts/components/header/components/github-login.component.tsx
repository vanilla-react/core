import { Button, Link } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

export const GithubLogin = () => (
  <Link href="http://localhost:5000/auth">
    <Button
      aria-label="login with github"
      leftIcon={<FaGithub style={{ marginTop: '.2rem' }} />}
      py={8}
    >
      Login with Github
    </Button>
  </Link>
);
