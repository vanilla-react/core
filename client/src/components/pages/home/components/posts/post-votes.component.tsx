import { VStack, Text } from '@chakra-ui/react';
import { GoArrowUp, GoArrowDown } from 'react-icons/go';

export const PostVotesComponent = () => {
  return (
    <VStack spacing={0} justifyContent="center" mr={4}>
      <GoArrowUp className="vote vote--inactive" />
      <Text fontWeight="bold">0</Text>
      <GoArrowDown className="vote vote--inactive" />
    </VStack>
  );
};
