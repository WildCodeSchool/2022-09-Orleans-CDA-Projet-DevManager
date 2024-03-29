import { Flex, Image, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

const NavbarTab = ({
  type,
  path,
  text,
  src,
  setIsNavbarOpen,
  logout,
}: {
  type: string;
  path: string;
  text: string;
  src: string;
  setIsNavbarOpen?: (value: boolean) => void;
  logout?: () => void;
}) => {
  const { pathname } = useLocation();

  return (
    <Link
      to={path}
      onClick={() => {
        if (setIsNavbarOpen) setIsNavbarOpen(false);
        if (logout) logout();
      }}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin:
          type === 'left-navbar'
            ? '0.7rem 0 0.7rem 1.25rem'
            : '0.7rem 1.25rem 0.7rem 0',
      }}
    >
      <Flex
        flexDir={type === 'bottom-navbar' ? 'column' : 'row'}
        justifyContent="center"
        alignItems="center"
        w="100%"
        opacity={path === pathname ? 1 : 0.5}
        transition="opacity 0.1s"
        _hover={{ opacity: 1 }}
      >
        {type === 'left-navbar' ? (
          <>
            <Image alt={text} src={src} h="2.5rem" w="2.5rem" />
            <Text
              ml="1.25rem"
              overflow="hidden"
              fontSize="1.5rem"
              whiteSpace="nowrap"
            >
              {text}
            </Text>
          </>
        ) : type === 'right-navbar' ? (
          <>
            <Text
              mr="1.25rem"
              overflow="hidden"
              fontSize="1.5rem"
              whiteSpace="nowrap"
            >
              {text}
            </Text>
            <Image alt={text} src={src} h="2.5rem" w="2.5rem" />
          </>
        ) : (
          <>
            <Image alt={text} src={src} h="2.5rem" w="2.5rem" />
            <Text fontSize="0.8rem" whiteSpace="nowrap">
              {text}
            </Text>
          </>
        )}
      </Flex>
    </Link>
  );
};

export default NavbarTab;
