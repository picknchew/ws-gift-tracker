import { HeaderCardProps } from 'main/typings';
import { Box, Flex, Heading, Spacer, Text } from '@chakra-ui/react';

const HeaderCard = ({ header, children }: HeaderCardProps) => {
  return (
    <Flex height="100%" width="100%" direction="column">
      <Heading fontFamily="monospace" textTransform="uppercase" p={2} color="gray.600" size="xs">
        {header}
      </Heading>

      <Box flex="1">{children}</Box>
    </Flex>
  );
};

export default HeaderCard;
