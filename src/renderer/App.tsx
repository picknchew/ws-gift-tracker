import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthContext from './context/AuthContext';
import { useProvideAuth } from './hooks/useAuth';
import GlobalLayout from './layouts/GlobalLayout';
import Login from './pages/Login';
import Main from './pages/Main';
import './wealthsimple/headers';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      refetchOnMount: false,
      refetchInterval: 1800000,
    },
  },
});

export default function App() {
  const auth = useProvideAuth();

  return (
    <ChakraProvider>
      <AuthContext.Provider value={auth}>
        <QueryClientProvider client={queryClient}>
          <GlobalLayout>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/app" component={Main} />
              </Switch>
            </Router>
          </GlobalLayout>
        </QueryClientProvider>
      </AuthContext.Provider>
    </ChakraProvider>
  );
}
