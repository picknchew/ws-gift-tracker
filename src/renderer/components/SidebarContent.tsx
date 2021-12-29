import { Button, Heading, Text, HStack, VStack, Flex, Badge, DrawerCloseButton, useColorModeValue } from '@chakra-ui/react';
import { MdRefresh } from 'react-icons/md';
import { APP_VERSION, ResultType, SidebarContentProps } from 'main/typings';
import formatPayout from 'renderer/utils/formatPayout';
import UserCard from './UserCard';
import Result from './Result';
import LoadingIndicator from './LoadingIndicator';

const SidebarContentWrapper = ({ data, error, isLoading, children }: Omit<SidebarContentProps, 'isRefetching' | 'refetch'> & { children: JSX.Element }) => {
  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Result type={ResultType.Error} headline="Error fetching user information" message="Couldn't get user data, try again." />;
  }

  if (!data) {
    return <Result type={ResultType.Info} headline="No user information" message="Couldn't find any information about your account!" />;
  }

  return children;
};

const SidebarContent = ({ data, error, isLoading, isRefetching, refetch }: SidebarContentProps) => {
  const closeButtonBg = useColorModeValue('blue.500', 'blue.300');
  const appNameColor = useColorModeValue('blue.600', 'blue.400');
  const subtextColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <>
      <Flex direction="column" borderLeftWidth="1px" width="full" height="full" bg="inherit" border="0">
        <VStack flex="1" alignItems="flex-start" p="4">
          <HStack height="fit-content" borderBottomWidth="1px" pb="2">
            <Heading size="lg" color={appNameColor}>
              Wealthsimple Gift Tracker
            </Heading>
            <Badge fontSize="lg">{APP_VERSION}</Badge>
          </HStack>
          <SidebarContentWrapper isLoading={isLoading || isRefetching} data={data} error={error}>
            <VStack alignItems="flex-start" spacing="0">
              <Text size="sm" color={subtextColor}>
                Available funds
              </Text>
              <Heading>{formatPayout(data?.accounts[0]?.cashAccount.spendingBalance)}</Heading>
            </VStack>
          </SidebarContentWrapper>
        </VStack>
        {error || !data ? null : (
          <UserCard
            handle={data.p2pProfile.handle}
            name={data.p2pProfile.name}
            color={data.p2pProfile.color}
            image={data.p2pProfile.imageUrl}
            email={data.profile.email}
          />
        )}
      </Flex>
      <DrawerCloseButton position="absolute" rounded="0" bg={closeButtonBg} color="white" left="-8" top="0" />
      <Button leftIcon={<MdRefresh />} isLoading={isLoading || isRefetching} onClick={() => refetch()}>
        Refetch user data
      </Button>
    </>
  );
};

export default SidebarContent;
