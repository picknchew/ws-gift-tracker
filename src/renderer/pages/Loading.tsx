import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from 'renderer/hooks/useAuth';
import LoadingIndicator from 'renderer/components/LoadingIndicator';

const Loading = () => {
  const history = useHistory();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    (async () => {
      const loggedIn = await isLoggedIn();

      if (loggedIn) {
        // mimic ws behavior
        await window.wealthsimple.getTokenInfo();
        history.push('/app');
        return;
      }

      history.push('/login');
    })();
  }, [history, isLoggedIn]);

  return <LoadingIndicator />;
};

export default Loading;
