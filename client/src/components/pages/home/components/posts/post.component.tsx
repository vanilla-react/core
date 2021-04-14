import { Avatar } from '@/components/layouts/base-layout/header/components/avatar.component';
import { IPost } from '@/types';
import { Flex } from '@chakra-ui/react';
import moment from 'moment';
import { PostVotesComponent } from './post-votes.component';
import { PostMetaData } from './post-metadata.component';

export const Post = ({ title, User, createdAt }: IPost) => {
  const createdAtToText = moment(createdAt).fromNow();

  return (
    <Flex
      bgColor="white"
      p={8}
      justifyContent="space-between"
      borderBottom="1px solid #eeeeee"
    >
      <Flex alignItems="center">
        <Flex>
          <PostVotesComponent />
          <Avatar name={User.name} />
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
