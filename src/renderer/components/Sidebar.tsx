import { Drawer, DrawerContent, DrawerOverlay, useColorModeValue } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { SidebarProps } from 'main/typings';
import SidebarContent from './SidebarContent';

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { data, error, isLoading, isRefetching, refetch } = useQuery(
    'queryDashboard',
    async () => {
      const res = await window.wealthsimple.queryDashboard();
      return res.data.client;
    },
    { enabled: false }
  );

  // fetch data the first time Sidebar opens
  // this should only run once
  useEffect(() => {
    if (isOpen && !data) {
      refetch();
    }
  }, [isOpen, data, refetch]);

  const drawerBg = useColorModeValue('white', 'gray.800');

  return (
    <Drawer placement="right" isOpen={isOpen} blockScrollOnMount={false} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg={drawerBg} shadow="none" position="relative">
        <SidebarContent data={data} error={error} isLoading={isLoading} isRefetching={isRefetching} refetch={refetch} />
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
