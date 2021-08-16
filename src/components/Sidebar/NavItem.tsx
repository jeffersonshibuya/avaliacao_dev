import { Flex, Icon, Link, LinkProps, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from 'react-icons';
import { ActiveLink } from "./ActiveLink";

interface NavItemProps extends LinkProps {
  icon: IconType;
  href: string;
  children: ReactNode;
}

export function NavItem({ icon, children, href, ...rest }: NavItemProps) {
  return (
    <ActiveLink href={href}>
      <Link display="flex" align="center" style={{ textDecoration: 'none' }} {...rest}>
        <Flex
          flex="1"
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}>
          <Icon as={icon}
            mr="4"
            fontSize="18"
            _groupHover={{
              color: 'white',
            }} />
          {children}
        </Flex>
      </Link>
    </ActiveLink>
    // <Link href={href} style={{ textDecoration: 'none' }}>
    //   <Flex
    //     align="center"
    //     p="4"
    //     mx="4"
    //     borderRadius="lg"
    //     role="group"
    //     cursor="pointer"
    //     _hover={{
    //       bg: 'cyan.400',
    //       color: 'white',
    //     }}>

    //     {icon && (
    //       <Icon
    //         mr="4"
    //         fontSize="16"
    //         _groupHover={{
    //           color: 'white',
    //         }}
    //         as={icon}
    //       />
    //     )}
    //     <Text textAlign="center">
    //       {children}
    //     </Text>
    //   </Flex>
    // </Link>
  )
}