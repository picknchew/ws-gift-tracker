import { HeaderCardProps } from 'main/typings';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

const HeaderCard = ({ header, children, alignedRight }: HeaderCardProps) => {
  const color = useColorModeValue('gray.600', 'gray.400');

  return (
    <Flex height="100%" width="100%" direction="column">
      <Flex width="100%" justifyContent="space-between">
        <Text fontWeight="medium" pt="2" pb="2" pl="2" color={color}>
          {header}
        </Text>

        {alignedRight}
      </Flex>

      <Box flex="1">{children}</Box>
    </Flex>
  );
};

export default HeaderCard;
