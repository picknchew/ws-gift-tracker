import { Grid, GridItem } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import GiftList from 'renderer/components/GiftList';
import StatsHeader from 'renderer/components/StatsHeader';
import { getNextGiftsToSend } from 'renderer/wealthsimple/transformers';

const Main = () => {
  const bonusesQuery = useQuery('queryBonuses', async () => {
    const res = await window.wealthsimple.queryBonuses();
    return getNextGiftsToSend(res.data.p2pReferralsv2);
  });

  return (
    <Grid h="100%" templateRows="repeat(5, 1fr)" templateColumns="repeat(8, 1fr)" gap={4}>
      <GridItem rowSpan={5} colSpan={3} overflowY="scroll">
        <GiftList
          data={bonusesQuery.data ?? []}
          error={bonusesQuery.error}
          isLoading={bonusesQuery.isLoading}
          isRefetching={bonusesQuery.isRefetching}
          refetch={() => bonusesQuery.refetch()}
        />
      </GridItem>
      <GridItem rowSpan={1} colSpan={5}>
        <StatsHeader />
      </GridItem>
      <GridItem rowSpan={2} colSpan={5} bg="papayawhip">
        some charts here
      </GridItem>
      <GridItem rowSpan={2} colSpan={5} bg="papayawhip">
        some charts here
      </GridItem>
    </Grid>
  );
};

export default Main;
