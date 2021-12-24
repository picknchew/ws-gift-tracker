import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import { useProvideAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Main from './pages/Main';
import './App.css';

export default function App() {
  const auth = useProvideAuth();

  return (
    <ChakraProvider>
      <AuthContext.Provider value={auth}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/app" component={Main} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </ChakraProvider>
  );
}
