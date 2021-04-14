import { Heading, Text } from '@chakra-ui/react';

export interface IPostMetaDataProps {
  title: string;
  username: string;
}

export const PostMetaData = ({ title, username }: IPostMetaDataProps) => {
  return (
    <>
      <Heading fontSize="lg">{title}</Heading>
      <Text>@{username}</Text>
    </>
  );
};
