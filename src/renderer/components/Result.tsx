import { Box, Flex, Heading, Text, Icon } from '@chakra-ui/react';
import { MdClose, MdInfo, MdCheckCircle } from 'react-icons/md';
import { ResultType } from 'main/typings';

const ResultIcon = ({ type }: { type: ResultType }) => {
  if (type === ResultType.Success) {
    return (
      <Flex flexDirection="column" justifyContent="center" alignItems="center" bg="green.500" rounded="50px" w="55px" h="55px" textAlign="center">
        <Icon as={MdCheckCircle} boxSize="20px" color="white" />
      </Flex>
    );
  }
  if (type === ResultType.Info) {
    return (
      <Flex flexDirection="column" justifyContent="center" alignItems="center" bg="blue.500" rounded="50px" w="55px" h="55px" textAlign="center">
        <Icon as={MdInfo} boxSize="20px" color="white" />
      </Flex>
    );
  }
  if (type === ResultType.Error) {
    return (
      <Flex flexDirection="column" justifyContent="center" alignItems="center" bg="red.500" rounded="50px" w="55px" h="55px" textAlign="center">
        <Icon as={MdClose} boxSize="20px" color="white" />
      </Flex>
    );
  }
  return <></>;
};

export default function Error({ headline, message, type }: { headline: string; message: string; type: ResultType }) {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Box display="inline-block">
        <ResultIcon type={type} />
      </Box>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        {headline}
      </Heading>
      <Text color="gray.500">{message}</Text>
    </Box>
  );
}
