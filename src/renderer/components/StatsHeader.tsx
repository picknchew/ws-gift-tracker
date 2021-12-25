import { Stack, StackDivider } from '@chakra-ui/react';
import { StarIcon, ExternalLinkIcon, CalendarIcon } from '@chakra-ui/icons';
import StatsCard from './StatsCard';

const StatsHeader = () => {
  return (
    <Stack spacing="8" justify="space-between" direction={{ base: 'column', md: 'row' }} divider={<StackDivider />}>
      <StatsCard accentColor="green.500" icon={<StarIcon />} data={{ label: 'Total money made', value: '$592.50' }} />
      <StatsCard accentColor="red.500" icon={<CalendarIcon />} data={{ label: 'Gifts sent today', value: '102' }} />
      <StatsCard accentColor="cyan.500" icon={<ExternalLinkIcon />} data={{ label: 'Total gifts transacted', value: '1032' }} />
    </Stack>
  );
};

export default StatsHeader;
