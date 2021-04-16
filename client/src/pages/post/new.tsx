import { EditorSettings } from '@/components/pages/post/new/editor-settings/editor-settings.component';
import { FileData } from '@/types';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import { Editor } from '@components/pages/post/new/editor.component';
import Head from 'next/head';
import React, { useState } from 'react';

const New = () => {
  const [title, setTitle] = useState<string>('');
  const [snippetData, setSnippetData] = useState<FileData[]>([]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);
  return (
    <div>
      <Head>
        <title>Vanilla React Beta - Create new post</title>
      </Head>
      <Flex mt={6} flexDirection={{ lg: 'column', xl: 'row' }}>
        <Flex as="aside" flex={2} border="1px solid #eee" bgColor="white">
          <Flex as="header" w="100%">
            <Tabs
              isFitted
              w="100%"
              variant="line"
              colorScheme="pink"
              borderBottom="#eee"
            >
              <TabList
                fontWeight="bold"
                color="gray.300"
                _selected={{
                  color: '#B83280',
                  borderBottom: '3px solid #B83280',
                }}
                _focus={{
                  border: 'none',
                  outline: 'none',
                }}
              >
                <Tab>Post Details</Tab>
                <Tab>Editor Settings</Tab>
              </TabList>
              <TabPanels h="100%">
                <TabPanel h="100%" p={8}>
                  <EditorSettings />
                </TabPanel>
                <TabPanel>Nothing here...</TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Flex>
        {/* <Flex as="main" height="90vh"> */}
        <Editor setSnippetData={setSnippetData} snippetData={snippetData} />
        {/* </Flex> */}
      </Flex>
    </div>
  );
};

export default New;
