import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  BoxProps,
  Icon
} from '@chakra-ui/react';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiSearch
} from 'react-icons/fi';
import { TiWeatherPartlySunny } from 'react-icons/ti'
import { NavItem } from './NavItem';

export function SidebarContent({ onClose, ...rest }: SidebarProps) {
  return (
    <Box
      transition="1s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="92.5vh"
      {...rest}>
      <Flex h="20" alignItems="center" mx="4" justifyContent="space-between">

        <Flex alignItems="center" justifyContent="space-between">
          <Icon as={TiWeatherPartlySunny} fontSize="28" mr={4} />
          <Flex flexDirection="column">
            <Text fontFamily="Merriweather" fontSize="16">
              Previsão de tempo
            </Text>
            <Text w="full"
              fontFamily="Merriweather"
              fontSize="10"
              color="gray.500">
              Fonte: CPTEC / INPE
            </Text>
          </Flex>
        </Flex>


        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      <NavItem icon={FiCompass} href="/">
        Capitais - Sudeste
      </NavItem>
      <NavItem icon={FiSearch} href="/search">
        Pesquisar
      </NavItem>
    </Box>
  )
}