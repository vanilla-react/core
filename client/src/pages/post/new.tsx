import { Spinner } from '@/components';
import { useProviders } from '@/entrypoint/useProviders.hook';
import { CreatePostDto } from '@/types';
import { HStack } from '@chakra-ui/layout';
import { Button, Flex, Input, useControllableState } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

// import 'ace-builds/src-noconflict/mode-java';
// import 'ace-builds/src-noconflict/theme-github';

const CodeEditor = dynamic(
  async () => {
    const ace = await import('react-ace');
    require('ace-builds/src-noconflict/mode-jsx');
    require('ace-builds/src-noconflict/mode-javascript');
    require('ace-builds/src-noconflict/mode-typescript');
    require('ace-builds/src-noconflict/mode-tsx');
    require('ace-builds/src-noconflict/theme-xcode');
    require('ace-builds/src-noconflict/keybinding-vim');
    return ace;
  },
  {
    loading: () => <>Loading...</>,
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

  useEffect(() => {
    programmingLanguageService.getAllProgrammingLanguages();
  }, []);

  if (programmingLanguageService.loading) return <Spinner />;

  const [first, second] = programmingLanguageService.languages;

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
          Test post submit
        </Button>
      </Flex>
      <HStack h="90vh" w="100%" spacing={8}>
        <CodeEditor
          height="100%"
          width="100%"
          keyboardHandler="vim"
          mode={first.name}
          defaultValue={first.template}
          theme="theme-xcode"
          name="editor01"
          enableBasicAutocompletion={true}
          // @ts-ignore
          onChange={(value) => (ref.current = value)}
        />
        <CodeEditor
          height="100%"
          width="100%"
          keyboardHandler="vim"
          mode={second.name}
          defaultValue={second.template}
          theme="theme-xcode"
          name="editor01"
          enableBasicAutocompletion={true}
          // @ts-ignore
          onChange={(value) => (ref1.current = value)}
        />
      </HStack>
    </div>
  );
});

export default New;
