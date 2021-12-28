import { Text, Circle, Heading, HStack, Stack, Skeleton, useColorModeValue } from '@chakra-ui/react';
import { StatsCardProps } from 'main/typings';

const StatsCard = ({ accentColor, icon, data, isLoading }: StatsCardProps) => {
  const { label, value } = data;

  const color = useColorModeValue('gray.600', 'gray.400');

  return (
    <Stack mx="auto" spacing="3">
      <Text color={color} fontWeight="medium" whiteSpace="nowrap">
        {label}
      </Text>
      <HStack spacing="3">
        <Circle flexShrink={0} size="8" bg={accentColor} color="white">
          {icon}
        </Circle>
        <Skeleton isLoaded={!isLoading}>
          <Heading as="h1" size="xl" fontWeight="bold" whiteSpace="nowrap">
            {value}
          </Heading>
        </Skeleton>
      </HStack>
    </Stack>
  );
};

export default StatsCard;
