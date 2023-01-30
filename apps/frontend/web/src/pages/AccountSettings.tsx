import { useState, useContext } from 'react';
import {
  Text,
  Flex,
  Image,
  Grid,
  Button,
  VStack,
  HStack,
  useDisclosure,
  Box,
  Heading,
  Center,
} from '@chakra-ui/react';
import SlideUpModal from '../components/popups/SlideUpModal';
import UserImageFiller from '../components/UserImageFiller';
import UserContactFiller from '../components/UserContactFiller';
import UserPasswordFiller from '../components/UserPasswordFiller';
import DeleteAccountFiller from '../components/DeleteAccountFiller';
import Navbar from '../components/Navbar';
import AuthContext from '../contexts/AuthContext';
const pageColor = 'turquoise';

const AccountSettings = () => {
  const [gamerImage, setGamerImage] = useState('man1');
  const [selectedImage, setSelectedImage] = useState(gamerImage);
  const userImage = useDisclosure();
  const userContact = useDisclosure();
  const userPassword = useDisclosure();
  const deleteAccount = useDisclosure();
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Box position="absolute" top="0" margin="auto" w="100%">
        <Center>
          <Heading mt="10" mb="10" color={`${pageColor}.900`}>
            {'Account Setting'}
          </Heading>
        </Center>
        <Flex w="100%" h="100vh">
          <Flex
            flexDir={{ base: 'column', sm: 'column' }}
            alignItems="center"
            bgColor={{
              base: `${pageColor}.200`,
              xl: 'white',
              lg: `${pageColor}.200`,
              md: `${pageColor}.200`,
              sm: `${pageColor}.200`,
            }}
            w="100%"
            flexGrow="1"
          >
            <Image
              w="5.5rem"
              src={`/${gamerImage}.png`}
              alt={`Image of ${gamerImage}`}
              mt="2rem"
              mb="1rem"
            />
            <Button
              onClick={userImage.onOpen}
              bgColor={`${pageColor}.900`}
              color="#FFF"
              w="8rem"
              fontWeight="normal"
              boxShadow="rgb(0 0 0 / 40%) 0px 3px 5px"
            >
              {'Modify'}
            </Button>
            <VStack m="2rem 0">
              <HStack>
                <Text textAlign="right">{'Username :'}</Text>
                <Text textAlign="left">{user?.username}</Text>
              </HStack>
              <HStack>
                <Text textAlign="right">{'E-mail :'}</Text>
                <Text textAlign="left">{user?.email}</Text>
              </HStack>
              <HStack>
                <Text textAlign="right">{'Password :'}</Text>
                <Text textAlign="left">{user?.password}</Text>
              </HStack>
            </VStack>
            <Button
              onClick={userContact.onOpen}
              boxShadow="rgb(0 0 0 / 40%) 0px 3px 5px"
              bgColor={`${pageColor}.900`}
              color="#FFF"
              w="13rem"
              fontWeight="normal"
            >
              {'Edit contact details'}
            </Button>
            <Button
              onClick={userPassword.onOpen}
              boxShadow="rgb(0 0 0 / 40%) 0px 3px 5px"
              mt="0.8rem"
              bgColor={`${pageColor}.900`}
              color="#FFF"
              w="13rem"
              fontWeight="normal"
            >
              {'Edit password'}
            </Button>
            <Button
              onClick={deleteAccount.onOpen}
              boxShadow="rgb(0 0 0 / 40%) 0px 3px 5px"
              mt="2rem"
              bgColor="pink.900"
              color="#FFF"
              w="13rem"
              fontWeight="normal"
            >
              {'Delete account'}
            </Button>
          </Flex>
          <Box
            boxShadow="2xl"
            rounded="5px"
            display={{
              base: 'none',
              xl: 'flex',
              lg: 'none',
              md: 'none',
              sm: 'none',
            }}
            boxSize="lg"
          >
            <UserImageFiller
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          </Box>
        </Flex>
        <SlideUpModal
          isOpen={userImage.isOpen}
          onClose={userImage.onClose}
          pageColor={pageColor}
          title="Choose a new avatar"
          content={
            <UserImageFiller
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          }
          submitText="Save"
          submitFunction={() => setGamerImage(selectedImage)}
        />
        <SlideUpModal
          isOpen={userContact.isOpen}
          onClose={userContact.onClose}
          pageColor={pageColor}
          title="Edit your contact details"
          content={<UserContactFiller />}
          submitText="Save"
        />
        <SlideUpModal
          isOpen={userPassword.isOpen}
          onClose={userPassword.onClose}
          pageColor={pageColor}
          title="Edit your password"
          content={<UserPasswordFiller />}
          submitText="Save"
        />
        <SlideUpModal
          isOpen={deleteAccount.isOpen}
          onClose={deleteAccount.onClose}
          pageColor="pink"
          title="Write your password to confirm you want to delete your account"
          content={<DeleteAccountFiller />}
          submitText="Delete"
        />
      </Box>
    </>
  );
};

export default AccountSettings;
