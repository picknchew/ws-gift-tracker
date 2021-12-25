import { Table, Thead, Tbody, Tr, Th, Td, TableCaption } from '@chakra-ui/react';
import { getNextGiftsToSend } from 'renderer/wealthsimple/transformers';
import { useQuery } from 'react-query';

const GiftList = () => {
  const { isLoading, error, data } = useQuery('queryBonuses', async () => {
    const res = await window.wealthsimple.queryBonuses();
    return res.data;
  });

  if (isLoading) {
    return <div>Loading gift data...</div>;
  }

  if (error) {
    return <div>Error loading gift data</div>;
  }

  if (!data) {
    return <div>No gift data</div>;
  }

  return (
    <Table variant="striped" colorScheme="pink">
      <TableCaption placement="top">Next 10 gifts to send</TableCaption>
      <Thead>
        <Tr>
          <Th>Username</Th>
          <Th>Time since</Th>
        </Tr>
      </Thead>
      <Tbody>
        {getNextGiftsToSend(data.p2pReferralsv2).map((gifter) => (
          <Tr key={gifter.handle}>
            <Td>{gifter.handle}</Td>
            <Td>{gifter.timeSinceLastSent}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default GiftList;
