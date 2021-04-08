import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React from 'react';
import { Header, Spinner } from '..';
import { useProviders } from '../../di/useProviders.hook';

export const BaseLayout = observer(({ children }) => {
  const router = useRouter();
  const { useInitialAuth } = useProviders();

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
