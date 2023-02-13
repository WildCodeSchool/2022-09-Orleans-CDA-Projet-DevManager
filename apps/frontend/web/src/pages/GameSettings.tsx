import { useContext, useState, useEffect } from 'react';
import {
  Text,
  Flex,
  Image,
  Button,
  VStack,
  useDisclosure,
  Box,
  Heading,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import SlideUpModal from '../components/popups/SlideUpModal';
import GameImageFiller from '../components/GameImageFiller';
import GameDetailsFiller from '../components/GameDetailsFiller';
import ResetGameFiller from '../components/ResetGameFiller';
import Navbar from '../components/Navbar';
import AuthContext from '../contexts/AuthContext';
import { useToast } from '@chakra-ui/react';
import { Game } from '@apps/backend-api';
import { DeepPartial } from '@libs/typings';

const pageColor = 'gold';
const marginTopButton = '1rem';
const displayDesktop = {
  base: 'none',
  xl: 'flex',
  lg: 'none',
  md: 'none',
  sm: 'none',
};
const displayMobile = {
  base: 'flex',
  xl: 'none',
  lg: 'flex',
  md: 'flex',
  sm: 'flex',
};

const GameSettings = () => {
  const { user } = useContext(AuthContext);
  const [gameData, setGameData] = useState<DeepPartial<Game>>({});
  const [pendingGameData, setPendingGameData] = useState<DeepPartial<Game>>({});

  const gameImage = useDisclosure();
  const gameDetails = useDisclosure();
  const resetGame = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const getGameData = async () => {
      if (user) {
        const response = await fetch(`/api/users/${user.id}/games`);
        const jsonResponse = await response.json();
        const data = jsonResponse[0];

        setGameData(data);
        setPendingGameData(data);
      }
    };
    getGameData();
  }, []);

  const deleteGame = async () => {
    try {
      await fetch(`/api/games/${pendingGameData.id}`, {
        method: 'DELETE',
      });
      toast({
        title: 'Game deleted.',
        description: "We're sorry to see you go!",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'There was an error deleting your game.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const updateGameSettings = async () => {
    try {
      const req = await fetch(`/api/games/${pendingGameData.id}`, {
        method: 'PATCH',
        body: JSON.stringify(pendingGameData),
        headers: { 'Content-type': 'application/json' },
      });
      const res = await req.json();

      if (req.ok) {
        setGameData(res);
        toast({
          title: 'Informations updated.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch {}
  };

  return (
    <>
      <Navbar />
      <Flex
        flexDir="column"
        bgColor={{
          base: `${pageColor}.200`,
          xl: 'white',
          lg: `${pageColor}.200`,
          md: `${pageColor}.200`,
          sm: `${pageColor}.200`,
        }}
        minH="100vh"
        alignItems="center"
      >
        <Flex
          flexDir="column"
          alignItems="center"
          py="3rem"
          bgColor="#FFF"
          w="100%"
        >
          <Heading color={`${pageColor}.900`}>{'Game Settings'}</Heading>
        </Flex>
        <Flex w="100%">
          <Flex
            justifyContent="space-around"
            bgColor={{
              base: `${pageColor}.200`,
              xl: 'white',
              lg: `${pageColor}.200`,
              md: `${pageColor}.200`,
              sm: `${pageColor}.200`,
            }}
            flexGrow="1"
            mb={'2rem'}
          >
            <VStack
              bgColor={`${pageColor}.200`}
              boxSize={{ base: 'md', xl: 'xl' }}
              w="auto"
              h="auto"
              p="10"
            >
              <Text display={displayDesktop} as="b" fontSize="xl" mb="5">
                {`Change your informations`}
              </Text>

              <Image
                display={displayMobile}
                w="5.5rem"
                src={`/${gameData?.image?.name}.png`}
                alt={`Image of ${gameData?.image?.description}`}
                mt="2rem"
                mb="1rem"
              />
              <Button
                display={displayMobile}
                onClick={gameImage.onOpen}
                bgColor={`${pageColor}.900`}
                color="#FFF"
                mb={marginTopButton}
                w="8rem"
                fontWeight="normal"
                boxShadow="rgb(0 0 0 / 40%) 0px 3px 5px"
              >
                {'Modify'}
              </Button>

              <Grid templateColumns="repeat(1, 1fr)">
                <GridItem mt={marginTopButton}>
                  <Text as="b">{'Company name :'}</Text>
                </GridItem>
                <GridItem>
                  <Text bgColor="white" rounded="5px" py="1" px="4">
                    {gameData?.companyName}
                  </Text>
                </GridItem>
                <GridItem mt={marginTopButton}>
                  <Text as="b">{'CEO name :'}</Text>
                </GridItem>
                <GridItem>
                  <Text bgColor="white" rounded="5px" py="1" px="4">
                    {gameData?.ceo}
                  </Text>
                </GridItem>
                <GridItem mt={marginTopButton}>
                  <Text as="b">{'Location :'}</Text>
                </GridItem>
                <GridItem>
                  <Text bgColor="white" rounded="5px" py="1" px="4">
                    {gameData?.location}
                  </Text>
                </GridItem>
                <GridItem my={marginTopButton}>
                  <Button
                    onClick={gameDetails.onOpen}
                    boxShadow="rgb(0 0 0 / 40%) 0px 3px 5px"
                    bgColor={`${pageColor}.900`}
                    color="#FFF"
                    w="13rem"
                    fontWeight="normal"
                  >
                    {'Edit game details'}
                  </Button>
                </GridItem>
                <GridItem my={marginTopButton}>
                  <Button
                    onClick={resetGame.onOpen}
                    boxShadow="rgb(0 0 0 / 40%) 0px 3px 5px"
                    mt="2rem"
                    bgColor="pink.900"
                    color="#FFF"
                    w="13rem"
                    fontWeight="normal"
                  >
                    {'Reset the game'}
                  </Button>
                </GridItem>
              </Grid>
            </VStack>

            <Box
              boxShadow="rgb(0 0 0 / 40%) 0px 3px 5px"
              rounded="5px"
              display={displayDesktop}
              p="8vh"
            >
              <VStack>
                <Image
                  display={displayDesktop}
                  w="5.5rem"
                  src={`/${gameData?.image?.name}.png`}
                  alt={`Image of ${gameData?.image?.description}`}
                />
                <GameImageFiller
                  pendingGameData={pendingGameData}
                  setPendingGameData={setPendingGameData}
                />
                <Button
                  ml=".5rem"
                  bgColor={`${pageColor}.900`}
                  color="#FFF"
                  fontWeight="normal"
                  w="7rem"
                  boxShadow="rgb(0 0 0 / 40%) 0px 3px 5px"
                  onClick={() => updateGameSettings()}
                >
                  {'Modify'}
                </Button>
              </VStack>
            </Box>
          </Flex>
        </Flex>
        <SlideUpModal
          isOpen={gameImage.isOpen}
          onClose={() => {
            gameImage.onClose();
            setPendingGameData(gameData);
          }}
          pageColor={pageColor}
          title="Choose a new avatar"
          content={
            <GameImageFiller
              pendingGameData={pendingGameData}
              setPendingGameData={setPendingGameData}
            />
          }
          submitText="Save"
          action={updateGameSettings}
        />
        <SlideUpModal
          isOpen={gameDetails.isOpen}
          onClose={() => {
            gameDetails.onClose();
            setPendingGameData(gameData);
          }}
          pageColor={pageColor}
          title="Edit the game details"
          content={
            <GameDetailsFiller
              pendingGameData={pendingGameData}
              setPendingGameData={setPendingGameData}
            />
          }
          submitText="Save"
          action={updateGameSettings}
        />
        <SlideUpModal
          isOpen={resetGame.isOpen}
          onClose={resetGame.onClose}
          pageColor="pink"
          title="Write your password to confirm you want to reset the game"
          content={<ResetGameFiller />}
          submitText="Reset"
          action={deleteGame}
        />
      </Flex>
    </>
  );
};

export default GameSettings;
