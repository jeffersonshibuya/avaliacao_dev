import React, { useEffect } from 'react'
import { Box, Grid, GridItem, SimpleGrid, Text } from '@chakra-ui/react'
import axios from 'axios'
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { WeatherCard } from '../components/WeatherCard'

import capitais from '../data/capitais.json'

import convert from 'xml-js'

interface CidadeProps {
  cidade: string;
  uf: string;
  cidade_id: number;
  estacao: string;
}

interface Props {
  cidades: CidadeProps[]
}

function Home({ cidades }: Props) {

  return (
    <Box maxHeight='calc(100vh - 23vh)' minHeight='70vh' overflowX="auto" sx={{
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
        {cidades?.map((cidadeData) =>
          <WeatherCard
            key={cidadeData.cidade_id}
            {...cidadeData}
          />
        )}
      </SimpleGrid>
    </Box>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {

  const capitais_sudeste = capitais.regiao.sudeste;

  const url = 'http://servicos.cptec.inpe.br/XML/listaCidades?city='
  const cidadesData: any = []

  // Obtem codigo da localidade das capitais
  for (const capital of capitais_sudeste) {
    await axios.get(url + encodeURI(capital.cidade)).then((response) => {

      const response_parser: any = JSON.parse(convert.xml2json(response.data, { compact: true, spaces: 2 }))

      if (Array.isArray(response_parser.cidades.cidade)) {
        const data = response_parser.cidades.cidade.filter((item: any) =>
          item.uf._text === capital.uf
        )[0]

        cidadesData.push({
          cidade: capital.cidade,
          uf: capital.uf,
          estacao: capital.estacao,
          cidade_id: Number(data.id._text)
        })
      } else {
        cidadesData.push({
          cidade: capital.cidade,
          uf: capital.uf,
          estacao: capital.estacao,
          cidade_id: Number(response_parser.cidades.cidade.id._text)
        })
      }
    })
  }

  return {
    props: {
      cidades: cidadesData
    }
  }

}