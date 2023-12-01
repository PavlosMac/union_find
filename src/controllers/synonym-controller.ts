import { Request, Response } from "express";
import SynonymService from "../services/synonym-service";

const getSynonymnsByWord = async (req: Request, res: Response) => {
    const word = req.query.term as string;
    if(!word) return res.status(404);
    const groups = SynonymService.getSynonyms(word);
    res.status(200).send({canonicalForm: word, associated: groups});
};

const createNewSynonymGroup = async (req: Request, res: Response) => {
    const { canonicalForm, associated } = req.body;
    if(!canonicalForm || !associated) return res.status(400).send({error: 'Missing canonicalForm or associated'});
    const newBank = SynonymService.addSynonyms({parent: canonicalForm, children: associated});
    res.status(201).send({ canonicalForm, associated: newBank })
};

export const SynonymController = { getSynonymnsByWord, createNewSynonymGroup };