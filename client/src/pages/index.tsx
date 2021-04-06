import Head from 'next/head';
import { Link } from '@chakra-ui/layout';
import { observer } from 'mobx-react-lite';
import { useInitialAuth } from '../hooks/useInitialAuth';
import { NextPage } from 'next';

export interface IHomeProps {
  accessToken: string;
}

const Home: NextPage<IHomeProps> = ({ accessToken }) => {
  useInitialAuth(accessToken);

  return (
    <div>
      <Head>
        <title>Vanilla React Beta</title>
      </Head>
      <Link href="http://localhost:5000/auth">github login</Link>
    </div>
  );
};

Home.getInitialProps = async (ctx: any) => {
  return {
    accessToken: ctx.query.accessToken,
  };
};

export default observer(Home);
