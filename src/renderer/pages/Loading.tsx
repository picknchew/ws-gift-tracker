import { useEffect } from 'react';
import { useHistory } from 'react-router';
import LoadingIndicator from 'renderer/components/LoadingIndicator';

const Loading = () => {
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const loggedIn = await window.wealthsimple.isLoggedIn();

      if (loggedIn) {
        // mimic ws behavior
        await window.wealthsimple.getTokenInfo();
        history.push('/app');
        return;
      }

      history.push('/login');
    })();
  }, [history]);

  return <LoadingIndicator />;
};

export default Loading;
