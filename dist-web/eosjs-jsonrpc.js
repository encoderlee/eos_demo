var eosjs_jsonrpc;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/eosjs-jsonrpc.ts":
/*!******************************!*\
  !*** ./src/eosjs-jsonrpc.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * @module JSON-RPC
 */
// copyright defined in eosjs/LICENSE.txt
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JsonRpc = void 0;
var eosjs_numeric_1 = __webpack_require__(/*! ./eosjs-numeric */ "./src/eosjs-numeric.ts");
var eosjs_rpcerror_1 = __webpack_require__(/*! ./eosjs-rpcerror */ "./src/eosjs-rpcerror.ts");
var arrayToHex = function (data) {
    var e_1, _a;
    var result = '';
    try {
        for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
            var x = data_1_1.value;
            result += ('00' + x.toString(16)).slice(-2);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
};
/** Make RPC calls */
var JsonRpc = /** @class */ (function () {
    /**
     * @param args
     * `fetch`:
     * browsers: leave `null` or `undefined`
     * node: provide an implementation
     */
    function JsonRpc(endpoint, args) {
        if (args === void 0) { args = {}; }
        this.endpoint = endpoint.replace(/\/$/, '');
        if (args.fetch) {
            this.fetchBuiltin = args.fetch;
        }
        else {
            this.fetchBuiltin = __webpack_require__.g.fetch;
        }
    }
    /** Post `body` to `endpoint + path`. Throws detailed error information in `RpcError` when available. */
    JsonRpc.prototype.fetch = function (path, body) {
        return __awaiter(this, void 0, void 0, function () {
            var response, json, f, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        f = this.fetchBuiltin;
                        return [4 /*yield*/, f(this.endpoint + path, {
                                body: JSON.stringify(body),
                                method: 'POST',
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        json = _a.sent();
                        if (json.processed && json.processed.except) {
                            throw new eosjs_rpcerror_1.RpcError(json);
                        }
                        else if (json.result && json.result.except) {
                            throw new eosjs_rpcerror_1.RpcError(json);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        e_2.isFetchError = true;
                        throw e_2;
                    case 4:
                        if (!response.ok) {
                            throw new eosjs_rpcerror_1.RpcError(json);
                        }
                        return [2 /*return*/, json];
                }
            });
        });
    };
    JsonRpc.prototype.abi_bin_to_json = function (code, action, binargs) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/abi_bin_to_json', { code: code, action: action, binargs: binargs })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    JsonRpc.prototype.abi_json_to_bin = function (code, action, args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/abi_json_to_bin', { code: code, action: action, args: args })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_abi` */
    JsonRpc.prototype.get_abi = function (accountName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_abi', { account_name: accountName })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_account` */
    JsonRpc.prototype.get_account = function (accountName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_account', { account_name: accountName })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_accounts_by_authorizers` */
    JsonRpc.prototype.get_accounts_by_authorizers = function (accounts, keys) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_accounts_by_authorizers', { accounts: accounts, keys: keys })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `get_activated_protocol_features` */
    JsonRpc.prototype.get_activated_protocol_features = function (_a) {
        var _b = _a.limit, limit = _b === void 0 ? 10 : _b, _c = _a.search_by_block_num, search_by_block_num = _c === void 0 ? false : _c, _d = _a.reverse, reverse = _d === void 0 ? false : _d, _e = _a.lower_bound, lower_bound = _e === void 0 ? null : _e, _f = _a.upper_bound, upper_bound = _f === void 0 ? null : _f;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_activated_protocol_features', { lower_bound: lower_bound, upper_bound: upper_bound, limit: limit, search_by_block_num: search_by_block_num, reverse: reverse })];
                    case 1: return [2 /*return*/, _g.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_block_header_state` */
    JsonRpc.prototype.get_block_header_state = function (blockNumOrId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_block_header_state', { block_num_or_id: blockNumOrId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_block_info` */
    JsonRpc.prototype.get_block_info = function (blockNum) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_block_info', { block_num: blockNum })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_block` */
    JsonRpc.prototype.get_block = function (blockNumOrId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_block', { block_num_or_id: blockNumOrId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_code` */
    JsonRpc.prototype.get_code = function (accountName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_code', {
                            account_name: accountName,
                            code_as_wasm: true
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_code_hash` */
    JsonRpc.prototype.get_code_hash = function (accountName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_code_hash', { account_name: accountName })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_currency_balance` */
    JsonRpc.prototype.get_currency_balance = function (code, account, symbol) {
        if (symbol === void 0) { symbol = null; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_currency_balance', { code: code, account: account, symbol: symbol })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_currency_stats` */
    JsonRpc.prototype.get_currency_stats = function (code, symbol) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_currency_stats', { code: code, symbol: symbol })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_info` */
    JsonRpc.prototype.get_info = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_info', {})];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_producer_schedule` */
    JsonRpc.prototype.get_producer_schedule = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_producer_schedule', {})];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_producers` */
    JsonRpc.prototype.get_producers = function (json, lowerBound, limit) {
        if (json === void 0) { json = true; }
        if (lowerBound === void 0) { lowerBound = ''; }
        if (limit === void 0) { limit = 50; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_producers', { json: json, lower_bound: lowerBound, limit: limit })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_raw_code_and_abi` */
    JsonRpc.prototype.get_raw_code_and_abi = function (accountName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_raw_code_and_abi', { account_name: accountName })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** calls `/v1/chain/get_raw_code_and_abi` and pulls out unneeded raw wasm code */
    JsonRpc.prototype.getRawAbi = function (accountName) {
        return __awaiter(this, void 0, void 0, function () {
            var rawAbi, abi;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get_raw_abi(accountName)];
                    case 1:
                        rawAbi = _a.sent();
                        abi = (0, eosjs_numeric_1.base64ToBinary)(rawAbi.abi);
                        return [2 /*return*/, { accountName: rawAbi.account_name, abi: abi }];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_raw_abi` */
    JsonRpc.prototype.get_raw_abi = function (accountName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_raw_abi', { account_name: accountName })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_scheduled_transactions` */
    JsonRpc.prototype.get_scheduled_transactions = function (json, lowerBound, limit) {
        if (json === void 0) { json = true; }
        if (lowerBound === void 0) { lowerBound = ''; }
        if (limit === void 0) { limit = 50; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_scheduled_transactions', { json: json, lower_bound: lowerBound, limit: limit })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_table_rows` */
    JsonRpc.prototype.get_table_rows = function (_a) {
        var _b = _a.json, json = _b === void 0 ? true : _b, code = _a.code, scope = _a.scope, table = _a.table, _c = _a.lower_bound, lower_bound = _c === void 0 ? '' : _c, _d = _a.upper_bound, upper_bound = _d === void 0 ? '' : _d, _e = _a.index_position, index_position = _e === void 0 ? 1 : _e, _f = _a.key_type, key_type = _f === void 0 ? '' : _f, _g = _a.limit, limit = _g === void 0 ? 10 : _g, _h = _a.reverse, reverse = _h === void 0 ? false : _h, _j = _a.show_payer, show_payer = _j === void 0 ? false : _j;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_table_rows', {
                            json: json,
                            code: code,
                            scope: scope,
                            table: table,
                            lower_bound: lower_bound,
                            upper_bound: upper_bound,
                            index_position: index_position,
                            key_type: key_type,
                            limit: limit,
                            reverse: reverse,
                            show_payer: show_payer,
                        })];
                    case 1: return [2 /*return*/, _k.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_kv_table_rows` */
    JsonRpc.prototype.get_kv_table_rows = function (_a) {
        var _b = _a.json, json = _b === void 0 ? true : _b, code = _a.code, table = _a.table, index_name = _a.index_name, _c = _a.encode_type, encode_type = _c === void 0 ? 'bytes' : _c, index_value = _a.index_value, lower_bound = _a.lower_bound, upper_bound = _a.upper_bound, _d = _a.limit, limit = _d === void 0 ? 10 : _d, _e = _a.reverse, reverse = _e === void 0 ? false : _e, _f = _a.show_payer, show_payer = _f === void 0 ? false : _f;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_kv_table_rows', {
                            json: json,
                            code: code,
                            table: table,
                            index_name: index_name,
                            encode_type: encode_type,
                            index_value: index_value,
                            lower_bound: lower_bound,
                            upper_bound: upper_bound,
                            limit: limit,
                            reverse: reverse,
                            show_payer: show_payer,
                        })];
                    case 1: return [2 /*return*/, _g.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/get_table_by_scope` */
    JsonRpc.prototype.get_table_by_scope = function (_a) {
        var code = _a.code, table = _a.table, _b = _a.lower_bound, lower_bound = _b === void 0 ? '' : _b, _c = _a.upper_bound, upper_bound = _c === void 0 ? '' : _c, _d = _a.limit, limit = _d === void 0 ? 10 : _d;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/get_table_by_scope', {
                            code: code,
                            table: table,
                            lower_bound: lower_bound,
                            upper_bound: upper_bound,
                            limit: limit,
                        })];
                    case 1: return [2 /*return*/, _e.sent()];
                }
            });
        });
    };
    /** Get subset of `availableKeys` needed to meet authorities in `transaction`. Implements `AuthorityProvider` */
    JsonRpc.prototype.getRequiredKeys = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = eosjs_numeric_1.convertLegacyPublicKeys;
                        return [4 /*yield*/, this.fetch('/v1/chain/get_required_keys', {
                                transaction: args.transaction,
                                available_keys: args.availableKeys,
                            })];
                    case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()).required_keys])];
                }
            });
        });
    };
    /** Push a serialized transaction (replaced by send_transaction, but returned format has changed) */
    JsonRpc.prototype.push_transaction = function (_a) {
        var signatures = _a.signatures, _b = _a.compression, compression = _b === void 0 ? 0 : _b, serializedTransaction = _a.serializedTransaction, serializedContextFreeData = _a.serializedContextFreeData;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/push_transaction', {
                            signatures: signatures,
                            compression: compression,
                            packed_context_free_data: arrayToHex(serializedContextFreeData || new Uint8Array(0)),
                            packed_trx: arrayToHex(serializedTransaction),
                        })];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/chain/push_ro_transaction */
    JsonRpc.prototype.push_ro_transaction = function (_a, returnFailureTraces) {
        var signatures = _a.signatures, _b = _a.compression, compression = _b === void 0 ? 0 : _b, serializedTransaction = _a.serializedTransaction;
        if (returnFailureTraces === void 0) { returnFailureTraces = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/push_ro_transaction', {
                            transaction: {
                                signatures: signatures,
                                compression: compression,
                                packed_context_free_data: arrayToHex(new Uint8Array(0)),
                                packed_trx: arrayToHex(serializedTransaction),
                            },
                            return_failure_traces: returnFailureTraces,
                        })];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    JsonRpc.prototype.push_transactions = function (transactions) {
        return __awaiter(this, void 0, void 0, function () {
            var packedTrxs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        packedTrxs = transactions.map(function (_a) {
                            var signatures = _a.signatures, _b = _a.compression, compression = _b === void 0 ? 0 : _b, serializedTransaction = _a.serializedTransaction, serializedContextFreeData = _a.serializedContextFreeData;
                            return {
                                signatures: signatures,
                                compression: compression,
                                packed_context_free_data: arrayToHex(serializedContextFreeData || new Uint8Array(0)),
                                packed_trx: arrayToHex(serializedTransaction),
                            };
                        });
                        return [4 /*yield*/, this.fetch('/v1/chain/push_transactions', packedTrxs)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Send a serialized transaction */
    JsonRpc.prototype.send_transaction = function (_a) {
        var signatures = _a.signatures, _b = _a.compression, compression = _b === void 0 ? 0 : _b, serializedTransaction = _a.serializedTransaction, serializedContextFreeData = _a.serializedContextFreeData;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/chain/send_transaction', {
                            signatures: signatures,
                            compression: compression,
                            packed_context_free_data: arrayToHex(serializedContextFreeData || new Uint8Array(0)),
                            packed_trx: arrayToHex(serializedTransaction),
                        })];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/db_size/get` */
    JsonRpc.prototype.db_size_get = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.fetch('/v1/db_size/get', {})];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); });
    };
    /** Raw call to `/v1/trace_api/get_block` */
    JsonRpc.prototype.trace_get_block = function (block_num) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/trace_api/get_block', { block_num: block_num })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/history/get_actions` */
    JsonRpc.prototype.history_get_actions = function (accountName, pos, offset) {
        if (pos === void 0) { pos = null; }
        if (offset === void 0) { offset = null; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/history/get_actions', { account_name: accountName, pos: pos, offset: offset })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/history/get_transaction` */
    JsonRpc.prototype.history_get_transaction = function (id, blockNumHint) {
        if (blockNumHint === void 0) { blockNumHint = null; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/history/get_transaction', { id: id, block_num_hint: blockNumHint })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/history/get_key_accounts` */
    JsonRpc.prototype.history_get_key_accounts = function (publicKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/history/get_key_accounts', { public_key: publicKey })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Raw call to `/v1/history/get_controlled_accounts` */
    JsonRpc.prototype.history_get_controlled_accounts = function (controllingAccount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('/v1/history/get_controlled_accounts', { controlling_account: controllingAccount })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return JsonRpc;
}()); // JsonRpc
exports.JsonRpc = JsonRpc;


/***/ }),

/***/ "./src/eosjs-numeric.ts":
/*!******************************!*\
  !*** ./src/eosjs-numeric.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.signatureToString = exports.stringToSignature = exports.privateKeyToString = exports.privateKeyToLegacyString = exports.stringToPrivateKey = exports.convertLegacyPublicKeys = exports.convertLegacyPublicKey = exports.publicKeyToString = exports.publicKeyToLegacyString = exports.stringToPublicKey = exports.signatureDataSize = exports.privateKeyDataSize = exports.publicKeyDataSize = exports.KeyType = exports.base64ToBinary = exports.binaryToBase58 = exports.base58ToBinary = exports.signedBinaryToDecimal = exports.binaryToDecimal = exports.signedDecimalToBinary = exports.decimalToBinary = exports.negate = exports.isNegative = void 0;
/**
 * @module Numeric
 */
var hash_js_1 = __webpack_require__(/*! hash.js */ "./node_modules/hash.js/lib/hash.js");
// copyright defined in eosjs/LICENSE.txt
var ripemd160 = (__webpack_require__(/*! ./ripemd */ "./src/ripemd.js").RIPEMD160.hash);
var base58Chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
var base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
var create_base58_map = function () {
    var base58M = Array(256).fill(-1);
    for (var i = 0; i < base58Chars.length; ++i) {
        base58M[base58Chars.charCodeAt(i)] = i;
    }
    return base58M;
};
var base58Map = create_base58_map();
var create_base64_map = function () {
    var base64M = Array(256).fill(-1);
    for (var i = 0; i < base64Chars.length; ++i) {
        base64M[base64Chars.charCodeAt(i)] = i;
    }
    base64M['='.charCodeAt(0)] = 0;
    return base64M;
};
var base64Map = create_base64_map();
/** Is `bignum` a negative number? */
var isNegative = function (bignum) {
    return (bignum[bignum.length - 1] & 0x80) !== 0;
};
exports.isNegative = isNegative;
/** Negate `bignum` */
var negate = function (bignum) {
    var carry = 1;
    for (var i = 0; i < bignum.length; ++i) {
        var x = (~bignum[i] & 0xff) + carry;
        bignum[i] = x;
        carry = x >> 8;
    }
};
exports.negate = negate;
/**
 * Convert an unsigned decimal number in `s` to a bignum
 *
 * @param size bignum size (bytes)
 */
var decimalToBinary = function (size, s) {
    var result = new Uint8Array(size);
    for (var i = 0; i < s.length; ++i) {
        var srcDigit = s.charCodeAt(i);
        if (srcDigit < '0'.charCodeAt(0) || srcDigit > '9'.charCodeAt(0)) {
            throw new Error('invalid number');
        }
        var carry = srcDigit - '0'.charCodeAt(0);
        for (var j = 0; j < size; ++j) {
            var x = result[j] * 10 + carry;
            result[j] = x;
            carry = x >> 8;
        }
        if (carry) {
            throw new Error('number is out of range');
        }
    }
    return result;
};
exports.decimalToBinary = decimalToBinary;
/**
 * Convert a signed decimal number in `s` to a bignum
 *
 * @param size bignum size (bytes)
 */
var signedDecimalToBinary = function (size, s) {
    var negative = s[0] === '-';
    if (negative) {
        s = s.substr(1);
    }
    var result = (0, exports.decimalToBinary)(size, s);
    if (negative) {
        (0, exports.negate)(result);
        if (!(0, exports.isNegative)(result)) {
            throw new Error('number is out of range');
        }
    }
    else if ((0, exports.isNegative)(result)) {
        throw new Error('number is out of range');
    }
    return result;
};
exports.signedDecimalToBinary = signedDecimalToBinary;
/**
 * Convert `bignum` to an unsigned decimal number
 *
 * @param minDigits 0-pad result to this many digits
 */
var binaryToDecimal = function (bignum, minDigits) {
    if (minDigits === void 0) { minDigits = 1; }
    var result = Array(minDigits).fill('0'.charCodeAt(0));
    for (var i = bignum.length - 1; i >= 0; --i) {
        var carry = bignum[i];
        for (var j = 0; j < result.length; ++j) {
            var x = ((result[j] - '0'.charCodeAt(0)) << 8) + carry;
            result[j] = '0'.charCodeAt(0) + x % 10;
            carry = (x / 10) | 0;
        }
        while (carry) {
            result.push('0'.charCodeAt(0) + carry % 10);
            carry = (carry / 10) | 0;
        }
    }
    result.reverse();
    return String.fromCharCode.apply(String, __spreadArray([], __read(result), false));
};
exports.binaryToDecimal = binaryToDecimal;
/**
 * Convert `bignum` to a signed decimal number
 *
 * @param minDigits 0-pad result to this many digits
 */
var signedBinaryToDecimal = function (bignum, minDigits) {
    if (minDigits === void 0) { minDigits = 1; }
    if ((0, exports.isNegative)(bignum)) {
        var x = bignum.slice();
        (0, exports.negate)(x);
        return '-' + (0, exports.binaryToDecimal)(x, minDigits);
    }
    return (0, exports.binaryToDecimal)(bignum, minDigits);
};
exports.signedBinaryToDecimal = signedBinaryToDecimal;
var base58ToBinaryVarSize = function (s) {
    var e_1, _a;
    var result = [];
    for (var i = 0; i < s.length; ++i) {
        var carry = base58Map[s.charCodeAt(i)];
        if (carry < 0) {
            throw new Error('invalid base-58 value');
        }
        for (var j = 0; j < result.length; ++j) {
            var x = result[j] * 58 + carry;
            result[j] = x & 0xff;
            carry = x >> 8;
        }
        if (carry) {
            result.push(carry);
        }
    }
    try {
        for (var s_1 = __values(s), s_1_1 = s_1.next(); !s_1_1.done; s_1_1 = s_1.next()) {
            var ch = s_1_1.value;
            if (ch === '1') {
                result.push(0);
            }
            else {
                break;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (s_1_1 && !s_1_1.done && (_a = s_1.return)) _a.call(s_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    result.reverse();
    return new Uint8Array(result);
};
/**
 * Convert an unsigned base-58 number in `s` to a bignum
 *
 * @param size bignum size (bytes)
 */
var base58ToBinary = function (size, s) {
    if (!size) {
        return base58ToBinaryVarSize(s);
    }
    var result = new Uint8Array(size);
    for (var i = 0; i < s.length; ++i) {
        var carry = base58Map[s.charCodeAt(i)];
        if (carry < 0) {
            throw new Error('invalid base-58 value');
        }
        for (var j = 0; j < size; ++j) {
            var x = result[j] * 58 + carry;
            result[j] = x;
            carry = x >> 8;
        }
        if (carry) {
            throw new Error('base-58 value is out of range');
        }
    }
    result.reverse();
    return result;
};
exports.base58ToBinary = base58ToBinary;
/**
 * Convert `bignum` to a base-58 number
 *
 * @param minDigits 0-pad result to this many digits
 */
var binaryToBase58 = function (bignum, minDigits) {
    var e_2, _a, e_3, _b;
    if (minDigits === void 0) { minDigits = 1; }
    var result = [];
    try {
        for (var bignum_1 = __values(bignum), bignum_1_1 = bignum_1.next(); !bignum_1_1.done; bignum_1_1 = bignum_1.next()) {
            var byte = bignum_1_1.value;
            var carry = byte;
            for (var j = 0; j < result.length; ++j) {
                var x = (base58Map[result[j]] << 8) + carry;
                result[j] = base58Chars.charCodeAt(x % 58);
                carry = (x / 58) | 0;
            }
            while (carry) {
                result.push(base58Chars.charCodeAt(carry % 58));
                carry = (carry / 58) | 0;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (bignum_1_1 && !bignum_1_1.done && (_a = bignum_1.return)) _a.call(bignum_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    try {
        for (var bignum_2 = __values(bignum), bignum_2_1 = bignum_2.next(); !bignum_2_1.done; bignum_2_1 = bignum_2.next()) {
            var byte = bignum_2_1.value;
            if (byte) {
                break;
            }
            else {
                result.push('1'.charCodeAt(0));
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (bignum_2_1 && !bignum_2_1.done && (_b = bignum_2.return)) _b.call(bignum_2);
        }
        finally { if (e_3) throw e_3.error; }
    }
    result.reverse();
    return String.fromCharCode.apply(String, __spreadArray([], __read(result), false));
};
exports.binaryToBase58 = binaryToBase58;
/** Convert an unsigned base-64 number in `s` to a bignum */
var base64ToBinary = function (s) {
    var len = s.length;
    if ((len & 3) === 1 && s[len - 1] === '=') {
        len -= 1;
    } // fc appends an extra '='
    if ((len & 3) !== 0) {
        throw new Error('base-64 value is not padded correctly');
    }
    var groups = len >> 2;
    var bytes = groups * 3;
    if (len > 0 && s[len - 1] === '=') {
        if (s[len - 2] === '=') {
            bytes -= 2;
        }
        else {
            bytes -= 1;
        }
    }
    var result = new Uint8Array(bytes);
    for (var group = 0; group < groups; ++group) {
        var digit0 = base64Map[s.charCodeAt(group * 4 + 0)];
        var digit1 = base64Map[s.charCodeAt(group * 4 + 1)];
        var digit2 = base64Map[s.charCodeAt(group * 4 + 2)];
        var digit3 = base64Map[s.charCodeAt(group * 4 + 3)];
        result[group * 3 + 0] = (digit0 << 2) | (digit1 >> 4);
        if (group * 3 + 1 < bytes) {
            result[group * 3 + 1] = ((digit1 & 15) << 4) | (digit2 >> 2);
        }
        if (group * 3 + 2 < bytes) {
            result[group * 3 + 2] = ((digit2 & 3) << 6) | digit3;
        }
    }
    return result;
};
exports.base64ToBinary = base64ToBinary;
/** Key types this library supports */
var KeyType;
(function (KeyType) {
    KeyType[KeyType["k1"] = 0] = "k1";
    KeyType[KeyType["r1"] = 1] = "r1";
    KeyType[KeyType["wa"] = 2] = "wa";
})(KeyType = exports.KeyType || (exports.KeyType = {}));
/** Public key data size, excluding type field */
exports.publicKeyDataSize = 33;
/** Private key data size, excluding type field */
exports.privateKeyDataSize = 32;
/** Signature data size, excluding type field */
exports.signatureDataSize = 65;
var digestSuffixRipemd160 = function (data, suffix) {
    var d = new Uint8Array(data.length + suffix.length);
    for (var i = 0; i < data.length; ++i) {
        d[i] = data[i];
    }
    for (var i = 0; i < suffix.length; ++i) {
        d[data.length + i] = suffix.charCodeAt(i);
    }
    return ripemd160(d);
};
var stringToKey = function (s, type, size, suffix) {
    var whole = (0, exports.base58ToBinary)(size ? size + 4 : 0, s);
    var result = { type: type, data: new Uint8Array(whole.buffer, 0, whole.length - 4) };
    var digest = new Uint8Array(digestSuffixRipemd160(result.data, suffix));
    if (digest[0] !== whole[whole.length - 4] || digest[1] !== whole[whole.length - 3]
        || digest[2] !== whole[whole.length - 2] || digest[3] !== whole[whole.length - 1]) {
        throw new Error('checksum doesn\'t match');
    }
    return result;
};
var keyToString = function (key, suffix, prefix) {
    var digest = new Uint8Array(digestSuffixRipemd160(key.data, suffix));
    var whole = new Uint8Array(key.data.length + 4);
    for (var i = 0; i < key.data.length; ++i) {
        whole[i] = key.data[i];
    }
    for (var i = 0; i < 4; ++i) {
        whole[i + key.data.length] = digest[i];
    }
    return prefix + (0, exports.binaryToBase58)(whole);
};
/** Convert key in `s` to binary form */
var stringToPublicKey = function (s) {
    if (typeof s !== 'string') {
        throw new Error('expected string containing public key');
    }
    if (s.substr(0, 3) === 'EOS') {
        var whole = (0, exports.base58ToBinary)(exports.publicKeyDataSize + 4, s.substr(3));
        var key = { type: KeyType.k1, data: new Uint8Array(exports.publicKeyDataSize) };
        for (var i = 0; i < exports.publicKeyDataSize; ++i) {
            key.data[i] = whole[i];
        }
        var digest = new Uint8Array(ripemd160(key.data));
        if (digest[0] !== whole[exports.publicKeyDataSize] || digest[1] !== whole[34]
            || digest[2] !== whole[35] || digest[3] !== whole[36]) {
            throw new Error('checksum doesn\'t match');
        }
        return key;
    }
    else if (s.substr(0, 7) === 'PUB_K1_') {
        return stringToKey(s.substr(7), KeyType.k1, exports.publicKeyDataSize, 'K1');
    }
    else if (s.substr(0, 7) === 'PUB_R1_') {
        return stringToKey(s.substr(7), KeyType.r1, exports.publicKeyDataSize, 'R1');
    }
    else if (s.substr(0, 7) === 'PUB_WA_') {
        return stringToKey(s.substr(7), KeyType.wa, 0, 'WA');
    }
    else {
        throw new Error('unrecognized public key format');
    }
};
exports.stringToPublicKey = stringToPublicKey;
/** Convert public `key` to legacy string (base-58) form */
var publicKeyToLegacyString = function (key) {
    if (key.type === KeyType.k1 && key.data.length === exports.publicKeyDataSize) {
        return keyToString(key, '', 'EOS');
    }
    else if (key.type === KeyType.r1 || key.type === KeyType.wa) {
        throw new Error('Key format not supported in legacy conversion');
    }
    else {
        throw new Error('unrecognized public key format');
    }
};
exports.publicKeyToLegacyString = publicKeyToLegacyString;
/** Convert `key` to string (base-58) form */
var publicKeyToString = function (key) {
    if (key.type === KeyType.k1 && key.data.length === exports.publicKeyDataSize) {
        return keyToString(key, 'K1', 'PUB_K1_');
    }
    else if (key.type === KeyType.r1 && key.data.length === exports.publicKeyDataSize) {
        return keyToString(key, 'R1', 'PUB_R1_');
    }
    else if (key.type === KeyType.wa) {
        return keyToString(key, 'WA', 'PUB_WA_');
    }
    else {
        throw new Error('unrecognized public key format');
    }
};
exports.publicKeyToString = publicKeyToString;
/** If a key is in the legacy format (`EOS` prefix), then convert it to the new format (`PUB_K1_`).
 * Leaves other formats untouched
 */
var convertLegacyPublicKey = function (s) {
    if (s.substr(0, 3) === 'EOS') {
        return (0, exports.publicKeyToString)((0, exports.stringToPublicKey)(s));
    }
    return s;
};
exports.convertLegacyPublicKey = convertLegacyPublicKey;
/** If a key is in the legacy format (`EOS` prefix), then convert it to the new format (`PUB_K1_`).
 * Leaves other formats untouched
 */
var convertLegacyPublicKeys = function (keys) {
    return keys.map(exports.convertLegacyPublicKey);
};
exports.convertLegacyPublicKeys = convertLegacyPublicKeys;
/** Convert key in `s` to binary form */
var stringToPrivateKey = function (s) {
    if (typeof s !== 'string') {
        throw new Error('expected string containing private key');
    }
    if (s.substr(0, 7) === 'PVT_R1_') {
        return stringToKey(s.substr(7), KeyType.r1, exports.privateKeyDataSize, 'R1');
    }
    else if (s.substr(0, 7) === 'PVT_K1_') {
        return stringToKey(s.substr(7), KeyType.k1, exports.privateKeyDataSize, 'K1');
    }
    else {
        // todo: Verify checksum: sha256(sha256(key.data)).
        //       Not critical since a bad key will fail to produce a
        //       valid signature anyway.
        var whole = (0, exports.base58ToBinary)(exports.privateKeyDataSize + 5, s);
        var key = { type: KeyType.k1, data: new Uint8Array(exports.privateKeyDataSize) };
        if (whole[0] !== 0x80) {
            throw new Error('unrecognized private key type');
        }
        for (var i = 0; i < exports.privateKeyDataSize; ++i) {
            key.data[i] = whole[i + 1];
        }
        return key;
    }
};
exports.stringToPrivateKey = stringToPrivateKey;
/** Convert private `key` to legacy string (base-58) form */
var privateKeyToLegacyString = function (key) {
    if (key.type === KeyType.k1 && key.data.length === exports.privateKeyDataSize) {
        var whole_1 = [];
        whole_1.push(128);
        key.data.forEach(function (byte) { return whole_1.push(byte); });
        var digest = new Uint8Array((0, hash_js_1.sha256)().update((0, hash_js_1.sha256)().update(whole_1).digest()).digest());
        var result = new Uint8Array(exports.privateKeyDataSize + 5);
        for (var i = 0; i < whole_1.length; i++) {
            result[i] = whole_1[i];
        }
        for (var i = 0; i < 4; i++) {
            result[i + whole_1.length] = digest[i];
        }
        return (0, exports.binaryToBase58)(result);
    }
    else if (key.type === KeyType.r1 || key.type === KeyType.wa) {
        throw new Error('Key format not supported in legacy conversion');
    }
    else {
        throw new Error('unrecognized public key format');
    }
};
exports.privateKeyToLegacyString = privateKeyToLegacyString;
/** Convert `key` to string (base-58) form */
var privateKeyToString = function (key) {
    if (key.type === KeyType.r1) {
        return keyToString(key, 'R1', 'PVT_R1_');
    }
    else if (key.type === KeyType.k1) {
        return keyToString(key, 'K1', 'PVT_K1_');
    }
    else {
        throw new Error('unrecognized private key format');
    }
};
exports.privateKeyToString = privateKeyToString;
/** Convert key in `s` to binary form */
var stringToSignature = function (s) {
    if (typeof s !== 'string') {
        throw new Error('expected string containing signature');
    }
    if (s.substr(0, 7) === 'SIG_K1_') {
        return stringToKey(s.substr(7), KeyType.k1, exports.signatureDataSize, 'K1');
    }
    else if (s.substr(0, 7) === 'SIG_R1_') {
        return stringToKey(s.substr(7), KeyType.r1, exports.signatureDataSize, 'R1');
    }
    else if (s.substr(0, 7) === 'SIG_WA_') {
        return stringToKey(s.substr(7), KeyType.wa, 0, 'WA');
    }
    else {
        throw new Error('unrecognized signature format');
    }
};
exports.stringToSignature = stringToSignature;
/** Convert `signature` to string (base-58) form */
var signatureToString = function (signature) {
    if (signature.type === KeyType.k1) {
        return keyToString(signature, 'K1', 'SIG_K1_');
    }
    else if (signature.type === KeyType.r1) {
        return keyToString(signature, 'R1', 'SIG_R1_');
    }
    else if (signature.type === KeyType.wa) {
        return keyToString(signature, 'WA', 'SIG_WA_');
    }
    else {
        throw new Error('unrecognized signature format');
    }
};
exports.signatureToString = signatureToString;


/***/ }),

/***/ "./src/eosjs-rpcerror.ts":
/*!*******************************!*\
  !*** ./src/eosjs-rpcerror.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports) {


/**
 * @module RPC-Error
 */
// copyright defined in eosjs/LICENSE.txt
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RpcError = void 0;
/** Holds detailed error information */
var RpcError = /** @class */ (function (_super) {
    __extends(RpcError, _super);
    function RpcError(json) {
        var _this = this;
        if (json.error && json.error.details && json.error.details.length && json.error.details[0].message) {
            _this = _super.call(this, json.error.details[0].message) || this;
            _this.details = json.error.details;
        }
        else if (json.processed && json.processed.except && json.processed.except.message) {
            _this = _super.call(this, json.processed.except.message) || this;
            _this.details = json.processed.except;
        }
        else if (json.result && json.result.except && json.result.except.message) {
            _this = _super.call(this, json.result.except.message) || this;
            _this.details = json.result.except;
        }
        else {
            _this = _super.call(this, json.message) || this;
        }
        Object.setPrototypeOf(_this, RpcError.prototype);
        _this.json = json;
        return _this;
    }
    return RpcError;
}(Error));
exports.RpcError = RpcError;


/***/ }),

/***/ "./src/rpc-web.ts":
/*!************************!*\
  !*** ./src/rpc-web.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RpcError = exports.JsonRpc = void 0;
var eosjs_jsonrpc_1 = __webpack_require__(/*! ./eosjs-jsonrpc */ "./src/eosjs-jsonrpc.ts");
Object.defineProperty(exports, "JsonRpc", ({ enumerable: true, get: function () { return eosjs_jsonrpc_1.JsonRpc; } }));
var eosjs_rpcerror_1 = __webpack_require__(/*! ./eosjs-rpcerror */ "./src/eosjs-rpcerror.ts");
Object.defineProperty(exports, "RpcError", ({ enumerable: true, get: function () { return eosjs_rpcerror_1.RpcError; } }));


/***/ }),

/***/ "./src/ripemd.js":
/*!***********************!*\
  !*** ./src/ripemd.js ***!
  \***********************/
/***/ ((module) => {

// https://gist.githubusercontent.com/wlzla000/bac83df6d3c51916c4dd0bc947e46947/raw/7ee3462b095ab22580ddaf191f44a590da6fe33b/RIPEMD-160.js

/*
	RIPEMD-160.js

		developed
			by K. (https://github.com/wlzla000)
			on December 27-29, 2017,

		licensed under


		the MIT license

		Copyright (c) 2017 K.

		 Permission is hereby granted, free of charge, to any person
		obtaining a copy of this software and associated documentation
		files (the "Software"), to deal in the Software without
		restriction, including without limitation the rights to use,
		copy, modify, merge, publish, distribute, sublicense, and/or
		sell copies of the Software, and to permit persons to whom the
		Software is furnished to do so, subject to the following
		conditions:

		 The above copyright notice and this permission notice shall be
		included in all copies or substantial portions of the Software.

		 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
		EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
		OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
		NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
		HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
		WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
		FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
		OTHER DEALINGS IN THE SOFTWARE.
*/



class RIPEMD160
{
    constructor()
    {
        // https://webcache.googleusercontent.com/search?q=cache:CnLOgolTHYEJ:https://www.cosic.esat.kuleuven.be/publications/article-317.pdf
        // http://shodhganga.inflibnet.ac.in/bitstream/10603/22978/13/13_appendix.pdf
    }

    static get_n_pad_bytes(message_size /* in bytes, 1 byte is 8 bits. */)
    {
        //  Obtain the number of bytes needed to pad the message.
        // It does not contain the size of the message size information.
        /*
			https://webcache.googleusercontent.com/search?q=cache:CnLOgolTHYEJ:https://www.cosic.esat.kuleuven.be/publications/article-317.pdf

			The Cryptographic Hash Function RIPEMD-160

			written by
				Bart Preneel,
				Hans Dobbertin,
				Antoon Bosselaers
			in
				1997.

			--------------------------------------------------

			§5     Description of RIPEMD-160

			......

			 In order to guarantee that the total input size is a
			multiple of 512 bits, the input is padded in the same
			way as for all the members of the MD4-family: one
			appends a single 1 followed by a string of 0s (the
			number of 0s lies between 0 and 511); the last 64 bits
			of the extended input contain the binary representation
			of the input size in bits, least significant byte first.
		*/
        /*
			https://tools.ietf.org/rfc/rfc1186.txt

			RFC 1186: MD4 Message Digest Algorithm.

			written by
				Ronald Linn Rivest
			in
				October 1990.

			--------------------------------------------------

			§3     MD4 Algorithm Description

			......

			Step 1. Append padding bits

			 The message is "padded" (extended) so that its length
			(in bits) is congruent to 448, modulo 512. That is, the
			message is extended so that it is just 64 bits shy of
			being a multiple of 512 bits long. Padding is always
			performed, even if the length of the message is already
			congruent to 448, modulo 512 (in which case 512 bits of
			padding are added).

			 Padding is performed as follows: a single "1" bit is
			appended to the message, and then enough zero bits are
			appended so that the length in bits of the padded
			message becomes congruent to 448, modulo 512.

			Step 2. Append length

			 A 64-bit representation of b (the length of the message
			before the padding bits were added) is appended to the
			result of the previous step. In the unlikely event that
			b is greater than 2^64, then only the low-order 64 bits
			of b are used. (These bits are appended as two 32-bit
			words and appended low-order word first in accordance
			with the previous conventions.)

			 At this point the resulting message (after padding with
			bits and with b) has a length that is an exact multiple
			of 512 bits. Equivalently, this message has a length
			that is an exact multiple of 16 (32-bit) words. Let
			M[0 ... N-1] denote the words of the resulting message,
			where N is a multiple of 16.
		*/
        // https://crypto.stackexchange.com/a/32407/54568
        /*
			Example case  # 1
				[0 bit: message.]
				[1 bit: 1.]
				[447 bits: 0.]
				[64 bits: message size information.]

			Example case  # 2
				[512-bits: message]
				[1 bit: 1.]
				[447 bits: 0.]
				[64 bits: message size information.]

			Example case  # 3
				[(512 - 64 = 448) bits: message.]
				[1 bit: 1.]
				[511 bits: 0.]
				[64 bits: message size information.]

			Example case  # 4
				[(512 - 65 = 447) bits: message.]
				[1 bit: 1.]
				[0 bit: 0.]
				[64 bits: message size information.]
		*/
        // The number of padding zero bits:
        //      511 - [{(message size in bits) + 64} (mod 512)]
        return 64 - ((message_size + 8) & 0b00111111 /* 63 */);
    }
    static pad(message /* An ArrayBuffer. */)
    {
        const message_size = message.byteLength;
        const n_pad = RIPEMD160.get_n_pad_bytes(message_size);

        //  `Number.MAX_SAFE_INTEGER` is ((2 ** 53) - 1) and
        // bitwise operation in Javascript is done on 32-bits operands.
        const divmod = (dividend, divisor) => [
            Math.floor(dividend / divisor),
            dividend % divisor
        ];
        /*
To shift

   00000000 000????? ???????? ???????? ???????? ???????? ???????? ????????
                                     t o
   00000000 ???????? ???????? ???????? ???????? ???????? ???????? ?????000

--------------------------------------------------------------------------------

Method #1

    00000000 000????? ???????? ????????  ???????? ???????? ???????? ????????
   [00000000 000AAAAA AAAAAAAA AAAAAAAA] (<A> captured)
   [00000000 AAAAAAAA AAAAAAAA AAAAA000] (<A> shifted)
                         (<B> captured) [BBBBBBBB BBBBBBBB BBBBBBBB BBBBBBBB]
                     (<B> shifted) [BBB][BBBBBBBB BBBBBBBB BBBBBBBB BBBBB000]
   [00000000 AAAAAAAA AAAAAAAA AAAAABBB] (<A> & <B_2> merged)
   [00000000 AAAAAAAA AAAAAAAA AAAAABBB][BBBBBBBB BBBBBBBB BBBBBBBB BBBBB000]
    00000000 ???????? ???????? ????????  ???????? ???????? ???????? ?????000

		const uint32_max_plus_1 = 0x100000000; // (2 ** 32)
		const [
			msg_byte_size_most, // Value range [0, (2 ** 21) - 1].
			msg_byte_size_least // Value range [0, (2 ** 32) - 1].
		] = divmod(message_size, uint32_max_plus_1);
		const [
			carry, // Value range [0, 7].
			msg_bit_size_least // Value range [0, (2 ** 32) - 8].
		] = divmod(message_byte_size_least * 8, uint32_max_plus_1);
		const message_bit_size_most = message_byte_size_most * 8
			+ carry; // Value range [0, (2 ** 24) - 1].

--------------------------------------------------------------------------------

Method #2
    00000000 000????? ???????? ????????  ???????? ???????? ???????? ????????
      [00000 000AAAAA AAAAAAAA AAAAAAAA  AAA] (<A> captured)
                         (<B> captured) [000BBBBB BBBBBBBB BBBBBBBB BBBBBBBB]
                          (<B> shifted) [BBBBBBBB BBBBBBBB BBBBBBBB BBBBB000]
   [00000000 AAAAAAAA AAAAAAAA AAAAAAAA][BBBBBBBB BBBBBBBB BBBBBBBB BBBBB000]
    00000000 ???????? ???????? ????????  ???????? ???????? ???????? ?????000

		*/
        const [
            msg_bit_size_most,
            msg_bit_size_least
        ] = divmod(message_size, 536870912 /* (2 ** 29) */)
            .map((x, index) => (index ? (x * 8) : x));

        // `ArrayBuffer.transfer()` is not supported.
        const padded = new Uint8Array(message_size + n_pad + 8);
        padded.set(new Uint8Array(message), 0);
        const data_view = new DataView(padded.buffer);
        data_view.setUint8(message_size, 0b10000000);
        data_view.setUint32(
            message_size + n_pad,
            msg_bit_size_least,
            true // Little-endian
        );
        data_view.setUint32(
            message_size + n_pad + 4,
            msg_bit_size_most,
            true // Little-endian
        );

        return padded.buffer;
    }

    static f(j, x, y, z)
    {
        if(0 <= j && j <= 15)
        { // Exclusive-OR
            return x ^ y ^ z;
        }
        if(16 <= j && j <= 31)
        { // Multiplexing (muxing)
            return (x & y) | (~x & z);
        }
        if(32 <= j && j <= 47)
        {
            return (x | ~y) ^ z;
        }
        if(48 <= j && j <= 63)
        { // Multiplexing (muxing)
            return (x & z) | (y & ~z);
        }
        if(64 <= j && j <= 79)
        {
            return x ^ (y | ~z);
        }
    }
    static K(j)
    {
        if(0 <= j && j <= 15)
        {
            return 0x00000000;
        }
        if(16 <= j && j <= 31)
        {
            // Math.floor((2 ** 30) * Math.SQRT2)
            return 0x5A827999;
        }
        if(32 <= j && j <= 47)
        {
            // Math.floor((2 ** 30) * Math.sqrt(3))
            return 0x6ED9EBA1;
        }
        if(48 <= j && j <= 63)
        {
            // Math.floor((2 ** 30) * Math.sqrt(5))
            return 0x8F1BBCDC;
        }
        if(64 <= j && j <= 79)
        {
            // Math.floor((2 ** 30) * Math.sqrt(7))
            return 0xA953FD4E;
        }
    }
    static KP(j) // K'
    {
        if(0 <= j && j <= 15)
        {
            // Math.floor((2 ** 30) * Math.cbrt(2))
            return 0x50A28BE6;
        }
        if(16 <= j && j <= 31)
        {
            // Math.floor((2 ** 30) * Math.cbrt(3))
            return 0x5C4DD124;
        }
        if(32 <= j && j <= 47)
        {
            // Math.floor((2 ** 30) * Math.cbrt(5))
            return 0x6D703EF3;
        }
        if(48 <= j && j <= 63)
        {
            // Math.floor((2 ** 30) * Math.cbrt(7))
            return 0x7A6D76E9;
        }
        if(64 <= j && j <= 79)
        {
            return 0x00000000;
        }
    }
    static add_modulo32(/* ...... */)
    {
        // 1.  Modulo addition (addition modulo) is associative.
        //    https://proofwiki.org/wiki/Modulo_Addition_is_Associative
 		// 2.  Bitwise operation in Javascript
        //    is done on 32-bits operands
        //    and results in a 32-bits value.
        return Array
            .from(arguments)
            .reduce((a, b) => (a + b), 0) | 0;
    }
    static rol32(value, count)
    { // Cyclic left shift (rotate) on 32-bits value.
        return (value << count) | (value >>> (32 - count));
    }
    static hash(message /* An ArrayBuffer. */)
    {
        // ////////       Padding       //////////

        // The padded message.
        const padded = RIPEMD160.pad(message);

        // ////////     Compression     //////////

        // Message word selectors.
        const r = [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
            7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
            3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
            1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
            4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
        ];
        const rP = [ // r'
            5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
            6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
            15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
            8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
            12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
        ];

        // Amounts for 'rotate left' operation.
        const s = [
            11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
            7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
            11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
            11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
            9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
        ];
        const sP = [ // s'
            8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
            9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
            9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
            15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
            8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
        ];

        // The size, in bytes, of a word.
        const word_size = 4;

        // The size, in bytes, of a 16-words block.
        const block_size = 64;

        // The number of the 16-words blocks.
        const t = padded.byteLength / block_size;

        //  The message after padding consists of t 16-word blocks that
        // are denoted with X_i[j], with 0≤i≤(t − 1) and 0≤j≤15.
        const X = (new Array(t))
            .fill(undefined)
            .map((_, i) => j => (
                new DataView(
                    padded, i * block_size, block_size
                ).getUint32(
                    j * word_size,
                    true // Little-endian
                )
            ));

        //  The result of RIPEMD-160 is contained in five 32-bit words,
        // which form the internal state of the algorithm. The final
        // content of these five 32-bit words is converted to a 160-bit
        // string, again using the little-endian convention.
        const h = [
            0x67452301, // h_0
            0xEFCDAB89, // h_1
            0x98BADCFE, // h_2
            0x10325476, // h_3
            0xC3D2E1F0  // h_4
        ];

        for(let i = 0; i < t; ++i)
        {
            let A = h[0]; let B = h[1]; let C = h[2]; let D = h[3]; let E = h[4];
            let AP = A; let BP = B; let CP = C; let DP = D; let EP = E;
            for(let j = 0; j < 80; ++j)
            {
                // Left rounds
                let T = RIPEMD160.add_modulo32( // eslint-disable-line no-shadow
                    RIPEMD160.rol32(
                        RIPEMD160.add_modulo32(
                            A,
                            RIPEMD160.f(j, B, C, D),
                            X[i](r[j]),
                            RIPEMD160.K(j)
                        ),
                        s[j]
                    ),
                    E
                );
                A = E;
                E = D;
                D = RIPEMD160.rol32(C, 10);
                C = B;
                B = T;

                // Right rounds
                T = RIPEMD160.add_modulo32(
                    RIPEMD160.rol32(
                        RIPEMD160.add_modulo32(
                            AP,
                            RIPEMD160.f(
                                79 - j,
                                BP,
                                CP,
                                DP
                            ),
                            X[i](rP[j]),
                            RIPEMD160.KP(j)
                        ),
                        sP[j]
                    ),
                    EP
                );
                AP = EP;
                EP = DP;
                DP = RIPEMD160.rol32(CP, 10);
                CP = BP;
                BP = T;
            }
            const T = RIPEMD160.add_modulo32(h[1], C, DP);
            h[1] = RIPEMD160.add_modulo32(h[2], D, EP);
            h[2] = RIPEMD160.add_modulo32(h[3], E, AP);
            h[3] = RIPEMD160.add_modulo32(h[4], A, BP);
            h[4] = RIPEMD160.add_modulo32(h[0], B, CP);
            h[0] = T;
        }

        //  The final output string then consists of the concatenatation
        // of h_0, h_1, h_2, h_3, and h_4 after converting each h_i to a
        // 4-byte string using the little-endian convention.
        const result = new ArrayBuffer(20);
        const data_view = new DataView(result);
        h.forEach((h_i, i) => data_view.setUint32(i * 4, h_i, true));
        return result;
    }
}

module.exports = {
    RIPEMD160
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"eosjs_jsonrpc": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk_name_"] = self["webpackChunk_name_"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["externals"], () => (__webpack_require__("./src/rpc-web.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	eosjs_jsonrpc = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsNkJBQTZCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZOztBQUVaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVCQUF1QixPQUFPO0FBQzlCO0FBQ0EsMEJBQTBCLGNBQWMsY0FBYyxjQUFjO0FBQ3BFLHdCQUF3QixZQUFZLFlBQVksWUFBWTtBQUM1RCwyQkFBMkIsUUFBUTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O1VDdmRBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQzVCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ0pBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL1tuYW1lXS8uL3NyYy9lb3Nqcy1qc29ucnBjLnRzIiwid2VicGFjazovL1tuYW1lXS8uL3NyYy9lb3Nqcy1udW1lcmljLnRzIiwid2VicGFjazovL1tuYW1lXS8uL3NyYy9lb3Nqcy1ycGNlcnJvci50cyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9zcmMvcnBjLXdlYi50cyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9zcmMvcmlwZW1kLmpzIiwid2VicGFjazovL1tuYW1lXS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vW25hbWVdL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vW25hbWVdL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG4vKipcclxuICogQG1vZHVsZSBKU09OLVJQQ1xyXG4gKi9cclxuLy8gY29weXJpZ2h0IGRlZmluZWQgaW4gZW9zanMvTElDRU5TRS50eHRcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn07XHJcbnZhciBfX3ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX192YWx1ZXMpIHx8IGZ1bmN0aW9uKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuSnNvblJwYyA9IHZvaWQgMDtcclxudmFyIGVvc2pzX251bWVyaWNfMSA9IHJlcXVpcmUoXCIuL2Vvc2pzLW51bWVyaWNcIik7XHJcbnZhciBlb3Nqc19ycGNlcnJvcl8xID0gcmVxdWlyZShcIi4vZW9zanMtcnBjZXJyb3JcIik7XHJcbnZhciBhcnJheVRvSGV4ID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgIHZhciBlXzEsIF9hO1xyXG4gICAgdmFyIHJlc3VsdCA9ICcnO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBmb3IgKHZhciBkYXRhXzEgPSBfX3ZhbHVlcyhkYXRhKSwgZGF0YV8xXzEgPSBkYXRhXzEubmV4dCgpOyAhZGF0YV8xXzEuZG9uZTsgZGF0YV8xXzEgPSBkYXRhXzEubmV4dCgpKSB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gZGF0YV8xXzEudmFsdWU7XHJcbiAgICAgICAgICAgIHJlc3VsdCArPSAoJzAwJyArIHgudG9TdHJpbmcoMTYpKS5zbGljZSgtMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhXzFfMSAmJiAhZGF0YV8xXzEuZG9uZSAmJiAoX2EgPSBkYXRhXzEucmV0dXJuKSkgX2EuY2FsbChkYXRhXzEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG4vKiogTWFrZSBSUEMgY2FsbHMgKi9cclxudmFyIEpzb25ScGMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBhcmdzXHJcbiAgICAgKiBgZmV0Y2hgOlxyXG4gICAgICogYnJvd3NlcnM6IGxlYXZlIGBudWxsYCBvciBgdW5kZWZpbmVkYFxyXG4gICAgICogbm9kZTogcHJvdmlkZSBhbiBpbXBsZW1lbnRhdGlvblxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBKc29uUnBjKGVuZHBvaW50LCBhcmdzKSB7XHJcbiAgICAgICAgaWYgKGFyZ3MgPT09IHZvaWQgMCkgeyBhcmdzID0ge307IH1cclxuICAgICAgICB0aGlzLmVuZHBvaW50ID0gZW5kcG9pbnQucmVwbGFjZSgvXFwvJC8sICcnKTtcclxuICAgICAgICBpZiAoYXJncy5mZXRjaCkge1xyXG4gICAgICAgICAgICB0aGlzLmZldGNoQnVpbHRpbiA9IGFyZ3MuZmV0Y2g7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmZldGNoQnVpbHRpbiA9IGdsb2JhbC5mZXRjaDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKiogUG9zdCBgYm9keWAgdG8gYGVuZHBvaW50ICsgcGF0aGAuIFRocm93cyBkZXRhaWxlZCBlcnJvciBpbmZvcm1hdGlvbiBpbiBgUnBjRXJyb3JgIHdoZW4gYXZhaWxhYmxlLiAqL1xyXG4gICAgSnNvblJwYy5wcm90b3R5cGUuZmV0Y2ggPSBmdW5jdGlvbiAocGF0aCwgYm9keSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3BvbnNlLCBqc29uLCBmLCBlXzI7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMCwgMywgLCA0XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGYgPSB0aGlzLmZldGNoQnVpbHRpbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZih0aGlzLmVuZHBvaW50ICsgcGF0aCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlc3BvbnNlLmpzb24oKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBqc29uID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoanNvbi5wcm9jZXNzZWQgJiYganNvbi5wcm9jZXNzZWQuZXhjZXB0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZW9zanNfcnBjZXJyb3JfMS5ScGNFcnJvcihqc29uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChqc29uLnJlc3VsdCAmJiBqc29uLnJlc3VsdC5leGNlcHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBlb3Nqc19ycGNlcnJvcl8xLlJwY0Vycm9yKGpzb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZV8yID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlXzIuaXNGZXRjaEVycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZV8yO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVvc2pzX3JwY2Vycm9yXzEuUnBjRXJyb3IoanNvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGpzb25dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBKc29uUnBjLnByb3RvdHlwZS5hYmlfYmluX3RvX2pzb24gPSBmdW5jdGlvbiAoY29kZSwgYWN0aW9uLCBiaW5hcmdzKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmZldGNoKCcvdjEvY2hhaW4vYWJpX2Jpbl90b19qc29uJywgeyBjb2RlOiBjb2RlLCBhY3Rpb246IGFjdGlvbiwgYmluYXJnczogYmluYXJncyB9KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Euc2VudCgpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgSnNvblJwYy5wcm90b3R5cGUuYWJpX2pzb25fdG9fYmluID0gZnVuY3Rpb24gKGNvZGUsIGFjdGlvbiwgYXJncykge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5mZXRjaCgnL3YxL2NoYWluL2FiaV9qc29uX3RvX2JpbicsIHsgY29kZTogY29kZSwgYWN0aW9uOiBhY3Rpb24sIGFyZ3M6IGFyZ3MgfSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKiBSYXcgY2FsbCB0byBgL3YxL2NoYWluL2dldF9hYmlgICovXHJcbiAgICBKc29uUnBjLnByb3RvdHlwZS5nZXRfYWJpID0gZnVuY3Rpb24gKGFjY291bnROYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmZldGNoKCcvdjEvY2hhaW4vZ2V0X2FiaScsIHsgYWNjb3VudF9uYW1lOiBhY2NvdW50TmFtZSB9KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Euc2VudCgpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIFJhdyBjYWxsIHRvIGAvdjEvY2hhaW4vZ2V0X2FjY291bnRgICovXHJcbiAgICBKc29uUnBjLnByb3RvdHlwZS5nZXRfYWNjb3VudCA9IGZ1bmN0aW9uIChhY2NvdW50TmFtZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5mZXRjaCgnL3YxL2NoYWluL2dldF9hY2NvdW50JywgeyBhY2NvdW50X25hbWU6IGFjY291bnROYW1lIH0pXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYS5zZW50KCldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKiogUmF3IGNhbGwgdG8gYC92MS9jaGFpbi9nZXRfYWNjb3VudHNfYnlfYXV0aG9yaXplcnNgICovXHJcbiAgICBKc29uUnBjLnByb3RvdHlwZS5nZXRfYWNjb3VudHNfYnlfYXV0aG9yaXplcnMgPSBmdW5jdGlvbiAoYWNjb3VudHMsIGtleXMpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZmV0Y2goJy92MS9jaGFpbi9nZXRfYWNjb3VudHNfYnlfYXV0aG9yaXplcnMnLCB7IGFjY291bnRzOiBhY2NvdW50cywga2V5czoga2V5cyB9KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Euc2VudCgpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIFJhdyBjYWxsIHRvIGBnZXRfYWN0aXZhdGVkX3Byb3RvY29sX2ZlYXR1cmVzYCAqL1xyXG4gICAgSnNvblJwYy5wcm90b3R5cGUuZ2V0X2FjdGl2YXRlZF9wcm90b2NvbF9mZWF0dXJlcyA9IGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgIHZhciBfYiA9IF9hLmxpbWl0LCBsaW1pdCA9IF9iID09PSB2b2lkIDAgPyAxMCA6IF9iLCBfYyA9IF9hLnNlYXJjaF9ieV9ibG9ja19udW0sIHNlYXJjaF9ieV9ibG9ja19udW0gPSBfYyA9PT0gdm9pZCAwID8gZmFsc2UgOiBfYywgX2QgPSBfYS5yZXZlcnNlLCByZXZlcnNlID0gX2QgPT09IHZvaWQgMCA/IGZhbHNlIDogX2QsIF9lID0gX2EubG93ZXJfYm91bmQsIGxvd2VyX2JvdW5kID0gX2UgPT09IHZvaWQgMCA/IG51bGwgOiBfZSwgX2YgPSBfYS51cHBlcl9ib3VuZCwgdXBwZXJfYm91bmQgPSBfZiA9PT0gdm9pZCAwID8gbnVsbCA6IF9mO1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfZykge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfZy5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5mZXRjaCgnL3YxL2NoYWluL2dldF9hY3RpdmF0ZWRfcHJvdG9jb2xfZmVhdHVyZXMnLCB7IGxvd2VyX2JvdW5kOiBsb3dlcl9ib3VuZCwgdXBwZXJfYm91bmQ6IHVwcGVyX2JvdW5kLCBsaW1pdDogbGltaXQsIHNlYXJjaF9ieV9ibG9ja19udW06IHNlYXJjaF9ieV9ibG9ja19udW0sIHJldmVyc2U6IHJldmVyc2UgfSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9nLnNlbnQoKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKiBSYXcgY2FsbCB0byBgL3YxL2NoYWluL2dldF9ibG9ja19oZWFkZXJfc3RhdGVgICovXHJcbiAgICBKc29uUnBjLnByb3RvdHlwZS5nZXRfYmxvY2tfaGVhZGVyX3N0YXRlID0gZnVuY3Rpb24gKGJsb2NrTnVtT3JJZCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5mZXRjaCgnL3YxL2NoYWluL2dldF9ibG9ja19oZWFkZXJfc3RhdGUnLCB7IGJsb2NrX251bV9vcl9pZDogYmxvY2tOdW1PcklkIH0pXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYS5zZW50KCldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKiogUmF3IGNhbGwgdG8gYC92MS9jaGFpbi9nZXRfYmxvY2tfaW5mb2AgKi9cclxuICAgIEpzb25ScGMucHJvdG90eXBlLmdldF9ibG9ja19pbmZvID0gZnVuY3Rpb24gKGJsb2NrTnVtKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmZldGNoKCcvdjEvY2hhaW4vZ2V0X2Jsb2NrX2luZm8nLCB7IGJsb2NrX251bTogYmxvY2tOdW0gfSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKiBSYXcgY2FsbCB0byBgL3YxL2NoYWluL2dldF9ibG9ja2AgKi9cclxuICAgIEpzb25ScGMucHJvdG90eXBlLmdldF9ibG9jayA9IGZ1bmN0aW9uIChibG9ja051bU9ySWQpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZmV0Y2goJy92MS9jaGFpbi9nZXRfYmxvY2snLCB7IGJsb2NrX251bV9vcl9pZDogYmxvY2tOdW1PcklkIH0pXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYS5zZW50KCldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKiogUmF3IGNhbGwgdG8gYC92MS9jaGFpbi9nZXRfY29kZWAgKi9cclxuICAgIEpzb25ScGMucHJvdG90eXBlLmdldF9jb2RlID0gZnVuY3Rpb24gKGFjY291bnROYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmZldGNoKCcvdjEvY2hhaW4vZ2V0X2NvZGUnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2NvdW50X25hbWU6IGFjY291bnROYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZV9hc193YXNtOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYS5zZW50KCldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKiogUmF3IGNhbGwgdG8gYC92MS9jaGFpbi9nZXRfY29kZV9oYXNoYCAqL1xyXG4gICAgSnNvblJwYy5wcm90b3R5cGUuZ2V0X2NvZGVfaGFzaCA9IGZ1bmN0aW9uIChhY2NvdW50TmFtZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5mZXRjaCgnL3YxL2NoYWluL2dldF9jb2RlX2hhc2gnLCB7IGFjY291bnRfbmFtZTogYWNjb3VudE5hbWUgfSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKiBSYXcgY2FsbCB0byBgL3YxL2NoYWluL2dldF9jdXJyZW5jeV9iYWxhbmNlYCAqL1xyXG4gICAgSnNvblJwYy5wcm90b3R5cGUuZ2V0X2N1cnJlbmN5X2JhbGFuY2UgPSBmdW5jdGlvbiAoY29kZSwgYWNjb3VudCwgc3ltYm9sKSB7XHJcbiAgICAgICAgaWYgKHN5bWJvbCA9PT0gdm9pZCAwKSB7IHN5bWJvbCA9IG51bGw7IH1cclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZmV0Y2goJy92MS9jaGFpbi9nZXRfY3VycmVuY3lfYmFsYW5jZScsIHsgY29kZTogY29kZSwgYWNjb3VudDogYWNjb3VudCwgc3ltYm9sOiBzeW1ib2wgfSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKiBSYXcgY2FsbCB0byBgL3YxL2NoYWluL2dldF9jdXJyZW5jeV9zdGF0c2AgKi9cclxuICAgIEpzb25ScGMucHJvdG90eXBlLmdldF9jdXJyZW5jeV9zdGF0cyA9IGZ1bmN0aW9uIChjb2RlLCBzeW1ib2wpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZmV0Y2goJy92MS9jaGFpbi9nZXRfY3VycmVuY3lfc3RhdHMnLCB7IGNvZGU6IGNvZGUsIHN5bWJvbDogc3ltYm9sIH0pXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYS5zZW50KCldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKiogUmF3IGNhbGwgdG8gYC92MS9jaGFpbi9nZXRfaW5mb2AgKi9cclxuICAgIEpzb25ScGMucHJvdG90eXBlLmdldF9pbmZvID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5mZXRjaCgnL3YxL2NoYWluL2dldF9pbmZvJywge30pXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYS5zZW50KCldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKiogUmF3IGNhbGwgdG8gYC92MS9jaGFpbi9nZXRfcHJvZHVjZXJfc2NoZWR1bGVgICovXHJcbiAgICBKc29uUnBjLnByb3RvdHlwZS5nZXRfcHJvZHVjZXJfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmZldGNoKCcvdjEvY2hhaW4vZ2V0X3Byb2R1Y2VyX3NjaGVkdWxlJywge30pXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYS5zZW50KCldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKiogUmF3IGNhbGwgdG8gYC92MS9jaGFpbi9nZXRfcHJvZHVjZXJzYCAqL1xyXG4gICAgSnNvblJwYy5wcm90b3R5cGUuZ2V0X3Byb2R1Y2VycyA9IGZ1bmN0aW9uIChqc29uLCBsb3dlckJvdW5kLCBsaW1pdCkge1xyXG4gICAgICAgIGlmIChqc29uID09PSB2b2lkIDApIHsganNvbiA9IHRydWU7IH1cclxuICAgICAgICBpZiAobG93ZXJCb3VuZCA9PT0gdm9pZCAwKSB7IGxvd2VyQm91bmQgPSAnJzsgfVxyXG4gICAgICAgIGlmIChsaW1pdCA9PT0gdm9pZCAwKSB7IGxpbWl0ID0gNTA7IH1cclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZmV0Y2goJy92MS9jaGFpbi9nZXRfcHJvZHVjZXJzJywgeyBqc29uOiBqc29uLCBsb3dlcl9ib3VuZDogbG93ZXJCb3VuZCwgbGltaXQ6IGxpbWl0IH0pXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYS5zZW50KCldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKiogUmF3IGNhbGwgdG8gYC92MS9jaGFpbi9nZXRfcmF3X2NvZGVfYW5kX2FiaWAgKi9cclxuICAgIEpzb25ScGMucHJvdG90eXBlLmdldF9yYXdfY29kZV9hbmRfYWJpID0gZnVuY3Rpb24gKGFjY291bnROYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmZldGNoKCcvdjEvY2hhaW4vZ2V0X3Jhd19jb2RlX2FuZF9hYmknLCB7IGFjY291bnRfbmFtZTogYWNjb3VudE5hbWUgfSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKiBjYWxscyBgL3YxL2NoYWluL2dldF9yYXdfY29kZV9hbmRfYWJpYCBhbmQgcHVsbHMgb3V0IHVubmVlZGVkIHJhdyB3YXNtIGNvZGUgKi9cclxuICAgIEpzb25ScGMucHJvdG90eXBlLmdldFJhd0FiaSA9IGZ1bmN0aW9uIChhY2NvdW50TmFtZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHJhd0FiaSwgYWJpO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmdldF9yYXdfYWJpKGFjY291bnROYW1lKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByYXdBYmkgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFiaSA9ICgwLCBlb3Nqc19udW1lcmljXzEuYmFzZTY0VG9CaW5hcnkpKHJhd0FiaS5hYmkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgeyBhY2NvdW50TmFtZTogcmF3QWJpLmFjY291bnRfbmFtZSwgYWJpOiBhYmkgfV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKiBSYXcgY2FsbCB0byBgL3YxL2NoYWluL2dldF9yYXdfYWJpYCAqL1xyXG4gICAgSnNvblJwYy5wcm90b3R5cGUuZ2V0X3Jhd19hYmkgPSBmdW5jdGlvbiAoYWNjb3VudE5hbWUpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZmV0Y2goJy92MS9jaGFpbi9nZXRfcmF3X2FiaScsIHsgYWNjb3VudF9uYW1lOiBhY2NvdW50TmFtZSB9KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Euc2VudCgpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIFJhdyBjYWxsIHRvIGAvdjEvY2hhaW4vZ2V0X3NjaGVkdWxlZF90cmFuc2FjdGlvbnNgICovXHJcbiAgICBKc29uUnBjLnByb3RvdHlwZS5nZXRfc2NoZWR1bGVkX3RyYW5zYWN0aW9ucyA9IGZ1bmN0aW9uIChqc29uLCBsb3dlckJvdW5kLCBsaW1pdCkge1xyXG4gICAgICAgIGlmIChqc29uID09PSB2b2lkIDApIHsganNvbiA9IHRydWU7IH1cclxuICAgICAgICBpZiAobG93ZXJCb3VuZCA9PT0gdm9pZCAwKSB7IGxvd2VyQm91bmQgPSAnJzsgfVxyXG4gICAgICAgIGlmIChsaW1pdCA9PT0gdm9pZCAwKSB7IGxpbWl0ID0gNTA7IH1cclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZmV0Y2goJy92MS9jaGFpbi9nZXRfc2NoZWR1bGVkX3RyYW5zYWN0aW9ucycsIHsganNvbjoganNvbiwgbG93ZXJfYm91bmQ6IGxvd2VyQm91bmQsIGxpbWl0OiBsaW1pdCB9KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Euc2VudCgpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIFJhdyBjYWxsIHRvIGAvdjEvY2hhaW4vZ2V0X3RhYmxlX3Jvd3NgICovXHJcbiAgICBKc29uUnBjLnByb3RvdHlwZS5nZXRfdGFibGVfcm93cyA9IGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgIHZhciBfYiA9IF9hLmpzb24sIGpzb24gPSBfYiA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9iLCBjb2RlID0gX2EuY29kZSwgc2NvcGUgPSBfYS5zY29wZSwgdGFibGUgPSBfYS50YWJsZSwgX2MgPSBfYS5sb3dlcl9ib3VuZCwgbG93ZXJfYm91bmQgPSBfYyA9PT0gdm9pZCAwID8gJycgOiBfYywgX2QgPSBfYS51cHBlcl9ib3VuZCwgdXBwZXJfYm91bmQgPSBfZCA9PT0gdm9pZCAwID8gJycgOiBfZCwgX2UgPSBfYS5pbmRleF9wb3NpdGlvbiwgaW5kZXhfcG9zaXRpb24gPSBfZSA9PT0gdm9pZCAwID8gMSA6IF9lLCBfZiA9IF9hLmtleV90eXBlLCBrZXlfdHlwZSA9IF9mID09PSB2b2lkIDAgPyAnJyA6IF9mLCBfZyA9IF9hLmxpbWl0LCBsaW1pdCA9IF9nID09PSB2b2lkIDAgPyAxMCA6IF9nLCBfaCA9IF9hLnJldmVyc2UsIHJldmVyc2UgPSBfaCA9PT0gdm9pZCAwID8gZmFsc2UgOiBfaCwgX2ogPSBfYS5zaG93X3BheWVyLCBzaG93X3BheWVyID0gX2ogPT09IHZvaWQgMCA/IGZhbHNlIDogX2o7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9rKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9rLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmZldGNoKCcvdjEvY2hhaW4vZ2V0X3RhYmxlX3Jvd3MnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc29uOiBqc29uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogY29kZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlOiB0YWJsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvd2VyX2JvdW5kOiBsb3dlcl9ib3VuZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwcGVyX2JvdW5kOiB1cHBlcl9ib3VuZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4X3Bvc2l0aW9uOiBpbmRleF9wb3NpdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleV90eXBlOiBrZXlfdHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0OiBsaW1pdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmVyc2U6IHJldmVyc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93X3BheWVyOiBzaG93X3BheWVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2suc2VudCgpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIFJhdyBjYWxsIHRvIGAvdjEvY2hhaW4vZ2V0X2t2X3RhYmxlX3Jvd3NgICovXHJcbiAgICBKc29uUnBjLnByb3RvdHlwZS5nZXRfa3ZfdGFibGVfcm93cyA9IGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgIHZhciBfYiA9IF9hLmpzb24sIGpzb24gPSBfYiA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9iLCBjb2RlID0gX2EuY29kZSwgdGFibGUgPSBfYS50YWJsZSwgaW5kZXhfbmFtZSA9IF9hLmluZGV4X25hbWUsIF9jID0gX2EuZW5jb2RlX3R5cGUsIGVuY29kZV90eXBlID0gX2MgPT09IHZvaWQgMCA/ICdieXRlcycgOiBfYywgaW5kZXhfdmFsdWUgPSBfYS5pbmRleF92YWx1ZSwgbG93ZXJfYm91bmQgPSBfYS5sb3dlcl9ib3VuZCwgdXBwZXJfYm91bmQgPSBfYS51cHBlcl9ib3VuZCwgX2QgPSBfYS5saW1pdCwgbGltaXQgPSBfZCA9PT0gdm9pZCAwID8gMTAgOiBfZCwgX2UgPSBfYS5yZXZlcnNlLCByZXZlcnNlID0gX2UgPT09IHZvaWQgMCA/IGZhbHNlIDogX2UsIF9mID0gX2Euc2hvd19wYXllciwgc2hvd19wYXllciA9IF9mID09PSB2b2lkIDAgPyBmYWxzZSA6IF9mO1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfZykge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfZy5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5mZXRjaCgnL3YxL2NoYWluL2dldF9rdl90YWJsZV9yb3dzJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganNvbjoganNvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IGNvZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZTogdGFibGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleF9uYW1lOiBpbmRleF9uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5jb2RlX3R5cGU6IGVuY29kZV90eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhfdmFsdWU6IGluZGV4X3ZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG93ZXJfYm91bmQ6IGxvd2VyX2JvdW5kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBwZXJfYm91bmQ6IHVwcGVyX2JvdW5kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IGxpbWl0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2ZXJzZTogcmV2ZXJzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dfcGF5ZXI6IHNob3dfcGF5ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfZy5zZW50KCldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKiogUmF3IGNhbGwgdG8gYC92MS9jaGFpbi9nZXRfdGFibGVfYnlfc2NvcGVgICovXHJcbiAgICBKc29uUnBjLnByb3RvdHlwZS5nZXRfdGFibGVfYnlfc2NvcGUgPSBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICB2YXIgY29kZSA9IF9hLmNvZGUsIHRhYmxlID0gX2EudGFibGUsIF9iID0gX2EubG93ZXJfYm91bmQsIGxvd2VyX2JvdW5kID0gX2IgPT09IHZvaWQgMCA/ICcnIDogX2IsIF9jID0gX2EudXBwZXJfYm91bmQsIHVwcGVyX2JvdW5kID0gX2MgPT09IHZvaWQgMCA/ICcnIDogX2MsIF9kID0gX2EubGltaXQsIGxpbWl0ID0gX2QgPT09IHZvaWQgMCA/IDEwIDogX2Q7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9lKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9lLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmZldGNoKCcvdjEvY2hhaW4vZ2V0X3RhYmxlX2J5X3Njb3BlJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogY29kZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlOiB0YWJsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvd2VyX2JvdW5kOiBsb3dlcl9ib3VuZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwcGVyX2JvdW5kOiB1cHBlcl9ib3VuZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0OiBsaW1pdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9lLnNlbnQoKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKiBHZXQgc3Vic2V0IG9mIGBhdmFpbGFibGVLZXlzYCBuZWVkZWQgdG8gbWVldCBhdXRob3JpdGllcyBpbiBgdHJhbnNhY3Rpb25gLiBJbXBsZW1lbnRzIGBBdXRob3JpdHlQcm92aWRlcmAgKi9cclxuICAgIEpzb25ScGMucHJvdG90eXBlLmdldFJlcXVpcmVkS2V5cyA9IGZ1bmN0aW9uIChhcmdzKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gZW9zanNfbnVtZXJpY18xLmNvbnZlcnRMZWdhY3lQdWJsaWNLZXlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmZldGNoKCcvdjEvY2hhaW4vZ2V0X3JlcXVpcmVkX2tleXMnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb246IGFyZ3MudHJhbnNhY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZhaWxhYmxlX2tleXM6IGFyZ3MuYXZhaWxhYmxlS2V5cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYS5hcHBseSh2b2lkIDAsIFsoX2Iuc2VudCgpKS5yZXF1aXJlZF9rZXlzXSldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKiogUHVzaCBhIHNlcmlhbGl6ZWQgdHJhbnNhY3Rpb24gKHJlcGxhY2VkIGJ5IHNlbmRfdHJhbnNhY3Rpb24sIGJ1dCByZXR1cm5lZCBmb3JtYXQgaGFzIGNoYW5nZWQpICovXHJcbiAgICBKc29uUnBjLnByb3RvdHlwZS5wdXNoX3RyYW5zYWN0aW9uID0gZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgdmFyIHNpZ25hdHVyZXMgPSBfYS5zaWduYXR1cmVzLCBfYiA9IF9hLmNvbXByZXNzaW9uLCBjb21wcmVzc2lvbiA9IF9iID09PSB2b2lkIDAgPyAwIDogX2IsIHNlcmlhbGl6ZWRUcmFuc2FjdGlvbiA9IF9hLnNlcmlhbGl6ZWRUcmFuc2FjdGlvbiwgc2VyaWFsaXplZENvbnRleHRGcmVlRGF0YSA9IF9hLnNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGE7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9jKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmZldGNoKCcvdjEvY2hhaW4vcHVzaF90cmFuc2FjdGlvbicsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZXM6IHNpZ25hdHVyZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wcmVzc2lvbjogY29tcHJlc3Npb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWNrZWRfY29udGV4dF9mcmVlX2RhdGE6IGFycmF5VG9IZXgoc2VyaWFsaXplZENvbnRleHRGcmVlRGF0YSB8fCBuZXcgVWludDhBcnJheSgwKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWNrZWRfdHJ4OiBhcnJheVRvSGV4KHNlcmlhbGl6ZWRUcmFuc2FjdGlvbiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYy5zZW50KCldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKiogUmF3IGNhbGwgdG8gYC92MS9jaGFpbi9wdXNoX3JvX3RyYW5zYWN0aW9uICovXHJcbiAgICBKc29uUnBjLnByb3RvdHlwZS5wdXNoX3JvX3RyYW5zYWN0aW9uID0gZnVuY3Rpb24gKF9hLCByZXR1cm5GYWlsdXJlVHJhY2VzKSB7XHJcbiAgICAgICAgdmFyIHNpZ25hdHVyZXMgPSBfYS5zaWduYXR1cmVzLCBfYiA9IF9hLmNvbXByZXNzaW9uLCBjb21wcmVzc2lvbiA9IF9iID09PSB2b2lkIDAgPyAwIDogX2IsIHNlcmlhbGl6ZWRUcmFuc2FjdGlvbiA9IF9hLnNlcmlhbGl6ZWRUcmFuc2FjdGlvbjtcclxuICAgICAgICBpZiAocmV0dXJuRmFpbHVyZVRyYWNlcyA9PT0gdm9pZCAwKSB7IHJldHVybkZhaWx1cmVUcmFjZXMgPSBmYWxzZTsgfVxyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYykge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYy5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5mZXRjaCgnL3YxL2NoYWluL3B1c2hfcm9fdHJhbnNhY3Rpb24nLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZXM6IHNpZ25hdHVyZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcHJlc3Npb246IGNvbXByZXNzaW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhY2tlZF9jb250ZXh0X2ZyZWVfZGF0YTogYXJyYXlUb0hleChuZXcgVWludDhBcnJheSgwKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFja2VkX3RyeDogYXJyYXlUb0hleChzZXJpYWxpemVkVHJhbnNhY3Rpb24pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybl9mYWlsdXJlX3RyYWNlczogcmV0dXJuRmFpbHVyZVRyYWNlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9jLnNlbnQoKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEpzb25ScGMucHJvdG90eXBlLnB1c2hfdHJhbnNhY3Rpb25zID0gZnVuY3Rpb24gKHRyYW5zYWN0aW9ucykge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHBhY2tlZFRyeHM7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhY2tlZFRyeHMgPSB0cmFuc2FjdGlvbnMubWFwKGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNpZ25hdHVyZXMgPSBfYS5zaWduYXR1cmVzLCBfYiA9IF9hLmNvbXByZXNzaW9uLCBjb21wcmVzc2lvbiA9IF9iID09PSB2b2lkIDAgPyAwIDogX2IsIHNlcmlhbGl6ZWRUcmFuc2FjdGlvbiA9IF9hLnNlcmlhbGl6ZWRUcmFuc2FjdGlvbiwgc2VyaWFsaXplZENvbnRleHRGcmVlRGF0YSA9IF9hLnNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZXM6IHNpZ25hdHVyZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcHJlc3Npb246IGNvbXByZXNzaW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhY2tlZF9jb250ZXh0X2ZyZWVfZGF0YTogYXJyYXlUb0hleChzZXJpYWxpemVkQ29udGV4dEZyZWVEYXRhIHx8IG5ldyBVaW50OEFycmF5KDApKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWNrZWRfdHJ4OiBhcnJheVRvSGV4KHNlcmlhbGl6ZWRUcmFuc2FjdGlvbiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5mZXRjaCgnL3YxL2NoYWluL3B1c2hfdHJhbnNhY3Rpb25zJywgcGFja2VkVHJ4cyldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKiBTZW5kIGEgc2VyaWFsaXplZCB0cmFuc2FjdGlvbiAqL1xyXG4gICAgSnNvblJwYy5wcm90b3R5cGUuc2VuZF90cmFuc2FjdGlvbiA9IGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgIHZhciBzaWduYXR1cmVzID0gX2Euc2lnbmF0dXJlcywgX2IgPSBfYS5jb21wcmVzc2lvbiwgY29tcHJlc3Npb24gPSBfYiA9PT0gdm9pZCAwID8gMCA6IF9iLCBzZXJpYWxpemVkVHJhbnNhY3Rpb24gPSBfYS5zZXJpYWxpemVkVHJhbnNhY3Rpb24sIHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGEgPSBfYS5zZXJpYWxpemVkQ29udGV4dEZyZWVEYXRhO1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYykge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYy5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5mZXRjaCgnL3YxL2NoYWluL3NlbmRfdHJhbnNhY3Rpb24nLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYXR1cmVzOiBzaWduYXR1cmVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcHJlc3Npb246IGNvbXByZXNzaW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFja2VkX2NvbnRleHRfZnJlZV9kYXRhOiBhcnJheVRvSGV4KHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGEgfHwgbmV3IFVpbnQ4QXJyYXkoMCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFja2VkX3RyeDogYXJyYXlUb0hleChzZXJpYWxpemVkVHJhbnNhY3Rpb24pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Muc2VudCgpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIFJhdyBjYWxsIHRvIGAvdjEvZGJfc2l6ZS9nZXRgICovXHJcbiAgICBKc29uUnBjLnByb3RvdHlwZS5kYl9zaXplX2dldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmZldGNoKCcvdjEvZGJfc2l6ZS9nZXQnLCB7fSldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Euc2VudCgpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pOyB9KTtcclxuICAgIH07XHJcbiAgICAvKiogUmF3IGNhbGwgdG8gYC92MS90cmFjZV9hcGkvZ2V0X2Jsb2NrYCAqL1xyXG4gICAgSnNvblJwYy5wcm90b3R5cGUudHJhY2VfZ2V0X2Jsb2NrID0gZnVuY3Rpb24gKGJsb2NrX251bSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5mZXRjaCgnL3YxL3RyYWNlX2FwaS9nZXRfYmxvY2snLCB7IGJsb2NrX251bTogYmxvY2tfbnVtIH0pXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYS5zZW50KCldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKiogUmF3IGNhbGwgdG8gYC92MS9oaXN0b3J5L2dldF9hY3Rpb25zYCAqL1xyXG4gICAgSnNvblJwYy5wcm90b3R5cGUuaGlzdG9yeV9nZXRfYWN0aW9ucyA9IGZ1bmN0aW9uIChhY2NvdW50TmFtZSwgcG9zLCBvZmZzZXQpIHtcclxuICAgICAgICBpZiAocG9zID09PSB2b2lkIDApIHsgcG9zID0gbnVsbDsgfVxyXG4gICAgICAgIGlmIChvZmZzZXQgPT09IHZvaWQgMCkgeyBvZmZzZXQgPSBudWxsOyB9XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmZldGNoKCcvdjEvaGlzdG9yeS9nZXRfYWN0aW9ucycsIHsgYWNjb3VudF9uYW1lOiBhY2NvdW50TmFtZSwgcG9zOiBwb3MsIG9mZnNldDogb2Zmc2V0IH0pXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYS5zZW50KCldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKiogUmF3IGNhbGwgdG8gYC92MS9oaXN0b3J5L2dldF90cmFuc2FjdGlvbmAgKi9cclxuICAgIEpzb25ScGMucHJvdG90eXBlLmhpc3RvcnlfZ2V0X3RyYW5zYWN0aW9uID0gZnVuY3Rpb24gKGlkLCBibG9ja051bUhpbnQpIHtcclxuICAgICAgICBpZiAoYmxvY2tOdW1IaW50ID09PSB2b2lkIDApIHsgYmxvY2tOdW1IaW50ID0gbnVsbDsgfVxyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5mZXRjaCgnL3YxL2hpc3RvcnkvZ2V0X3RyYW5zYWN0aW9uJywgeyBpZDogaWQsIGJsb2NrX251bV9oaW50OiBibG9ja051bUhpbnQgfSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKiBSYXcgY2FsbCB0byBgL3YxL2hpc3RvcnkvZ2V0X2tleV9hY2NvdW50c2AgKi9cclxuICAgIEpzb25ScGMucHJvdG90eXBlLmhpc3RvcnlfZ2V0X2tleV9hY2NvdW50cyA9IGZ1bmN0aW9uIChwdWJsaWNLZXkpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZmV0Y2goJy92MS9oaXN0b3J5L2dldF9rZXlfYWNjb3VudHMnLCB7IHB1YmxpY19rZXk6IHB1YmxpY0tleSB9KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Euc2VudCgpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIFJhdyBjYWxsIHRvIGAvdjEvaGlzdG9yeS9nZXRfY29udHJvbGxlZF9hY2NvdW50c2AgKi9cclxuICAgIEpzb25ScGMucHJvdG90eXBlLmhpc3RvcnlfZ2V0X2NvbnRyb2xsZWRfYWNjb3VudHMgPSBmdW5jdGlvbiAoY29udHJvbGxpbmdBY2NvdW50KSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmZldGNoKCcvdjEvaGlzdG9yeS9nZXRfY29udHJvbGxlZF9hY2NvdW50cycsIHsgY29udHJvbGxpbmdfYWNjb3VudDogY29udHJvbGxpbmdBY2NvdW50IH0pXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYS5zZW50KCldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gSnNvblJwYztcclxufSgpKTsgLy8gSnNvblJwY1xyXG5leHBvcnRzLkpzb25ScGMgPSBKc29uUnBjO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59O1xyXG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xyXG59O1xyXG52YXIgX192YWx1ZXMgPSAodGhpcyAmJiB0aGlzLl9fdmFsdWVzKSB8fCBmdW5jdGlvbihvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnNpZ25hdHVyZVRvU3RyaW5nID0gZXhwb3J0cy5zdHJpbmdUb1NpZ25hdHVyZSA9IGV4cG9ydHMucHJpdmF0ZUtleVRvU3RyaW5nID0gZXhwb3J0cy5wcml2YXRlS2V5VG9MZWdhY3lTdHJpbmcgPSBleHBvcnRzLnN0cmluZ1RvUHJpdmF0ZUtleSA9IGV4cG9ydHMuY29udmVydExlZ2FjeVB1YmxpY0tleXMgPSBleHBvcnRzLmNvbnZlcnRMZWdhY3lQdWJsaWNLZXkgPSBleHBvcnRzLnB1YmxpY0tleVRvU3RyaW5nID0gZXhwb3J0cy5wdWJsaWNLZXlUb0xlZ2FjeVN0cmluZyA9IGV4cG9ydHMuc3RyaW5nVG9QdWJsaWNLZXkgPSBleHBvcnRzLnNpZ25hdHVyZURhdGFTaXplID0gZXhwb3J0cy5wcml2YXRlS2V5RGF0YVNpemUgPSBleHBvcnRzLnB1YmxpY0tleURhdGFTaXplID0gZXhwb3J0cy5LZXlUeXBlID0gZXhwb3J0cy5iYXNlNjRUb0JpbmFyeSA9IGV4cG9ydHMuYmluYXJ5VG9CYXNlNTggPSBleHBvcnRzLmJhc2U1OFRvQmluYXJ5ID0gZXhwb3J0cy5zaWduZWRCaW5hcnlUb0RlY2ltYWwgPSBleHBvcnRzLmJpbmFyeVRvRGVjaW1hbCA9IGV4cG9ydHMuc2lnbmVkRGVjaW1hbFRvQmluYXJ5ID0gZXhwb3J0cy5kZWNpbWFsVG9CaW5hcnkgPSBleHBvcnRzLm5lZ2F0ZSA9IGV4cG9ydHMuaXNOZWdhdGl2ZSA9IHZvaWQgMDtcclxuLyoqXHJcbiAqIEBtb2R1bGUgTnVtZXJpY1xyXG4gKi9cclxudmFyIGhhc2hfanNfMSA9IHJlcXVpcmUoXCJoYXNoLmpzXCIpO1xyXG4vLyBjb3B5cmlnaHQgZGVmaW5lZCBpbiBlb3Nqcy9MSUNFTlNFLnR4dFxyXG52YXIgcmlwZW1kMTYwID0gcmVxdWlyZSgnLi9yaXBlbWQnKS5SSVBFTUQxNjAuaGFzaDtcclxudmFyIGJhc2U1OENoYXJzID0gJzEyMzQ1Njc4OUFCQ0RFRkdISktMTU5QUVJTVFVWV1hZWmFiY2RlZmdoaWprbW5vcHFyc3R1dnd4eXonO1xyXG52YXIgYmFzZTY0Q2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XHJcbnZhciBjcmVhdGVfYmFzZTU4X21hcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBiYXNlNThNID0gQXJyYXkoMjU2KS5maWxsKC0xKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmFzZTU4Q2hhcnMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBiYXNlNThNW2Jhc2U1OENoYXJzLmNoYXJDb2RlQXQoaSldID0gaTtcclxuICAgIH1cclxuICAgIHJldHVybiBiYXNlNThNO1xyXG59O1xyXG52YXIgYmFzZTU4TWFwID0gY3JlYXRlX2Jhc2U1OF9tYXAoKTtcclxudmFyIGNyZWF0ZV9iYXNlNjRfbWFwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGJhc2U2NE0gPSBBcnJheSgyNTYpLmZpbGwoLTEpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiYXNlNjRDaGFycy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGJhc2U2NE1bYmFzZTY0Q2hhcnMuY2hhckNvZGVBdChpKV0gPSBpO1xyXG4gICAgfVxyXG4gICAgYmFzZTY0TVsnPScuY2hhckNvZGVBdCgwKV0gPSAwO1xyXG4gICAgcmV0dXJuIGJhc2U2NE07XHJcbn07XHJcbnZhciBiYXNlNjRNYXAgPSBjcmVhdGVfYmFzZTY0X21hcCgpO1xyXG4vKiogSXMgYGJpZ251bWAgYSBuZWdhdGl2ZSBudW1iZXI/ICovXHJcbnZhciBpc05lZ2F0aXZlID0gZnVuY3Rpb24gKGJpZ251bSkge1xyXG4gICAgcmV0dXJuIChiaWdudW1bYmlnbnVtLmxlbmd0aCAtIDFdICYgMHg4MCkgIT09IDA7XHJcbn07XHJcbmV4cG9ydHMuaXNOZWdhdGl2ZSA9IGlzTmVnYXRpdmU7XHJcbi8qKiBOZWdhdGUgYGJpZ251bWAgKi9cclxudmFyIG5lZ2F0ZSA9IGZ1bmN0aW9uIChiaWdudW0pIHtcclxuICAgIHZhciBjYXJyeSA9IDE7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJpZ251bS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIHZhciB4ID0gKH5iaWdudW1baV0gJiAweGZmKSArIGNhcnJ5O1xyXG4gICAgICAgIGJpZ251bVtpXSA9IHg7XHJcbiAgICAgICAgY2FycnkgPSB4ID4+IDg7XHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydHMubmVnYXRlID0gbmVnYXRlO1xyXG4vKipcclxuICogQ29udmVydCBhbiB1bnNpZ25lZCBkZWNpbWFsIG51bWJlciBpbiBgc2AgdG8gYSBiaWdudW1cclxuICpcclxuICogQHBhcmFtIHNpemUgYmlnbnVtIHNpemUgKGJ5dGVzKVxyXG4gKi9cclxudmFyIGRlY2ltYWxUb0JpbmFyeSA9IGZ1bmN0aW9uIChzaXplLCBzKSB7XHJcbiAgICB2YXIgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICB2YXIgc3JjRGlnaXQgPSBzLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgaWYgKHNyY0RpZ2l0IDwgJzAnLmNoYXJDb2RlQXQoMCkgfHwgc3JjRGlnaXQgPiAnOScuY2hhckNvZGVBdCgwKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgbnVtYmVyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjYXJyeSA9IHNyY0RpZ2l0IC0gJzAnLmNoYXJDb2RlQXQoMCk7XHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzaXplOyArK2opIHtcclxuICAgICAgICAgICAgdmFyIHggPSByZXN1bHRbal0gKiAxMCArIGNhcnJ5O1xyXG4gICAgICAgICAgICByZXN1bHRbal0gPSB4O1xyXG4gICAgICAgICAgICBjYXJyeSA9IHggPj4gODtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNhcnJ5KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbnVtYmVyIGlzIG91dCBvZiByYW5nZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcbmV4cG9ydHMuZGVjaW1hbFRvQmluYXJ5ID0gZGVjaW1hbFRvQmluYXJ5O1xyXG4vKipcclxuICogQ29udmVydCBhIHNpZ25lZCBkZWNpbWFsIG51bWJlciBpbiBgc2AgdG8gYSBiaWdudW1cclxuICpcclxuICogQHBhcmFtIHNpemUgYmlnbnVtIHNpemUgKGJ5dGVzKVxyXG4gKi9cclxudmFyIHNpZ25lZERlY2ltYWxUb0JpbmFyeSA9IGZ1bmN0aW9uIChzaXplLCBzKSB7XHJcbiAgICB2YXIgbmVnYXRpdmUgPSBzWzBdID09PSAnLSc7XHJcbiAgICBpZiAobmVnYXRpdmUpIHtcclxuICAgICAgICBzID0gcy5zdWJzdHIoMSk7XHJcbiAgICB9XHJcbiAgICB2YXIgcmVzdWx0ID0gKDAsIGV4cG9ydHMuZGVjaW1hbFRvQmluYXJ5KShzaXplLCBzKTtcclxuICAgIGlmIChuZWdhdGl2ZSkge1xyXG4gICAgICAgICgwLCBleHBvcnRzLm5lZ2F0ZSkocmVzdWx0KTtcclxuICAgICAgICBpZiAoISgwLCBleHBvcnRzLmlzTmVnYXRpdmUpKHJlc3VsdCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdudW1iZXIgaXMgb3V0IG9mIHJhbmdlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoKDAsIGV4cG9ydHMuaXNOZWdhdGl2ZSkocmVzdWx0KSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbnVtYmVyIGlzIG91dCBvZiByYW5nZScpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuZXhwb3J0cy5zaWduZWREZWNpbWFsVG9CaW5hcnkgPSBzaWduZWREZWNpbWFsVG9CaW5hcnk7XHJcbi8qKlxyXG4gKiBDb252ZXJ0IGBiaWdudW1gIHRvIGFuIHVuc2lnbmVkIGRlY2ltYWwgbnVtYmVyXHJcbiAqXHJcbiAqIEBwYXJhbSBtaW5EaWdpdHMgMC1wYWQgcmVzdWx0IHRvIHRoaXMgbWFueSBkaWdpdHNcclxuICovXHJcbnZhciBiaW5hcnlUb0RlY2ltYWwgPSBmdW5jdGlvbiAoYmlnbnVtLCBtaW5EaWdpdHMpIHtcclxuICAgIGlmIChtaW5EaWdpdHMgPT09IHZvaWQgMCkgeyBtaW5EaWdpdHMgPSAxOyB9XHJcbiAgICB2YXIgcmVzdWx0ID0gQXJyYXkobWluRGlnaXRzKS5maWxsKCcwJy5jaGFyQ29kZUF0KDApKTtcclxuICAgIGZvciAodmFyIGkgPSBiaWdudW0ubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcclxuICAgICAgICB2YXIgY2FycnkgPSBiaWdudW1baV07XHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCByZXN1bHQubGVuZ3RoOyArK2opIHtcclxuICAgICAgICAgICAgdmFyIHggPSAoKHJlc3VsdFtqXSAtICcwJy5jaGFyQ29kZUF0KDApKSA8PCA4KSArIGNhcnJ5O1xyXG4gICAgICAgICAgICByZXN1bHRbal0gPSAnMCcuY2hhckNvZGVBdCgwKSArIHggJSAxMDtcclxuICAgICAgICAgICAgY2FycnkgPSAoeCAvIDEwKSB8IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdoaWxlIChjYXJyeSkge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaCgnMCcuY2hhckNvZGVBdCgwKSArIGNhcnJ5ICUgMTApO1xyXG4gICAgICAgICAgICBjYXJyeSA9IChjYXJyeSAvIDEwKSB8IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVzdWx0LnJldmVyc2UoKTtcclxuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgX19zcHJlYWRBcnJheShbXSwgX19yZWFkKHJlc3VsdCksIGZhbHNlKSk7XHJcbn07XHJcbmV4cG9ydHMuYmluYXJ5VG9EZWNpbWFsID0gYmluYXJ5VG9EZWNpbWFsO1xyXG4vKipcclxuICogQ29udmVydCBgYmlnbnVtYCB0byBhIHNpZ25lZCBkZWNpbWFsIG51bWJlclxyXG4gKlxyXG4gKiBAcGFyYW0gbWluRGlnaXRzIDAtcGFkIHJlc3VsdCB0byB0aGlzIG1hbnkgZGlnaXRzXHJcbiAqL1xyXG52YXIgc2lnbmVkQmluYXJ5VG9EZWNpbWFsID0gZnVuY3Rpb24gKGJpZ251bSwgbWluRGlnaXRzKSB7XHJcbiAgICBpZiAobWluRGlnaXRzID09PSB2b2lkIDApIHsgbWluRGlnaXRzID0gMTsgfVxyXG4gICAgaWYgKCgwLCBleHBvcnRzLmlzTmVnYXRpdmUpKGJpZ251bSkpIHtcclxuICAgICAgICB2YXIgeCA9IGJpZ251bS5zbGljZSgpO1xyXG4gICAgICAgICgwLCBleHBvcnRzLm5lZ2F0ZSkoeCk7XHJcbiAgICAgICAgcmV0dXJuICctJyArICgwLCBleHBvcnRzLmJpbmFyeVRvRGVjaW1hbCkoeCwgbWluRGlnaXRzKTtcclxuICAgIH1cclxuICAgIHJldHVybiAoMCwgZXhwb3J0cy5iaW5hcnlUb0RlY2ltYWwpKGJpZ251bSwgbWluRGlnaXRzKTtcclxufTtcclxuZXhwb3J0cy5zaWduZWRCaW5hcnlUb0RlY2ltYWwgPSBzaWduZWRCaW5hcnlUb0RlY2ltYWw7XHJcbnZhciBiYXNlNThUb0JpbmFyeVZhclNpemUgPSBmdW5jdGlvbiAocykge1xyXG4gICAgdmFyIGVfMSwgX2E7XHJcbiAgICB2YXIgcmVzdWx0ID0gW107XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICB2YXIgY2FycnkgPSBiYXNlNThNYXBbcy5jaGFyQ29kZUF0KGkpXTtcclxuICAgICAgICBpZiAoY2FycnkgPCAwKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBiYXNlLTU4IHZhbHVlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmVzdWx0Lmxlbmd0aDsgKytqKSB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gcmVzdWx0W2pdICogNTggKyBjYXJyeTtcclxuICAgICAgICAgICAgcmVzdWx0W2pdID0geCAmIDB4ZmY7XHJcbiAgICAgICAgICAgIGNhcnJ5ID0geCA+PiA4O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2FycnkpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goY2FycnkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgICAgZm9yICh2YXIgc18xID0gX192YWx1ZXMocyksIHNfMV8xID0gc18xLm5leHQoKTsgIXNfMV8xLmRvbmU7IHNfMV8xID0gc18xLm5leHQoKSkge1xyXG4gICAgICAgICAgICB2YXIgY2ggPSBzXzFfMS52YWx1ZTtcclxuICAgICAgICAgICAgaWYgKGNoID09PSAnMScpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHNfMV8xICYmICFzXzFfMS5kb25lICYmIChfYSA9IHNfMS5yZXR1cm4pKSBfYS5jYWxsKHNfMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJlc3VsdC5yZXZlcnNlKCk7XHJcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkocmVzdWx0KTtcclxufTtcclxuLyoqXHJcbiAqIENvbnZlcnQgYW4gdW5zaWduZWQgYmFzZS01OCBudW1iZXIgaW4gYHNgIHRvIGEgYmlnbnVtXHJcbiAqXHJcbiAqIEBwYXJhbSBzaXplIGJpZ251bSBzaXplIChieXRlcylcclxuICovXHJcbnZhciBiYXNlNThUb0JpbmFyeSA9IGZ1bmN0aW9uIChzaXplLCBzKSB7XHJcbiAgICBpZiAoIXNpemUpIHtcclxuICAgICAgICByZXR1cm4gYmFzZTU4VG9CaW5hcnlWYXJTaXplKHMpO1xyXG4gICAgfVxyXG4gICAgdmFyIHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KHNpemUpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgdmFyIGNhcnJ5ID0gYmFzZTU4TWFwW3MuY2hhckNvZGVBdChpKV07XHJcbiAgICAgICAgaWYgKGNhcnJ5IDwgMCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgYmFzZS01OCB2YWx1ZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNpemU7ICsraikge1xyXG4gICAgICAgICAgICB2YXIgeCA9IHJlc3VsdFtqXSAqIDU4ICsgY2Fycnk7XHJcbiAgICAgICAgICAgIHJlc3VsdFtqXSA9IHg7XHJcbiAgICAgICAgICAgIGNhcnJ5ID0geCA+PiA4O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2FycnkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdiYXNlLTU4IHZhbHVlIGlzIG91dCBvZiByYW5nZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlc3VsdC5yZXZlcnNlKCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5leHBvcnRzLmJhc2U1OFRvQmluYXJ5ID0gYmFzZTU4VG9CaW5hcnk7XHJcbi8qKlxyXG4gKiBDb252ZXJ0IGBiaWdudW1gIHRvIGEgYmFzZS01OCBudW1iZXJcclxuICpcclxuICogQHBhcmFtIG1pbkRpZ2l0cyAwLXBhZCByZXN1bHQgdG8gdGhpcyBtYW55IGRpZ2l0c1xyXG4gKi9cclxudmFyIGJpbmFyeVRvQmFzZTU4ID0gZnVuY3Rpb24gKGJpZ251bSwgbWluRGlnaXRzKSB7XHJcbiAgICB2YXIgZV8yLCBfYSwgZV8zLCBfYjtcclxuICAgIGlmIChtaW5EaWdpdHMgPT09IHZvaWQgMCkgeyBtaW5EaWdpdHMgPSAxOyB9XHJcbiAgICB2YXIgcmVzdWx0ID0gW107XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGZvciAodmFyIGJpZ251bV8xID0gX192YWx1ZXMoYmlnbnVtKSwgYmlnbnVtXzFfMSA9IGJpZ251bV8xLm5leHQoKTsgIWJpZ251bV8xXzEuZG9uZTsgYmlnbnVtXzFfMSA9IGJpZ251bV8xLm5leHQoKSkge1xyXG4gICAgICAgICAgICB2YXIgYnl0ZSA9IGJpZ251bV8xXzEudmFsdWU7XHJcbiAgICAgICAgICAgIHZhciBjYXJyeSA9IGJ5dGU7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmVzdWx0Lmxlbmd0aDsgKytqKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgeCA9IChiYXNlNThNYXBbcmVzdWx0W2pdXSA8PCA4KSArIGNhcnJ5O1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2pdID0gYmFzZTU4Q2hhcnMuY2hhckNvZGVBdCh4ICUgNTgpO1xyXG4gICAgICAgICAgICAgICAgY2FycnkgPSAoeCAvIDU4KSB8IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2hpbGUgKGNhcnJ5KSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChiYXNlNThDaGFycy5jaGFyQ29kZUF0KGNhcnJ5ICUgNTgpKTtcclxuICAgICAgICAgICAgICAgIGNhcnJ5ID0gKGNhcnJ5IC8gNTgpIHwgMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNhdGNoIChlXzJfMSkgeyBlXzIgPSB7IGVycm9yOiBlXzJfMSB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoYmlnbnVtXzFfMSAmJiAhYmlnbnVtXzFfMS5kb25lICYmIChfYSA9IGJpZ251bV8xLnJldHVybikpIF9hLmNhbGwoYmlnbnVtXzEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMikgdGhyb3cgZV8yLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGZvciAodmFyIGJpZ251bV8yID0gX192YWx1ZXMoYmlnbnVtKSwgYmlnbnVtXzJfMSA9IGJpZ251bV8yLm5leHQoKTsgIWJpZ251bV8yXzEuZG9uZTsgYmlnbnVtXzJfMSA9IGJpZ251bV8yLm5leHQoKSkge1xyXG4gICAgICAgICAgICB2YXIgYnl0ZSA9IGJpZ251bV8yXzEudmFsdWU7XHJcbiAgICAgICAgICAgIGlmIChieXRlKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKCcxJy5jaGFyQ29kZUF0KDApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNhdGNoIChlXzNfMSkgeyBlXzMgPSB7IGVycm9yOiBlXzNfMSB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoYmlnbnVtXzJfMSAmJiAhYmlnbnVtXzJfMS5kb25lICYmIChfYiA9IGJpZ251bV8yLnJldHVybikpIF9iLmNhbGwoYmlnbnVtXzIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMykgdGhyb3cgZV8zLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXN1bHQucmV2ZXJzZSgpO1xyXG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBfX3NwcmVhZEFycmF5KFtdLCBfX3JlYWQocmVzdWx0KSwgZmFsc2UpKTtcclxufTtcclxuZXhwb3J0cy5iaW5hcnlUb0Jhc2U1OCA9IGJpbmFyeVRvQmFzZTU4O1xyXG4vKiogQ29udmVydCBhbiB1bnNpZ25lZCBiYXNlLTY0IG51bWJlciBpbiBgc2AgdG8gYSBiaWdudW0gKi9cclxudmFyIGJhc2U2NFRvQmluYXJ5ID0gZnVuY3Rpb24gKHMpIHtcclxuICAgIHZhciBsZW4gPSBzLmxlbmd0aDtcclxuICAgIGlmICgobGVuICYgMykgPT09IDEgJiYgc1tsZW4gLSAxXSA9PT0gJz0nKSB7XHJcbiAgICAgICAgbGVuIC09IDE7XHJcbiAgICB9IC8vIGZjIGFwcGVuZHMgYW4gZXh0cmEgJz0nXHJcbiAgICBpZiAoKGxlbiAmIDMpICE9PSAwKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdiYXNlLTY0IHZhbHVlIGlzIG5vdCBwYWRkZWQgY29ycmVjdGx5Jyk7XHJcbiAgICB9XHJcbiAgICB2YXIgZ3JvdXBzID0gbGVuID4+IDI7XHJcbiAgICB2YXIgYnl0ZXMgPSBncm91cHMgKiAzO1xyXG4gICAgaWYgKGxlbiA+IDAgJiYgc1tsZW4gLSAxXSA9PT0gJz0nKSB7XHJcbiAgICAgICAgaWYgKHNbbGVuIC0gMl0gPT09ICc9Jykge1xyXG4gICAgICAgICAgICBieXRlcyAtPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYnl0ZXMgLT0gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZXMpO1xyXG4gICAgZm9yICh2YXIgZ3JvdXAgPSAwOyBncm91cCA8IGdyb3VwczsgKytncm91cCkge1xyXG4gICAgICAgIHZhciBkaWdpdDAgPSBiYXNlNjRNYXBbcy5jaGFyQ29kZUF0KGdyb3VwICogNCArIDApXTtcclxuICAgICAgICB2YXIgZGlnaXQxID0gYmFzZTY0TWFwW3MuY2hhckNvZGVBdChncm91cCAqIDQgKyAxKV07XHJcbiAgICAgICAgdmFyIGRpZ2l0MiA9IGJhc2U2NE1hcFtzLmNoYXJDb2RlQXQoZ3JvdXAgKiA0ICsgMildO1xyXG4gICAgICAgIHZhciBkaWdpdDMgPSBiYXNlNjRNYXBbcy5jaGFyQ29kZUF0KGdyb3VwICogNCArIDMpXTtcclxuICAgICAgICByZXN1bHRbZ3JvdXAgKiAzICsgMF0gPSAoZGlnaXQwIDw8IDIpIHwgKGRpZ2l0MSA+PiA0KTtcclxuICAgICAgICBpZiAoZ3JvdXAgKiAzICsgMSA8IGJ5dGVzKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdFtncm91cCAqIDMgKyAxXSA9ICgoZGlnaXQxICYgMTUpIDw8IDQpIHwgKGRpZ2l0MiA+PiAyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGdyb3VwICogMyArIDIgPCBieXRlcykge1xyXG4gICAgICAgICAgICByZXN1bHRbZ3JvdXAgKiAzICsgMl0gPSAoKGRpZ2l0MiAmIDMpIDw8IDYpIHwgZGlnaXQzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcbmV4cG9ydHMuYmFzZTY0VG9CaW5hcnkgPSBiYXNlNjRUb0JpbmFyeTtcclxuLyoqIEtleSB0eXBlcyB0aGlzIGxpYnJhcnkgc3VwcG9ydHMgKi9cclxudmFyIEtleVR5cGU7XHJcbihmdW5jdGlvbiAoS2V5VHlwZSkge1xyXG4gICAgS2V5VHlwZVtLZXlUeXBlW1wiazFcIl0gPSAwXSA9IFwiazFcIjtcclxuICAgIEtleVR5cGVbS2V5VHlwZVtcInIxXCJdID0gMV0gPSBcInIxXCI7XHJcbiAgICBLZXlUeXBlW0tleVR5cGVbXCJ3YVwiXSA9IDJdID0gXCJ3YVwiO1xyXG59KShLZXlUeXBlID0gZXhwb3J0cy5LZXlUeXBlIHx8IChleHBvcnRzLktleVR5cGUgPSB7fSkpO1xyXG4vKiogUHVibGljIGtleSBkYXRhIHNpemUsIGV4Y2x1ZGluZyB0eXBlIGZpZWxkICovXHJcbmV4cG9ydHMucHVibGljS2V5RGF0YVNpemUgPSAzMztcclxuLyoqIFByaXZhdGUga2V5IGRhdGEgc2l6ZSwgZXhjbHVkaW5nIHR5cGUgZmllbGQgKi9cclxuZXhwb3J0cy5wcml2YXRlS2V5RGF0YVNpemUgPSAzMjtcclxuLyoqIFNpZ25hdHVyZSBkYXRhIHNpemUsIGV4Y2x1ZGluZyB0eXBlIGZpZWxkICovXHJcbmV4cG9ydHMuc2lnbmF0dXJlRGF0YVNpemUgPSA2NTtcclxudmFyIGRpZ2VzdFN1ZmZpeFJpcGVtZDE2MCA9IGZ1bmN0aW9uIChkYXRhLCBzdWZmaXgpIHtcclxuICAgIHZhciBkID0gbmV3IFVpbnQ4QXJyYXkoZGF0YS5sZW5ndGggKyBzdWZmaXgubGVuZ3RoKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGRbaV0gPSBkYXRhW2ldO1xyXG4gICAgfVxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdWZmaXgubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBkW2RhdGEubGVuZ3RoICsgaV0gPSBzdWZmaXguY2hhckNvZGVBdChpKTtcclxuICAgIH1cclxuICAgIHJldHVybiByaXBlbWQxNjAoZCk7XHJcbn07XHJcbnZhciBzdHJpbmdUb0tleSA9IGZ1bmN0aW9uIChzLCB0eXBlLCBzaXplLCBzdWZmaXgpIHtcclxuICAgIHZhciB3aG9sZSA9ICgwLCBleHBvcnRzLmJhc2U1OFRvQmluYXJ5KShzaXplID8gc2l6ZSArIDQgOiAwLCBzKTtcclxuICAgIHZhciByZXN1bHQgPSB7IHR5cGU6IHR5cGUsIGRhdGE6IG5ldyBVaW50OEFycmF5KHdob2xlLmJ1ZmZlciwgMCwgd2hvbGUubGVuZ3RoIC0gNCkgfTtcclxuICAgIHZhciBkaWdlc3QgPSBuZXcgVWludDhBcnJheShkaWdlc3RTdWZmaXhSaXBlbWQxNjAocmVzdWx0LmRhdGEsIHN1ZmZpeCkpO1xyXG4gICAgaWYgKGRpZ2VzdFswXSAhPT0gd2hvbGVbd2hvbGUubGVuZ3RoIC0gNF0gfHwgZGlnZXN0WzFdICE9PSB3aG9sZVt3aG9sZS5sZW5ndGggLSAzXVxyXG4gICAgICAgIHx8IGRpZ2VzdFsyXSAhPT0gd2hvbGVbd2hvbGUubGVuZ3RoIC0gMl0gfHwgZGlnZXN0WzNdICE9PSB3aG9sZVt3aG9sZS5sZW5ndGggLSAxXSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY2hlY2tzdW0gZG9lc25cXCd0IG1hdGNoJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG52YXIga2V5VG9TdHJpbmcgPSBmdW5jdGlvbiAoa2V5LCBzdWZmaXgsIHByZWZpeCkge1xyXG4gICAgdmFyIGRpZ2VzdCA9IG5ldyBVaW50OEFycmF5KGRpZ2VzdFN1ZmZpeFJpcGVtZDE2MChrZXkuZGF0YSwgc3VmZml4KSk7XHJcbiAgICB2YXIgd2hvbGUgPSBuZXcgVWludDhBcnJheShrZXkuZGF0YS5sZW5ndGggKyA0KTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5LmRhdGEubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICB3aG9sZVtpXSA9IGtleS5kYXRhW2ldO1xyXG4gICAgfVxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyArK2kpIHtcclxuICAgICAgICB3aG9sZVtpICsga2V5LmRhdGEubGVuZ3RoXSA9IGRpZ2VzdFtpXTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcmVmaXggKyAoMCwgZXhwb3J0cy5iaW5hcnlUb0Jhc2U1OCkod2hvbGUpO1xyXG59O1xyXG4vKiogQ29udmVydCBrZXkgaW4gYHNgIHRvIGJpbmFyeSBmb3JtICovXHJcbnZhciBzdHJpbmdUb1B1YmxpY0tleSA9IGZ1bmN0aW9uIChzKSB7XHJcbiAgICBpZiAodHlwZW9mIHMgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdleHBlY3RlZCBzdHJpbmcgY29udGFpbmluZyBwdWJsaWMga2V5Jyk7XHJcbiAgICB9XHJcbiAgICBpZiAocy5zdWJzdHIoMCwgMykgPT09ICdFT1MnKSB7XHJcbiAgICAgICAgdmFyIHdob2xlID0gKDAsIGV4cG9ydHMuYmFzZTU4VG9CaW5hcnkpKGV4cG9ydHMucHVibGljS2V5RGF0YVNpemUgKyA0LCBzLnN1YnN0cigzKSk7XHJcbiAgICAgICAgdmFyIGtleSA9IHsgdHlwZTogS2V5VHlwZS5rMSwgZGF0YTogbmV3IFVpbnQ4QXJyYXkoZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZSkgfTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cG9ydHMucHVibGljS2V5RGF0YVNpemU7ICsraSkge1xyXG4gICAgICAgICAgICBrZXkuZGF0YVtpXSA9IHdob2xlW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZGlnZXN0ID0gbmV3IFVpbnQ4QXJyYXkocmlwZW1kMTYwKGtleS5kYXRhKSk7XHJcbiAgICAgICAgaWYgKGRpZ2VzdFswXSAhPT0gd2hvbGVbZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZV0gfHwgZGlnZXN0WzFdICE9PSB3aG9sZVszNF1cclxuICAgICAgICAgICAgfHwgZGlnZXN0WzJdICE9PSB3aG9sZVszNV0gfHwgZGlnZXN0WzNdICE9PSB3aG9sZVszNl0pIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjaGVja3N1bSBkb2VzblxcJ3QgbWF0Y2gnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGtleTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHMuc3Vic3RyKDAsIDcpID09PSAnUFVCX0sxXycpIHtcclxuICAgICAgICByZXR1cm4gc3RyaW5nVG9LZXkocy5zdWJzdHIoNyksIEtleVR5cGUuazEsIGV4cG9ydHMucHVibGljS2V5RGF0YVNpemUsICdLMScpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocy5zdWJzdHIoMCwgNykgPT09ICdQVUJfUjFfJykge1xyXG4gICAgICAgIHJldHVybiBzdHJpbmdUb0tleShzLnN1YnN0cig3KSwgS2V5VHlwZS5yMSwgZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZSwgJ1IxJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChzLnN1YnN0cigwLCA3KSA9PT0gJ1BVQl9XQV8nKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZ1RvS2V5KHMuc3Vic3RyKDcpLCBLZXlUeXBlLndhLCAwLCAnV0EnKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHB1YmxpYyBrZXkgZm9ybWF0Jyk7XHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydHMuc3RyaW5nVG9QdWJsaWNLZXkgPSBzdHJpbmdUb1B1YmxpY0tleTtcclxuLyoqIENvbnZlcnQgcHVibGljIGBrZXlgIHRvIGxlZ2FjeSBzdHJpbmcgKGJhc2UtNTgpIGZvcm0gKi9cclxudmFyIHB1YmxpY0tleVRvTGVnYWN5U3RyaW5nID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgaWYgKGtleS50eXBlID09PSBLZXlUeXBlLmsxICYmIGtleS5kYXRhLmxlbmd0aCA9PT0gZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZSkge1xyXG4gICAgICAgIHJldHVybiBrZXlUb1N0cmluZyhrZXksICcnLCAnRU9TJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChrZXkudHlwZSA9PT0gS2V5VHlwZS5yMSB8fCBrZXkudHlwZSA9PT0gS2V5VHlwZS53YSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignS2V5IGZvcm1hdCBub3Qgc3VwcG9ydGVkIGluIGxlZ2FjeSBjb252ZXJzaW9uJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VucmVjb2duaXplZCBwdWJsaWMga2V5IGZvcm1hdCcpO1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLnB1YmxpY0tleVRvTGVnYWN5U3RyaW5nID0gcHVibGljS2V5VG9MZWdhY3lTdHJpbmc7XHJcbi8qKiBDb252ZXJ0IGBrZXlgIHRvIHN0cmluZyAoYmFzZS01OCkgZm9ybSAqL1xyXG52YXIgcHVibGljS2V5VG9TdHJpbmcgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICBpZiAoa2V5LnR5cGUgPT09IEtleVR5cGUuazEgJiYga2V5LmRhdGEubGVuZ3RoID09PSBleHBvcnRzLnB1YmxpY0tleURhdGFTaXplKSB7XHJcbiAgICAgICAgcmV0dXJuIGtleVRvU3RyaW5nKGtleSwgJ0sxJywgJ1BVQl9LMV8nKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGtleS50eXBlID09PSBLZXlUeXBlLnIxICYmIGtleS5kYXRhLmxlbmd0aCA9PT0gZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZSkge1xyXG4gICAgICAgIHJldHVybiBrZXlUb1N0cmluZyhrZXksICdSMScsICdQVUJfUjFfJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChrZXkudHlwZSA9PT0gS2V5VHlwZS53YSkge1xyXG4gICAgICAgIHJldHVybiBrZXlUb1N0cmluZyhrZXksICdXQScsICdQVUJfV0FfJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VucmVjb2duaXplZCBwdWJsaWMga2V5IGZvcm1hdCcpO1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLnB1YmxpY0tleVRvU3RyaW5nID0gcHVibGljS2V5VG9TdHJpbmc7XHJcbi8qKiBJZiBhIGtleSBpcyBpbiB0aGUgbGVnYWN5IGZvcm1hdCAoYEVPU2AgcHJlZml4KSwgdGhlbiBjb252ZXJ0IGl0IHRvIHRoZSBuZXcgZm9ybWF0IChgUFVCX0sxX2ApLlxyXG4gKiBMZWF2ZXMgb3RoZXIgZm9ybWF0cyB1bnRvdWNoZWRcclxuICovXHJcbnZhciBjb252ZXJ0TGVnYWN5UHVibGljS2V5ID0gZnVuY3Rpb24gKHMpIHtcclxuICAgIGlmIChzLnN1YnN0cigwLCAzKSA9PT0gJ0VPUycpIHtcclxuICAgICAgICByZXR1cm4gKDAsIGV4cG9ydHMucHVibGljS2V5VG9TdHJpbmcpKCgwLCBleHBvcnRzLnN0cmluZ1RvUHVibGljS2V5KShzKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcztcclxufTtcclxuZXhwb3J0cy5jb252ZXJ0TGVnYWN5UHVibGljS2V5ID0gY29udmVydExlZ2FjeVB1YmxpY0tleTtcclxuLyoqIElmIGEga2V5IGlzIGluIHRoZSBsZWdhY3kgZm9ybWF0IChgRU9TYCBwcmVmaXgpLCB0aGVuIGNvbnZlcnQgaXQgdG8gdGhlIG5ldyBmb3JtYXQgKGBQVUJfSzFfYCkuXHJcbiAqIExlYXZlcyBvdGhlciBmb3JtYXRzIHVudG91Y2hlZFxyXG4gKi9cclxudmFyIGNvbnZlcnRMZWdhY3lQdWJsaWNLZXlzID0gZnVuY3Rpb24gKGtleXMpIHtcclxuICAgIHJldHVybiBrZXlzLm1hcChleHBvcnRzLmNvbnZlcnRMZWdhY3lQdWJsaWNLZXkpO1xyXG59O1xyXG5leHBvcnRzLmNvbnZlcnRMZWdhY3lQdWJsaWNLZXlzID0gY29udmVydExlZ2FjeVB1YmxpY0tleXM7XHJcbi8qKiBDb252ZXJ0IGtleSBpbiBgc2AgdG8gYmluYXJ5IGZvcm0gKi9cclxudmFyIHN0cmluZ1RvUHJpdmF0ZUtleSA9IGZ1bmN0aW9uIChzKSB7XHJcbiAgICBpZiAodHlwZW9mIHMgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdleHBlY3RlZCBzdHJpbmcgY29udGFpbmluZyBwcml2YXRlIGtleScpO1xyXG4gICAgfVxyXG4gICAgaWYgKHMuc3Vic3RyKDAsIDcpID09PSAnUFZUX1IxXycpIHtcclxuICAgICAgICByZXR1cm4gc3RyaW5nVG9LZXkocy5zdWJzdHIoNyksIEtleVR5cGUucjEsIGV4cG9ydHMucHJpdmF0ZUtleURhdGFTaXplLCAnUjEnKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHMuc3Vic3RyKDAsIDcpID09PSAnUFZUX0sxXycpIHtcclxuICAgICAgICByZXR1cm4gc3RyaW5nVG9LZXkocy5zdWJzdHIoNyksIEtleVR5cGUuazEsIGV4cG9ydHMucHJpdmF0ZUtleURhdGFTaXplLCAnSzEnKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIC8vIHRvZG86IFZlcmlmeSBjaGVja3N1bTogc2hhMjU2KHNoYTI1NihrZXkuZGF0YSkpLlxyXG4gICAgICAgIC8vICAgICAgIE5vdCBjcml0aWNhbCBzaW5jZSBhIGJhZCBrZXkgd2lsbCBmYWlsIHRvIHByb2R1Y2UgYVxyXG4gICAgICAgIC8vICAgICAgIHZhbGlkIHNpZ25hdHVyZSBhbnl3YXkuXHJcbiAgICAgICAgdmFyIHdob2xlID0gKDAsIGV4cG9ydHMuYmFzZTU4VG9CaW5hcnkpKGV4cG9ydHMucHJpdmF0ZUtleURhdGFTaXplICsgNSwgcyk7XHJcbiAgICAgICAgdmFyIGtleSA9IHsgdHlwZTogS2V5VHlwZS5rMSwgZGF0YTogbmV3IFVpbnQ4QXJyYXkoZXhwb3J0cy5wcml2YXRlS2V5RGF0YVNpemUpIH07XHJcbiAgICAgICAgaWYgKHdob2xlWzBdICE9PSAweDgwKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHByaXZhdGUga2V5IHR5cGUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBvcnRzLnByaXZhdGVLZXlEYXRhU2l6ZTsgKytpKSB7XHJcbiAgICAgICAgICAgIGtleS5kYXRhW2ldID0gd2hvbGVbaSArIDFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ga2V5O1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLnN0cmluZ1RvUHJpdmF0ZUtleSA9IHN0cmluZ1RvUHJpdmF0ZUtleTtcclxuLyoqIENvbnZlcnQgcHJpdmF0ZSBga2V5YCB0byBsZWdhY3kgc3RyaW5nIChiYXNlLTU4KSBmb3JtICovXHJcbnZhciBwcml2YXRlS2V5VG9MZWdhY3lTdHJpbmcgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICBpZiAoa2V5LnR5cGUgPT09IEtleVR5cGUuazEgJiYga2V5LmRhdGEubGVuZ3RoID09PSBleHBvcnRzLnByaXZhdGVLZXlEYXRhU2l6ZSkge1xyXG4gICAgICAgIHZhciB3aG9sZV8xID0gW107XHJcbiAgICAgICAgd2hvbGVfMS5wdXNoKDEyOCk7XHJcbiAgICAgICAga2V5LmRhdGEuZm9yRWFjaChmdW5jdGlvbiAoYnl0ZSkgeyByZXR1cm4gd2hvbGVfMS5wdXNoKGJ5dGUpOyB9KTtcclxuICAgICAgICB2YXIgZGlnZXN0ID0gbmV3IFVpbnQ4QXJyYXkoKDAsIGhhc2hfanNfMS5zaGEyNTYpKCkudXBkYXRlKCgwLCBoYXNoX2pzXzEuc2hhMjU2KSgpLnVwZGF0ZSh3aG9sZV8xKS5kaWdlc3QoKSkuZGlnZXN0KCkpO1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgVWludDhBcnJheShleHBvcnRzLnByaXZhdGVLZXlEYXRhU2l6ZSArIDUpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd2hvbGVfMS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICByZXN1bHRbaV0gPSB3aG9sZV8xW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICByZXN1bHRbaSArIHdob2xlXzEubGVuZ3RoXSA9IGRpZ2VzdFtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICgwLCBleHBvcnRzLmJpbmFyeVRvQmFzZTU4KShyZXN1bHQpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoa2V5LnR5cGUgPT09IEtleVR5cGUucjEgfHwga2V5LnR5cGUgPT09IEtleVR5cGUud2EpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0tleSBmb3JtYXQgbm90IHN1cHBvcnRlZCBpbiBsZWdhY3kgY29udmVyc2lvbicpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnJlY29nbml6ZWQgcHVibGljIGtleSBmb3JtYXQnKTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0cy5wcml2YXRlS2V5VG9MZWdhY3lTdHJpbmcgPSBwcml2YXRlS2V5VG9MZWdhY3lTdHJpbmc7XHJcbi8qKiBDb252ZXJ0IGBrZXlgIHRvIHN0cmluZyAoYmFzZS01OCkgZm9ybSAqL1xyXG52YXIgcHJpdmF0ZUtleVRvU3RyaW5nID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgaWYgKGtleS50eXBlID09PSBLZXlUeXBlLnIxKSB7XHJcbiAgICAgICAgcmV0dXJuIGtleVRvU3RyaW5nKGtleSwgJ1IxJywgJ1BWVF9SMV8nKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGtleS50eXBlID09PSBLZXlUeXBlLmsxKSB7XHJcbiAgICAgICAgcmV0dXJuIGtleVRvU3RyaW5nKGtleSwgJ0sxJywgJ1BWVF9LMV8nKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHByaXZhdGUga2V5IGZvcm1hdCcpO1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLnByaXZhdGVLZXlUb1N0cmluZyA9IHByaXZhdGVLZXlUb1N0cmluZztcclxuLyoqIENvbnZlcnQga2V5IGluIGBzYCB0byBiaW5hcnkgZm9ybSAqL1xyXG52YXIgc3RyaW5nVG9TaWduYXR1cmUgPSBmdW5jdGlvbiAocykge1xyXG4gICAgaWYgKHR5cGVvZiBzICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZXhwZWN0ZWQgc3RyaW5nIGNvbnRhaW5pbmcgc2lnbmF0dXJlJyk7XHJcbiAgICB9XHJcbiAgICBpZiAocy5zdWJzdHIoMCwgNykgPT09ICdTSUdfSzFfJykge1xyXG4gICAgICAgIHJldHVybiBzdHJpbmdUb0tleShzLnN1YnN0cig3KSwgS2V5VHlwZS5rMSwgZXhwb3J0cy5zaWduYXR1cmVEYXRhU2l6ZSwgJ0sxJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChzLnN1YnN0cigwLCA3KSA9PT0gJ1NJR19SMV8nKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZ1RvS2V5KHMuc3Vic3RyKDcpLCBLZXlUeXBlLnIxLCBleHBvcnRzLnNpZ25hdHVyZURhdGFTaXplLCAnUjEnKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHMuc3Vic3RyKDAsIDcpID09PSAnU0lHX1dBXycpIHtcclxuICAgICAgICByZXR1cm4gc3RyaW5nVG9LZXkocy5zdWJzdHIoNyksIEtleVR5cGUud2EsIDAsICdXQScpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnJlY29nbml6ZWQgc2lnbmF0dXJlIGZvcm1hdCcpO1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLnN0cmluZ1RvU2lnbmF0dXJlID0gc3RyaW5nVG9TaWduYXR1cmU7XHJcbi8qKiBDb252ZXJ0IGBzaWduYXR1cmVgIHRvIHN0cmluZyAoYmFzZS01OCkgZm9ybSAqL1xyXG52YXIgc2lnbmF0dXJlVG9TdHJpbmcgPSBmdW5jdGlvbiAoc2lnbmF0dXJlKSB7XHJcbiAgICBpZiAoc2lnbmF0dXJlLnR5cGUgPT09IEtleVR5cGUuazEpIHtcclxuICAgICAgICByZXR1cm4ga2V5VG9TdHJpbmcoc2lnbmF0dXJlLCAnSzEnLCAnU0lHX0sxXycpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc2lnbmF0dXJlLnR5cGUgPT09IEtleVR5cGUucjEpIHtcclxuICAgICAgICByZXR1cm4ga2V5VG9TdHJpbmcoc2lnbmF0dXJlLCAnUjEnLCAnU0lHX1IxXycpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc2lnbmF0dXJlLnR5cGUgPT09IEtleVR5cGUud2EpIHtcclxuICAgICAgICByZXR1cm4ga2V5VG9TdHJpbmcoc2lnbmF0dXJlLCAnV0EnLCAnU0lHX1dBXycpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnJlY29nbml6ZWQgc2lnbmF0dXJlIGZvcm1hdCcpO1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLnNpZ25hdHVyZVRvU3RyaW5nID0gc2lnbmF0dXJlVG9TdHJpbmc7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG4vKipcclxuICogQG1vZHVsZSBSUEMtRXJyb3JcclxuICovXHJcbi8vIGNvcHlyaWdodCBkZWZpbmVkIGluIGVvc2pzL0xJQ0VOU0UudHh0XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuUnBjRXJyb3IgPSB2b2lkIDA7XHJcbi8qKiBIb2xkcyBkZXRhaWxlZCBlcnJvciBpbmZvcm1hdGlvbiAqL1xyXG52YXIgUnBjRXJyb3IgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoUnBjRXJyb3IsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBScGNFcnJvcihqc29uKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAoanNvbi5lcnJvciAmJiBqc29uLmVycm9yLmRldGFpbHMgJiYganNvbi5lcnJvci5kZXRhaWxzLmxlbmd0aCAmJiBqc29uLmVycm9yLmRldGFpbHNbMF0ubWVzc2FnZSkge1xyXG4gICAgICAgICAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGpzb24uZXJyb3IuZGV0YWlsc1swXS5tZXNzYWdlKSB8fCB0aGlzO1xyXG4gICAgICAgICAgICBfdGhpcy5kZXRhaWxzID0ganNvbi5lcnJvci5kZXRhaWxzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChqc29uLnByb2Nlc3NlZCAmJiBqc29uLnByb2Nlc3NlZC5leGNlcHQgJiYganNvbi5wcm9jZXNzZWQuZXhjZXB0Lm1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBqc29uLnByb2Nlc3NlZC5leGNlcHQubWVzc2FnZSkgfHwgdGhpcztcclxuICAgICAgICAgICAgX3RoaXMuZGV0YWlscyA9IGpzb24ucHJvY2Vzc2VkLmV4Y2VwdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoanNvbi5yZXN1bHQgJiYganNvbi5yZXN1bHQuZXhjZXB0ICYmIGpzb24ucmVzdWx0LmV4Y2VwdC5tZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywganNvbi5yZXN1bHQuZXhjZXB0Lm1lc3NhZ2UpIHx8IHRoaXM7XHJcbiAgICAgICAgICAgIF90aGlzLmRldGFpbHMgPSBqc29uLnJlc3VsdC5leGNlcHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGpzb24ubWVzc2FnZSkgfHwgdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKF90aGlzLCBScGNFcnJvci5wcm90b3R5cGUpO1xyXG4gICAgICAgIF90aGlzLmpzb24gPSBqc29uO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBScGNFcnJvcjtcclxufShFcnJvcikpO1xyXG5leHBvcnRzLlJwY0Vycm9yID0gUnBjRXJyb3I7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuUnBjRXJyb3IgPSBleHBvcnRzLkpzb25ScGMgPSB2b2lkIDA7XHJcbnZhciBlb3Nqc19qc29ucnBjXzEgPSByZXF1aXJlKFwiLi9lb3Nqcy1qc29ucnBjXCIpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJKc29uUnBjXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBlb3Nqc19qc29ucnBjXzEuSnNvblJwYzsgfSB9KTtcclxudmFyIGVvc2pzX3JwY2Vycm9yXzEgPSByZXF1aXJlKFwiLi9lb3Nqcy1ycGNlcnJvclwiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiUnBjRXJyb3JcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVvc2pzX3JwY2Vycm9yXzEuUnBjRXJyb3I7IH0gfSk7XHJcbiIsIi8vIGh0dHBzOi8vZ2lzdC5naXRodWJ1c2VyY29udGVudC5jb20vd2x6bGEwMDAvYmFjODNkZjZkM2M1MTkxNmM0ZGQwYmM5NDdlNDY5NDcvcmF3LzdlZTM0NjJiMDk1YWIyMjU4MGRkYWYxOTFmNDRhNTkwZGE2ZmUzM2IvUklQRU1ELTE2MC5qc1xuXG4vKlxuXHRSSVBFTUQtMTYwLmpzXG5cblx0XHRkZXZlbG9wZWRcblx0XHRcdGJ5IEsuIChodHRwczovL2dpdGh1Yi5jb20vd2x6bGEwMDApXG5cdFx0XHRvbiBEZWNlbWJlciAyNy0yOSwgMjAxNyxcblxuXHRcdGxpY2Vuc2VkIHVuZGVyXG5cblxuXHRcdHRoZSBNSVQgbGljZW5zZVxuXG5cdFx0Q29weXJpZ2h0IChjKSAyMDE3IEsuXG5cblx0XHQgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cblx0XHRvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuXHRcdGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dFxuXHRcdHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLFxuXHRcdGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuXHRcdHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlXG5cdFx0U29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmdcblx0XHRjb25kaXRpb25zOlxuXG5cdFx0IFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG5cdFx0aW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblx0XHQgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcblx0XHRFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVNcblx0XHRPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORFxuXHRcdE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUXG5cdFx0SE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksXG5cdFx0V0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG5cdFx0RlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUlxuXHRcdE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxuY2xhc3MgUklQRU1EMTYwXG57XG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgLy8gaHR0cHM6Ly93ZWJjYWNoZS5nb29nbGV1c2VyY29udGVudC5jb20vc2VhcmNoP3E9Y2FjaGU6Q25MT2dvbFRIWUVKOmh0dHBzOi8vd3d3LmNvc2ljLmVzYXQua3VsZXV2ZW4uYmUvcHVibGljYXRpb25zL2FydGljbGUtMzE3LnBkZlxuICAgICAgICAvLyBodHRwOi8vc2hvZGhnYW5nYS5pbmZsaWJuZXQuYWMuaW4vYml0c3RyZWFtLzEwNjAzLzIyOTc4LzEzLzEzX2FwcGVuZGl4LnBkZlxuICAgIH1cblxuICAgIHN0YXRpYyBnZXRfbl9wYWRfYnl0ZXMobWVzc2FnZV9zaXplIC8qIGluIGJ5dGVzLCAxIGJ5dGUgaXMgOCBiaXRzLiAqLylcbiAgICB7XG4gICAgICAgIC8vICBPYnRhaW4gdGhlIG51bWJlciBvZiBieXRlcyBuZWVkZWQgdG8gcGFkIHRoZSBtZXNzYWdlLlxuICAgICAgICAvLyBJdCBkb2VzIG5vdCBjb250YWluIHRoZSBzaXplIG9mIHRoZSBtZXNzYWdlIHNpemUgaW5mb3JtYXRpb24uXG4gICAgICAgIC8qXG5cdFx0XHRodHRwczovL3dlYmNhY2hlLmdvb2dsZXVzZXJjb250ZW50LmNvbS9zZWFyY2g/cT1jYWNoZTpDbkxPZ29sVEhZRUo6aHR0cHM6Ly93d3cuY29zaWMuZXNhdC5rdWxldXZlbi5iZS9wdWJsaWNhdGlvbnMvYXJ0aWNsZS0zMTcucGRmXG5cblx0XHRcdFRoZSBDcnlwdG9ncmFwaGljIEhhc2ggRnVuY3Rpb24gUklQRU1ELTE2MFxuXG5cdFx0XHR3cml0dGVuIGJ5XG5cdFx0XHRcdEJhcnQgUHJlbmVlbCxcblx0XHRcdFx0SGFucyBEb2JiZXJ0aW4sXG5cdFx0XHRcdEFudG9vbiBCb3NzZWxhZXJzXG5cdFx0XHRpblxuXHRcdFx0XHQxOTk3LlxuXG5cdFx0XHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0XHTCpzUgICAgIERlc2NyaXB0aW9uIG9mIFJJUEVNRC0xNjBcblxuXHRcdFx0Li4uLi4uXG5cblx0XHRcdCBJbiBvcmRlciB0byBndWFyYW50ZWUgdGhhdCB0aGUgdG90YWwgaW5wdXQgc2l6ZSBpcyBhXG5cdFx0XHRtdWx0aXBsZSBvZiA1MTIgYml0cywgdGhlIGlucHV0IGlzIHBhZGRlZCBpbiB0aGUgc2FtZVxuXHRcdFx0d2F5IGFzIGZvciBhbGwgdGhlIG1lbWJlcnMgb2YgdGhlIE1ENC1mYW1pbHk6IG9uZVxuXHRcdFx0YXBwZW5kcyBhIHNpbmdsZSAxIGZvbGxvd2VkIGJ5IGEgc3RyaW5nIG9mIDBzICh0aGVcblx0XHRcdG51bWJlciBvZiAwcyBsaWVzIGJldHdlZW4gMCBhbmQgNTExKTsgdGhlIGxhc3QgNjQgYml0c1xuXHRcdFx0b2YgdGhlIGV4dGVuZGVkIGlucHV0IGNvbnRhaW4gdGhlIGJpbmFyeSByZXByZXNlbnRhdGlvblxuXHRcdFx0b2YgdGhlIGlucHV0IHNpemUgaW4gYml0cywgbGVhc3Qgc2lnbmlmaWNhbnQgYnl0ZSBmaXJzdC5cblx0XHQqL1xuICAgICAgICAvKlxuXHRcdFx0aHR0cHM6Ly90b29scy5pZXRmLm9yZy9yZmMvcmZjMTE4Ni50eHRcblxuXHRcdFx0UkZDIDExODY6IE1ENCBNZXNzYWdlIERpZ2VzdCBBbGdvcml0aG0uXG5cblx0XHRcdHdyaXR0ZW4gYnlcblx0XHRcdFx0Um9uYWxkIExpbm4gUml2ZXN0XG5cdFx0XHRpblxuXHRcdFx0XHRPY3RvYmVyIDE5OTAuXG5cblx0XHRcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0XHRcdMKnMyAgICAgTUQ0IEFsZ29yaXRobSBEZXNjcmlwdGlvblxuXG5cdFx0XHQuLi4uLi5cblxuXHRcdFx0U3RlcCAxLiBBcHBlbmQgcGFkZGluZyBiaXRzXG5cblx0XHRcdCBUaGUgbWVzc2FnZSBpcyBcInBhZGRlZFwiIChleHRlbmRlZCkgc28gdGhhdCBpdHMgbGVuZ3RoXG5cdFx0XHQoaW4gYml0cykgaXMgY29uZ3J1ZW50IHRvIDQ0OCwgbW9kdWxvIDUxMi4gVGhhdCBpcywgdGhlXG5cdFx0XHRtZXNzYWdlIGlzIGV4dGVuZGVkIHNvIHRoYXQgaXQgaXMganVzdCA2NCBiaXRzIHNoeSBvZlxuXHRcdFx0YmVpbmcgYSBtdWx0aXBsZSBvZiA1MTIgYml0cyBsb25nLiBQYWRkaW5nIGlzIGFsd2F5c1xuXHRcdFx0cGVyZm9ybWVkLCBldmVuIGlmIHRoZSBsZW5ndGggb2YgdGhlIG1lc3NhZ2UgaXMgYWxyZWFkeVxuXHRcdFx0Y29uZ3J1ZW50IHRvIDQ0OCwgbW9kdWxvIDUxMiAoaW4gd2hpY2ggY2FzZSA1MTIgYml0cyBvZlxuXHRcdFx0cGFkZGluZyBhcmUgYWRkZWQpLlxuXG5cdFx0XHQgUGFkZGluZyBpcyBwZXJmb3JtZWQgYXMgZm9sbG93czogYSBzaW5nbGUgXCIxXCIgYml0IGlzXG5cdFx0XHRhcHBlbmRlZCB0byB0aGUgbWVzc2FnZSwgYW5kIHRoZW4gZW5vdWdoIHplcm8gYml0cyBhcmVcblx0XHRcdGFwcGVuZGVkIHNvIHRoYXQgdGhlIGxlbmd0aCBpbiBiaXRzIG9mIHRoZSBwYWRkZWRcblx0XHRcdG1lc3NhZ2UgYmVjb21lcyBjb25ncnVlbnQgdG8gNDQ4LCBtb2R1bG8gNTEyLlxuXG5cdFx0XHRTdGVwIDIuIEFwcGVuZCBsZW5ndGhcblxuXHRcdFx0IEEgNjQtYml0IHJlcHJlc2VudGF0aW9uIG9mIGIgKHRoZSBsZW5ndGggb2YgdGhlIG1lc3NhZ2Vcblx0XHRcdGJlZm9yZSB0aGUgcGFkZGluZyBiaXRzIHdlcmUgYWRkZWQpIGlzIGFwcGVuZGVkIHRvIHRoZVxuXHRcdFx0cmVzdWx0IG9mIHRoZSBwcmV2aW91cyBzdGVwLiBJbiB0aGUgdW5saWtlbHkgZXZlbnQgdGhhdFxuXHRcdFx0YiBpcyBncmVhdGVyIHRoYW4gMl42NCwgdGhlbiBvbmx5IHRoZSBsb3ctb3JkZXIgNjQgYml0c1xuXHRcdFx0b2YgYiBhcmUgdXNlZC4gKFRoZXNlIGJpdHMgYXJlIGFwcGVuZGVkIGFzIHR3byAzMi1iaXRcblx0XHRcdHdvcmRzIGFuZCBhcHBlbmRlZCBsb3ctb3JkZXIgd29yZCBmaXJzdCBpbiBhY2NvcmRhbmNlXG5cdFx0XHR3aXRoIHRoZSBwcmV2aW91cyBjb252ZW50aW9ucy4pXG5cblx0XHRcdCBBdCB0aGlzIHBvaW50IHRoZSByZXN1bHRpbmcgbWVzc2FnZSAoYWZ0ZXIgcGFkZGluZyB3aXRoXG5cdFx0XHRiaXRzIGFuZCB3aXRoIGIpIGhhcyBhIGxlbmd0aCB0aGF0IGlzIGFuIGV4YWN0IG11bHRpcGxlXG5cdFx0XHRvZiA1MTIgYml0cy4gRXF1aXZhbGVudGx5LCB0aGlzIG1lc3NhZ2UgaGFzIGEgbGVuZ3RoXG5cdFx0XHR0aGF0IGlzIGFuIGV4YWN0IG11bHRpcGxlIG9mIDE2ICgzMi1iaXQpIHdvcmRzLiBMZXRcblx0XHRcdE1bMCAuLi4gTi0xXSBkZW5vdGUgdGhlIHdvcmRzIG9mIHRoZSByZXN1bHRpbmcgbWVzc2FnZSxcblx0XHRcdHdoZXJlIE4gaXMgYSBtdWx0aXBsZSBvZiAxNi5cblx0XHQqL1xuICAgICAgICAvLyBodHRwczovL2NyeXB0by5zdGFja2V4Y2hhbmdlLmNvbS9hLzMyNDA3LzU0NTY4XG4gICAgICAgIC8qXG5cdFx0XHRFeGFtcGxlIGNhc2UgICMgMVxuXHRcdFx0XHRbMCBiaXQ6IG1lc3NhZ2UuXVxuXHRcdFx0XHRbMSBiaXQ6IDEuXVxuXHRcdFx0XHRbNDQ3IGJpdHM6IDAuXVxuXHRcdFx0XHRbNjQgYml0czogbWVzc2FnZSBzaXplIGluZm9ybWF0aW9uLl1cblxuXHRcdFx0RXhhbXBsZSBjYXNlICAjIDJcblx0XHRcdFx0WzUxMi1iaXRzOiBtZXNzYWdlXVxuXHRcdFx0XHRbMSBiaXQ6IDEuXVxuXHRcdFx0XHRbNDQ3IGJpdHM6IDAuXVxuXHRcdFx0XHRbNjQgYml0czogbWVzc2FnZSBzaXplIGluZm9ybWF0aW9uLl1cblxuXHRcdFx0RXhhbXBsZSBjYXNlICAjIDNcblx0XHRcdFx0Wyg1MTIgLSA2NCA9IDQ0OCkgYml0czogbWVzc2FnZS5dXG5cdFx0XHRcdFsxIGJpdDogMS5dXG5cdFx0XHRcdFs1MTEgYml0czogMC5dXG5cdFx0XHRcdFs2NCBiaXRzOiBtZXNzYWdlIHNpemUgaW5mb3JtYXRpb24uXVxuXG5cdFx0XHRFeGFtcGxlIGNhc2UgICMgNFxuXHRcdFx0XHRbKDUxMiAtIDY1ID0gNDQ3KSBiaXRzOiBtZXNzYWdlLl1cblx0XHRcdFx0WzEgYml0OiAxLl1cblx0XHRcdFx0WzAgYml0OiAwLl1cblx0XHRcdFx0WzY0IGJpdHM6IG1lc3NhZ2Ugc2l6ZSBpbmZvcm1hdGlvbi5dXG5cdFx0Ki9cbiAgICAgICAgLy8gVGhlIG51bWJlciBvZiBwYWRkaW5nIHplcm8gYml0czpcbiAgICAgICAgLy8gICAgICA1MTEgLSBbeyhtZXNzYWdlIHNpemUgaW4gYml0cykgKyA2NH0gKG1vZCA1MTIpXVxuICAgICAgICByZXR1cm4gNjQgLSAoKG1lc3NhZ2Vfc2l6ZSArIDgpICYgMGIwMDExMTExMSAvKiA2MyAqLyk7XG4gICAgfVxuICAgIHN0YXRpYyBwYWQobWVzc2FnZSAvKiBBbiBBcnJheUJ1ZmZlci4gKi8pXG4gICAge1xuICAgICAgICBjb25zdCBtZXNzYWdlX3NpemUgPSBtZXNzYWdlLmJ5dGVMZW5ndGg7XG4gICAgICAgIGNvbnN0IG5fcGFkID0gUklQRU1EMTYwLmdldF9uX3BhZF9ieXRlcyhtZXNzYWdlX3NpemUpO1xuXG4gICAgICAgIC8vICBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgIGlzICgoMiAqKiA1MykgLSAxKSBhbmRcbiAgICAgICAgLy8gYml0d2lzZSBvcGVyYXRpb24gaW4gSmF2YXNjcmlwdCBpcyBkb25lIG9uIDMyLWJpdHMgb3BlcmFuZHMuXG4gICAgICAgIGNvbnN0IGRpdm1vZCA9IChkaXZpZGVuZCwgZGl2aXNvcikgPT4gW1xuICAgICAgICAgICAgTWF0aC5mbG9vcihkaXZpZGVuZCAvIGRpdmlzb3IpLFxuICAgICAgICAgICAgZGl2aWRlbmQgJSBkaXZpc29yXG4gICAgICAgIF07XG4gICAgICAgIC8qXG5UbyBzaGlmdFxuXG4gICAwMDAwMDAwMCAwMDA/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/P1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQgb1xuICAgMDAwMDAwMDAgPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8wMDBcblxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuTWV0aG9kICMxXG5cbiAgICAwMDAwMDAwMCAwMDA/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyAgPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz9cbiAgIFswMDAwMDAwMCAwMDBBQUFBQSBBQUFBQUFBQSBBQUFBQUFBQV0gKDxBPiBjYXB0dXJlZClcbiAgIFswMDAwMDAwMCBBQUFBQUFBQSBBQUFBQUFBQSBBQUFBQTAwMF0gKDxBPiBzaGlmdGVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICg8Qj4gY2FwdHVyZWQpIFtCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQkJCQl1cbiAgICAgICAgICAgICAgICAgICAgICg8Qj4gc2hpZnRlZCkgW0JCQl1bQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkIwMDBdXG4gICBbMDAwMDAwMDAgQUFBQUFBQUEgQUFBQUFBQUEgQUFBQUFCQkJdICg8QT4gJiA8Ql8yPiBtZXJnZWQpXG4gICBbMDAwMDAwMDAgQUFBQUFBQUEgQUFBQUFBQUEgQUFBQUFCQkJdW0JCQkJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCIEJCQkJCMDAwXVxuICAgIDAwMDAwMDAwID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ICA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/PzAwMFxuXG5cdFx0Y29uc3QgdWludDMyX21heF9wbHVzXzEgPSAweDEwMDAwMDAwMDsgLy8gKDIgKiogMzIpXG5cdFx0Y29uc3QgW1xuXHRcdFx0bXNnX2J5dGVfc2l6ZV9tb3N0LCAvLyBWYWx1ZSByYW5nZSBbMCwgKDIgKiogMjEpIC0gMV0uXG5cdFx0XHRtc2dfYnl0ZV9zaXplX2xlYXN0IC8vIFZhbHVlIHJhbmdlIFswLCAoMiAqKiAzMikgLSAxXS5cblx0XHRdID0gZGl2bW9kKG1lc3NhZ2Vfc2l6ZSwgdWludDMyX21heF9wbHVzXzEpO1xuXHRcdGNvbnN0IFtcblx0XHRcdGNhcnJ5LCAvLyBWYWx1ZSByYW5nZSBbMCwgN10uXG5cdFx0XHRtc2dfYml0X3NpemVfbGVhc3QgLy8gVmFsdWUgcmFuZ2UgWzAsICgyICoqIDMyKSAtIDhdLlxuXHRcdF0gPSBkaXZtb2QobWVzc2FnZV9ieXRlX3NpemVfbGVhc3QgKiA4LCB1aW50MzJfbWF4X3BsdXNfMSk7XG5cdFx0Y29uc3QgbWVzc2FnZV9iaXRfc2l6ZV9tb3N0ID0gbWVzc2FnZV9ieXRlX3NpemVfbW9zdCAqIDhcblx0XHRcdCsgY2Fycnk7IC8vIFZhbHVlIHJhbmdlIFswLCAoMiAqKiAyNCkgLSAxXS5cblxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuTWV0aG9kICMyXG4gICAgMDAwMDAwMDAgMDAwPz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/XG4gICAgICBbMDAwMDAgMDAwQUFBQUEgQUFBQUFBQUEgQUFBQUFBQUEgIEFBQV0gKDxBPiBjYXB0dXJlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAoPEI+IGNhcHR1cmVkKSBbMDAwQkJCQkIgQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkJCQkJdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICg8Qj4gc2hpZnRlZCkgW0JCQkJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCIEJCQkJCMDAwXVxuICAgWzAwMDAwMDAwIEFBQUFBQUFBIEFBQUFBQUFBIEFBQUFBQUFBXVtCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQjAwMF1cbiAgICAwMDAwMDAwMCA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyAgPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8wMDBcblxuXHRcdCovXG4gICAgICAgIGNvbnN0IFtcbiAgICAgICAgICAgIG1zZ19iaXRfc2l6ZV9tb3N0LFxuICAgICAgICAgICAgbXNnX2JpdF9zaXplX2xlYXN0XG4gICAgICAgIF0gPSBkaXZtb2QobWVzc2FnZV9zaXplLCA1MzY4NzA5MTIgLyogKDIgKiogMjkpICovKVxuICAgICAgICAgICAgLm1hcCgoeCwgaW5kZXgpID0+IChpbmRleCA/ICh4ICogOCkgOiB4KSk7XG5cbiAgICAgICAgLy8gYEFycmF5QnVmZmVyLnRyYW5zZmVyKClgIGlzIG5vdCBzdXBwb3J0ZWQuXG4gICAgICAgIGNvbnN0IHBhZGRlZCA9IG5ldyBVaW50OEFycmF5KG1lc3NhZ2Vfc2l6ZSArIG5fcGFkICsgOCk7XG4gICAgICAgIHBhZGRlZC5zZXQobmV3IFVpbnQ4QXJyYXkobWVzc2FnZSksIDApO1xuICAgICAgICBjb25zdCBkYXRhX3ZpZXcgPSBuZXcgRGF0YVZpZXcocGFkZGVkLmJ1ZmZlcik7XG4gICAgICAgIGRhdGFfdmlldy5zZXRVaW50OChtZXNzYWdlX3NpemUsIDBiMTAwMDAwMDApO1xuICAgICAgICBkYXRhX3ZpZXcuc2V0VWludDMyKFxuICAgICAgICAgICAgbWVzc2FnZV9zaXplICsgbl9wYWQsXG4gICAgICAgICAgICBtc2dfYml0X3NpemVfbGVhc3QsXG4gICAgICAgICAgICB0cnVlIC8vIExpdHRsZS1lbmRpYW5cbiAgICAgICAgKTtcbiAgICAgICAgZGF0YV92aWV3LnNldFVpbnQzMihcbiAgICAgICAgICAgIG1lc3NhZ2Vfc2l6ZSArIG5fcGFkICsgNCxcbiAgICAgICAgICAgIG1zZ19iaXRfc2l6ZV9tb3N0LFxuICAgICAgICAgICAgdHJ1ZSAvLyBMaXR0bGUtZW5kaWFuXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHBhZGRlZC5idWZmZXI7XG4gICAgfVxuXG4gICAgc3RhdGljIGYoaiwgeCwgeSwgeilcbiAgICB7XG4gICAgICAgIGlmKDAgPD0gaiAmJiBqIDw9IDE1KVxuICAgICAgICB7IC8vIEV4Y2x1c2l2ZS1PUlxuICAgICAgICAgICAgcmV0dXJuIHggXiB5IF4gejtcbiAgICAgICAgfVxuICAgICAgICBpZigxNiA8PSBqICYmIGogPD0gMzEpXG4gICAgICAgIHsgLy8gTXVsdGlwbGV4aW5nIChtdXhpbmcpXG4gICAgICAgICAgICByZXR1cm4gKHggJiB5KSB8ICh+eCAmIHopO1xuICAgICAgICB9XG4gICAgICAgIGlmKDMyIDw9IGogJiYgaiA8PSA0NylcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuICh4IHwgfnkpIF4gejtcbiAgICAgICAgfVxuICAgICAgICBpZig0OCA8PSBqICYmIGogPD0gNjMpXG4gICAgICAgIHsgLy8gTXVsdGlwbGV4aW5nIChtdXhpbmcpXG4gICAgICAgICAgICByZXR1cm4gKHggJiB6KSB8ICh5ICYgfnopO1xuICAgICAgICB9XG4gICAgICAgIGlmKDY0IDw9IGogJiYgaiA8PSA3OSlcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHggXiAoeSB8IH56KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgSyhqKVxuICAgIHtcbiAgICAgICAgaWYoMCA8PSBqICYmIGogPD0gMTUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiAweDAwMDAwMDAwO1xuICAgICAgICB9XG4gICAgICAgIGlmKDE2IDw9IGogJiYgaiA8PSAzMSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gTWF0aC5mbG9vcigoMiAqKiAzMCkgKiBNYXRoLlNRUlQyKVxuICAgICAgICAgICAgcmV0dXJuIDB4NUE4Mjc5OTk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoMzIgPD0gaiAmJiBqIDw9IDQ3KVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBNYXRoLmZsb29yKCgyICoqIDMwKSAqIE1hdGguc3FydCgzKSlcbiAgICAgICAgICAgIHJldHVybiAweDZFRDlFQkExO1xuICAgICAgICB9XG4gICAgICAgIGlmKDQ4IDw9IGogJiYgaiA8PSA2MylcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gTWF0aC5mbG9vcigoMiAqKiAzMCkgKiBNYXRoLnNxcnQoNSkpXG4gICAgICAgICAgICByZXR1cm4gMHg4RjFCQkNEQztcbiAgICAgICAgfVxuICAgICAgICBpZig2NCA8PSBqICYmIGogPD0gNzkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIE1hdGguZmxvb3IoKDIgKiogMzApICogTWF0aC5zcXJ0KDcpKVxuICAgICAgICAgICAgcmV0dXJuIDB4QTk1M0ZENEU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIEtQKGopIC8vIEsnXG4gICAge1xuICAgICAgICBpZigwIDw9IGogJiYgaiA8PSAxNSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gTWF0aC5mbG9vcigoMiAqKiAzMCkgKiBNYXRoLmNicnQoMikpXG4gICAgICAgICAgICByZXR1cm4gMHg1MEEyOEJFNjtcbiAgICAgICAgfVxuICAgICAgICBpZigxNiA8PSBqICYmIGogPD0gMzEpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIE1hdGguZmxvb3IoKDIgKiogMzApICogTWF0aC5jYnJ0KDMpKVxuICAgICAgICAgICAgcmV0dXJuIDB4NUM0REQxMjQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYoMzIgPD0gaiAmJiBqIDw9IDQ3KVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBNYXRoLmZsb29yKCgyICoqIDMwKSAqIE1hdGguY2JydCg1KSlcbiAgICAgICAgICAgIHJldHVybiAweDZENzAzRUYzO1xuICAgICAgICB9XG4gICAgICAgIGlmKDQ4IDw9IGogJiYgaiA8PSA2MylcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gTWF0aC5mbG9vcigoMiAqKiAzMCkgKiBNYXRoLmNicnQoNykpXG4gICAgICAgICAgICByZXR1cm4gMHg3QTZENzZFOTtcbiAgICAgICAgfVxuICAgICAgICBpZig2NCA8PSBqICYmIGogPD0gNzkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiAweDAwMDAwMDAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBhZGRfbW9kdWxvMzIoLyogLi4uLi4uICovKVxuICAgIHtcbiAgICAgICAgLy8gMS4gIE1vZHVsbyBhZGRpdGlvbiAoYWRkaXRpb24gbW9kdWxvKSBpcyBhc3NvY2lhdGl2ZS5cbiAgICAgICAgLy8gICAgaHR0cHM6Ly9wcm9vZndpa2kub3JnL3dpa2kvTW9kdWxvX0FkZGl0aW9uX2lzX0Fzc29jaWF0aXZlXG4gXHRcdC8vIDIuICBCaXR3aXNlIG9wZXJhdGlvbiBpbiBKYXZhc2NyaXB0XG4gICAgICAgIC8vICAgIGlzIGRvbmUgb24gMzItYml0cyBvcGVyYW5kc1xuICAgICAgICAvLyAgICBhbmQgcmVzdWx0cyBpbiBhIDMyLWJpdHMgdmFsdWUuXG4gICAgICAgIHJldHVybiBBcnJheVxuICAgICAgICAgICAgLmZyb20oYXJndW1lbnRzKVxuICAgICAgICAgICAgLnJlZHVjZSgoYSwgYikgPT4gKGEgKyBiKSwgMCkgfCAwO1xuICAgIH1cbiAgICBzdGF0aWMgcm9sMzIodmFsdWUsIGNvdW50KVxuICAgIHsgLy8gQ3ljbGljIGxlZnQgc2hpZnQgKHJvdGF0ZSkgb24gMzItYml0cyB2YWx1ZS5cbiAgICAgICAgcmV0dXJuICh2YWx1ZSA8PCBjb3VudCkgfCAodmFsdWUgPj4+ICgzMiAtIGNvdW50KSk7XG4gICAgfVxuICAgIHN0YXRpYyBoYXNoKG1lc3NhZ2UgLyogQW4gQXJyYXlCdWZmZXIuICovKVxuICAgIHtcbiAgICAgICAgLy8gLy8vLy8vLy8gICAgICAgUGFkZGluZyAgICAgICAvLy8vLy8vLy8vXG5cbiAgICAgICAgLy8gVGhlIHBhZGRlZCBtZXNzYWdlLlxuICAgICAgICBjb25zdCBwYWRkZWQgPSBSSVBFTUQxNjAucGFkKG1lc3NhZ2UpO1xuXG4gICAgICAgIC8vIC8vLy8vLy8vICAgICBDb21wcmVzc2lvbiAgICAgLy8vLy8vLy8vL1xuXG4gICAgICAgIC8vIE1lc3NhZ2Ugd29yZCBzZWxlY3RvcnMuXG4gICAgICAgIGNvbnN0IHIgPSBbXG4gICAgICAgICAgICAwLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTQsIDE1LFxuICAgICAgICAgICAgNywgNCwgMTMsIDEsIDEwLCA2LCAxNSwgMywgMTIsIDAsIDksIDUsIDIsIDE0LCAxMSwgOCxcbiAgICAgICAgICAgIDMsIDEwLCAxNCwgNCwgOSwgMTUsIDgsIDEsIDIsIDcsIDAsIDYsIDEzLCAxMSwgNSwgMTIsXG4gICAgICAgICAgICAxLCA5LCAxMSwgMTAsIDAsIDgsIDEyLCA0LCAxMywgMywgNywgMTUsIDE0LCA1LCA2LCAyLFxuICAgICAgICAgICAgNCwgMCwgNSwgOSwgNywgMTIsIDIsIDEwLCAxNCwgMSwgMywgOCwgMTEsIDYsIDE1LCAxM1xuICAgICAgICBdO1xuICAgICAgICBjb25zdCByUCA9IFsgLy8gcidcbiAgICAgICAgICAgIDUsIDE0LCA3LCAwLCA5LCAyLCAxMSwgNCwgMTMsIDYsIDE1LCA4LCAxLCAxMCwgMywgMTIsXG4gICAgICAgICAgICA2LCAxMSwgMywgNywgMCwgMTMsIDUsIDEwLCAxNCwgMTUsIDgsIDEyLCA0LCA5LCAxLCAyLFxuICAgICAgICAgICAgMTUsIDUsIDEsIDMsIDcsIDE0LCA2LCA5LCAxMSwgOCwgMTIsIDIsIDEwLCAwLCA0LCAxMyxcbiAgICAgICAgICAgIDgsIDYsIDQsIDEsIDMsIDExLCAxNSwgMCwgNSwgMTIsIDIsIDEzLCA5LCA3LCAxMCwgMTQsXG4gICAgICAgICAgICAxMiwgMTUsIDEwLCA0LCAxLCA1LCA4LCA3LCA2LCAyLCAxMywgMTQsIDAsIDMsIDksIDExXG4gICAgICAgIF07XG5cbiAgICAgICAgLy8gQW1vdW50cyBmb3IgJ3JvdGF0ZSBsZWZ0JyBvcGVyYXRpb24uXG4gICAgICAgIGNvbnN0IHMgPSBbXG4gICAgICAgICAgICAxMSwgMTQsIDE1LCAxMiwgNSwgOCwgNywgOSwgMTEsIDEzLCAxNCwgMTUsIDYsIDcsIDksIDgsXG4gICAgICAgICAgICA3LCA2LCA4LCAxMywgMTEsIDksIDcsIDE1LCA3LCAxMiwgMTUsIDksIDExLCA3LCAxMywgMTIsXG4gICAgICAgICAgICAxMSwgMTMsIDYsIDcsIDE0LCA5LCAxMywgMTUsIDE0LCA4LCAxMywgNiwgNSwgMTIsIDcsIDUsXG4gICAgICAgICAgICAxMSwgMTIsIDE0LCAxNSwgMTQsIDE1LCA5LCA4LCA5LCAxNCwgNSwgNiwgOCwgNiwgNSwgMTIsXG4gICAgICAgICAgICA5LCAxNSwgNSwgMTEsIDYsIDgsIDEzLCAxMiwgNSwgMTIsIDEzLCAxNCwgMTEsIDgsIDUsIDZcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3Qgc1AgPSBbIC8vIHMnXG4gICAgICAgICAgICA4LCA5LCA5LCAxMSwgMTMsIDE1LCAxNSwgNSwgNywgNywgOCwgMTEsIDE0LCAxNCwgMTIsIDYsXG4gICAgICAgICAgICA5LCAxMywgMTUsIDcsIDEyLCA4LCA5LCAxMSwgNywgNywgMTIsIDcsIDYsIDE1LCAxMywgMTEsXG4gICAgICAgICAgICA5LCA3LCAxNSwgMTEsIDgsIDYsIDYsIDE0LCAxMiwgMTMsIDUsIDE0LCAxMywgMTMsIDcsIDUsXG4gICAgICAgICAgICAxNSwgNSwgOCwgMTEsIDE0LCAxNCwgNiwgMTQsIDYsIDksIDEyLCA5LCAxMiwgNSwgMTUsIDgsXG4gICAgICAgICAgICA4LCA1LCAxMiwgOSwgMTIsIDUsIDE0LCA2LCA4LCAxMywgNiwgNSwgMTUsIDEzLCAxMSwgMTFcbiAgICAgICAgXTtcblxuICAgICAgICAvLyBUaGUgc2l6ZSwgaW4gYnl0ZXMsIG9mIGEgd29yZC5cbiAgICAgICAgY29uc3Qgd29yZF9zaXplID0gNDtcblxuICAgICAgICAvLyBUaGUgc2l6ZSwgaW4gYnl0ZXMsIG9mIGEgMTYtd29yZHMgYmxvY2suXG4gICAgICAgIGNvbnN0IGJsb2NrX3NpemUgPSA2NDtcblxuICAgICAgICAvLyBUaGUgbnVtYmVyIG9mIHRoZSAxNi13b3JkcyBibG9ja3MuXG4gICAgICAgIGNvbnN0IHQgPSBwYWRkZWQuYnl0ZUxlbmd0aCAvIGJsb2NrX3NpemU7XG5cbiAgICAgICAgLy8gIFRoZSBtZXNzYWdlIGFmdGVyIHBhZGRpbmcgY29uc2lzdHMgb2YgdCAxNi13b3JkIGJsb2NrcyB0aGF0XG4gICAgICAgIC8vIGFyZSBkZW5vdGVkIHdpdGggWF9pW2pdLCB3aXRoIDDiiaRp4omkKHQg4oiSIDEpIGFuZCAw4omkauKJpDE1LlxuICAgICAgICBjb25zdCBYID0gKG5ldyBBcnJheSh0KSlcbiAgICAgICAgICAgIC5maWxsKHVuZGVmaW5lZClcbiAgICAgICAgICAgIC5tYXAoKF8sIGkpID0+IGogPT4gKFxuICAgICAgICAgICAgICAgIG5ldyBEYXRhVmlldyhcbiAgICAgICAgICAgICAgICAgICAgcGFkZGVkLCBpICogYmxvY2tfc2l6ZSwgYmxvY2tfc2l6ZVxuICAgICAgICAgICAgICAgICkuZ2V0VWludDMyKFxuICAgICAgICAgICAgICAgICAgICBqICogd29yZF9zaXplLFxuICAgICAgICAgICAgICAgICAgICB0cnVlIC8vIExpdHRsZS1lbmRpYW5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApKTtcblxuICAgICAgICAvLyAgVGhlIHJlc3VsdCBvZiBSSVBFTUQtMTYwIGlzIGNvbnRhaW5lZCBpbiBmaXZlIDMyLWJpdCB3b3JkcyxcbiAgICAgICAgLy8gd2hpY2ggZm9ybSB0aGUgaW50ZXJuYWwgc3RhdGUgb2YgdGhlIGFsZ29yaXRobS4gVGhlIGZpbmFsXG4gICAgICAgIC8vIGNvbnRlbnQgb2YgdGhlc2UgZml2ZSAzMi1iaXQgd29yZHMgaXMgY29udmVydGVkIHRvIGEgMTYwLWJpdFxuICAgICAgICAvLyBzdHJpbmcsIGFnYWluIHVzaW5nIHRoZSBsaXR0bGUtZW5kaWFuIGNvbnZlbnRpb24uXG4gICAgICAgIGNvbnN0IGggPSBbXG4gICAgICAgICAgICAweDY3NDUyMzAxLCAvLyBoXzBcbiAgICAgICAgICAgIDB4RUZDREFCODksIC8vIGhfMVxuICAgICAgICAgICAgMHg5OEJBRENGRSwgLy8gaF8yXG4gICAgICAgICAgICAweDEwMzI1NDc2LCAvLyBoXzNcbiAgICAgICAgICAgIDB4QzNEMkUxRjAgIC8vIGhfNFxuICAgICAgICBdO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0OyArK2kpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBBID0gaFswXTsgbGV0IEIgPSBoWzFdOyBsZXQgQyA9IGhbMl07IGxldCBEID0gaFszXTsgbGV0IEUgPSBoWzRdO1xuICAgICAgICAgICAgbGV0IEFQID0gQTsgbGV0IEJQID0gQjsgbGV0IENQID0gQzsgbGV0IERQID0gRDsgbGV0IEVQID0gRTtcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCA4MDsgKytqKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIExlZnQgcm91bmRzXG4gICAgICAgICAgICAgICAgbGV0IFQgPSBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNoYWRvd1xuICAgICAgICAgICAgICAgICAgICBSSVBFTUQxNjAucm9sMzIoXG4gICAgICAgICAgICAgICAgICAgICAgICBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUklQRU1EMTYwLmYoaiwgQiwgQywgRCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgWFtpXShyW2pdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSSVBFTUQxNjAuSyhqKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNbal1cbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgRVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgQSA9IEU7XG4gICAgICAgICAgICAgICAgRSA9IEQ7XG4gICAgICAgICAgICAgICAgRCA9IFJJUEVNRDE2MC5yb2wzMihDLCAxMCk7XG4gICAgICAgICAgICAgICAgQyA9IEI7XG4gICAgICAgICAgICAgICAgQiA9IFQ7XG5cbiAgICAgICAgICAgICAgICAvLyBSaWdodCByb3VuZHNcbiAgICAgICAgICAgICAgICBUID0gUklQRU1EMTYwLmFkZF9tb2R1bG8zMihcbiAgICAgICAgICAgICAgICAgICAgUklQRU1EMTYwLnJvbDMyKFxuICAgICAgICAgICAgICAgICAgICAgICAgUklQRU1EMTYwLmFkZF9tb2R1bG8zMihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBUCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSSVBFTUQxNjAuZihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgNzkgLSBqLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCUCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ1AsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERQXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBYW2ldKHJQW2pdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSSVBFTUQxNjAuS1AoailcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBzUFtqXVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBFUFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgQVAgPSBFUDtcbiAgICAgICAgICAgICAgICBFUCA9IERQO1xuICAgICAgICAgICAgICAgIERQID0gUklQRU1EMTYwLnJvbDMyKENQLCAxMCk7XG4gICAgICAgICAgICAgICAgQ1AgPSBCUDtcbiAgICAgICAgICAgICAgICBCUCA9IFQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBUID0gUklQRU1EMTYwLmFkZF9tb2R1bG8zMihoWzFdLCBDLCBEUCk7XG4gICAgICAgICAgICBoWzFdID0gUklQRU1EMTYwLmFkZF9tb2R1bG8zMihoWzJdLCBELCBFUCk7XG4gICAgICAgICAgICBoWzJdID0gUklQRU1EMTYwLmFkZF9tb2R1bG8zMihoWzNdLCBFLCBBUCk7XG4gICAgICAgICAgICBoWzNdID0gUklQRU1EMTYwLmFkZF9tb2R1bG8zMihoWzRdLCBBLCBCUCk7XG4gICAgICAgICAgICBoWzRdID0gUklQRU1EMTYwLmFkZF9tb2R1bG8zMihoWzBdLCBCLCBDUCk7XG4gICAgICAgICAgICBoWzBdID0gVDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vICBUaGUgZmluYWwgb3V0cHV0IHN0cmluZyB0aGVuIGNvbnNpc3RzIG9mIHRoZSBjb25jYXRlbmF0YXRpb25cbiAgICAgICAgLy8gb2YgaF8wLCBoXzEsIGhfMiwgaF8zLCBhbmQgaF80IGFmdGVyIGNvbnZlcnRpbmcgZWFjaCBoX2kgdG8gYVxuICAgICAgICAvLyA0LWJ5dGUgc3RyaW5nIHVzaW5nIHRoZSBsaXR0bGUtZW5kaWFuIGNvbnZlbnRpb24uXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheUJ1ZmZlcigyMCk7XG4gICAgICAgIGNvbnN0IGRhdGFfdmlldyA9IG5ldyBEYXRhVmlldyhyZXN1bHQpO1xuICAgICAgICBoLmZvckVhY2goKGhfaSwgaSkgPT4gZGF0YV92aWV3LnNldFVpbnQzMihpICogNCwgaF9pLCB0cnVlKSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBSSVBFTUQxNjBcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImVvc2pzX2pzb25ycGNcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rX25hbWVfXCJdID0gc2VsZltcIndlYnBhY2tDaHVua19uYW1lX1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiZXh0ZXJuYWxzXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3JwYy13ZWIudHNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==