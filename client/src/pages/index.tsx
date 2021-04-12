import { postApi } from '@/entrypoint';
import { useProviders } from '@/entrypoint/useProviders.hook';
import { PostStatus } from '@/types';
import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import { useState } from 'react';
import { useEffect } from 'react';

const Home = ({ posts }: any) => {
  // const { postService } = useProviders();
  const [[skip, take], setPagination] = useState<[number, number]>([0, 10]);

  // useEffect(() => {
  //   postService.getAllPostsWithPagination(skip, take, PostStatus.APPROVED);
  // }, []);

  return (
    <div>
      <Head>
        <title>Vanilla React Beta</title>
      </Head>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
};

export default observer(Home);

export async function getServerSideProps() {
  const posts = await postApi.getAllWithPagination(0, 10, PostStatus.PENDING);

  return {
    props: {
      posts,
    },
  };
}
