import { Box } from '@chakra-ui/react';

function GlobalLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box bg="gray.50" h="100vh" p="4">
      {children}
    </Box>
  );
}

export default GlobalLayout;
