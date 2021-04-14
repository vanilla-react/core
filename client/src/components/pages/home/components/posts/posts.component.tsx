import { IPost } from '@/types';
import { Box, Flex, List, ListItem } from '@chakra-ui/react';
import { PostFilters } from './post-filters.component';
import { Post } from './post.component';

export interface IPostsProps {
  posts: IPost[];
}

export const Posts = ({ posts }: IPostsProps) => {
  const sortedPosts = posts?.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <Flex
      mt={12}
      direction="column"
      border="1px solid #eee"
      style={{ minHeight: `${posts?.length * 129}px` }}
    >
      <Box bgColor="#fcfcfc" flex="1" borderBottom="1px solid #eee">
        <Box py={2} ml={6}>
          <PostFilters />
        </Box>
      </Box>
      <Box flex="3">
        {sortedPosts?.map((post) => (
          <Post {...post} key={post.id} />
        ))}
      </Box>
    </Flex>
  );
};
