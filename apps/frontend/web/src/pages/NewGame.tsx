import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  useDisclosure,
} from '@chakra-ui/react';
import ModalCompanyImage from '../components/ModalCompanyImage';

const NewGame = () => {
  const { onOpen } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [companyImage, setCompanyImage] = useState('1');
  const [companyName, setCompanyName] = useState('');
  const [ceo, setCeo] = useState('');
  const [location, setLocation] = useState('');

  const onSubmit = (values: {
    companyName: string;
    ceo: string;
    location: string;
  }) => {
    const data = {
      idUser: 1,
      createdAt: new Date(),
      companyName: values.companyName,
      ceo: values.ceo,
      location: values.location,
      idImage: parseInt(companyImage, 10),
    };

    fetch('/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <Heading mt="1rem" mb="3rem" color="#B03D99">
        {'Create a new game'}
      </Heading>
      <Card w="100%" p="2rem" bgColor="#B03D9930" boxShadow="none">
        <CardBody
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              isInvalid={
                errors.companyName || errors.ceo || errors.location
                  ? true
                  : false
              }
            >
              <Image
                m="auto auto 1rem auto"
                boxSize="150px"
                src={`/company${companyImage}.png`}
                alt={`Image of the company ${companyImage}`}
              />
              <Button
                onClick={onOpen}
                _hover={{
                  border: 'none',
                }}
                _focus={{
                  outline: 'none',
                }}
              >
                {'Choose another company picture'}
              </Button>
              <InputGroup
                display="flex"
                flexDirection="column"
                alignItems="center"
                m="2rem 0"
              >
                <FormLabel htmlFor="companyName" textAlign="left" w="400px">
                  {'Name of your company :'}
                </FormLabel>
                <Input
                  id="companyName"
                  maxW="400px"
                  placeholder="My Company..."
                  mb="1rem"
                  bgColor="#fff"
                  _placeholder={{ opacity: 0.3 }}
                  {...register('companyName', {
                    required: 'The name of the company is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
                    },
                    value: companyName,
                    onChange: (e) => setCompanyName(e.target.value),
                  })}
                />
                <FormErrorMessage>
                  {`${errors.companyName && errors.companyName.message}`}
                </FormErrorMessage>
                <FormLabel htmlFor="ceo" textAlign="left" w="400px">
                  {'CEO of your company :'}
                </FormLabel>
                <Input
                  id="ceo"
                  maxW="400px"
                  placeholder="Elon Musk..."
                  mb="1rem"
                  bgColor="#fff"
                  _placeholder={{ opacity: 0.3 }}
                  {...register('ceo', {
                    required: 'The name of the CEO is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
                    },
                    value: ceo,
                    onChange: (e) => setCeo(e.target.value),
                  })}
                />
                <FormErrorMessage>
                  {`${errors.ceo && errors.ceo.message}`}
                </FormErrorMessage>
                <FormLabel htmlFor="location" textAlign="left" w="400px">
                  {'Location of your company :'}
                </FormLabel>
                <Input
                  maxW="400px"
                  placeholder="Paris, France..."
                  bgColor="#fff"
                  _placeholder={{ opacity: 0.3 }}
                  {...register('location', {
                    required: 'The location is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
                    },
                    value: location,
                    onChange: (e) => setLocation(e.target.value),
                  })}
                />
                <FormErrorMessage>
                  {`${errors.location && errors.location.message}`}
                </FormErrorMessage>
              </InputGroup>
            </FormControl>
            <Button
              bgColor="#B03D99"
              color="#ffffff"
              _hover={{
                bgColor: '#B03D9990',
                outline: 'none',
                border: '#B03D9990',
              }}
              _focus={{
                outline: 'none',
              }}
              type="submit"
            >
              {'Start the game'}
            </Button>
          </form>
        </CardBody>
      </Card>
      <ModalCompanyImage setCompanyImage={setCompanyImage} />
    </>
  );
};

export default NewGame;