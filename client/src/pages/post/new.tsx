import { Spinner } from '@/components';
import { useProviders } from '@/entrypoint/useProviders.hook';
import {
  CreatePostDto,
  EditorFiles,
  FileData,
  ProgrammingLanguage,
} from '@/types';
import { HStack } from '@chakra-ui/layout';
import { Button, Flex, Input, useControllableState } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

const CodeEditor = dynamic(
  async () => {
    const monaco = await import('@monaco-editor/react');
    return monaco;
  },
  {
    loading: () => <Spinner />,
    ssr: false,
  },
);

const New = observer(() => {
  const { postService, programmingLanguageService } = useProviders();
  const [title, setTitle] = useState<string>('');

  const router = useRouter();
  const ref = useRef<string>('');
  const ref1 = useRef<string>('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  const [fileName, setFileName] = useState<string>('app.js');

  useEffect(() => {
    programmingLanguageService.getAllProgrammingLanguages();
  }, []);

  if (programmingLanguageService.loading) return <Spinner />;

  const languages = programmingLanguageService.languages;
  const files = languages.reduce<EditorFiles>((acc, { extension, ...cur }) => {
    const key = 'app' + extension;
    if (!acc[key]) {
      acc[key] = {
        name: key,
        language: cur.name,
        value: cur.template,
      };
    }
    return acc;
  }, {});

  const file = files[fileName];
  return (
    <div>
      <Head>
        <title>Vanilla React Beta - Create new post</title>
      </Head>
      <Flex my={8}>
        <Input
          onChange={handleTitleChange}
          value={title}
          border="1px solid #eee"
          h="60px"
          placeholder="Post title"
          fontWeight="bold"
          py={6}
          bgColor="#FFFF"
          letterSpacing=".03em"
          _placeholder={{
            color: 'gray.400',
          }}
        />
        <Button
          h="60px"
          ml={2}
          onClick={async () => {
            await postService.createPost({
              title,
              snippets: [
                { content: ref.current, programmingLanguageId: 1 },
                { content: ref1.current, programmingLanguageId: 2 },
              ],
            });
            router.push('/');
          }}
        >
          Submit
        </Button>
      </Flex>
      <HStack h="90vh" w="100%" spacing={8}>
        {/* <button
          disabled={fileName === 'app.jsx'}
          onClick={() => setFileName('app.jsx')}
        >
          script.js
        </button>
        <button
          disabled={fileName === 'app.js'}
          onClick={() => setFileName('app.js')}
        >
          style.css
        </button> */}
        {Object.values(files).map((file) => (
          <Button
            colorScheme="pink"
            onClick={() => setFileName(file.name)}
            disabled={file.name === fileName}
          >
            {file.name}
          </Button>
        ))}
        <CodeEditor
          height="90vh"
          theme="vs-light"
          path={file.name}
          defaultLanguage={'javascript'}
          defaultValue={file.value}
          value={file.value}
          language={file.language}
        />
      </HStack>
    </div>
  );
});

export default New;
