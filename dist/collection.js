"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = __importDefault(require("./client"));
var ajv_1 = __importDefault(require("ajv"));
//@ts-ignore
var json_schema_shorthand_1 = __importDefault(require("json-schema-shorthand"));
//import ajvSanitizer from 'ajv-sanitizer'
var lodash_1 = __importDefault(require("lodash"));
var faunadb_fql_lib_1 = require("faunadb-fql-lib");
var IsRef = faunadb_fql_lib_1.query.IsRef, Ref = faunadb_fql_lib_1.query.Ref, Create = faunadb_fql_lib_1.query.Create, Documents = faunadb_fql_lib_1.query.Documents, GetAll = faunadb_fql_lib_1.query.GetAll, Get = faunadb_fql_lib_1.query.Get, Collection = faunadb_fql_lib_1.query.Collection, Match = faunadb_fql_lib_1.query.Match, Index = faunadb_fql_lib_1.query.Index, Delete = faunadb_fql_lib_1.query.Delete, If = faunadb_fql_lib_1.query.If, IsIndex = faunadb_fql_lib_1.query.IsIndex, Abort = faunadb_fql_lib_1.query.Abort, Paginate = faunadb_fql_lib_1.query.Paginate, Update = faunadb_fql_lib_1.query.Update;
var client;
var modelConfig = {
    convenience: true,
    noSchema: false,
    allLowercase: true,
    indexed_by: []
};
function makeModel(schema, _a) {
    if (schema === void 0) { schema = {}; }
    var _b = (_a === void 0 ? {} : _a).convenience, convenience = _b === void 0 ? true : _b;
    var convertedSchema = convenience ? json_schema_shorthand_1.default.object(schema) : schema;
    if (process.env.NODE_ENV !== "production") {
        console.log(convertedSchema);
    }
    var model = new ajv_1.default();
    //ajvSanitizer(model);
    return model.compile(convertedSchema);
}
var Model = /** @class */ (function () {
    function Model(_a) {
        var collectionName = _a.collectionName, _b = _a.config, config = _b === void 0 ? {} : _b, _c = _a.schema, schema = _c === void 0 ? {} : _c;
        this.collection = "";
        this.conf = {};
        this.collection = collectionName;
        this.conf = lodash_1.default.merge(modelConfig, config);
        this.model = makeModel(schema, config);
    }
    Model.prototype.indexes = function (index) {
        return this.collection + "_by_" + index;
    };
    Model.prototype.withId = function (_a) {
        var data = _a.data, id = _a.ref.id;
        return __assign({ id: id }, data);
    };
    Model.prototype.toRef = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Ref(Collection(this.collection), id)];
            });
        });
    };
    Model.prototype.test = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                valid = this.model(data);
                return [2 /*return*/, { valid: valid, errors: this.model.errors }];
            });
        });
    };
    Model.prototype.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var valid, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.test(data)];
                    case 1:
                        valid = _c.sent();
                        console.log();
                        if (!(this.conf.noSchema || valid)) return [3 /*break*/, 3];
                        _a = [{}];
                        _b = this.withId;
                        return [4 /*yield*/, client.query(Create(Collection(this.collection), { data: data }))];
                    case 2: return [2 /*return*/, __assign.apply(void 0, [__assign.apply(void 0, _a.concat([_b.apply(this, [_c.sent()])])), { valid: valid }])];
                    case 3: throw new Error("invalid data supplied, schema did not match, " + JSON.stringify(data, null, 2));
                }
            });
        });
    };
    Model.prototype.list = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.query(GetAll(Paginate(Documents(Collection(this.collection)))))];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/, result.data.map(function (res) {
                                return _this.withId(res);
                            })];
                }
            });
        });
    };
    Model.prototype.find = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var ref, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.toRef(id)];
                    case 1:
                        ref = _b.sent();
                        _a = this.withId;
                        return [4 /*yield*/, client.query(If(IsRef(ref), Get(ref), Abort(id + " does not exist")))];
                    case 2: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    Model.prototype.findBy = function (index, criterion) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.query(If(IsIndex(Index(this.indexes(index))), GetAll(Match(Index(this.indexes(index)), criterion)), Abort("Not an index:" + index + " -> " + this.indexes(index))))];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data.map(function (res) { return _this.withId(res); })];
                }
            });
        });
    };
    Model.prototype.findOneBy = function (index, criterion) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findBy(index, criterion)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, lodash_1.default.head(res)];
                }
            });
        });
    };
    Model.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var ref, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ref = this.toRef(id);
                        _a = this.withId;
                        return [4 /*yield*/, client.query(If(IsRef(ref), Delete(ref), Abort("Not a id: " + id)))];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    Model.prototype.update = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var ref, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ref = this.toRef(id);
                        _a = this.withId;
                        return [4 /*yield*/, client.query(If(IsRef(ref), Update(ref, { data: data }), Abort("Not a ref " + id + " -> " + ref)))];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    return Model;
}());
function init(secret) {
    client = client_1.default(secret);
    return {
        Model: Model
    };
}
exports.default = init;
//# sourceMappingURL=collection.js.map