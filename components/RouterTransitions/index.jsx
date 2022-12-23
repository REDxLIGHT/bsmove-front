import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { isObjectEmpty } from '../../helpers/functions';
import { useLoading } from '../../hooks/loading';

const RouterTransitions = () => {
  const { setGlobalLoading } = useLoading();
  const router = useRouter();

  function handleRouterChangeStart() {
    setGlobalLoading(true);
  }

  function handleRouterChangeEnd() {
    setGlobalLoading(false);
  }

  useEffect(() => {
    if (isObjectEmpty(router)) return ;
    router.events.on('routeChangeStart', handleRouterChangeStart);
    router.events.on('routeChangeComplete', handleRouterChangeEnd)
    return () => {
      router.events.off('routeChangeStart', handleRouterChangeStart);
      router.events.off('routerChangeComplete', handleRouterChangeEnd)
    }
  }, [router])
  return null;
}

export default RouterTransitions;
