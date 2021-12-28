import { Center, Spinner } from '@chakra-ui/react';

const LoadingIndicator = () => {
  return (
    <Center h="100%" w="100%">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    </Center>
  );
};

export default LoadingIndicator;
