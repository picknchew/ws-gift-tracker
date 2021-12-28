import { Stack, StackDivider, Icon } from '@chakra-ui/react';
import { FaDollarSign, FaGift } from 'react-icons/fa';
import { getPayoutFromGifts } from 'renderer/wealthsimple/transformers';
import { StatsHeaderProps, ResultType } from 'main/typings';
import formatPayout from 'renderer/utils/formatPayout';
import StatsCard from './StatsCard';
import Result from './Result';

const StatsHeader = ({ data, error, isLoading, isRefetching }: StatsHeaderProps) => {
  if (error) {
    return <Result type={ResultType.Error} headline="Error fetching stats information" message="Try again later" />;
  }

  if (!data) {
    return <Result type={ResultType.Info} headline="No stats information" message="Try again later" />;
  }

  const payoutSinceEpoch = getPayoutFromGifts(data, new Date(-8640000000000000));
  const payoutSinceMidnight = getPayoutFromGifts(data);

  return (
    <Stack
      spacing="4"
      px="4"
      alignItems="center"
      justify="space-between"
      direction="row"
      w="100%"
      divider={<StackDivider />}
      overflowX="auto"
      overflowY="hidden"
    >
      <StatsCard
        accentColor="green.500"
        icon={<Icon as={FaDollarSign} />}
        data={{ label: 'Total earnings', value: formatPayout(payoutSinceEpoch.payout) }}
        isLoading={isLoading || isRefetching}
      />
      <StatsCard
        accentColor="yellow.500"
        icon={<Icon as={FaDollarSign} />}
        data={{ label: "Today's earnings", value: formatPayout(payoutSinceMidnight.payout) }}
        isLoading={isLoading || isRefetching}
      />
      <StatsCard
        accentColor="green.500"
        icon={<Icon as={FaGift} />}
        data={{ label: 'Total gifts', value: payoutSinceEpoch.numGifts }}
        isLoading={isLoading || isRefetching}
      />
      <StatsCard
        accentColor="yellow.500"
        icon={<Icon as={FaGift} />}
        data={{ label: "Today's gifts", value: payoutSinceMidnight.numGifts }}
        isLoading={isLoading || isRefetching}
      />
    </Stack>
  );
};

export default StatsHeader;
