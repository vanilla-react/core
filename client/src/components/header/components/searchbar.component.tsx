import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

export const Searchbar = () => {
  return (
    <InputGroup maxW="600" ml={[0, 0, 0, '8rem']} mr="2rem">
      <InputLeftElement
        h="60px"
        left="3"
        pointerEvents="none"
        children={<Search2Icon color="gray.400" />}
        py={6}
      />
      <Input
        h="60px"
        placeholder="find a snippet"
        fontWeight="bold"
        border="none"
        py={6}
        ml=".8rem"
        bgColor="#F6F6F6"
        mr={4}
        letterSpacing=".03em"
        _placeholder={{
          color: 'gray.400',
        }}
      />
    </InputGroup>
  );
};
