import { VStack, Table, Thead, Tbody, Tr, Th, Td, TableCaption, Button } from '@chakra-ui/react';
import { GiftListProps, ResultType } from 'main/typings';
import Result from './Result';
import LoadingIndicator from './LoadingIndicator';

const GiftList = ({ data, error, isLoading, isRefetching, refetch }: GiftListProps) => {
  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Result type={ResultType.ERROR} headline="Error fetching gift information" message="Couldn't get your gifts, try again." />;
  }

  if (!data) {
    return <Result type={ResultType.INFO} headline="No gift information" message="Couldn't find any gift information!" />;
  }

  return (
    <VStack>
      <Table variant="striped" colorScheme="pink">
        <TableCaption placement="top">Next 10 gifts to send</TableCaption>
        <Thead>
          <Tr>
            <Th>Username</Th>
            <Th>Timestamp</Th>
            <Th>Time since</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((gifter) => (
            <Tr key={gifter.handle}>
              <Td>{gifter.handle}</Td>
              <Td>{new Date(gifter.timestamp).toLocaleString()}</Td>
              <Td>{gifter.timeSinceLastSent}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button isLoading={isRefetching} onClick={refetch}>
        Refetch
      </Button>
    </VStack>
  );
};

export default GiftList;
