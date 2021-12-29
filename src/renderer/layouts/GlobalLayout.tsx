import { Box, IconButton, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { HiChevronDoubleLeft } from 'react-icons/hi';
import { useAuth } from 'renderer/hooks/useAuth';
import Sidebar from 'renderer/components/Sidebar';

function GlobalLayout({ children }: { children: React.ReactNode }) {
  const { toggleColorMode } = useColorMode();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isAuth } = useAuth();
  window.chakra.onToggleColorMode(() => toggleColorMode());
  const bg = useColorModeValue('gray.50', 'gray.900');
  return (
    <Box bg={bg} h="100vh" p="4">
      {isAuth ? (
        <>
          <IconButton onClick={onOpen} position="absolute" rounded="0" right="0" top="50%" aria-label="Expand side bar" icon={<HiChevronDoubleLeft />} />
          <Sidebar isOpen={isOpen} onClose={onClose} />
        </>
      ) : null}
      {children}
    </Box>
  );
}

export default GlobalLayout;
