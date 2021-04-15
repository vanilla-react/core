import { HStack } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRef } from 'react';

// import 'ace-builds/src-noconflict/mode-java';
// import 'ace-builds/src-noconflict/theme-github';

const CodeEditor = dynamic(
  async () => {
    const ace = await import('react-ace');
    require('ace-builds/src-noconflict/mode-jsx');
    require('ace-builds/src-noconflict/theme-xcode');
    require('ace-builds/src-noconflict/keybinding-vim');
    return ace;
  },
  {
    loading: () => <>Loading...</>,
    ssr: false,
  },
);

const initialReact = `import react from 'react';

export const App = () => {
  return (
    <div>
      <p>Hello world</p>
    </div>
  )
}
`;

const New = () => {
  const ref = useRef<string>('');
  const ref1 = useRef<string>('');

  return (
    <div>
      <Head>
        <title>Vanilla React Beta - Create new post</title>
      </Head>
      <HStack h="90vh" w="100%" spacing={8}>
        <CodeEditor
          height="100%"
          width="100%"
          keyboardHandler="vim"
          mode="jsx"
          defaultValue={initialReact}
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
          mode="jsx"
          defaultValue={initialReact}
          theme="theme-xcode"
          name="editor01"
          enableBasicAutocompletion={true}
          // @ts-ignore
          onChange={(value) => (ref1.current = value)}
        />
      </HStack>
    </div>
  );
};

export default New;
