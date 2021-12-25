import { Box, Circle, Heading, HStack, Stack } from '@chakra-ui/react';
import { StatsCardProps } from 'main/typings';

const StatsCard = (props: StatsCardProps) => {
  const { accentColor, icon, data } = props;
  const { label, value } = data;

  return (
    <Stack mx="auto" spacing="3">
      <Box color="gray.600" fontWeight="medium">
        {label}
      </Box>
      <HStack spacing="3">
        <Circle flexShrink={0} size="6" bg={accentColor} color="white">
          {icon}
        </Circle>
        <Heading as="h1" size="xl" fontWeight="bold">
          {value}
        </Heading>
      </HStack>
    </Stack>
  );
};

export default StatsCard;
