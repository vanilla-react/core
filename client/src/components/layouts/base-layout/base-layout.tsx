import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { Header } from '@components/index';
import { useHooks } from '@entrypoint/useHooks.hook';
import { Spinner } from '@components/generic';

export const BaseLayout = observer(({ children }) => {
  const router = useRouter();
  const { useInitialAuth } = useHooks();

  const { loading } = useInitialAuth(router.query.accessToken!);

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
