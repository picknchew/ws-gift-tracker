import { Box, useColorMode, useColorModeValue } from '@chakra-ui/react';

function GlobalLayout({ children }: { children: React.ReactNode }) {
  const { toggleColorMode } = useColorMode();
  window.chakra.onToggleColorMode(() => toggleColorMode());
  const bg = useColorModeValue('gray.50', 'gray.900');
  return (
    <Box bg={bg} h="100vh" p="4">
      {children}
    </Box>
  );
}

export default GlobalLayout;
