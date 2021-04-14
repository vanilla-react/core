import { IPost } from '@/types';
import { Box, Flex, List, ListItem } from '@chakra-ui/react';
import { Post } from './post.component';

export interface IPostsProps {
  posts: IPost[];
}

export const Posts = ({ posts }: IPostsProps) => {
  return (
    <Flex
      mt={12}
      direction="column"
      border="1px solid #eee"
      style={{ minHeight: `${posts?.length * 129}px` }}
    >
      <Box bgColor="#fcfcfc" flex="1" borderBottom="1px solid #eee">
        <Box py={2} ml={6}>
          <List display="flex">
            <ListItem
              fontWeight="bold"
              color="pink.500"
              fontSize="1.1rem"
              p={4}
              transition="color ease .2s"
              _hover={{
                color: 'pink.500',
              }}
              cursor="pointer"
            >
              Recent Posts
            </ListItem>
            <ListItem
              fontSize="1.1rem"
              p={4}
              ml={4}
              cursor="pointer"
              transition="color ease .2s"
              _hover={{
                color: 'pink.500',
              }}
            >
              Hot Posts
            </ListItem>
          </List>
        </Box>
      </Box>
      <Box flex="3">
        {posts
          // @ts-expect-error we cast it to date which we can compare
          ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((post) => (
            <Post {...post} key={post.id} />
          ))}
      </Box>
    </Flex>
  );
};
