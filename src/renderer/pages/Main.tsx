import { Grid, GridItem } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import GiftList from 'renderer/components/GiftList';
import StatsHeader from 'renderer/components/StatsHeader';

const Main = () => {
  const bonusesQuery = useQuery('queryBonuses', async () => {
    const res = await window.wealthsimple.queryBonuses();
    return res.data.p2pReferralsv2;
  });

  return (
    <Grid h="100%" templateRows="repeat(10, 1fr)" templateColumns="repeat(8, 1fr)" gap={4}>
      <GridItem boxShadow="base" rounded="md" p="4" rowSpan={10} colSpan={3} bg="white" overflowY="scroll">
        <GiftList
          data={bonusesQuery.data ?? []}
          error={bonusesQuery.error}
          isLoading={bonusesQuery.isLoading}
          isRefetching={bonusesQuery.isRefetching}
          refetch={() => bonusesQuery.refetch()}
        />
      </GridItem>
      <GridItem boxShadow="base" rounded="md" display="flex" p="4" rowSpan={2} colSpan={5} bg="white" overflow="auto">
        <StatsHeader data={bonusesQuery.data ?? []} error={bonusesQuery.error} isLoading={bonusesQuery.isLoading} isRefetching={bonusesQuery.isRefetching} />
      </GridItem>
      <GridItem boxShadow="base" rounded="md" rowSpan={8} colSpan={5} bg="papayawhip">
        some charts here
      </GridItem>
    </Grid>
  );
};

export default Main;
