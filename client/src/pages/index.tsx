import Head from 'next/head';
import { observer } from 'mobx-react-lite';
import { useInitialAuth } from '../hooks/useInitialAuth';
import { NextPage } from 'next';
import { Header, Spinner } from '../components';

export interface IHomeProps {
  accessToken: string;
}

const Home: NextPage<IHomeProps> = ({ accessToken }) => {
  const { loading } = useInitialAuth(accessToken);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <Head>
        <title>Vanilla React Beta</title>
      </Head>
      <Header />
    </div>
  );
};

Home.getInitialProps = async (ctx: any) => {
  return {
    accessToken: ctx.query.accessToken,
  };
};

export default observer(Home);
