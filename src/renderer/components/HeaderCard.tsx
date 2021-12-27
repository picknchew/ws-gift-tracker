import { HeaderCardProps } from 'main/typings';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

const HeaderCard = ({ header, children }: HeaderCardProps) => {
  const color = useColorModeValue('gray.600', 'gray.400');

  return (
    <Flex height="100%" width="100%" direction="column">
      <Text fontWeight="medium" pt="4" pl="4" color={color}>
        {header}
      </Text>

      <Box flex="1">{children}</Box>
    </Flex>
  );
};

export default HeaderCard;
