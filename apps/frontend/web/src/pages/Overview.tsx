import { useState } from 'react';
import {
  Box,
  Image,
  Text,
  Button,
  HStack,
  VStack,
  Center,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import NavbarRooms from '../components/NavbarRooms';
import ResourcesBar from '../components/ResourcesBar';

const Overview = () => {
  const [shouldShowCheck, setShouldShowCheck] = useState(true);

  const handleGetCheck = async () => {
    const data = {
      gameId: 1,
      resourceId: 1,
    };

    try {
      const rawResponse = await fetch('/api/game-resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const jsonResponse = await rawResponse.json();

      if (rawResponse.ok) {
        if (jsonResponse.status === 'ok') {
          setShouldShowCheck(false);
        } else {
          if (jsonResponse.errorResource) {
            console.error(jsonResponse.errorResource);
          }
          if (jsonResponse.errorGame) {
            console.error(jsonResponse.errorGame);
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <ResourcesBar />
      <Navbar />
      <NavbarRooms />
      <Center>
        <Box
          display="flex"
          flexDir="column"
          alignItems="center"
          maxW="550px"
          mt="300"
        >
          <HStack>
            <VStack>
              <Text fontSize="xl">{'Overview'}</Text>
              {shouldShowCheck ? (
                <Box>
                  <Text textAlign="center" m="1rem 0">
                    {
                      'Cheer! You have just launched your digital services business! The mayor of the city offers you $ 1,000 aid to set up in his municipality. Accept the money and start the adventure!'
                    }
                  </Text>
                  <Button
                    colorScheme="teal"
                    size="lg"
                    onClick={handleGetCheck}
                    display="flex"
                    flexDir="column"
                  >
                    <Text>{'Take the check'}</Text>
                    <Text>{'+ $1,000'}</Text>
                  </Button>
                </Box>
              ) : (
                <Image src="/overview.jpg" />
              )}
            </VStack>
          </HStack>
        </Box>
      </Center>
    </>
  );
};

export default Overview;
