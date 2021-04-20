import { PostMetaData } from '@/components/pages/home/components/posts/post-metadata.component';
import { PostVotesComponent } from '@/components/pages/home/components/posts/post-votes.component';
import { postService } from '@/entrypoint';
import { IPost } from '@/types';
import { Text, Box, Flex, Heading } from '@chakra-ui/react';
import { Avatar } from '@components/layouts/base-layout/header/components/avatar.component';
import { formatDistanceStrict } from 'date-fns';
import { NextPage } from 'next';
import { atomOneLight, CodeBlock } from 'react-code-blocks';
import React, { useState } from 'react';
import classNames from 'classnames';
import { Spinner } from '@/components';
import { LikePost } from '@/components/pages/post/show/like-post.component';

const Show: NextPage<{ postDetails: IPost }> = ({ postDetails }) => {
  const [post, setPost] = useState<IPost>(() => postDetails);
  const [activeSnippet, setActiveSnippet] = useState<number>(0);

  if (!post) {
    return <Spinner />;
  }

  const { id, title, User, createdAt, Kudos, slug, Snippets, ...rest } = post;

  const createdAtToText =
    formatDistanceStrict(new Date(createdAt), Date.now()) + ' ago';

  const currentSnippet = Snippets[activeSnippet];
  const snippets = Snippets.map((snippet) => ({
    ...snippet,
    // @ts-expect-error need to add type
    extension: snippet.ProgrammingLanguage.extension.split('.')[1],
  }));

  return (
    <Box>
      <Flex
        mt={12}
        bgColor="white"
        p={8}
        justifyContent="space-between"
        borderBottom="1px solid #eeeeee"
        textDecoration="none"
      >
        <Flex alignItems="center">
          <Flex alignItems="center">
            <LikePost id={id} kudos={Kudos} post={post} setPost={setPost} />
            <Box display={{ base: 'none', md: 'block' }}>
              <Avatar name={User.name} />
            </Box>
          </Flex>
          <Flex flexDir="column" ml={4}>
            <PostMetaData title={title} username={User.name} />
          </Flex>
        </Flex>
        <Flex
          justifyContent="center"
          alignItems="center"
          display={{ base: 'none', md: 'flex' }}
        >
          {createdAtToText}
        </Flex>
      </Flex>

      <Flex flexDir={{ base: 'column', lg: 'row' }} mt={6}>
        <Flex borderRadius="6px" p={6} flex={1} mr={{ lg: 4 }} bgColor="white">
          <Box
            className="code-snippet"
            pt={2}
            px={4}
            pb={4}
            bgColor="gray.50"
            minW="300px"
          >
            <Flex justifyContent="flex-end">
              <Text
                p={2}
                // @ts-ignore
                color={classNames({ pink: activeSnippet === 0 })}
                onClick={() => setActiveSnippet(0)}
                cursor="pointer"
              >
                {snippets[0].extension}
              </Text>
              <Text
                p={2}
                // @ts-ignore
                color={classNames({ pink: activeSnippet === 1 })}
                onClick={() => setActiveSnippet(1)}
                cursor="pointer"
              >
                {snippets[1].extension}
              </Text>
            </Flex>
            <CodeBlock
              text={currentSnippet.content}
              language="jsx"
              showLineNumbers={false}
              theme={atomOneLight}
            />
          </Box>
        </Flex>
        <Flex
          borderRadius="6px"
          p={6}
          flex="2"
          ml={{ lg: 4 }}
          mt={{ base: 4, lg: 0 }}
          bgColor="white"
          h="fit-content"
        >
          <Heading fontSize="lg" textColor="gray.400">
            Comments
          </Heading>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Show;

export async function getServerSideProps(ctx: any) {
  const post = await postService.getByUsernameAndSlug(
    ctx.params.username,
    ctx.params.slug,
  );

  return {
    props: {
      postDetails: post,
    },
  };
}
