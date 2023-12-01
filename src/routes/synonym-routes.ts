import { Router } from 'express';
import { SynonymController } from '../controllers/synonym-controller';

export const synRoutes: Router = Router();

synRoutes
    .get('/synonyms', SynonymController.getSynonymnsByWord)
    .post('/synonym/new', SynonymController.createNewSynonymGroup)
