import { useEffect, useState } from "react";
import { Box, Flex, Text, Stack, useColorModeValue, List, ListItem, ListIcon, Button, IconButton, Icon } from "@chakra-ui/react";
import axios from "axios";
import convert from 'xml-js'

import { TiWeatherCloudy, TiWeatherPartlySunny, TiWeatherSunny, TiWeatherWindyCloudy } from 'react-icons/ti'
import { FiClock } from "react-icons/fi";
import { MdFilterList } from 'react-icons/md'
import { WiHumidity } from 'react-icons/wi'
import { FcLandscape } from 'react-icons/fc'
import { FaTemperatureHigh } from 'react-icons/fa'
import { RiFoggyLine } from 'react-icons/ri'

import GetTempoDescription from "../../utils/GetTempoDescription";
import { WeatherIcon } from "../WeatherIcon";

interface CardProps {
  cidade: string;
  uf: string;
  cidade_id: number;
  estacao: string;
}

interface ResultProps {
  _text: string;
}

type PrevisaoType = {
  dia: ResultProps;
  iuv: ResultProps;
  maxima: ResultProps;
  minima: ResultProps;
  tempo: ResultProps;
}

interface EstacaoProps {
  codigo: ResultProps;
  atualizacao: ResultProps;
  pressao: ResultProps;
  temperatura: ResultProps;
  tempo: ResultProps;
  umidade: ResultProps;
  vento_dir: ResultProps;
  vento_int: ResultProps;
  visibilidade: ResultProps;
}

export function WeatherCard(data: CardProps) {

  const [previsaoData, setPrevisaoData] = useState([] as PrevisaoType[])
  const [estacaoData, setEstacaoData] = useState({} as EstacaoProps)
  const [viewData, setViewData] = useState<'estacao' | 'previsao'>('estacao')

  useEffect(() => {
    async function getWeather() {
      const response = await axios.get(`http://servicos.cptec.inpe.br/XML/estacao/${data.estacao}/condicoesAtuais.xml`)
      const response_parser: any = JSON.parse(convert.xml2json(response.data, { compact: true, spaces: 2 }))

      setEstacaoData(response_parser.metar)
    }

    async function getWeatherForecast() {
      const response = await axios.get(`http://servicos.cptec.inpe.br/XML/cidade/${data.cidade_id}/previsao.xml`)
      const response_parser: any = JSON.parse(convert.xml2json(response.data, { compact: true, spaces: 2 }))

      setPrevisaoData(response_parser.cidade.previsao)
    }

    getWeather();
    getWeatherForecast()
  }, [data.cidade_id, data.estacao])

  function toggleViewData() {
    setViewData(viewData === 'previsao' ? 'estacao' : 'previsao')
  }

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'2xl'}
      w={'auto'}
      paddingBottom={'10px'}
      rounded={'md'}
      overflow={'hidden'}>
      <Stack
        textAlign={'center'}
        p={4}
        align={'center'}
        bg={useColorModeValue('white', 'gray.700')}
      >
        <Stack direction={'row'} align={'center'} justify={'center'}>
          <Box borderRadius='50%' p={5} bg={useColorModeValue('white', 'gray.500')}>
            <Icon as={WeatherIcon(estacaoData.tempo?._text)} fontSize={32} />
          </Box>
        </Stack>
      </Stack>

      <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={7}>

        <Flex justifyContent="space-between" flexDirection="column">
          <Flex
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Text fontWeight="bold">
              {data.cidade} - {data.uf}
            </Text>
            <IconButton
              aria-label="Search database"
              variant="outline"
              size="sm"
              icon={<MdFilterList size={18} />}
              _hover={{ backgroundColor: 'green', color: 'white.500' }}
              onClick={toggleViewData}
            />
          </Flex>
          {estacaoData && viewData === 'estacao' && (
            <Box>
              <Stack direction={["column", "row"]}
                key={estacaoData.codigo?._text}
                borderTop="1px dotted white"
              >
                <List spacing={1} py={1}>
                  <ListItem>
                    <ListIcon as={FiClock} color="green.500" />
                    Atualizacão: {estacaoData.atualizacao?._text.split(' ')[0]}
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FcLandscape} color="green.500" />
                    Pressão: {estacaoData.pressao?._text}
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaTemperatureHigh} color="green.500" />
                    Temperatura: {estacaoData.temperatura?._text} &#8451;
                  </ListItem>
                  <ListItem>
                    <ListIcon as={WeatherIcon(estacaoData.tempo?._text)} color="green.500" />
                    Tempo: {GetTempoDescription(estacaoData.tempo?._text)}
                  </ListItem>
                  <ListItem>
                    <ListIcon as={WiHumidity} color="green.500" />
                    Umidade: {estacaoData.umidade?._text} %
                  </ListItem>
                  <ListItem>
                    <ListIcon as={TiWeatherWindyCloudy} color="green.500" />
                    Vento: {estacaoData.vento_int?._text} km/h
                  </ListItem>
                  <ListItem>
                    <ListIcon as={RiFoggyLine} color="green.500" />
                    Visibilidade: {estacaoData.visibilidade?._text}
                  </ListItem>
                </List>
              </Stack>
            </Box>
          )}
          {viewData === 'previsao' &&
            <Box transition="1s ease">
              {previsaoData?.map(previsao => (
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
            </Box>}
        </Flex>
      </Box>
    </Box>
  )
}