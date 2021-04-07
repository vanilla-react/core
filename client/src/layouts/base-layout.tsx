import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React from 'react';
import { Header, Spinner } from '../components';
import { useInitialAuth } from '../hooks/useInitialAuth';

export const BaseLayout = observer(({ children }) => {
  const router = useRouter();

  // @ts-expect-error missing type
  const { loading } = useInitialAuth(router.query.accessToken);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
});
