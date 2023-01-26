import Navbar from '../components/Navbar';
import NavbarRooms from '../components/NavbarRooms';
import ResourcesBar from '../components/ResourcesBar';
import { Box, Flex, VStack, Image } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Room, GameCharacter, GameEvent } from '@apps/backend-api';
import { useParams } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';
import EventCard from '../components/EventCard';

const RoomPage = () => {
  const [characters, setCharacters] = useState<GameCharacter[]>([]);
  const [thisRoom, setThisRoom] = useState<Room>();
  const [gameEvents, setGameEvents] = useState<GameEvent[]>([]);

  const { label } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    const handleRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/by-label/${label}`, {
          method: 'GET',
          signal: abortController.signal,
        });
        const jsonResponse = await res.json();
        setThisRoom(jsonResponse[0]);
      } catch (e) {
        console.log('error handleRoom : ' + e);
      }
    };
    handleRoom();

    const handleCharacters = async () => {
      try {
        const res = await fetch(`/api/game-characters`, {
          method: 'GET',
          signal: abortController.signal,
        });
        const jsonResponse = await res.json();
        setCharacters(jsonResponse);
      } catch (e) {
        console.log('error handleCharacters : ' + e);
      }
    };
    handleCharacters();

    const handleGameEvents = async () => {
      try {
        const res = await fetch(`/api/game-events`, {
          method: 'GET',
          signal: abortController.signal,
        });
        const jsonResponse = await res.json();
        setGameEvents(jsonResponse);
      } catch (e) {
        console.log('error handleGameEvents : ' + e);
      }
    };
    handleGameEvents();

    return () => {
      abortController.abort();
    };
  }, [label]);

  return (
    <Box>
      <ResourcesBar />
      <Flex pr="80px" justifyContent="space-between">
        <Navbar />
        <NavbarRooms />
        <Box boxSize="50%" display={{ base: 'column', sm: 'none' }}>
          <Image src="/overview.jpg" alt="overview" />
        </Box>
        {thisRoom && gameEvents ? (
          <>
            <Box bgColor={`${thisRoom.color}.200`} p="50px">
              <VStack>
                {characters
                  .filter(
                    (gameCharacter) =>
                      thisRoom.id === gameCharacter.character.room.id
                  )
                  .map((gameCharacter) => (
                    <CharacterCard
                      key={gameCharacter.character.id}
                      gameCharacter={gameCharacter}
                      room={thisRoom}
                    />
                  ))}
                {gameEvents
                  .filter(
                    (gameEvent) => thisRoom.id === gameEvent.event.room.id
                  )
                  .map((gameEvent) => (
                    <EventCard
                      key={gameEvent.id}
                      gameEvent={gameEvent}
                      room={thisRoom}
                    />
                  ))}
              </VStack>
            </Box>
          </>
        ) : (
          <Box></Box>
        )}
      </Flex>
    </Box>
  );
};

export default RoomPage;
