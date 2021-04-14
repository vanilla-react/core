import { useProviders } from '@/entrypoint/useProviders.hook';
import { IPost, PostStatus } from '@/types';
import { Box, Flex, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { PostFilters } from './post-filters.component';
import { Post } from './post.component';
import { debounce } from 'lodash';

export interface IPostsProps {
  posts: IPost[];
}

export const Posts = observer(({ posts }: IPostsProps) => {
  const { postService } = useProviders();
  const ref = useRef(null);

  const handleInfiniteLoad = debounce(() => {
    if (
      window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight - 600
    ) {
      if (postService.hasMore) {
        postService.getAllPostsWithPagination(PostStatus.APPROVED);
      }
    }
  }, 300);

  useEffect(() => {
    document.addEventListener('scroll', handleInfiniteLoad);
    return () => document.removeEventListener('scroll', handleInfiniteLoad);
  }, []);

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <Flex
      mt={12}
      direction="column"
      border="1px solid #eee"
      style={{ minHeight: `${posts.length * 129}px` }}
    >
      <Box bgColor="#fcfcfc" flex="1" borderBottom="1px solid #eee">
        <Box py={2} ml={6}>
          <PostFilters />
        </Box>
      </Box>
      <Box flex="3" ref={ref}>
        {posts.length <= 0 && (
          <Text p={8} bgColor="white">
            There are no posts yet, be the first!
          </Text>
        )}
        {sortedPosts.map((post) => (
          <Post {...post} key={post.id} />
        ))}
      </Box>
    </Flex>
  );
});
