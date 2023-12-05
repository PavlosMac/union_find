"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SynonymController = void 0;
const synonym_service_1 = __importDefault(require("../services/synonym-service"));
const getSynonymnsByWord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const word = req.query.term;
    if (!word)
        return res.status(404);
    const groups = synonym_service_1.default.getSynonyms(word);
    res.status(200).send({ canonicalForm: word, associated: groups });
});
const createNewSynonymGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { canonicalForm, associated } = req.body;
    if (!canonicalForm || !associated)
        return res.status(400).send({ error: 'Missing canonicalForm or associated' });
    synonym_service_1.default.addSynonyms({ parent: canonicalForm, children: associated });
    res.status(201);
});
exports.SynonymController = { getSynonymnsByWord, createNewSynonymGroup };
