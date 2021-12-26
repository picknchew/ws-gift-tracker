import { Text, Circle, Heading, HStack, Stack } from '@chakra-ui/react';
import { StatsCardProps } from 'main/typings';

const StatsCard = (props: StatsCardProps) => {
  const { accentColor, icon, data } = props;
  const { label, value } = data;

  return (
    <Stack mx="auto" spacing="3">
      <Text color="gray.600" fontWeight="medium" whiteSpace="nowrap">
        {label}
      </Text>
      <HStack spacing="3">
        <Circle flexShrink={0} size="8" bg={accentColor} color="white">
          {icon}
        </Circle>
        <Heading as="h1" size="xl" fontWeight="bold" whiteSpace="nowrap">
          {value}
        </Heading>
      </HStack>
    </Stack>
  );
};

export default StatsCard;
