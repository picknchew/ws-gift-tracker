import { Stack, StackDivider } from '@chakra-ui/react';
import { StarIcon, ExternalLinkIcon, CalendarIcon } from '@chakra-ui/icons';
import { getPayoutFromGifts } from 'renderer/wealthsimple/transformers';
import { StatsHeaderProps, ResultType } from 'main/typings';
import formatPayout from 'renderer/utils/formatPayout';
import StatsCard from './StatsCard';
import Result from './Result';
import LoadingIndicator from './LoadingIndicator';

const StatsHeader = ({ data, error, isLoading, isRefetching }: StatsHeaderProps) => {
  if (isLoading || isRefetching) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Result type={ResultType.ERROR} headline="Error fetching stats information" message="Try again later" />;
  }

  if (!data) {
    return <Result type={ResultType.INFO} headline="No stats information" message="Try again later" />;
  }

  return (
    <Stack spacing="8" justify="space-between" direction={{ base: 'column', md: 'row' }} divider={<StackDivider />}>
      <StatsCard
        accentColor="green.500"
        icon={<StarIcon />}
        data={{ label: 'Total money made', value: formatPayout(getPayoutFromGifts(data, new Date(-8640000000000000))) }}
      />
      <StatsCard accentColor="green.500" icon={<StarIcon />} data={{ label: "Today's Earnings", value: formatPayout(getPayoutFromGifts(data)) }} />
      <StatsCard accentColor="red.500" icon={<CalendarIcon />} data={{ label: 'Gifts sent today', value: '102' }} />
      <StatsCard accentColor="cyan.500" icon={<ExternalLinkIcon />} data={{ label: 'Total gifts transacted', value: '1032' }} />
    </Stack>
  );
};

export default StatsHeader;
