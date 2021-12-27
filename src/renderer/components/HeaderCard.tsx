import { HeaderCardProps } from 'main/typings';
import { Box, Flex, Heading, Spacer } from '@chakra-ui/react';

const HeaderCard = ({ header, children }: HeaderCardProps) => {
  return (
    <Flex height="100%" width="100%" direction="column">
      <Box>
        <Heading p={2} color="gray.500" size="xs">
          {header}
        </Heading>
      </Box>

      <Box flex="1">{children}</Box>
    </Flex>
  );
};

export default HeaderCard;
