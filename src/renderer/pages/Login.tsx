import { Box, Button, Heading, Input, InputGroup, InputRightElement, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { useAuth } from 'renderer/hooks/useAuth';
import { useHistory } from 'react-router';

const Login = () => {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const handleClick = () => setShow(!show);
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    await signIn(email, password);
    history.push('app');
  };

  return (
    <Box maxW="24rem" m="auto">
      <Heading mb="10px">Login to Wealthsimple</Heading>

      <Stack spacing={3}>
        <Input placeholder="Username" size="lg" onChange={(e) => setEmail(e.target.value)} />

        <InputGroup size="lg">
          <Input type={show ? 'text' : 'password'} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>

        <Button colorScheme="pink" variant="solid" onClick={handleSignIn}>
          Sign in
        </Button>
      </Stack>
    </Box>
  );
};

export default Login;
