import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Text,
  HStack,
} from '@chakra-ui/react';
import { ResourceUsed, ResourceProduced } from '@apps/backend-api';

function BadgeResource({
  color,
  image,
  alt,
  text,
}: {
  color: string;
  image: string;
  alt: string;
  text: string | number;
}) {
  return (
    <Badge borderRadius="5px" px="2" bgColor={color}>
      <Flex align="center">
        <Image src={image} alt={alt} boxSize="30px" p="1" />
        <Text>{text}</Text>
      </Flex>
    </Badge>
  );
}

export default BadgeResource;