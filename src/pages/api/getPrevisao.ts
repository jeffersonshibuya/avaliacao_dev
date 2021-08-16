import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import convert from 'xml-js'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { codigo_cidade } = req.body;

  const response = await axios.get(`http://servicos.cptec.inpe.br/XML/cidade/${codigo_cidade}/previsao.xml`)
  const response_parser: any = JSON.parse(convert.xml2json(response.data, { compact: true, spaces: 2 }))

  return res.json(response_parser);
}