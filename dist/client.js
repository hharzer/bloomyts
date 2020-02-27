"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var faunadb_1 = require("faunadb");
var lodash_1 = require("lodash");
var faunaEnv = (_b = (_a = process.env.FAUNA_SECRET) !== null && _a !== void 0 ? _a : process.env.FAUNA_SERVER_SECRET) !== null && _b !== void 0 ? _b : '';
var client = function (init) {
    if (init === null || lodash_1.isEmpty(init)) {
        return new faunadb_1.Client({
            secret: faunaEnv
        });
    }
    else if (typeof init === "string") {
        return new faunadb_1.Client({
            secret: init
        });
    }
    else {
        return new faunadb_1.Client(init);
    }
};
exports.default = client;
//# sourceMappingURL=client.js.map