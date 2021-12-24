import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import './App.css';

export default function App() {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route path="/" component={Login} />
          <Route path="/app" component={Main} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}
