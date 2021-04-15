import { Avatar } from '@/components/layouts/base-layout/header/components/avatar.component';
import { IPost } from '@/types';
import { Flex, Box } from '@chakra-ui/react';
import { PostVotesComponent } from './post-votes.component';
import { PostMetaData } from './post-metadata.component';
import { formatDistance } from 'date-fns';

export const Post = ({ id, title, User, createdAt, Kudos, ...rest }: IPost) => {
  const createdAtToText =
    formatDistance(new Date(createdAt), Date.now()) + ' ago';

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
            post={{ id, title, User, createdAt, Kudos, ...rest }}
          />
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
  );
};
