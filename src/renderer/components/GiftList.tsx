import { useState, useRef, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, Button, IconButton, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { MdRefresh } from 'react-icons/md';
import { Gifter, GiftListProps, ResultType } from 'main/typings';
import { getNextGiftsToSendGen } from 'renderer/wealthsimple/transformers';
import Result from './Result';
import LoadingIndicator from './LoadingIndicator';

const GIFT_LIST_PAGE_SIZE = 10; // must be non zero

const GiftList = ({ data, error, isLoading, isRefetching, refetch }: GiftListProps) => {
  const [nextGiftsToSend, setNextGiftsToSend] = useState<Array<Gifter>>([]);
  const [reachedLastPage, setReachedLastPage] = useState<boolean>(false);
  const pageNumber = useRef(-1); // this can be a ref since we update this with setState together
  const giftListGenerator = useRef<Generator<Array<Gifter>> | null>(null);
  const giftListCache = useRef<Array<Gifter>>([]);
  const color = useColorModeValue('gray.600', 'gray.400');

  const fetchNextPage = () => {
    const next = giftListGenerator.current?.next();
    if (next) {
      if (!next.done && next.value) {
        pageNumber.current += 1;
        const startIndex = pageNumber.current * GIFT_LIST_PAGE_SIZE;
        const endIndex = startIndex + GIFT_LIST_PAGE_SIZE;
        giftListCache.current = next.value;
        setNextGiftsToSend(next.value.slice(startIndex, endIndex));
        setReachedLastPage(false);
      } else {
        pageNumber.current += 1;
        const startIndex = pageNumber.current * GIFT_LIST_PAGE_SIZE;
        const endIndex = Math.min(startIndex + GIFT_LIST_PAGE_SIZE, giftListCache.current.length);
        // remember: starIndex is inclusive, endIndex is exclusive
        // handle logic for partial last page
        if (startIndex < giftListCache.current.length && endIndex <= giftListCache.current.length) {
          setNextGiftsToSend(giftListCache.current.slice(startIndex, endIndex));
        } else {
          // undo the increment
          pageNumber.current -= 1;
          setReachedLastPage(true);
        }
      }
    }
  };

  useEffect(() => {
    // when data changes, we need to update the generator too
    // reset the page number to zero
    if (data) {
      pageNumber.current = -1;
      giftListGenerator.current = getNextGiftsToSendGen(data, GIFT_LIST_PAGE_SIZE);
      fetchNextPage();
      // pageNumber will be 0 now
    }
  }, [data]);

  if (isLoading || isRefetching) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Result type={ResultType.Error} headline="Error fetching gift information" message="Couldn't get your gifts, try again." />;
  }

  if (!data) {
    return <Result type={ResultType.Info} headline="No gift information" message="Couldn't find any gift information!" />;
  }

  const prevPage = () => {
    if (pageNumber.current > 0) {
      pageNumber.current -= 1;
      const startIndex = pageNumber.current * GIFT_LIST_PAGE_SIZE;
      const endIndex = startIndex + GIFT_LIST_PAGE_SIZE;
      setNextGiftsToSend(giftListCache.current.slice(startIndex, endIndex));
      setReachedLastPage(false);
    }
  };

  return (
    <Flex flexDir="column" justifyContent="space-between" height="100%">
      <Table>
        <TableCaption placement="top" fontSize="m">
          <Text color={color} fontWeight="medium">
            Next 10 gifts to send
          </Text>
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Username</Th>
            <Th>Timestamp</Th>
            <Th>Time since</Th>
          </Tr>
        </Thead>
        <Tbody fontSize="sm">
          {nextGiftsToSend.map((gifter) => (
            <Tr key={`${gifter.handle}${gifter.timestamp}`}>
              <Td>{gifter.handle}</Td>
              <Td>{new Date(gifter.timestamp).toLocaleString()}</Td>
              <Td>{gifter.timeSinceLastSent}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <HStack alignSelf="center" flexWrap="wrap" mt="4">
        <IconButton
          isDisabled={isRefetching || pageNumber.current === 0}
          aria-label="Previous 10 gifts to send"
          icon={<AiFillCaretLeft />}
          onClick={prevPage}
        />
        <Button leftIcon={<MdRefresh />} colorScheme="blue" isLoading={isRefetching} onClick={refetch}>
          Refetch
        </Button>
        <IconButton aria-label="next 10 gifts to send" icon={<AiFillCaretRight />} isDisabled={isRefetching || reachedLastPage} onClick={fetchNextPage} />
      </HStack>
    </Flex>
  );
};

export default GiftList;
