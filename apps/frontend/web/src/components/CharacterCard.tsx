import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Flex,
  Heading,
  Image,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import {
  GameCharacter,
  Room,
  ResourceUsed,
  ResourceProduced,
} from '@apps/backend-api';
import { useState, useEffect } from 'react';
import CharacterModal from './popups/CharacterModal';
import BadgeResource from './BadgeResource';

function CharacterCard({
  gameCharacter,
  room,
  quantityAddCharacters,
}: {
  gameCharacter: GameCharacter;
  room: Room;
  quantityAddCharacters: number;
}) {
  const [resourcesUsed, setResourcesUsed] = useState<ResourceUsed[]>([]);
  const [resourcesProduced, setResourcesProduced] = useState<
    ResourceProduced[]
  >([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const newQuantity = () => {
    return (gameCharacter.quantity += quantityAddCharacters);
  };

  const addCharacter = async () => {
    const data = {
      id: gameCharacter.id,
      quantity: gameCharacter.quantity + 1,
    };

    try {
      const rawResponse = await fetch(
        `/api/game-characters/${gameCharacter.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity: newQuantity() }),
        }
      );
    } catch (err) {}
  };

  useEffect(() => {
    const abortController = new AbortController();

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

    handleResourcesUsed();
    handleResourcesProduced();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow="hidden"
        bg={`${room.color}.500`}
        w="100%"
      >
        <Box
          borderRightRadius="10px"
          boxSize="10%"
          bg={`${room.color}.900`}
          shadow="2xl"
          onClick={onOpen}
        >
          <Image
            m="auto"
            mt="2.5"
            src={gameCharacter.character.image}
            alt={gameCharacter.character.name}
          />
        </Box>

        <CardBody>
          <Flex alignItems="center" w="full" justifyContent="space-between">
            <Box>
              <HStack>
                <Heading size="md" mt="1">
                  {gameCharacter.character.name}
                </Heading>
                <Text>{gameCharacter.quantity}</Text>
              </HStack>
              {resourcesUsed && resourcesProduced && (
                <HStack>
                  {resourcesProduced
                    .filter(
                      (resourceProduced) =>
                        resourceProduced.character.id ===
                        gameCharacter.character.id
                    )
                    .map((resourceProduced) => (
                      <BadgeResource
                        key={resourceProduced.id}
                        color={'green.900'}
                        image={resourceProduced.resource.image}
                        alt={resourceProduced.resource.name}
                        text={resourceProduced.quantity}
                      />
                    ))}

                  {resourcesUsed
                    .filter(
                      (resourceUsed) =>
                        resourceUsed.character.id === gameCharacter.character.id
                    )
                    .map((resourceUsed) => (
                      <BadgeResource
                        key={resourceUsed.id}
                        color={'red.900'}
                        image={resourceUsed.resource.image}
                        alt={resourceUsed.resource.name}
                        text={resourceUsed.quantity}
                      />
                    ))}
                </HStack>
              )}
            </Box>
            <Box>
              <HStack>
                <Text>{gameCharacter.character.size}</Text>
                <Box boxSize="20px">
                  <Image src="/area.png" />
                </Box>
              </HStack>
            </Box>
            <Box>
              <Badge fontSize="xl" borderRadius="full" bgColor="gold.200">
                <Flex align="center">
                  <Image src="/dollar.png" alt="dollar" boxSize="30px" p="1" />
                  {gameCharacter.character.price}
                </Flex>
              </Badge>
              <Button
                bg={`${room.color}.900`}
                boxShadow="2xl"
                size="lg"
                color="white"
                ml="5"
                onClick={addCharacter}
              >
                {`+ ${quantityAddCharacters}`}
              </Button>
            </Box>
          </Flex>
        </CardBody>
      </Card>
      <CharacterModal
        isOpen={isOpen}
        onClose={onClose}
        gameCharacter={gameCharacter}
        resourcesUsed={resourcesUsed}
        resourcesProduced={resourcesProduced}
      />
    </>
  );
}

export default CharacterCard;
