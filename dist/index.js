"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const port = process.env.PORT || 4000;
const server = (0, server_1.createServer)();
server.listen(port, () => {
    console.log(`API running on ${port}`);
});
