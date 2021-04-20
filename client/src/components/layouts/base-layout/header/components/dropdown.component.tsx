import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { FaHome, FaPlusSquare, FaSignOutAlt } from 'react-icons/fa';
import React from 'react';
import { Avatar } from './avatar.component';
import { useProviders } from '@entrypoint/useProviders.hook';
import Link from 'next/link';

export const Dropdown = () => {
  const { authService } = useProviders();

  function onLogout() {
    authService.logout();
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
        <Link href="/">
          <MenuItem display={{ base: 'flex', md: 'none' }} icon={<FaHome />}>
            Back To Home
          </MenuItem>
        </Link>
        <Link href="/post/new">
          <MenuItem
            display={{ base: 'flex', md: 'none' }}
            icon={<FaPlusSquare />}
          >
            Create Snippet
          </MenuItem>
        </Link>
        <MenuItem icon={<FaSignOutAlt />} onClick={onLogout}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
