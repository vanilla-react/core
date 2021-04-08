import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { FaPlusSquare, FaSignOutAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';
import React from 'react';
import { Avatar } from './avatar.component';
import { useProviders } from '../../../../../di/useProviders.hook';

export const Dropdown = () => {
  const router = useRouter();
  const { authService } = useProviders();

  function onLogout() {
    authService.logout();
    router.replace(router.basePath);
  }

  return (
    <Menu closeOnBlur>
      <MenuButton
        background="none"
        as={IconButton}
        aria-label="Options"
        icon={<Avatar name={authService.user!.name} />}
        fontSize="lg"
        _hover={{
          background: 'none',
        }}
        _active={{
          background: 'none',
        }}
        _focus={{
          background: 'none',
        }}
      />
      <MenuList border="1px solid #eee">
        <MenuItem
          display={['flex', 'none']}
          icon={<FaPlusSquare />}
          onClick={() => console.log('create post')}
        >
          Create Snippet
        </MenuItem>
        <MenuItem icon={<FaSignOutAlt />} onClick={onLogout}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
