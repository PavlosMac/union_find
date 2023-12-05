"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.synRoutes = void 0;
const express_1 = require("express");
const synonym_controller_1 = require("../controllers/synonym-controller");
exports.synRoutes = (0, express_1.Router)();
exports.synRoutes
    .get('/health', (_req, res) => { res.send({ health: 'ok' }); })
    .get('/synonyms', synonym_controller_1.SynonymController.getSynonymnsByWord)
    .post('/synonym/new', synonym_controller_1.SynonymController.createNewSynonymGroup);
