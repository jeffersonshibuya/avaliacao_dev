import { Box, Flex, Text } from "@chakra-ui/react"

export function Footer() {
  return (
    <Box h="20" width="100%" pos="fixed" bottom="0">
      <Flex
        align={'center'}
        _before={{
          content: '""',
          borderBottom: '1px solid',
          borderColor: 'gray.700',
          flexGrow: 1,
          mr: 8,
        }}
        _after={{
          content: '""',
          borderBottom: '1px solid',
          borderColor: 'gray.700',
          flexGrow: 1,
          ml: 8,
        }}>
        <Text fontSize="md" fontWeight="bold" letterSpacing="tight">
          Avaliação DEV
          <Text as="span" ml="1" color="pink.500">.</Text>
        </Text>
      </Flex>
      <Text pt={4} fontSize={'sm'} textAlign={'center'}>
        © 2021 Jefferson Shibuya.
      </Text>
    </Box>
  )
}