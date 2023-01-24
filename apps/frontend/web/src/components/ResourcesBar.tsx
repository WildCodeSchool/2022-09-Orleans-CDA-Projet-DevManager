import {
  Box,
  Flex,
  HStack,
  Image,
  Spacer,
  VStack,
  Button,
  useDisclosure,
  Text,
  IconButton,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ArrowDownIcon } from '@chakra-ui/icons';
import ModalResources from './ModalResources';
import { GameResource } from '@apps/backend-api';
import DrawerResources from './DrawerResources';

const ResourcesBar = () => {
  const {
    isOpen: isOpenModalResources,
    onOpen: onOpenModalResources,
    onClose: onCloseModalResources,
  } = useDisclosure();
  const {
    isOpen: isOpenDrawerResources,
    onOpen: onOpenDrawerResources,
    onClose: onCloseDrawerResources,
  } = useDisclosure();

  const [resources, setResources] = useState<GameResource[]>([]);

  useEffect(() => {
    const abortController = new AbortController();

    fetch('/api/game-resources', {
      method: 'GET',
      signal: abortController.signal,
    })
      .then((data) => data.json())
      .then((data) => {
        setResources(data);
      });
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <Flex minWidth="max-content" alignItems="center" gap="2" px="80px">
        <HStack display={{ base: 'none', md: 'flex' }}>
          <Box boxSize="30px">
            <Image src="/company4.png" placeholder="my_company" />
          </Box>
          <Box>{'My Company'}</Box>
        </HStack>
        <Spacer display={{ base: 'none', md: 'flex' }} />
        <VStack display={{ base: 'none', md: 'flex' }}>
          <Box>{'Remaining'}</Box>
          <HStack>
            <Box>{'50'}</Box>
            <Box boxSize="30px">
              <Image src="/area.png" />
            </Box>
          </HStack>
        </VStack>
        <VStack display={{ base: 'none', md: 'flex' }}>
          <Box>{'Total'}</Box>
          <HStack>
            <Box>{'110'}</Box>
            <Box boxSize="30px">
              <Image src="/area.png" />
            </Box>
          </HStack>
        </VStack>
        <Spacer display={{ base: 'none', md: 'flex' }} />
        <HStack>
          <Box>
            <HStack>
              <Grid templateColumns="repeat(5, 1fr)" gap={2}>
                {resources.map((resource) => (
                  <GridItem
                    key={resource.id}
                    bg={resource.resource.color}
                    px="10px"
                    py="5px"
                    borderRadius="20px"
                    boxShadow="xl"
                  >
                    <HStack>
                      <Box boxSize="30px">
                        <Image src={resource.resource.image} />
                      </Box>
                      <Box> {resource.quantity}</Box>
                    </HStack>
                  </GridItem>
                ))}
              </Grid>
            </HStack>
          </Box>
          <Button
            display={{ base: 'none', md: 'flex' }}
            colorScheme="white"
            onClick={onOpenModalResources}
          >
            <Image src="/more.png" boxSize="30px" />
          </Button>
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            size="md"
            aria-label="Resources"
            icon={<ArrowDownIcon />}
            rounded="100px"
            bg="white"
            border="1px"
            borderColor="black"
            boxShadow="inner"
            onClick={onOpenDrawerResources}
          />
        </HStack>
      </Flex>
      <Flex minWidth="max-content" alignItems="center" gap="2" px="80px">
        <HStack py="10px" display={{ base: 'flex', md: 'none', sm: 'flex' }}>
          <Box boxSize="30px">
            <Image src="/company4.png" placeholder="my_company" />
          </Box>
          <Box fontSize="xl">{'My Company'}</Box>
          <Spacer />
          <Box bgColor="gray.200" rounded="5px" p="5px">
            <HStack>
              <Box boxSize="30px">
                <Image src="/area.png" />
              </Box>
              <Text>{'50'}</Text>
            </HStack>
          </Box>
        </HStack>
      </Flex>
      <ModalResources
        isOpen={isOpenModalResources}
        onClose={onCloseModalResources}
        resources={resources}
      />
      <DrawerResources
        isOpen={isOpenDrawerResources}
        onClose={onCloseDrawerResources}
        resources={resources}
      />
    </>
  );
};

export default ResourcesBar;
