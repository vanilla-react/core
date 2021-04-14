import { Heading, Text } from '@chakra-ui/react';

export interface IPostMetaDataProps {
  title: string;
  username: string;
}

export const PostMetaData = ({ title, username }: IPostMetaDataProps) => {
  return (
    <>
      <Heading fontSize="lg" mb={1}>
        {title}
      </Heading>
      <Text>@{username}</Text>
    </>
  );
};
