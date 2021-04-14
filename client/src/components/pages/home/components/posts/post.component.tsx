import { Avatar } from '@/components/layouts/base-layout/header/components/avatar.component';
import { IPost } from '@/types';
import { Box, Flex, Heading, VStack, Text } from '@chakra-ui/react';
import { GoArrowUp, GoArrowDown } from 'react-icons/go';
import moment from 'moment';

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
          <VStack spacing={0} justifyContent="center" mr={4}>
            <GoArrowUp className="vote vote--inactive" />
            <Text fontWeight="bold">0</Text>
            <GoArrowDown className="vote vote--inactive" />
          </VStack>
          <Avatar name={User.name} />
        </Flex>
        <Flex flexDir="column" ml={4}>
          <Heading fontSize="lg">{title}</Heading>
          <Text>@{User.name}</Text>
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
