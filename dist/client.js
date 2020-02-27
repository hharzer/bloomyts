"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var faunadb_1 = require("faunadb");
//import { query } from 'faunadb-fql-lib'
var faunaEnv = (_b = (_a = process.env.FAUNA_SECRET) !== null && _a !== void 0 ? _a : process.env.FAUNA_SERVER_SECRET) !== null && _b !== void 0 ? _b : "";
var client = function (secret) {
    return new faunadb_1.Client({
        secret: secret !== null && secret !== void 0 ? secret : faunaEnv
    });
};
exports.default = client;
//# sourceMappingURL=client.js.map