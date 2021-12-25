import { Stack, HStack, StackDivider, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import { StarIcon, ExternalLinkIcon, CalendarIcon, RepeatClockIcon } from '@chakra-ui/icons';
import { getPayoutFromGifts } from 'renderer/wealthsimple/transformers';
import { StatsHeaderProps, ResultType } from 'main/typings';
import formatPayout from 'renderer/utils/formatPayout';
import StatsCard from './StatsCard';
import Result from './Result';

const SkeletonStats = () => {
  return (
    <Stack mx="auto" spacing="3">
      <Skeleton height="4" />
      <HStack spacing="3">
        <SkeletonCircle size="10" />
        <Skeleton height="12" width="8rem" />
      </HStack>
    </Stack>
  );
};

const StatsHeader = ({ data, error, isLoading, isRefetching }: StatsHeaderProps) => {
  if (isLoading || isRefetching) {
    return (
      <Stack spacing="8" justify="space-between" direction="row" flexWrap="wrap" w="100%" divider={<StackDivider />}>
        <SkeletonStats />
        <SkeletonStats />
        <SkeletonStats />
        <SkeletonStats />
      </Stack>
    );
  }

  if (error) {
    return <Result type={ResultType.ERROR} headline="Error fetching stats information" message="Try again later" />;
  }

  if (!data) {
    return <Result type={ResultType.INFO} headline="No stats information" message="Try again later" />;
  }

  const payoutSinceEpoch = getPayoutFromGifts(data, new Date(-8640000000000000));
  const payoutSinceMidnight = getPayoutFromGifts(data);

  return (
    <Stack spacing="2" alignItems="center" justify="space-between" direction="row" w="100%" divider={<StackDivider />}>
      <StatsCard accentColor="green.500" icon={<StarIcon />} data={{ label: 'Total earnings', value: formatPayout(payoutSinceEpoch.payout) }} />
      <StatsCard accentColor="orange.500" icon={<RepeatClockIcon />} data={{ label: "Today's earnings", value: formatPayout(payoutSinceMidnight.payout) }} />
      <StatsCard accentColor="cyan.500" icon={<ExternalLinkIcon />} data={{ label: 'Total gifts', value: payoutSinceEpoch.numGifts }} />
      <StatsCard accentColor="red.500" icon={<CalendarIcon />} data={{ label: "Today's gifts", value: payoutSinceMidnight.numGifts }} />
    </Stack>
  );
};

export default StatsHeader;
