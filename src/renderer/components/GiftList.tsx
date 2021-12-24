import { Table, Thead, Tbody, Tr, Th, Td, TableCaption } from '@chakra-ui/react';
import { Gifter } from 'renderer/typings';
import timeSince from 'renderer/utils/timeSince';

const sampleData: Array<Gifter> = [
  {
    username: 'johndoe',
    lastSent: '2021-12-21 08:53:47',
  },
  {
    username: 'johnsmith',
    lastSent: '2021-12-22 23:12:54',
  },
  {
    username: 'janesmith',
    lastSent: '2021-12-23 12:09:43',
  },
  {
    username: 'asdasd',
    lastSent: '2021-12-19 23:12:54',
  },
  {
    username: 'fdsfds2',
    lastSent: '2021-12-22 12:09:43',
  },
  {
    username: 'asdasd3',
    lastSent: '2021-12-17 23:12:54',
  },
  {
    username: 'fdsfds4',
    lastSent: '2021-12-18 12:09:43',
  },
];

const GiftList = () => {
  return (
    <Table variant="striped" colorScheme="pink">
      <TableCaption placement="top">Next 10 gifts to send</TableCaption>
      <Thead>
        <Tr>
          <Th>Username</Th>
          <Th>Last sent</Th>
          <Th>Time since</Th>
        </Tr>
      </Thead>
      <Tbody>
        {sampleData.map((gifter) => (
          <Tr key={gifter.username}>
            <Td>{gifter.username}</Td>
            <Td>{gifter.lastSent}</Td>
            <Td>{timeSince(new Date(gifter.lastSent))}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default GiftList;
