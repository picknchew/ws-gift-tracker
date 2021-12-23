import {
  Button,
  ChakraProvider,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

const Hello = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <>
      <Heading mb="10px">Login to Wealthsimple</Heading>

      <Stack spacing={3}>
        <Input placeholder="Username" size="lg" />

        <InputGroup size="lg">
          <Input type={show ? 'text' : 'password'} placeholder="Password" />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>

        <Button colorScheme="pink" variant="solid">
          Sign in
        </Button>
      </Stack>
    </>
  );
};

export default function App() {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route path="/" component={Hello} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}
