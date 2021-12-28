import {
  Button,
  Heading,
  Text,
  HStack,
  VStack,
  Flex,
  Badge,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { MdRefresh } from 'react-icons/md';
import { APP_VERSION, ResultType } from 'main/typings';
import formatPayout from 'renderer/utils/formatPayout';
import UserCard from './UserCard';
import Result from './Result';
import LoadingIndicator from './LoadingIndicator';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

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

  const closeButtonBg = useColorModeValue('blue.500', 'blue.300');
  const drawerBg = useColorModeValue('white', 'gray.800');
  const appNameColor = useColorModeValue('blue.600', 'blue.400');
  const subtextColor = useColorModeValue('gray.600', 'gray.400');

  if (isLoading || isRefetching) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Result type={ResultType.Error} headline="Error fetching gift information" message="Couldn't get your gifts, try again." />;
  }

  if (!data) {
    return <Result type={ResultType.Info} headline="No gift information" message="Couldn't find any gift information!" />;
  }

  return (
    <Drawer placement="right" isOpen={isOpen} blockScrollOnMount={false} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg={drawerBg} shadow="none" position="relative">
        <Flex direction="column" borderLeftWidth="1px" width="full" height="full" bg="inherit" border="0">
          <VStack flex="1" alignItems="flex-start" p="4">
            <HStack height="fit-content" borderBottomWidth="1px" pb="2">
              <Heading size="lg" color={appNameColor}>
                Wealthsimple Gift Tracker
              </Heading>
              <Badge fontSize="lg">{APP_VERSION}</Badge>
            </HStack>
            <VStack alignItems="flex-start" spacing="0">
              <Text size="sm" color={subtextColor}>
                Available funds
              </Text>
              <Heading>{formatPayout(data.accounts[0]?.cashAccount.spendingBalance)}</Heading>
            </VStack>
          </VStack>
          <UserCard
            handle={data.p2pProfile.handle}
            name={data.p2pProfile.name}
            color={data.p2pProfile.color}
            image={data.p2pProfile.imageUrl}
            email={data.profile.email}
          />
        </Flex>
        <DrawerCloseButton position="absolute" rounded="0" bg={closeButtonBg} color="white" left="-8" top="0" />
        <Button leftIcon={<MdRefresh />} isLoading={isLoading || isRefetching} onClick={() => refetch()}>
          Refetch user data
        </Button>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
