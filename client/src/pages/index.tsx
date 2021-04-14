import { Posts, Spinner } from '@/components';
import { postService } from '@/entrypoint';
import { useProviders } from '@/entrypoint/useProviders.hook';
import { PostStatus } from '@/types';
import { observer } from 'mobx-react-lite';
import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { Box } from '@chakra-ui/react';

const Home: NextPage = observer(() => {
  const { postService } = useProviders();
  // TODO: Perhaps move to service instead of local state
  const [[skip, take], setPagination] = useState<[number, number]>([0, 10]);

  return (
    <Box>
      <Head>
        <title>Vanilla React Beta</title>
      </Head>
      <Posts posts={postService.posts} />
    </Box>
  );
});

export default Home;

Home.getInitialProps = async (ctx: any) => {
  // TODO: move props to service
  await postService.getAllPostsWithPagination(0, 10, PostStatus.PENDING);

  return {};
};
