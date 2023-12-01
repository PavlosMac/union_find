import { Request, Response, Router } from 'express';
import { SynonymController } from '../controllers/synonym-controller';

export const synRoutes: Router = Router();

synRoutes
    .get('/', (_req: Request, res: Response) => { res.send({ health: 'ok' }) })
    .get('/synonyms', SynonymController.getSynonymnsByWord)
    .post('/synonym/new', SynonymController.createNewSynonymGroup)
