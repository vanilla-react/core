import Link from 'next/link';
import { Button } from '@chakra-ui/button';

export const CreatePost = () => {
  return (
    <Link href="/post/new">
      <Button
        p={8}
        mr={8}
        display={['none', 'none', 'flex']}
        colorScheme="none"
        background="linear-gradient(97.73deg, #E25294 30.07%, #FF6D6D 95.15%)"
        transition="opacity .3s ease"
        _hover={{
          opacity: '.9',
        }}
      >
        Create Post
      </Button>
    </Link>
  );
};
