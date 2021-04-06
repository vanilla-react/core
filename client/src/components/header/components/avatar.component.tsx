import { Image } from '@chakra-ui/react';
import { IAvatarProps } from '../../../types';

export const Avatar: React.FC<IAvatarProps> = ({ name }) => {
  return (
    <Image
      h={16}
      background="#e9eaeb"
      borderRadius="50%"
      p={2}
      src={`https://avatars.dicebear.com/api/bottts/${name}.svg`}
    ></Image>
  );
};
