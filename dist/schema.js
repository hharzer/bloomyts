"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ajv_1 = __importDefault(require("ajv"));
// @ts-ignore
var json_schema_shorthand_1 = __importDefault(require("json-schema-shorthand"));
function makeModel(schema, _a) {
    if (schema === void 0) { schema = {}; }
    var _b = (_a === void 0 ? {} : _a).convenience, convenience = _b === void 0 ? true : _b;
    var convertedSchema = convenience ? json_schema_shorthand_1.default.object(schema) : schema;
    var model = new ajv_1.default();
    return model.compile(convertedSchema);
}
exports.makeModel = makeModel;
//# sourceMappingURL=schema.js.map