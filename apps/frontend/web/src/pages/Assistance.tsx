import {
  Box,
  Heading,
  Center,
  Image,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useDisclosure,
  Alert,
  AlertTitle,
  AlertDescription,
  CloseButton,
  FormErrorMessage,
} from '@chakra-ui/react';
import { BaseSyntheticEvent, useState } from 'react';

const Assistance = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [inputEmail, setInputEmail] = useState('');
  const handleInputChangeEmail = (e: BaseSyntheticEvent) =>
    setInputEmail(e.target.value);
  const isErrorEmail = inputEmail === '';

  const [inputTitle, setInputTitle] = useState('');
  const handleInputChangeTitle = (e: BaseSyntheticEvent) =>
    setInputTitle(e.target.value);
  const isErrorTitle = inputTitle === '';

  const [inputMessage, setInputMessage] = useState('');
  const handleInputChangeMessage = (e: BaseSyntheticEvent) =>
    setInputMessage(e.target.value);
  const isErrorMessage = inputMessage === '';

  return (
    <Box bgColor="#D9F1F0" h="100vh" w="100vw">
      <Center>
        <Heading mt="5">{'Assistance'}</Heading>
      </Center>
      <Center>
        <Image src="/assistance.png" boxSize="100px" mt="10" />
      </Center>
      <Center>
        <Box w="80%" mt="20">
          <FormControl isRequired>
            <FormLabel mb="0">{'E-mail'}</FormLabel>
            <Input
              type="email"
              bgColor="white"
              value={inputEmail}
              placeholder="johndoe@mail.com"
              onChange={handleInputChangeEmail}
            />
            {!isErrorEmail ? null : (
              <FormErrorMessage>{'Email is required.'}</FormErrorMessage>
            )}
            <FormLabel mt="2" mb="0">
              {'Title'}
            </FormLabel>
            <Input
              type="text"
              bgColor="white"
              placeholder="Lag"
              value={inputTitle}
              onChange={handleInputChangeTitle}
            />
            {!isErrorTitle ? null : (
              <FormErrorMessage>Title is required.</FormErrorMessage>
            )}
            <FormLabel mt="2" mb="0">
              {'Message'}
            </FormLabel>
            <Textarea
              bgColor="white"
              placeholder="Your text"
              value={inputMessage}
              onChange={handleInputChangeMessage}
            />
            {!isErrorMessage ? null : (
              <FormErrorMessage>{'Title is required.'}</FormErrorMessage>
            )}
          </FormControl>
          {isOpen ? (
            <Alert status="success" mt="5" display="flex" flexDir="row">
              <Box flexGrow="1">
                <AlertTitle display="flex" verticalAlign="alignSelf">
                  {' Success!'}
                </AlertTitle>
                <AlertDescription>{'Your mail has been send'}</AlertDescription>
              </Box>
              <CloseButton
                alignSelf="flex-start"
                position="relative"
                right={-1}
                top={-1}
                onClick={onClose}
              />
            </Alert>
          ) : null}
          <Center>
            <Button
              w="50%"
              boxShadow="xl"
              bgColor="#42B7B4"
              mt="5"
              color="white"
              fontFamily="Chakra Petch"
              onClick={onOpen}
              disabled={isErrorEmail || isErrorMessage || isErrorTitle}
              _hover={{ bg: false }}
            >
              {'Send'}
            </Button>
          </Center>
        </Box>
      </Center>
    </Box>
  );
};

export default Assistance;
