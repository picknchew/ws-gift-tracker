import { Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import GiftCumulativeChart from 'renderer/components/charts/GiftCumulativeChart';
import GiftList from 'renderer/components/GiftList';
import StatsHeader from 'renderer/components/StatsHeader';
import GiftPieChart from 'renderer/components/charts/GiftPieChart';
import GiftHistoryChart from 'renderer/components/charts/GiftHistoryChart';

const Main = () => {
  const bonusesQuery = useQuery('queryBonuses', async () => {
    const res = await window.wealthsimple.queryBonuses();
    return res.data.p2pReferralsv2;
  });

  const bg = useColorModeValue('white', 'gray.800');

  return (
    <Grid h="100%" templateRows="repeat(5, 1fr)" templateColumns="repeat(8, 1fr)" gap={4}>
      <GridItem overflow="hidden" boxShadow="base" rounded="md" display="flex" colSpan={5} bg={bg}>
        <StatsHeader data={bonusesQuery.data ?? []} error={bonusesQuery.error} isLoading={bonusesQuery.isLoading} isRefetching={bonusesQuery.isRefetching} />
      </GridItem>
      <GridItem overflow="hidden" boxShadow="base" rounded="md" p="4" rowSpan={5} colSpan={3} bg={bg} overflowY="scroll">
        <GiftList
          data={bonusesQuery.data ?? []}
          error={bonusesQuery.error}
          isLoading={bonusesQuery.isLoading}
          isRefetching={bonusesQuery.isRefetching}
          refetch={() => bonusesQuery.refetch()}
        />
      </GridItem>
      <GridItem overflow="hidden" boxShadow="base" rounded="md" rowSpan={2} colSpan={2} bg={bg}>
        <GiftCumulativeChart
          data={bonusesQuery.data ?? []}
          error={bonusesQuery.error}
          isLoading={bonusesQuery.isLoading}
          isRefetching={bonusesQuery.isRefetching}
        />
      </GridItem>
      <GridItem overflow="hidden" boxShadow="base" rounded="md" rowSpan={2} colSpan={3} bg={bg}>
        <GiftPieChart data={bonusesQuery.data ?? []} error={bonusesQuery.error} isLoading={bonusesQuery.isLoading} isRefetching={bonusesQuery.isRefetching} />
      </GridItem>
      <GridItem overflow="hidden" boxShadow="base" rounded="md" rowSpan={2} colSpan={5} bg={bg}>
        <GiftHistoryChart
          data={bonusesQuery.data ?? []}
          error={bonusesQuery.error}
          isLoading={bonusesQuery.isLoading}
          isRefetching={bonusesQuery.isRefetching}
        />
      </GridItem>
    </Grid>
  );
};

export default Main;
