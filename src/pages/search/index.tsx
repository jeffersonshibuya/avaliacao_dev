import { useEffect, useState } from "react";
import { Box, Divider, Flex, Icon, IconButton, Input, InputGroup, InputRightElement, List, ListIcon, ListItem, SimpleGrid, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import convert from 'xml-js'

import { WeatherIcon } from "../../components/WeatherIcon";
import GetTempoDescription from "../../utils/GetTempoDescription";

import { FaSearch, FaTemperatureHigh } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { TiWeatherPartlySunny, TiWeatherSunny } from "react-icons/ti";
import { api } from "../../services/api";

interface ResultProps {
  _text: string;
}

type CidadePrevisaoType = {
  atualizacao: ResultProps;
  nome: ResultProps;
  previsao: PrevisaoType[];
}

type PrevisaoType = {
  dia: ResultProps;
  iuv: ResultProps;
  maxima: ResultProps;
  minima: ResultProps;
  tempo: ResultProps;
}

type CidadeType = {
  nome: ResultProps;
  uf: ResultProps;
  id: ResultProps;
}

export default function Search() {
  const [searchField, setSearchField] = useState('')
  const [cidades, setCidades] = useState([] as CidadeType[])
  const [previsoes, setPrevisoes] = useState([] as CidadePrevisaoType[])

  async function getCidades() {
    const response: any = await api.post('/getCidades', {
      searchField
    })

    if (Array.isArray(response.data.cidades.cidade)) {
      setCidades(response.data.cidades.cidade)
    } else {
      setCidades([{ ...response.data.cidades.cidade }])
    }

  }

  async function handleSearch(e: any) {
    e.preventDefault();

    await getCidades()
  }

  useEffect(() => {
    async function getPrevisoes() {
      const data: CidadePrevisaoType[] = []
      for await (const cidadeSearch of cidades) {
        // const response = await axios.get(`http://servicos.cptec.inpe.br/XML/cidade/${cidadeSearch.id?._text}/previsao.xml`)
        // const response_parser: any = JSON.parse(convert.xml2json(response.data, { compact: true, spaces: 2 }))

        const response = await api.post('/getPrevisao', {
          codigo_cidade: cidadeSearch.id?._text
        })

        data.push(response.data.cidade)
      }

      setPrevisoes(data);
    }
    getPrevisoes()
  }, [cidades])

  return (
    <Box>
      <Box as="form" onSubmit={handleSearch} w="100%">
        <InputGroup size="md">
          <Input
            pr="1rem"
            placeholder="Pesquisar por cidade..."
            onChange={event => setSearchField(event.target.value)}
          />
          <InputRightElement width="4.5rem">
            <IconButton icon={<FaSearch />} aria-label="search" onClick={handleSearch} />
          </InputRightElement>
        </InputGroup>
      </Box>

      <Divider my={4} />
      <Box maxHeight='calc(100vh - 30vh)' minHeight='70vh' overflowX="auto" sx={{
        '&::-webkit-scrollbar': {
          width: '3px',
          marginLeft: '10px'
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(255, 255, 255,0.2)',
          borderRadius: '24px',
        },
      }}>
        <SimpleGrid spacing={["6", "8"]} minChildWidth="250px" paddingRight='20px'>
          {previsoes?.map((p) =>
            <Box
              key={p.nome._text}
              bg={'gray.900'}
              boxShadow={'2xl'}
              w={'auto'}
              paddingBottom={'10px'}
              rounded={'md'}
              overflow={'hidden'}>

              <Stack
                textAlign={'center'}
                p={4}
                align={'center'}
                bg={'gray.700'}
              >
                <Stack direction={'row'} align={'center'} justify={'center'}>
                  <Box borderRadius='50%' p={5} bg={'gray.500'}>
                    <Icon as={TiWeatherPartlySunny} fontSize={32} />
                  </Box>
                </Stack>
              </Stack>
              <Box bg={'gray.900'} px={6} py={7}>

                <Flex justifyContent="space-between" flexDirection="column">
                  <Flex
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <Text fontWeight="bold">
                      {p.nome._text}
                    </Text>
                  </Flex>
                  <Box transition="1s ease">
                    {p.previsao?.map(previsao => (
                      <Stack direction={["column", "row"]}
                        key={previsao.dia._text}
                        spacing="0px"
                        borderTop="1px dotted white"
                      >
                        <List spacing={1} py={1}>
                          <ListItem>
                            <ListIcon as={FiClock} color="green.500" />
                            Data: {Intl.DateTimeFormat('pt-BR', { dateStyle: "short", timeZone: 'UTC' }).format(new Date(previsao.dia._text))}
                          </ListItem>
                          <ListItem>
                            <ListIcon as={FaTemperatureHigh} color="green.500" />
                            Máx: {previsao.maxima._text} &#8451;
                          </ListItem>
                          <ListItem>
                            <ListIcon as={FaTemperatureHigh} color="green.500" />
                            Min: {previsao.minima._text} &#8451;
                          </ListItem>
                          <ListItem>
                            <ListIcon as={WeatherIcon(previsao.tempo?._text)} color="green.500" />
                            Tempo: {GetTempoDescription(previsao.tempo?._text)}
                          </ListItem>
                          <ListItem>
                            <ListIcon as={TiWeatherSunny} color="green.500" />
                            IUV: {previsao.iuv._text}
                          </ListItem>
                        </List>

                      </Stack>
                    ))}
                  </Box>
                </Flex>
              </Box>
            </Box>
          )}
        </SimpleGrid>
      </Box>
    </Box>
  )
}