import { Button, Heading, Input, InputGroup, InputRightElement, Stack } from '@chakra-ui/react';
import { useState } from 'react';

const Login = () => {
  const [show, setShow] = useState(false);
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

export default Login;
