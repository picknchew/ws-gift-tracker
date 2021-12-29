import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from 'renderer/hooks/useAuth';
import LoadingIndicator from 'renderer/components/LoadingIndicator';

const Loading = () => {
  const history = useHistory();
  const { isLoggedIn, getTokenInfo } = useAuth();

  useEffect(() => {
    (async () => {
      const loggedIn = await isLoggedIn();

      if (loggedIn) {
        // mimic ws behavior
        await getTokenInfo();
        history.push('/app');
        return;
      }

      history.push('/login');
    })();
  }, [history, isLoggedIn, getTokenInfo]);

  return <LoadingIndicator />;
};

export default Loading;
