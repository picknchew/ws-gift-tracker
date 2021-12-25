import { Box, Button, Heading, Input, InputGroup, InputRightElement, PinInput, PinInputField, Stack, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useAuth } from 'renderer/hooks/useAuth';
import { useHistory } from 'react-router';
import { LoginResponse } from 'main/typings';

const Login = () => {
  const [show, setShow] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const history = useHistory();
  const handleClick = () => setShow(!show);
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isOTPInvalid, setIsOTPInvalid] = useState(false);
  const toast = useToast();

  const handleSignIn = async () => {
    setIsLoggingIn(true);
    const result = await signIn(email, password);
    setIsLoggingIn(false);
    switch (result) {
      case LoginResponse.SUCCESS:
        history.push('app');
        break;
      case LoginResponse.RequireOTP:
        setShowOTP(true);
        toast({
          title: 'OTP required',
          description: 'Enter the OTP sent to your email/phone',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
        break;
      case LoginResponse.WrongCredentials:
        setShowOTP(false);
        toast({
          title: 'Invalid credentials',
          description: 'Please check your email and password',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        break;
      case LoginResponse.UnknownError:
        setShowOTP(false);
        toast({
          title: 'Unknown error',
          description: 'Please try again later',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        break;
      default:
        break;
    }
  };

  const handleOTPSubmit = async (otp: string) => {
    setIsLoggingIn(true);
    const result = await signIn(email, password, otp);
    setIsLoggingIn(false);
    switch (result) {
      case LoginResponse.SUCCESS:
        history.push('app');
        break;
      case LoginResponse.RequireOTP:
        setIsOTPInvalid(true);
        toast({
          title: 'OTP invalid',
          description: 'Try again with a valid OTP',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        break;
      case LoginResponse.WrongCredentials:
        toast({
          title: 'Invalid credentials',
          description: 'Please check your input',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        break;
      case LoginResponse.UnknownError:
        toast({
          title: 'Unknown error',
          description: 'Please try again later',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        break;
      default:
        break;
    }
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

        {showOTP ? (
          <Stack direction="row" justifyContent="space-between">
            <PinInput otp onComplete={handleOTPSubmit} isInvalid={isOTPInvalid}>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </Stack>
        ) : null}

        <Button colorScheme="pink" variant="solid" onClick={handleSignIn} disabled={showOTP} isLoading={isLoggingIn}>
          {showOTP ? 'Enter your OTP' : 'Sign in'}
        </Button>
      </Stack>
    </Box>
  );
};

export default Login;
