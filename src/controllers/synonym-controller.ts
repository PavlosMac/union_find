import { Request, Response } from "express";
import SynonymService from "../services/synonym-service";
// get word from query string and search synyonym-service for groups
const getSynonymnsByWord = async (req: Request, res: Response) => {
    console.log(req.query)
    const word = req.query.term as string;
    const groups = SynonymService.getSynonyms(word);
    res.status(200).send(groups);
};

export const SynonymController = { getSynonymnsByWord };