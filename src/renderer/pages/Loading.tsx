import { Center, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

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

  return (
    <Center>
      <Spinner color="red.500" size="xl" />
    </Center>
  );
};

export default Loading;
