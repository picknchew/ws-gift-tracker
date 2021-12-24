import { Box } from '@chakra-ui/react';

function GlobalLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box p={4} h="100vh">
      {children}
    </Box>
  );
}

export default GlobalLayout;
