import Link from 'next/link';
import { Avatar } from '@/components/layouts/base-layout/header/components/avatar.component';
import { IPost } from '@/types';
import { Flex, Box } from '@chakra-ui/react';
import { PostVotesComponent } from './post-votes.component';
import { PostMetaData } from './post-metadata.component';
import { formatDistanceStrict } from 'date-fns';

export const Post = ({
  id,
  title,
  User,
  createdAt,
  Kudos,
  slug,
  ...rest
}: IPost) => {
  const createdAtToText =
    formatDistanceStrict(new Date(createdAt), Date.now()) + ' ago';

  return (
    <Flex
      bgColor="white"
      p={8}
      justifyContent="space-between"
      borderBottom="1px solid #eeeeee"
    >
      <Flex alignItems="center">
        <Flex>
          <PostVotesComponent
            id={id}
            kudos={Kudos}
            post={{ id, title, User, createdAt, Kudos, slug, ...rest }}
          />
          <Box display={{ base: 'none', md: 'block' }}>
            <Avatar name={User.name} />
          </Box>
        </Flex>
        <Link href={`/post/${User.name}/${slug}`}>
          <Flex flexDir="column" ml={4} cursor="pointer">
            <PostMetaData title={title} username={User.name} />
          </Flex>
        </Link>
      </Flex>
      <Flex
        justifyContent="center"
        alignItems="center"
        display={{ base: 'none', md: 'flex' }}
      >
        {createdAtToText}
      </Flex>
    </Flex>
  );
};
