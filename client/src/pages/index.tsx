import { Posts } from '@/components';
import { postApi } from '@/entrypoint';
import { useProviders } from '@/entrypoint/useProviders.hook';
import { IPost, PostStatus } from '@/types';
import { observer } from 'mobx-react-lite';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';

const Home: NextPage<{ posts: IPost[]; hasMore: boolean }> = observer(
  ({ posts, hasMore }) => {
    const { postService } = useProviders();

    useEffect(() => {
      postService.setPosts(posts);
      postService.setHasMore(hasMore);
    }, []);

    return (
      <Box>
        <Head>
          <title>Vanilla React Beta</title>
        </Head>
        <Posts posts={postService.posts} />
      </Box>
    );
  },
);

export default Home;

export async function getServerSideProps(ctx: any) {
  const { posts, hasMore } = await postApi.getAllWithPagination(
    0,
    10,
    PostStatus.APPROVED,
  );

  return {
    props: {
      posts,
      hasMore,
    },
  };
}
