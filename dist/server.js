"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const body_parser_1 = require("body-parser");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const synonym_routes_1 = require("./routes/synonym-routes");
const createServer = () => {
    const app = (0, express_1.default)();
    app
        .use((0, body_parser_1.urlencoded)({ extended: true }))
        .use((0, body_parser_1.json)())
        .use((0, cors_1.default)())
        .use('/api', synonym_routes_1.synRoutes);
    return app;
};
exports.createServer = createServer;
