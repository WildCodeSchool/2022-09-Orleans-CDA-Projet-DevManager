import { useContext } from 'react';
import {
  Badge,
  Button,
  HStack,
  Flex,
  Image,
  useDisclosure,
  Text,
  useToast,
} from '@chakra-ui/react';
import { GameCharacter, GameEvent } from '@apps/backend-api';
import CharacterModal from './popups/CharacterModal';
import BadgeResource from './BadgeResource';
import EventModal from './popups/EventModal';
import GameContext from '../contexts/GameContext';

function RoomElementCard({
  gameCharacter,
  gameEvent,
}: {
  gameCharacter?: GameCharacter;
  gameEvent?: GameEvent;
}) {
  const { gameRoom } = useContext(GameContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const id = 'toast';

  const addCharacters = async () => {
    try {
      const res = await fetch(
        `/api/game-characters/add-by-id/${gameCharacter?.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            quantity: unit,
          }),
        }
      );
      const jsonResponse = await res.json();
      if (!jsonResponse.success) {
        toast({
          title: 'Resource Used',
          description: `You don't have any resources or space in your ${gameRoom?.room.name}!`,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    } catch {}
  };

  const upTotalSize = async () => {
    try {
      const res = await fetch(`/api/game-rooms/up-total-size/${gameRoom?.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalSize: unit,
        }),
      });
      const jsonResponse = await res.json();
      if (!jsonResponse.success) {
        toast({
          title: `Up ${gameRoom?.room.name} total size`,
          description: `You don't have enough devDollars!`,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    } catch {}
  };

  const name = gameCharacter
    ? gameCharacter?.character.name
    : gameEvent
    ? gameEvent?.event.name
    : 'More Area';
  const image = gameCharacter
    ? gameCharacter?.character.image
    : gameEvent
    ? gameEvent?.event.image
    : '/more_area.png';
  const price = gameCharacter
    ? gameCharacter?.character.price
    : gameEvent
    ? gameEvent?.event.price
    : gameRoom?.room.price;
  const quantity = gameCharacter?.quantity;
  const unit = gameCharacter ? 1 : gameEvent ? 1 : 10;
  const size = gameCharacter?.character.size;
  const resourcesProduced = gameCharacter?.character.resourcesProduced;
  const resourcesUsed = gameCharacter?.character.resourcesUsed;
  const bonusMalus = gameEvent?.event.bonusMalus;
  const action = gameCharacter ? addCharacters : upTotalSize;

  return (
    <>
      <Flex
        overflow="hidden"
        bgColor={`${gameRoom?.room.color}.500`}
        h="5rem"
        w="100%"
        my="0.5rem"
        borderRadius={{ base: '0', sm: '0 0.5rem 0.5rem 0' }}
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          h="5rem"
          w="5rem"
          borderRadius="0 0.5rem 0.5rem 0"
          bgColor={`${gameRoom?.room.color}.900`}
          onClick={onOpen}
          cursor="pointer"
        >
          <Image w="3.5rem" src={image} alt={name} />
        </Flex>

        <Flex
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          w="calc(100% - 1rem)"
          p="1rem"
        >
          <Flex flexDir="column" w="100%">
            <Flex w="100%" justifyContent="space-between">
              <Flex flexDir="row" alignItems="center" justifyContent="center">
                <Text whiteSpace="nowrap" fontWeight="black" fontSize="1.2rem">
                  {name}
                </Text>
                {quantity ? <Text ml="0.3rem">{`(${quantity})`}</Text> : null}
              </Flex>

              <Badge fontSize="xl" borderRadius="full" bgColor="gold.200">
                <Flex align="center">
                  <Image src="/dollar.png" alt="dollar" boxSize="30px" p="1" />
                  {price}
                </Flex>
              </Badge>
            </Flex>
            <Flex w="100%" justifyContent="space-between">
              {resourcesProduced && resourcesUsed && (
                <>
                  <HStack>
                    {resourcesProduced.map((resourceProduced) => (
                      <BadgeResource
                        key={resourceProduced.id}
                        color={'green.900'}
                        image={resourceProduced.resource.image}
                        alt={resourceProduced.resource.name}
                        text={resourceProduced.quantity}
                      />
                    ))}
                    {resourcesUsed.map((resourceUsed) => (
                      <BadgeResource
                        key={resourceUsed.id}
                        color={'red.900'}
                        image={resourceUsed.resource.image}
                        alt={resourceUsed.resource.name}
                        text={resourceUsed.quantity}
                      />
                    ))}
                  </HStack>

                  <Flex alignItems="center" justifyContent="center">
                    <Text>{size}</Text>
                    <Image h="1.5rem" w="1.5rem" ml="0.3rem" src="/area.png" />
                  </Flex>
                </>
              )}

              {bonusMalus && (
                <HStack>
                  {bonusMalus.map((bonMal) => (
                    <BadgeResource
                      key={bonMal.id}
                      color={bonMal.isBonus ? `green.900` : `red.900`}
                      image={bonMal.character.image}
                      alt={bonMal.label}
                      text={bonMal.name}
                    />
                  ))}
                </HStack>
              )}
            </Flex>
          </Flex>
          <Button
            bgColor={
              gameRoom?.totalSize === 0
                ? '#cbd5e0'
                : `${gameRoom?.room.color}.900`
            }
            boxShadow="2xl"
            w="3rem"
            h="100%"
            color="white"
            ml="0.5rem"
            onClick={gameRoom?.totalSize === 0 ? undefined : action}
            cursor={gameRoom?.totalSize === 0 ? 'not-allowed' : 'pointer'}
          >
            {gameRoom?.totalSize === 0 ? (
              <Image src="/lock.svg" />
            ) : (
              `+ ${unit}`
            )}
          </Button>
        </Flex>
      </Flex>

      <CharacterModal
        isOpen={isOpen}
        onClose={onClose}
        gameCharacter={gameCharacter}
        resourcesUsed={resourcesUsed}
        resourcesProduced={resourcesProduced}
      />

      <EventModal
        isOpen={isOpen}
        onClose={onClose}
        gameEvent={gameEvent}
        bonusMalus={bonusMalus}
      />
    </>
  );
}

export default RoomElementCard;
