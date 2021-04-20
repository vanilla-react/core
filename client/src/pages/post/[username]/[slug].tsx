import { postService } from '@/entrypoint';
import { IPost } from '@/types';
import { NextPage } from 'next';

const ShowPost: NextPage<IPost> = (post) => (
  <pre>{JSON.stringify(post, null, 2)}</pre>
);

export default ShowPost;

export async function getServerSideProps(ctx: any) {
  const post = await postService.getByUsernameAndSlug(
    ctx.params.username,
    ctx.params.slug,
  );

  return {
    props: {
      ...post,
    },
  };
}
