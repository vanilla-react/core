import { IPost } from '@/types';
import { Box, Heading, Flex, List, ListItem, Divider } from '@chakra-ui/react';
import { Post } from './post.component';

export interface IPostsProps {
  posts: IPost[];
}

export const Posts = ({ posts }: IPostsProps) => {
  return (
    <Flex
      mt={12}
      direction={{ base: 'column', lg: 'row' }}
      border="1px solid #eee"
      style={{ minHeight: `${posts?.length * 129}px` }}
    >
      {/* <Box bgColor="white" flex="1" borderRight="1px solid #eee">
        <Box p={12}>
          <Heading size="sm" fontColor="gray.300">
            Filters
          </Heading>
          <Divider my={2} color="gray.300" />
          <List mt={6}>
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
      </Box> */}
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
