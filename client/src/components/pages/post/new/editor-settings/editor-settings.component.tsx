import React, { useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import { IEditorSettingsProps } from '@/types';

export interface ICreatePostFormProps {
  title: string;
}

export const EditorSettings: React.FC<IEditorSettingsProps> = ({
  snippetData,
}) => {
  const [values, setValues] = useState<ICreatePostFormProps>({
    title: '',
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setValues((curr) => ({
      ...curr,
      [e.target.name]: e.target.value,
    }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement | HTMLDivElement>) {
    e.preventDefault();

    console.log(values);
    console.log(snippetData);
    // Send request with postService
    // Validation
    // Redirect to created post
  }

  return (
    <>
      <VStack
        flexDirection="column"
        spacing={8}
        mt={4}
        as="form"
        onSubmit={onSubmit}
      >
        <FormControl id="title">
          <FormLabel fontWeight="bold">Title</FormLabel>
          <Input
            h="60px"
            placeholder="Enter Post Title"
            fontWeight="bold"
            border="none"
            bgColor="#F6F6F6"
            name="title"
            onChange={handleChange}
            letterSpacing=".03em"
            _placeholder={{
              color: 'gray.400',
            }}
          />
          <FormHelperText>Make the title short and powerful</FormHelperText>
        </FormControl>
        <Flex as="footer" w="100%">
          <Button colorScheme="pink" w="100%" type="submit">
            Create Post
          </Button>
        </Flex>
      </VStack>
    </>
  );
};
