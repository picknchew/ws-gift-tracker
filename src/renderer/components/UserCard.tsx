import { Avatar, Flex, HStack, Text, Badge, useColorModeValue } from '@chakra-ui/react';

export interface UserCardProps {
  handle: string;
  name?: string | null;
  color: string;
  image?: string | null;
  email: string;
}

const UserCard = (props: UserCardProps) => {
  const { handle, name, color, image, email } = props;
  const subtextColor = useColorModeValue('gray.600', 'gray.400');
  return (
    <HStack spacing="4" px="2" flexShrink={0} borderTopWidth="1px" p="4">
      <Avatar size="sm" bg={color} name={handle} src={image ?? undefined} />
      <Flex direction="column" fontWeight="medium">
        <HStack>
          <Text>${handle}</Text>
          {name ? (
            <Badge fontSize="sm" fontWeight="normal" textTransform="unset">
              {name}
            </Badge>
          ) : null}
        </HStack>
        <Text fontSize="xs" lineHeight="shorter" color={subtextColor}>
          {email}
        </Text>
      </Flex>
    </HStack>
  );
};

export default UserCard;
