import React, { useEffect } from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';
import { Button, Box, VStack } from '@chakra-ui/react';
import { Spinner } from '@/components';
import { useProviders } from '@/entrypoint/useProviders.hook';
import { IEditorProps } from '@/types';

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

export const Editor: React.FC<IEditorProps> = observer(
  ({ setSnippetData, snippetData }) => {
    const [tab, setTab] = useState(0);
    const { programmingLanguageService } = useProviders();

    useEffect(() => {
      programmingLanguageService.getAllProgrammingLanguages().then((langs) => {
        setSnippetData(
          langs.map((lang) => ({
            name: 'app' + lang.extension,
            value: lang.template,
            language: lang.name,
            languageId: lang.id,
          })),
        );
      });
    }, []);

    if (programmingLanguageService.loading) return <Spinner />;

    const tabData = snippetData[tab];

    function handleEditorChange(newValue: string | undefined) {
      if (!newValue) return;
      setSnippetData((curr) =>
        curr.map((t) =>
          t.name === tabData.name ? { ...t, value: newValue } : t,
        ),
      );
    }

    if (!tabData) return <Spinner />;

    return (
      <VStack h="90vh" w="100%" bgColor="#fff" border="1px solid #eee" flex={4}>
        <Box
          as="header"
          display="flex"
          boxShadow="0px 1px 1px #eee;"
          w="100%"
          justifyContent="flex-start"
        >
          {snippetData.map((data, i) => (
            <Button
              h="42px"
              maxH="42px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              variant="unstyled"
              bgColor={classNames({ 'pink.100': tab === i })}
              color={classNames({
                'pink.600': tab === i,
                'gray.300': tab !== i,
              })}
              borderRadius="none"
              p="1rem"
              onClick={() => setTab(i)}
            >
              {data.name}
            </Button>
          ))}
        </Box>
        <CodeEditor
          className="mt-0"
          height="100%"
          theme="vs-light"
          path={tabData.name}
          value={tabData.value}
          language={tabData.language}
          onChange={handleEditorChange}
          options={{
            minimap: {
              enabled: false,
            },
            scrollbar: {
              vertical: 'hidden',
            },
            lineDecorationsWidth: 0,
          }}
        />
      </VStack>
    );
  },
);
