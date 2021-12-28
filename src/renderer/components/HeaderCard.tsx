import { HeaderCardProps } from 'main/typings';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import LoadingIndicator from './LoadingIndicator';

const HeaderCard = ({ header, children, alignedRight, isLoading }: HeaderCardProps) => {
  const color = useColorModeValue('gray.600', 'gray.400');

  return (
    <Flex height="100%" width="100%" direction="column">
      <Flex width="100%" pt="2" px="2" justifyContent="space-between">
        <Text fontWeight="medium" color={color}>
          {header}
        </Text>

        {alignedRight}
      </Flex>

      {isLoading ? <LoadingIndicator /> : <Box flex="1">{children}</Box>}
    </Flex>
  );
};

export default HeaderCard;
