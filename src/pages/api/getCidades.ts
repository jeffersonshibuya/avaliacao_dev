import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import convert from 'xml-js'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { searchField } = req.body;

  const cidadesList = await axios.get(`http://servicos.cptec.inpe.br/XML/listaCidades?city=${searchField}`)
  const cidadesList_parser: any = JSON.parse(convert.xml2json(cidadesList.data, { compact: true, spaces: 2 }))

  return res.json(cidadesList_parser);
}