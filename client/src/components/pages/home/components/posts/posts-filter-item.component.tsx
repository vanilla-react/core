import { ListItem } from '@chakra-ui/react';

export interface IPostFilterItemProps {
  content: string;
  isActive: boolean;
}

export const PostFilterItem = ({ content, isActive }: IPostFilterItemProps) => {
  return (
    <ListItem
      fontWeight="bold"
      mr={4}
      color={isActive ? 'pink.500' : 'gray.400'}
      fontSize="1.1rem"
      p={4}
      transition="color ease .2s"
      _hover={{
        color: 'pink.500',
      }}
      cursor="pointer"
    >
      {content}
    </ListItem>
  );
};
