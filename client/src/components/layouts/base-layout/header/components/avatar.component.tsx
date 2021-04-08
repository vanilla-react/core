import { Flex, Image } from '@chakra-ui/react';
import { IAvatarProps } from '@/types';

export const Avatar: React.FC<IAvatarProps> = ({ name }) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      background="gray.100"
      borderRadius="100%"
      h="4rem"
      w="4rem"
    >
      <Image
        w="48px"
        src={`https://avatars.dicebear.com/api/bottts/${name}.svg`}
      ></Image>
    </Flex>
  );
};
