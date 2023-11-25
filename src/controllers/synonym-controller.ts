import { Request, Response } from "express";
import SynonymService from "../services/synonym-service";
// get word from query string and search synyonym-service for groups
const getSynonymnsByWord = async (req: Request, res: Response) => {
    console.log(req.query)
    const word = req.query.term as string;
    if(!word) return res.status(404);
    
    const groups = SynonymService.getSynonyms(word);
    
    res.status(200).send({canonicalForm: word, associated: groups});
};

const createNewSynonymBond = async (req: Request, res: Response) => {
    console.log(req.body);
    const { canonicalForm, associated } = req.body;
    if(!canonicalForm || !associated) return res.status(400).send({error: 'Missing canonicalForm or associated'});
    SynonymService.addSynonyms({parent: canonicalForm, children: associated});
    res.status(201);
};

export const SynonymController = { getSynonymnsByWord, createNewSynonymBond };