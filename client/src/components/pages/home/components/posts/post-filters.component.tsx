import { List } from '@chakra-ui/react';
import { PostFilterItem } from './posts-filter-item.component';

export const PostFilters = () => {
  return (
    <List display="flex">
      <PostFilterItem content="New" isActive={true} />
      <PostFilterItem content="Hot" isActive={false} />
    </List>
  );
};
