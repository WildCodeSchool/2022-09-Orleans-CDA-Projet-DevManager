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
  Divider,
} from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { ArrowDownIcon } from '@chakra-ui/icons';
import ModalResources from './popups/ModalResources';
import DrawerResources from './popups/DrawerResources';
import { useParams } from 'react-router-dom';
import GameContext from '../contexts/GameContext';

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

  const { label } = useParams();
  const {
    gameResourcesChar,
    setGameResourcesChar,
    gameRoom,
    setGameRoom,
    setGameCharacters,
    setGameEvents,
    setGameResources,
    setResourcesUsed,
    setResourcesProduced,
    setGameRooms,
    gameResources,
  } = useContext(GameContext);

  useEffect(() => {
    const abortController = new AbortController();
    const handleRoom = async () => {
      try {
        const res = await fetch(`/api/game-rooms/by-label/${label}`, {
          method: 'GET',
          signal: abortController.signal,
        });
        const jsonResponse = await res.json();
        setGameRoom(jsonResponse);
      } catch {}
    };
    handleRoom();

    const interval = setInterval(() => {
      handleRoom();
    }, 3000);

    return () => {
      abortController.abort();
      clearInterval(interval);
    };
  }, [label]);

  useEffect(() => {
    const abortController = new AbortController();

    const handleRooms = async () => {
      try {
        const res = await fetch('/api/game-rooms', {
          method: 'GET',
          signal: abortController.signal,
        });
        const jsonResponse = await res.json();
        setGameRooms(jsonResponse);
      } catch {}
    };
    handleRooms();

    const handleCharacters = async () => {
      try {
        const res = await fetch(`/api/game-characters`, {
          method: 'GET',
          signal: abortController.signal,
        });
        const jsonResponse = await res.json();
        setGameCharacters(jsonResponse);
      } catch {}
    };
    handleCharacters();

    const handleEvents = async () => {
      try {
        const res = await fetch(`/api/game-events`, {
          method: 'GET',
          signal: abortController.signal,
        });
        const jsonResponse = await res.json();
        setGameEvents(jsonResponse);
      } catch {}
    };
    handleEvents();

    const handleResources = async () => {
      try {
        const res = await fetch(`/api/game-resources`, {
          method: 'GET',
          signal: abortController.signal,
        });
        const jsonResponse = await res.json();
        setGameResources(jsonResponse);
      } catch {}
    };
    handleResources();

    const handleResourcesUsed = async () => {
      try {
        const res = await fetch(`/api/resources-used`, {
          method: 'GET',
          signal: abortController.signal,
        });
        const jsonResponse = await res.json();
        setResourcesUsed(jsonResponse);
      } catch {}
    };

    handleResourcesUsed();

    const handleResourcesProduced = async () => {
      try {
        const res = await fetch(`/api/resources-produced`, {
          method: 'GET',
          signal: abortController.signal,
        });
        const jsonResponse = await res.json();
        setResourcesProduced(jsonResponse);
      } catch {}
    };

    handleResourcesProduced();

    const handleGameResourcesAndCharacters = async () => {
      try {
        const res = await fetch(
          `/api/game-resources/with-resources-used-and-produced`,
          {
            method: 'GET',
            signal: abortController.signal,
          }
        );
        const jsonResponse = await res.json();
        setGameResourcesChar(jsonResponse);
      } catch {}
    };
    handleGameResourcesAndCharacters();

    const interval = setInterval(() => {
      handleGameResourcesAndCharacters();
      handleCharacters();
    }, 3000);

    return () => {
      abortController.abort();
      clearInterval(interval);
    };
  }, []);

  return (
    <Box
      position="absolute"
      top="0"
      py="7px"
      borderBottom={'1px solid grey'}
      borderBottomWidth={'90%'}
      width={'100%'}
    >
      <Flex minWidth="max-content" gap="2" pl="80px">
        {gameRoom ? (
          <>
            <HStack display={{ base: 'none', md: 'flex' }}>
              <Box boxSize="40px">
                <Image
                  src={gameRoom.room.image}
                  placeholder={gameRoom.room.label}
                />
              </Box>
              <Text
                as="b"
                fontSize={{ base: 'xx-small', xl: '3xl' }}
                fontFamily="heading"
                color={`${gameRoom.room.color}.900`}
              >
                {gameRoom.room.name}
              </Text>
            </HStack>
            <Spacer
              display={{ base: 'none', xl: 'flex', lg: 'flex', md: 'flex' }}
            />
            <VStack display={{ base: 'none', md: 'flex' }} pr="2px">
              <Box>{'Remaining'}</Box>
              <HStack color={'red'}>
                <Box>{gameRoom.size}</Box>
                <Box boxSize="30px">
                  <Image src="/area.png" />
                </Box>
              </HStack>
            </VStack>
            <Divider
              orientation="vertical"
              borderColor="black"
              height="65px"
              display={{ base: 'none', md: 'flex' }}
            />
            <VStack display={{ base: 'none', md: 'flex' }}>
              <Box>{'Total'}</Box>
              <HStack>
                <Box>{gameRoom.totalSize}</Box>
                <Box boxSize="30px">
                  <Image src="/area.png" />
                </Box>
              </HStack>
            </VStack>
          </>
        ) : (
          <HStack display={{ base: 'none', md: 'flex' }}>
            <Box boxSize="30px">
              <Image src="/company4.png" placeholder="my_company" />
            </Box>
            <Box>{'My Company'}</Box>
          </HStack>
        )}
        <Spacer display={{ base: 'none', md: 'flex' }} />
        <HStack>
          <Box>
            <HStack>
              <Grid
                gridTemplateColumns={{
                  base: 'repeat(2, 1fr)',
                  xl: 'repeat(5, 1fr)',
                }}
                gap={2}
              >
                {gameResourcesChar.map((gameResource) => (
                  <GridItem
                    key={gameResource.id}
                    bg={gameResource.resource.color}
                    px="10px"
                    py="5px"
                    borderRadius="20px"
                    boxShadow="xl"
                    display={{
                      base:
                        gameResource.resource.order > 2 ? 'none' : 'inherit',
                      xl: 'inherit',
                    }}
                  >
                    <HStack>
                      <Box boxSize="30px">
                        <Image src={gameResource.resource.image} />
                      </Box>
                      <Box> {gameResource.quantity}</Box>
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
            pr="100px"
          >
            <Image src="/more.png" boxSize="30px" />
          </Button>
          <IconButton
            display={{ base: 'none', md: 'flex' }}
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
      <Flex minWidth="max-content" alignItems="center" gap="2" pl="80px">
        {gameRoom ? (
          <>
            <HStack
              display={{ base: 'flex', xl: 'none', lg: 'none', md: 'none' }}
            >
              <Box boxSize="30px">
                <Image
                  src={gameRoom.room.image}
                  placeholder={gameRoom.room.label}
                />
              </Box>
              <Text
                as="b"
                fontSize={{ base: 'xl', xl: '2xl' }}
                fontFamily="heading"
                color={`${gameRoom.room.color}.900`}
              >
                {gameRoom.room.name}
              </Text>
            </HStack>
            <Spacer
              display={{ base: 'flex', xl: 'none', lg: 'none', md: 'none' }}
            />
            <VStack
              display={{ base: 'flex', xl: 'none', lg: 'none', md: 'none' }}
            >
              <Box>{'Remaining'}</Box>
              <HStack>
                <Box>{gameRoom.size}</Box>
                <Box boxSize="30px">
                  <Image src="/area.png" />
                </Box>
              </HStack>
            </VStack>
            <VStack
              display={{ base: 'flex', xl: 'none', lg: 'none', md: 'none' }}
            >
              <Box>{'Total'}</Box>
              <HStack>
                <Box>{gameRoom.totalSize}</Box>
                <Box boxSize="30px">
                  <Image src="/area.png" />
                </Box>
              </HStack>
            </VStack>
          </>
        ) : (
          <HStack py="10px" display={{ base: 'flex', md: 'none', sm: 'flex' }}>
            <Box boxSize="30px">
              <Image src="/company4.png" placeholder="my_company" />
            </Box>
            <Box fontSize="xl">{'My Company'}</Box>
            <Spacer />
          </HStack>
        )}
      </Flex>
      <>
        <ModalResources
          isOpen={isOpenModalResources}
          onClose={onCloseModalResources}
        />
        <DrawerResources
          isOpen={isOpenDrawerResources}
          onClose={onCloseDrawerResources}
        />
      </>
    </Box>
  );
};

export default ResourcesBar;
