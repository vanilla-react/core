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
import React, { useState } from 'react';

export interface ICreatePostFormProps {
  title: string;
  language: string;
}

export const EditorSettings = () => {
  const [values, setValues] = useState<ICreatePostFormProps>({
    title: '',
    language: '',
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
    // TOOD: We need the current post data
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
        <FormControl id="title">
          <FormLabel fontWeight="bold">Language</FormLabel>
          <Select
            placeholder="Select Language"
            h="60px"
            fontWeight="bold"
            name="language"
            onChange={handleChange}
            border="none"
            bgColor="#F6F6F6"
            letterSpacing=".03em"
            color="gray.400"
            _placeholder={{
              color: 'gray.400',
            }}
          >
            <option>JavaScript</option>
            <option>TypeScript</option>
          </Select>
          <FormHelperText>
            Choose between JavaScript & TypeScript
          </FormHelperText>
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
