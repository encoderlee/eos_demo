var eosjs_api;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/eosjs-api.ts":
/*!**************************!*\
  !*** ./src/eosjs-api.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * @module API
 */
// copyright defined in eosjs/LICENSE.txt
/* eslint-disable max-classes-per-file */
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
exports.ActionBuilder = exports.TransactionBuilder = exports.Api = void 0;
var pako_1 = __webpack_require__(/*! pako */ "./node_modules/pako/index.js");
var ser = __webpack_require__(/*! ./eosjs-serialize */ "./src/eosjs-serialize.ts");
var Api = /** @class */ (function () {
    /**
     * @param args
     * * `rpc`: Issues RPC calls
     * * `authorityProvider`: Get public keys needed to meet authorities in a transaction
     * * `abiProvider`: Supplies ABIs in raw form (binary)
     * * `signatureProvider`: Signs transactions
     * * `chainId`: Identifies chain
     * * `textEncoder`: `TextEncoder` instance to use. Pass in `null` if running in a browser
     * * `textDecoder`: `TextDecoder` instance to use. Pass in `null` if running in a browser
     */
    function Api(args) {
        /** Holds information needed to serialize contract actions */
        this.contracts = new Map();
        /** Fetched abis */
        this.cachedAbis = new Map();
        this.transactionExtensions = [
            { id: 1, type: 'resource_payer', keys: ['payer', 'max_net_bytes', 'max_cpu_us', 'max_memory_bytes'] },
        ];
        this.rpc = args.rpc;
        this.authorityProvider = args.authorityProvider || args.rpc;
        this.abiProvider = args.abiProvider || args.rpc;
        this.signatureProvider = args.signatureProvider;
        this.chainId = args.chainId;
        this.textEncoder = args.textEncoder;
        this.textDecoder = args.textDecoder;
        this.abiTypes = ser.getTypesFromAbi(ser.createAbiTypes());
        this.transactionTypes = ser.getTypesFromAbi(ser.createTransactionTypes());
    }
    /** Decodes an abi as Uint8Array into json. */
    Api.prototype.rawAbiToJson = function (rawAbi) {
        var buffer = new ser.SerialBuffer({
            textEncoder: this.textEncoder,
            textDecoder: this.textDecoder,
            array: rawAbi,
        });
        if (!ser.supportedAbiVersion(buffer.getString())) {
            throw new Error('Unsupported abi version');
        }
        buffer.restartRead();
        return this.abiTypes.get('abi_def').deserialize(buffer);
    };
    /** Encodes a json abi as Uint8Array. */
    Api.prototype.jsonToRawAbi = function (jsonAbi) {
        var buffer = new ser.SerialBuffer({
            textEncoder: this.textEncoder,
            textDecoder: this.textDecoder,
        });
        this.abiTypes.get('abi_def').serialize(buffer, jsonAbi);
        if (!ser.supportedAbiVersion(buffer.getString())) {
            throw new Error('Unsupported abi version');
        }
        return buffer.asUint8Array();
    };
    /** Get abi in both binary and structured forms. Fetch when needed. */
    Api.prototype.getCachedAbi = function (accountName, reload) {
        if (reload === void 0) { reload = false; }
        return __awaiter(this, void 0, void 0, function () {
            var cachedAbi, rawAbi, abi, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!reload && this.cachedAbis.get(accountName)) {
                            return [2 /*return*/, this.cachedAbis.get(accountName)];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.abiProvider.getRawAbi(accountName)];
                    case 2:
                        rawAbi = (_a.sent()).abi;
                        abi = this.rawAbiToJson(rawAbi);
                        cachedAbi = { rawAbi: rawAbi, abi: abi };
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        e_1.message = "fetching abi for ".concat(accountName, ": ").concat(e_1.message);
                        throw e_1;
                    case 4:
                        if (!cachedAbi) {
                            throw new Error("Missing abi for ".concat(accountName));
                        }
                        this.cachedAbis.set(accountName, cachedAbi);
                        return [2 /*return*/, cachedAbi];
                }
            });
        });
    };
    /** Get abi in structured form. Fetch when needed. */
    Api.prototype.getAbi = function (accountName, reload) {
        if (reload === void 0) { reload = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCachedAbi(accountName, reload)];
                    case 1: return [2 /*return*/, (_a.sent()).abi];
                }
            });
        });
    };
    /** Get abis needed by a transaction */
    Api.prototype.getTransactionAbis = function (transaction, reload) {
        if (reload === void 0) { reload = false; }
        return __awaiter(this, void 0, void 0, function () {
            var actions, accounts, uniqueAccounts, actionPromises;
            var _this = this;
            return __generator(this, function (_a) {
                actions = (transaction.context_free_actions || []).concat(transaction.actions);
                accounts = actions.map(function (action) { return action.account; });
                uniqueAccounts = new Set(accounts);
                actionPromises = __spreadArray([], __read(uniqueAccounts), false).map(function (account) { return __awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = {
                                    accountName: account
                                };
                                return [4 /*yield*/, this.getCachedAbi(account, reload)];
                            case 1: return [2 /*return*/, (_a.abi = (_b.sent()).rawAbi,
                                    _a)];
                        }
                    });
                }); });
                return [2 /*return*/, Promise.all(actionPromises)];
            });
        });
    };
    /** Get data needed to serialize actions in a contract */
    Api.prototype.getContract = function (accountName, reload) {
        if (reload === void 0) { reload = false; }
        return __awaiter(this, void 0, void 0, function () {
            var abi, types, actions, _a, _b, _c, name_1, type, result;
            var e_2, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!reload && this.contracts.get(accountName)) {
                            return [2 /*return*/, this.contracts.get(accountName)];
                        }
                        return [4 /*yield*/, this.getAbi(accountName, reload)];
                    case 1:
                        abi = _e.sent();
                        types = ser.getTypesFromAbi(ser.createInitialTypes(), abi);
                        actions = new Map();
                        try {
                            for (_a = __values(abi.actions), _b = _a.next(); !_b.done; _b = _a.next()) {
                                _c = _b.value, name_1 = _c.name, type = _c.type;
                                actions.set(name_1, ser.getType(types, type));
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        result = { types: types, actions: actions };
                        this.contracts.set(accountName, result);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /** Convert `value` to binary form. `type` must be a built-in abi type or in `transaction.abi.json`. */
    Api.prototype.serialize = function (buffer, type, value) {
        this.transactionTypes.get(type).serialize(buffer, value);
    };
    /** Convert data in `buffer` to structured form. `type` must be a built-in abi type or in `transaction.abi.json`. */
    Api.prototype.deserialize = function (buffer, type) {
        return this.transactionTypes.get(type).deserialize(buffer);
    };
    /** Convert a transaction to binary */
    Api.prototype.serializeTransaction = function (transaction) {
        var buffer = new ser.SerialBuffer({ textEncoder: this.textEncoder, textDecoder: this.textDecoder });
        this.serialize(buffer, 'transaction', __assign({ max_net_usage_words: 0, max_cpu_usage_ms: 0, delay_sec: 0, context_free_actions: [], actions: [], transaction_extensions: [] }, transaction));
        return buffer.asUint8Array();
    };
    /** Serialize context-free data */
    Api.prototype.serializeContextFreeData = function (contextFreeData) {
        var e_3, _a;
        if (!contextFreeData || !contextFreeData.length) {
            return null;
        }
        var buffer = new ser.SerialBuffer({ textEncoder: this.textEncoder, textDecoder: this.textDecoder });
        buffer.pushVaruint32(contextFreeData.length);
        try {
            for (var contextFreeData_1 = __values(contextFreeData), contextFreeData_1_1 = contextFreeData_1.next(); !contextFreeData_1_1.done; contextFreeData_1_1 = contextFreeData_1.next()) {
                var data = contextFreeData_1_1.value;
                buffer.pushBytes(data);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (contextFreeData_1_1 && !contextFreeData_1_1.done && (_a = contextFreeData_1.return)) _a.call(contextFreeData_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return buffer.asUint8Array();
    };
    /** Convert a transaction from binary. Leaves actions in hex. */
    Api.prototype.deserializeTransaction = function (transaction) {
        var buffer = new ser.SerialBuffer({ textEncoder: this.textEncoder, textDecoder: this.textDecoder });
        buffer.pushArray(transaction);
        return this.deserialize(buffer, 'transaction');
    };
    // Order of adding to transaction_extension is transaction_extension id ascending
    Api.prototype.serializeTransactionExtensions = function (transaction) {
        var transaction_extensions = [];
        if (transaction.resource_payer) {
            var extensionBuffer = new ser.SerialBuffer({ textEncoder: this.textEncoder, textDecoder: this.textDecoder });
            var types = ser.getTypesFromAbi(ser.createTransactionExtensionTypes());
            types.get('resource_payer').serialize(extensionBuffer, transaction.resource_payer);
            transaction_extensions = __spreadArray(__spreadArray([], __read(transaction_extensions), false), [[1, ser.arrayToHex(extensionBuffer.asUint8Array())]], false);
        }
        return transaction_extensions;
    };
    ;
    // Usage: transaction = {...transaction, ...this.deserializeTransactionExtensions(transaction.transaction_extensions)}
    Api.prototype.deserializeTransactionExtensions = function (data) {
        var _this = this;
        var transaction = {};
        data.forEach(function (extensionData) {
            var transactionExtension = _this.transactionExtensions.find(function (extension) { return extension.id === extensionData[0]; });
            if (transactionExtension === undefined) {
                throw new Error("Transaction Extension could not be determined: ".concat(extensionData));
            }
            var types = ser.getTypesFromAbi(ser.createTransactionExtensionTypes());
            var extensionBuffer = new ser.SerialBuffer({ textEncoder: _this.textEncoder, textDecoder: _this.textDecoder });
            extensionBuffer.pushArray(ser.hexToUint8Array(extensionData[1]));
            var deserializedObj = types.get(transactionExtension.type).deserialize(extensionBuffer);
            if (extensionData[0] === 1) {
                deserializedObj.max_net_bytes = Number(deserializedObj.max_net_bytes);
                deserializedObj.max_cpu_us = Number(deserializedObj.max_cpu_us);
                deserializedObj.max_memory_bytes = Number(deserializedObj.max_memory_bytes);
                transaction.resource_payer = deserializedObj;
            }
        });
        return transaction;
    };
    ;
    // Transaction extensions are serialized and moved to `transaction_extensions`, deserialized objects are not needed on the transaction
    Api.prototype.deleteTransactionExtensionObjects = function (transaction) {
        delete transaction.resource_payer;
        return transaction;
    };
    /** Convert actions to hex */
    Api.prototype.serializeActions = function (actions) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(actions.map(function (action) { return __awaiter(_this, void 0, void 0, function () {
                            var account, name, authorization, data, contract;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        account = action.account, name = action.name, authorization = action.authorization, data = action.data;
                                        return [4 /*yield*/, this.getContract(account)];
                                    case 1:
                                        contract = _a.sent();
                                        if (typeof data !== 'object') {
                                            return [2 /*return*/, action];
                                        }
                                        return [2 /*return*/, ser.serializeAction(contract, account, name, authorization, data, this.textEncoder, this.textDecoder)];
                                }
                            });
                        }); }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Convert actions from hex */
    Api.prototype.deserializeActions = function (actions) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(actions.map(function (_a) {
                            var account = _a.account, name = _a.name, authorization = _a.authorization, data = _a.data;
                            return __awaiter(_this, void 0, void 0, function () {
                                var contract;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, this.getContract(account)];
                                        case 1:
                                            contract = _b.sent();
                                            return [2 /*return*/, ser.deserializeAction(contract, account, name, authorization, data, this.textEncoder, this.textDecoder)];
                                    }
                                });
                            });
                        }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Convert a transaction from binary. Also deserializes actions. */
    Api.prototype.deserializeTransactionWithActions = function (transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var deserializedTransaction, deserializedCFActions, deserializedActions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof transaction === 'string') {
                            transaction = ser.hexToUint8Array(transaction);
                        }
                        deserializedTransaction = this.deserializeTransaction(transaction);
                        return [4 /*yield*/, this.deserializeActions(deserializedTransaction.context_free_actions)];
                    case 1:
                        deserializedCFActions = _a.sent();
                        return [4 /*yield*/, this.deserializeActions(deserializedTransaction.actions)];
                    case 2:
                        deserializedActions = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, deserializedTransaction), { context_free_actions: deserializedCFActions, actions: deserializedActions })];
                }
            });
        });
    };
    /** Deflate a serialized object */
    Api.prototype.deflateSerializedArray = function (serializedArray) {
        return (0, pako_1.deflate)(serializedArray, { level: 9 });
    };
    /** Inflate a compressed serialized object */
    Api.prototype.inflateSerializedArray = function (compressedSerializedArray) {
        return (0, pako_1.inflate)(compressedSerializedArray);
    };
    /**
     * Create and optionally broadcast a transaction.
     *
     * Named Parameters:
     * `broadcast`: broadcast this transaction?
     * `sign`: sign this transaction?
     * `compression`: compress this transaction?
     * `readOnlyTrx`: read only transaction?
     * `returnFailureTraces`: return failure traces? (only available for read only transactions currently)
     *
     * If both `blocksBehind` and `expireSeconds` are present,
     * then fetch the block which is `blocksBehind` behind head block,
     * use it as a reference for TAPoS, and expire the transaction `expireSeconds` after that block's time.
     *
     * If both `useLastIrreversible` and `expireSeconds` are present,
     * then fetch the last irreversible block, use it as a reference for TAPoS,
     * and expire the transaction `expireSeconds` after that block's time.
     *
     * @returns node response if `broadcast`, `{signatures, serializedTransaction}` if `!broadcast`
     */
    Api.prototype.transact = function (transaction, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.broadcast, broadcast = _c === void 0 ? true : _c, _d = _b.sign, sign = _d === void 0 ? true : _d, readOnlyTrx = _b.readOnlyTrx, returnFailureTraces = _b.returnFailureTraces, requiredKeys = _b.requiredKeys, compression = _b.compression, blocksBehind = _b.blocksBehind, useLastIrreversible = _b.useLastIrreversible, expireSeconds = _b.expireSeconds;
        return __awaiter(this, void 0, void 0, function () {
            var info, abis, _e, serializedTransaction, serializedContextFreeData, pushTransactionArgs, availableKeys;
            var _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (typeof blocksBehind === 'number' && useLastIrreversible) {
                            throw new Error('Use either blocksBehind or useLastIrreversible');
                        }
                        if (!!this.chainId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.rpc.get_info()];
                    case 1:
                        info = _g.sent();
                        this.chainId = info.chain_id;
                        _g.label = 2;
                    case 2:
                        if (!((typeof blocksBehind === 'number' || useLastIrreversible) && expireSeconds)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.generateTapos(info, transaction, blocksBehind, useLastIrreversible, expireSeconds)];
                    case 3:
                        transaction = _g.sent();
                        _g.label = 4;
                    case 4:
                        if (!this.hasRequiredTaposFields(transaction)) {
                            throw new Error('Required configuration or TAPOS fields are not present');
                        }
                        return [4 /*yield*/, this.getTransactionAbis(transaction)];
                    case 5:
                        abis = _g.sent();
                        _e = [__assign({}, transaction)];
                        _f = {};
                        return [4 /*yield*/, this.serializeTransactionExtensions(transaction)];
                    case 6:
                        _f.transaction_extensions = _g.sent();
                        return [4 /*yield*/, this.serializeActions(transaction.context_free_actions || [])];
                    case 7:
                        _f.context_free_actions = _g.sent();
                        return [4 /*yield*/, this.serializeActions(transaction.actions)];
                    case 8:
                        transaction = __assign.apply(void 0, _e.concat([(_f.actions = _g.sent(), _f)]));
                        transaction = this.deleteTransactionExtensionObjects(transaction);
                        serializedTransaction = this.serializeTransaction(transaction);
                        serializedContextFreeData = this.serializeContextFreeData(transaction.context_free_data);
                        pushTransactionArgs = {
                            serializedTransaction: serializedTransaction,
                            serializedContextFreeData: serializedContextFreeData,
                            signatures: []
                        };
                        if (!sign) return [3 /*break*/, 13];
                        if (!!requiredKeys) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.signatureProvider.getAvailableKeys()];
                    case 9:
                        availableKeys = _g.sent();
                        return [4 /*yield*/, this.authorityProvider.getRequiredKeys({ transaction: transaction, availableKeys: availableKeys })];
                    case 10:
                        requiredKeys = _g.sent();
                        _g.label = 11;
                    case 11: return [4 /*yield*/, this.signatureProvider.sign({
                            chainId: this.chainId,
                            requiredKeys: requiredKeys,
                            serializedTransaction: serializedTransaction,
                            serializedContextFreeData: serializedContextFreeData,
                            abis: abis,
                        })];
                    case 12:
                        pushTransactionArgs = _g.sent();
                        _g.label = 13;
                    case 13:
                        if (broadcast) {
                            if (compression) {
                                return [2 /*return*/, this.pushCompressedSignedTransaction(pushTransactionArgs, readOnlyTrx, returnFailureTraces)];
                            }
                            return [2 /*return*/, this.pushSignedTransaction(pushTransactionArgs, readOnlyTrx, returnFailureTraces)];
                        }
                        return [2 /*return*/, pushTransactionArgs];
                }
            });
        });
    };
    Api.prototype.query = function (account, short, query, _a) {
        var sign = _a.sign, requiredKeys = _a.requiredKeys, _b = _a.authorization, authorization = _b === void 0 ? [] : _b;
        return __awaiter(this, void 0, void 0, function () {
            var info, refBlock, queryBuffer, transaction, serializedTransaction, signatures, abis, availableKeys, signResponse, response, returnBuffer;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.rpc.get_info()];
                    case 1:
                        info = _c.sent();
                        return [4 /*yield*/, this.tryRefBlockFromGetInfo(info)];
                    case 2:
                        refBlock = _c.sent();
                        queryBuffer = new ser.SerialBuffer({ textEncoder: this.textEncoder, textDecoder: this.textDecoder });
                        ser.serializeQuery(queryBuffer, query);
                        transaction = __assign(__assign({}, ser.transactionHeader(refBlock, 60 * 30)), { context_free_actions: [], actions: [{
                                    account: account,
                                    name: 'queryit',
                                    authorization: authorization,
                                    data: ser.arrayToHex(queryBuffer.asUint8Array()),
                                }] });
                        serializedTransaction = this.serializeTransaction(transaction);
                        signatures = [];
                        if (!sign) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.getTransactionAbis(transaction)];
                    case 3:
                        abis = _c.sent();
                        if (!!requiredKeys) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.signatureProvider.getAvailableKeys()];
                    case 4:
                        availableKeys = _c.sent();
                        return [4 /*yield*/, this.authorityProvider.getRequiredKeys({ transaction: transaction, availableKeys: availableKeys })];
                    case 5:
                        requiredKeys = _c.sent();
                        _c.label = 6;
                    case 6: return [4 /*yield*/, this.signatureProvider.sign({
                            chainId: this.chainId,
                            requiredKeys: requiredKeys,
                            serializedTransaction: serializedTransaction,
                            serializedContextFreeData: null,
                            abis: abis,
                        })];
                    case 7:
                        signResponse = _c.sent();
                        signatures = signResponse.signatures;
                        _c.label = 8;
                    case 8: return [4 /*yield*/, this.rpc.send_transaction({
                            signatures: signatures,
                            compression: 0,
                            serializedTransaction: serializedTransaction
                        })];
                    case 9:
                        response = _c.sent();
                        returnBuffer = new ser.SerialBuffer({
                            textEncoder: this.textEncoder,
                            textDecoder: this.textDecoder,
                            array: ser.hexToUint8Array(response.processed.action_traces[0][1].return_value)
                        });
                        if (short) {
                            return [2 /*return*/, ser.deserializeAnyvarShort(returnBuffer)];
                        }
                        else {
                            return [2 /*return*/, ser.deserializeAnyvar(returnBuffer)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /** Broadcast a signed transaction */
    Api.prototype.pushSignedTransaction = function (_a, readOnlyTrx, returnFailureTraces) {
        var signatures = _a.signatures, serializedTransaction = _a.serializedTransaction, serializedContextFreeData = _a.serializedContextFreeData;
        if (readOnlyTrx === void 0) { readOnlyTrx = false; }
        if (returnFailureTraces === void 0) { returnFailureTraces = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                if (readOnlyTrx) {
                    return [2 /*return*/, this.rpc.push_ro_transaction({
                            signatures: signatures,
                            serializedTransaction: serializedTransaction,
                            serializedContextFreeData: serializedContextFreeData,
                        }, returnFailureTraces)];
                }
                return [2 /*return*/, this.rpc.push_transaction({
                        signatures: signatures,
                        serializedTransaction: serializedTransaction,
                        serializedContextFreeData: serializedContextFreeData
                    })];
            });
        });
    };
    Api.prototype.pushCompressedSignedTransaction = function (_a, readOnlyTrx, returnFailureTraces) {
        var signatures = _a.signatures, serializedTransaction = _a.serializedTransaction, serializedContextFreeData = _a.serializedContextFreeData;
        if (readOnlyTrx === void 0) { readOnlyTrx = false; }
        if (returnFailureTraces === void 0) { returnFailureTraces = false; }
        return __awaiter(this, void 0, void 0, function () {
            var compressedSerializedTransaction, compressedSerializedContextFreeData;
            return __generator(this, function (_b) {
                compressedSerializedTransaction = this.deflateSerializedArray(serializedTransaction);
                compressedSerializedContextFreeData = this.deflateSerializedArray(serializedContextFreeData || new Uint8Array(0));
                if (readOnlyTrx) {
                    return [2 /*return*/, this.rpc.push_ro_transaction({
                            signatures: signatures,
                            compression: 1,
                            serializedTransaction: compressedSerializedTransaction,
                            serializedContextFreeData: compressedSerializedContextFreeData
                        }, returnFailureTraces)];
                }
                return [2 /*return*/, this.rpc.push_transaction({
                        signatures: signatures,
                        compression: 1,
                        serializedTransaction: compressedSerializedTransaction,
                        serializedContextFreeData: compressedSerializedContextFreeData
                    })];
            });
        });
    };
    Api.prototype.generateTapos = function (info, transaction, blocksBehind, useLastIrreversible, expireSeconds) {
        return __awaiter(this, void 0, void 0, function () {
            var block, taposBlockNumber, refBlock, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!info) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.rpc.get_info()];
                    case 1:
                        info = _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!useLastIrreversible) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.tryRefBlockFromGetInfo(info)];
                    case 3:
                        block = _b.sent();
                        return [2 /*return*/, __assign(__assign({}, ser.transactionHeader(block, expireSeconds)), transaction)];
                    case 4:
                        taposBlockNumber = info.head_block_num - blocksBehind;
                        if (!(taposBlockNumber <= info.last_irreversible_block_num)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.tryGetBlockInfo(taposBlockNumber)];
                    case 5:
                        _a = _b.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.tryGetBlockHeaderState(taposBlockNumber)];
                    case 7:
                        _a = _b.sent();
                        _b.label = 8;
                    case 8:
                        refBlock = _a;
                        return [2 /*return*/, __assign(__assign({}, ser.transactionHeader(refBlock, expireSeconds)), transaction)];
                }
            });
        });
    };
    // eventually break out into TransactionValidator class
    Api.prototype.hasRequiredTaposFields = function (_a) {
        var expiration = _a.expiration, ref_block_num = _a.ref_block_num, ref_block_prefix = _a.ref_block_prefix;
        return !!(expiration && typeof (ref_block_num) === 'number' && typeof (ref_block_prefix) === 'number');
    };
    Api.prototype.tryGetBlockHeaderState = function (taposBlockNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        return [4 /*yield*/, this.rpc.get_block_header_state(taposBlockNumber)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        return [4 /*yield*/, this.tryGetBlockInfo(taposBlockNumber)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Api.prototype.tryGetBlockInfo = function (blockNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        return [4 /*yield*/, this.rpc.get_block_info(blockNumber)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_2 = _a.sent();
                        return [4 /*yield*/, this.rpc.get_block(blockNumber)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Api.prototype.tryRefBlockFromGetInfo = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var block;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(info.hasOwnProperty('last_irreversible_block_id') &&
                            info.hasOwnProperty('last_irreversible_block_num') &&
                            info.hasOwnProperty('last_irreversible_block_time'))) return [3 /*break*/, 1];
                        return [2 /*return*/, {
                                block_num: info.last_irreversible_block_num,
                                id: info.last_irreversible_block_id,
                                timestamp: info.last_irreversible_block_time,
                            }];
                    case 1: return [4 /*yield*/, this.tryGetBlockInfo(info.last_irreversible_block_num)];
                    case 2:
                        block = _a.sent();
                        return [2 /*return*/, {
                                block_num: block.block_num,
                                id: block.id,
                                timestamp: block.timestamp,
                            }];
                }
            });
        });
    };
    Api.prototype.with = function (accountName) {
        return new ActionBuilder(this, accountName);
    };
    Api.prototype.buildTransaction = function (cb) {
        var tx = new TransactionBuilder(this);
        if (cb) {
            return cb(tx);
        }
        return tx;
    };
    return Api;
}()); // Api
exports.Api = Api;
var TransactionBuilder = /** @class */ (function () {
    function TransactionBuilder(api) {
        this.actions = [];
        this.contextFreeGroups = [];
        this.api = api;
    }
    TransactionBuilder.prototype.with = function (accountName) {
        var actionBuilder = new ActionBuilder(this.api, accountName);
        this.actions.push(actionBuilder);
        return actionBuilder;
    };
    TransactionBuilder.prototype.associateContextFree = function (contextFreeGroup) {
        this.contextFreeGroups.push(contextFreeGroup);
        return this;
    };
    TransactionBuilder.prototype.send = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var contextFreeDataSet, contextFreeActions, actions;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contextFreeDataSet = [];
                        contextFreeActions = [];
                        actions = this.actions.map(function (actionBuilder) { return actionBuilder.serializedData; });
                        return [4 /*yield*/, Promise.all(this.contextFreeGroups.map(function (contextFreeCallback) { return __awaiter(_this, void 0, void 0, function () {
                                var _a, action, contextFreeAction, contextFreeData;
                                return __generator(this, function (_b) {
                                    _a = contextFreeCallback({
                                        cfd: contextFreeDataSet.length,
                                        cfa: contextFreeActions.length
                                    }), action = _a.action, contextFreeAction = _a.contextFreeAction, contextFreeData = _a.contextFreeData;
                                    if (action) {
                                        actions.push(action);
                                    }
                                    if (contextFreeAction) {
                                        contextFreeActions.push(contextFreeAction);
                                    }
                                    if (contextFreeData) {
                                        contextFreeDataSet.push(contextFreeData);
                                    }
                                    return [2 /*return*/];
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        this.contextFreeGroups = [];
                        this.actions = [];
                        return [4 /*yield*/, this.api.transact({
                                context_free_data: contextFreeDataSet,
                                context_free_actions: contextFreeActions,
                                actions: actions
                            }, config)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return TransactionBuilder;
}());
exports.TransactionBuilder = TransactionBuilder;
var ActionBuilder = /** @class */ (function () {
    function ActionBuilder(api, accountName) {
        this.api = api;
        this.accountName = accountName;
    }
    ActionBuilder.prototype.as = function (actorName) {
        if (actorName === void 0) { actorName = []; }
        var authorization = [];
        if (actorName && typeof actorName === 'string') {
            authorization = [{ actor: actorName, permission: 'active' }];
        }
        else {
            authorization = actorName;
        }
        return new ActionSerializer(this, this.api, this.accountName, authorization);
    };
    return ActionBuilder;
}());
exports.ActionBuilder = ActionBuilder;
var ActionSerializer = /** @class */ (function () {
    function ActionSerializer(parent, api, accountName, authorization) {
        var e_4, _a;
        var _this = this;
        var jsonAbi = api.cachedAbis.get(accountName);
        if (!jsonAbi) {
            throw new Error('ABI must be cached before using ActionBuilder, run api.getAbi()');
        }
        var types = ser.getTypesFromAbi(ser.createInitialTypes(), jsonAbi.abi);
        var actions = new Map();
        try {
            for (var _b = __values(jsonAbi.abi.actions), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = _c.value, name_2 = _d.name, type = _d.type;
                actions.set(name_2, ser.getType(types, type));
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        actions.forEach(function (type, name) {
            var _a;
            Object.assign(_this, (_a = {},
                _a[name] = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var data = {};
                    args.forEach(function (arg, index) {
                        var field = type.fields[index];
                        data[field.name] = arg;
                    });
                    var serializedData = ser.serializeAction({ types: types, actions: actions }, accountName, name, authorization, data, api.textEncoder, api.textDecoder);
                    parent.serializedData = serializedData;
                    return serializedData;
                },
                _a));
        });
    }
    return ActionSerializer;
}());


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

/***/ "./src/eosjs-serialize.ts":
/*!********************************!*\
  !*** ./src/eosjs-serialize.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * @module Serialize
 */
// copyright defined in eosjs/LICENSE.txt
/* eslint-disable max-classes-per-file */
/* eslint-disable jsdoc/check-indentation */
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
exports.serializeQuery = exports.deserializeAnyArray = exports.serializeAnyArray = exports.deserializeAnyObject = exports.serializeAnyObject = exports.deserializeAnyvarShort = exports.deserializeAnyvar = exports.serializeAnyvar = exports.deserializeAction = exports.deserializeActionData = exports.serializeAction = exports.serializeActionData = exports.transactionHeader = exports.getTypesFromAbi = exports.getType = exports.createTransactionTypes = exports.createTransactionExtensionTypes = exports.createAbiTypes = exports.createInitialTypes = exports.hexToUint8Array = exports.arrayToHex = exports.symbolToString = exports.stringToSymbol = exports.blockTimestampToDate = exports.dateToBlockTimestamp = exports.timePointSecToDate = exports.dateToTimePointSec = exports.timePointToDate = exports.dateToTimePoint = exports.supportedAbiVersion = exports.SerialBuffer = exports.SerializerState = void 0;
var numeric = __webpack_require__(/*! ./eosjs-numeric */ "./src/eosjs-numeric.ts");
/** State for serialize() and deserialize() */
var SerializerState = /** @class */ (function () {
    function SerializerState(options) {
        if (options === void 0) { options = {}; }
        /** Have any binary extensions been skipped? */
        this.skippedBinaryExtension = false;
        this.options = options;
    }
    return SerializerState;
}());
exports.SerializerState = SerializerState;
/** Serialize and deserialize data */
var SerialBuffer = /** @class */ (function () {
    /**
     * @param __namedParameters
     * `array`: `null` if serializing, or binary data to deserialize
     * `textEncoder`: `TextEncoder` instance to use. Pass in `null` if running in a browser
     * `textDecoder`: `TextDecider` instance to use. Pass in `null` if running in a browser
     */
    function SerialBuffer(_a) {
        var _b = _a === void 0 ? {} : _a, textEncoder = _b.textEncoder, textDecoder = _b.textDecoder, array = _b.array;
        /** Current position while reading (deserializing) */
        this.readPos = 0;
        this.array = array || new Uint8Array(1024);
        this.length = array ? array.length : 0;
        this.textEncoder = textEncoder || new TextEncoder();
        this.textDecoder = textDecoder || new TextDecoder('utf-8', { fatal: true });
    }
    /** Resize `array` if needed to have at least `size` bytes free */
    SerialBuffer.prototype.reserve = function (size) {
        if (this.length + size <= this.array.length) {
            return;
        }
        var l = this.array.length;
        while (this.length + size > l) {
            l = Math.ceil(l * 1.5);
        }
        var newArray = new Uint8Array(l);
        newArray.set(this.array);
        this.array = newArray;
    };
    /** Is there data available to read? */
    SerialBuffer.prototype.haveReadData = function () {
        return this.readPos < this.length;
    };
    /** Restart reading from the beginning */
    SerialBuffer.prototype.restartRead = function () {
        this.readPos = 0;
    };
    /** Return data with excess storage trimmed away */
    SerialBuffer.prototype.asUint8Array = function () {
        return new Uint8Array(this.array.buffer, this.array.byteOffset, this.length);
    };
    /** Append bytes */
    SerialBuffer.prototype.pushArray = function (v) {
        this.reserve(v.length);
        this.array.set(v, this.length);
        this.length += v.length;
    };
    /** Append bytes */
    SerialBuffer.prototype.push = function () {
        var v = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            v[_i] = arguments[_i];
        }
        this.pushArray(v);
    };
    /** Get a single byte */
    SerialBuffer.prototype.get = function () {
        if (this.readPos < this.length) {
            return this.array[this.readPos++];
        }
        throw new Error('Read past end of buffer');
    };
    /** Append bytes in `v`. Throws if `len` doesn't match `v.length` */
    SerialBuffer.prototype.pushUint8ArrayChecked = function (v, len) {
        if (v.length !== len) {
            throw new Error('Binary data has incorrect size');
        }
        this.pushArray(v);
    };
    /** Get `len` bytes */
    SerialBuffer.prototype.getUint8Array = function (len) {
        if (this.readPos + len > this.length) {
            throw new Error('Read past end of buffer');
        }
        var result = new Uint8Array(this.array.buffer, this.array.byteOffset + this.readPos, len);
        this.readPos += len;
        return result;
    };
    /** Skip `len` bytes */
    SerialBuffer.prototype.skip = function (len) {
        if (this.readPos + len > this.length) {
            throw new Error('Read past end of buffer');
        }
        this.readPos += len;
    };
    /** Append a `uint16` */
    SerialBuffer.prototype.pushUint16 = function (v) {
        this.push((v >> 0) & 0xff, (v >> 8) & 0xff);
    };
    /** Get a `uint16` */
    SerialBuffer.prototype.getUint16 = function () {
        var v = 0;
        v |= this.get() << 0;
        v |= this.get() << 8;
        return v;
    };
    /** Append a `uint32` */
    SerialBuffer.prototype.pushUint32 = function (v) {
        this.push((v >> 0) & 0xff, (v >> 8) & 0xff, (v >> 16) & 0xff, (v >> 24) & 0xff);
    };
    /** Get a `uint32` */
    SerialBuffer.prototype.getUint32 = function () {
        var v = 0;
        v |= this.get() << 0;
        v |= this.get() << 8;
        v |= this.get() << 16;
        v |= this.get() << 24;
        return v >>> 0;
    };
    /** Append a `uint64`. *Caution*: `number` only has 53 bits of precision */
    SerialBuffer.prototype.pushNumberAsUint64 = function (v) {
        this.pushUint32(v >>> 0);
        this.pushUint32(Math.floor(v / 4294967296) >>> 0);
    };
    /**
     * Get a `uint64` as a `number`. *Caution*: `number` only has 53 bits of precision; some values will change.
     * `numeric.binaryToDecimal(serialBuffer.getUint8Array(8))` recommended instead
     */
    SerialBuffer.prototype.getUint64AsNumber = function () {
        var low = this.getUint32();
        var high = this.getUint32();
        return (high >>> 0) * 4294967296 + (low >>> 0);
    };
    /** Append a `varuint32` */
    SerialBuffer.prototype.pushVaruint32 = function (v) {
        while (true) {
            if (v >>> 7) {
                this.push(0x80 | (v & 0x7f));
                v = v >>> 7;
            }
            else {
                this.push(v);
                break;
            }
        }
    };
    /** Get a `varuint32` */
    SerialBuffer.prototype.getVaruint32 = function () {
        var v = 0;
        var bit = 0;
        while (true) {
            var b = this.get();
            v |= (b & 0x7f) << bit;
            bit += 7;
            if (!(b & 0x80)) {
                break;
            }
        }
        return v >>> 0;
    };
    /** Append a `varint32` */
    SerialBuffer.prototype.pushVarint32 = function (v) {
        this.pushVaruint32((v << 1) ^ (v >> 31));
    };
    /** Get a `varint32` */
    SerialBuffer.prototype.getVarint32 = function () {
        var v = this.getVaruint32();
        if (v & 1) {
            return ((~v) >> 1) | 2147483648;
        }
        else {
            return v >>> 1;
        }
    };
    /** Append a `float32` */
    SerialBuffer.prototype.pushFloat32 = function (v) {
        this.pushArray(new Uint8Array((new Float32Array([v])).buffer));
    };
    /** Get a `float32` */
    SerialBuffer.prototype.getFloat32 = function () {
        return new Float32Array(this.getUint8Array(4).slice().buffer)[0];
    };
    /** Append a `float64` */
    SerialBuffer.prototype.pushFloat64 = function (v) {
        this.pushArray(new Uint8Array((new Float64Array([v])).buffer));
    };
    /** Get a `float64` */
    SerialBuffer.prototype.getFloat64 = function () {
        return new Float64Array(this.getUint8Array(8).slice().buffer)[0];
    };
    /** Append a `name` */
    SerialBuffer.prototype.pushName = function (s) {
        if (typeof s !== 'string') {
            throw new Error('Expected string containing name');
        }
        var regex = new RegExp(/^[.1-5a-z]{0,12}[.1-5a-j]?$/);
        if (!regex.test(s)) {
            throw new Error('Name should be less than 13 characters, or less than 14 if last character is between 1-5 or a-j, and only contain the following symbols .12345abcdefghijklmnopqrstuvwxyz'); // eslint-disable-line
        }
        var charToSymbol = function (c) {
            if (c >= 'a'.charCodeAt(0) && c <= 'z'.charCodeAt(0)) {
                return (c - 'a'.charCodeAt(0)) + 6;
            }
            if (c >= '1'.charCodeAt(0) && c <= '5'.charCodeAt(0)) {
                return (c - '1'.charCodeAt(0)) + 1;
            }
            return 0;
        };
        var a = new Uint8Array(8);
        var bit = 63;
        for (var i = 0; i < s.length; ++i) {
            var c = charToSymbol(s.charCodeAt(i));
            if (bit < 5) {
                c = c << 1;
            }
            for (var j = 4; j >= 0; --j) {
                if (bit >= 0) {
                    a[Math.floor(bit / 8)] |= ((c >> j) & 1) << (bit % 8);
                    --bit;
                }
            }
        }
        this.pushArray(a);
    };
    /** Get a `name` */
    SerialBuffer.prototype.getName = function () {
        var a = this.getUint8Array(8);
        var result = '';
        for (var bit = 63; bit >= 0;) {
            var c = 0;
            for (var i = 0; i < 5; ++i) {
                if (bit >= 0) {
                    c = (c << 1) | ((a[Math.floor(bit / 8)] >> (bit % 8)) & 1);
                    --bit;
                }
            }
            if (c >= 6) {
                result += String.fromCharCode(c + 'a'.charCodeAt(0) - 6);
            }
            else if (c >= 1) {
                result += String.fromCharCode(c + '1'.charCodeAt(0) - 1);
            }
            else {
                result += '.';
            }
        }
        while (result.endsWith('.')) {
            result = result.substr(0, result.length - 1);
        }
        return result;
    };
    /** Append length-prefixed binary data */
    SerialBuffer.prototype.pushBytes = function (v) {
        this.pushVaruint32(v.length);
        this.pushArray(v);
    };
    /** Get length-prefixed binary data */
    SerialBuffer.prototype.getBytes = function () {
        return this.getUint8Array(this.getVaruint32());
    };
    /** Append a string */
    SerialBuffer.prototype.pushString = function (v) {
        this.pushBytes(this.textEncoder.encode(v));
    };
    /** Get a string */
    SerialBuffer.prototype.getString = function () {
        return this.textDecoder.decode(this.getBytes());
    };
    /** Append a `symbol_code`. Unlike `symbol`, `symbol_code` doesn't include a precision. */
    SerialBuffer.prototype.pushSymbolCode = function (name) {
        if (typeof name !== 'string') {
            throw new Error('Expected string containing symbol_code');
        }
        var a = [];
        a.push.apply(a, __spreadArray([], __read(this.textEncoder.encode(name)), false));
        while (a.length < 8) {
            a.push(0);
        }
        this.pushArray(a.slice(0, 8));
    };
    /** Get a `symbol_code`. Unlike `symbol`, `symbol_code` doesn't include a precision. */
    SerialBuffer.prototype.getSymbolCode = function () {
        var a = this.getUint8Array(8);
        var len;
        for (len = 0; len < a.length; ++len) {
            if (!a[len]) {
                break;
            }
        }
        var name = this.textDecoder.decode(new Uint8Array(a.buffer, a.byteOffset, len));
        return name;
    };
    /** Append a `symbol` */
    SerialBuffer.prototype.pushSymbol = function (_a) {
        var name = _a.name, precision = _a.precision;
        if (!/^[A-Z]{1,7}$/.test(name)) {
            throw new Error('Expected symbol to be A-Z and between one and seven characters');
        }
        var a = [precision & 0xff];
        a.push.apply(a, __spreadArray([], __read(this.textEncoder.encode(name)), false));
        while (a.length < 8) {
            a.push(0);
        }
        this.pushArray(a.slice(0, 8));
    };
    /** Get a `symbol` */
    SerialBuffer.prototype.getSymbol = function () {
        var precision = this.get();
        var a = this.getUint8Array(7);
        var len;
        for (len = 0; len < a.length; ++len) {
            if (!a[len]) {
                break;
            }
        }
        var name = this.textDecoder.decode(new Uint8Array(a.buffer, a.byteOffset, len));
        return { name: name, precision: precision };
    };
    /** Append an asset */
    SerialBuffer.prototype.pushAsset = function (s) {
        if (typeof s !== 'string') {
            throw new Error('Expected string containing asset');
        }
        s = s.trim();
        var pos = 0;
        var amount = '';
        var precision = 0;
        if (s[pos] === '-') {
            amount += '-';
            ++pos;
        }
        var foundDigit = false;
        while (pos < s.length && s.charCodeAt(pos) >= '0'.charCodeAt(0) && s.charCodeAt(pos) <= '9'.charCodeAt(0)) {
            foundDigit = true;
            amount += s[pos];
            ++pos;
        }
        if (!foundDigit) {
            throw new Error('Asset must begin with a number');
        }
        if (s[pos] === '.') {
            ++pos;
            while (pos < s.length && s.charCodeAt(pos) >= '0'.charCodeAt(0) && s.charCodeAt(pos) <= '9'.charCodeAt(0)) {
                amount += s[pos];
                ++precision;
                ++pos;
            }
        }
        var name = s.substr(pos).trim();
        this.pushArray(numeric.signedDecimalToBinary(8, amount));
        this.pushSymbol({ name: name, precision: precision });
    };
    /** Get an asset */
    SerialBuffer.prototype.getAsset = function () {
        var amount = this.getUint8Array(8);
        var _a = this.getSymbol(), name = _a.name, precision = _a.precision;
        var s = numeric.signedBinaryToDecimal(amount, precision + 1);
        if (precision) {
            s = s.substr(0, s.length - precision) + '.' + s.substr(s.length - precision);
        }
        return s + ' ' + name;
    };
    /** Append a public key */
    SerialBuffer.prototype.pushPublicKey = function (s) {
        var key = numeric.stringToPublicKey(s);
        this.push(key.type);
        this.pushArray(key.data);
    };
    /** Get a public key */
    SerialBuffer.prototype.getPublicKey = function () {
        var type = this.get();
        var data;
        if (type === numeric.KeyType.wa) {
            var begin = this.readPos;
            this.skip(34);
            this.skip(this.getVaruint32());
            data = new Uint8Array(this.array.buffer, this.array.byteOffset + begin, this.readPos - begin);
        }
        else {
            data = this.getUint8Array(numeric.publicKeyDataSize);
        }
        return numeric.publicKeyToString({ type: type, data: data });
    };
    /** Append a private key */
    SerialBuffer.prototype.pushPrivateKey = function (s) {
        var key = numeric.stringToPrivateKey(s);
        this.push(key.type);
        this.pushArray(key.data);
    };
    /** Get a private key */
    SerialBuffer.prototype.getPrivateKey = function () {
        var type = this.get();
        var data = this.getUint8Array(numeric.privateKeyDataSize);
        return numeric.privateKeyToString({ type: type, data: data });
    };
    /** Append a signature */
    SerialBuffer.prototype.pushSignature = function (s) {
        var key = numeric.stringToSignature(s);
        this.push(key.type);
        this.pushArray(key.data);
    };
    /** Get a signature */
    SerialBuffer.prototype.getSignature = function () {
        var type = this.get();
        var data;
        if (type === numeric.KeyType.wa) {
            var begin = this.readPos;
            this.skip(65);
            this.skip(this.getVaruint32());
            this.skip(this.getVaruint32());
            data = new Uint8Array(this.array.buffer, this.array.byteOffset + begin, this.readPos - begin);
        }
        else {
            data = this.getUint8Array(numeric.signatureDataSize);
        }
        return numeric.signatureToString({ type: type, data: data });
    };
    return SerialBuffer;
}()); // SerialBuffer
exports.SerialBuffer = SerialBuffer;
/** Is this a supported ABI version? */
var supportedAbiVersion = function (version) {
    return version.startsWith('eosio::abi/1.');
};
exports.supportedAbiVersion = supportedAbiVersion;
var checkDateParse = function (date) {
    var result = Date.parse(date);
    if (Number.isNaN(result)) {
        throw new Error('Invalid time format');
    }
    return result;
};
/** Convert date in ISO format to `time_point` (miliseconds since epoch) */
var dateToTimePoint = function (date) {
    return Math.round(checkDateParse(date + 'Z') * 1000);
};
exports.dateToTimePoint = dateToTimePoint;
/** Convert `time_point` (miliseconds since epoch) to date in ISO format */
var timePointToDate = function (us) {
    var s = (new Date(us / 1000)).toISOString();
    return s.substr(0, s.length - 1);
};
exports.timePointToDate = timePointToDate;
/** Convert date in ISO format to `time_point_sec` (seconds since epoch) */
var dateToTimePointSec = function (date) {
    return Math.round(checkDateParse(date + 'Z') / 1000);
};
exports.dateToTimePointSec = dateToTimePointSec;
/** Convert `time_point_sec` (seconds since epoch) to to date in ISO format */
var timePointSecToDate = function (sec) {
    var s = (new Date(sec * 1000)).toISOString();
    return s.substr(0, s.length - 1);
};
exports.timePointSecToDate = timePointSecToDate;
/** Convert date in ISO format to `block_timestamp_type` (half-seconds since a different epoch) */
var dateToBlockTimestamp = function (date) {
    return Math.round((checkDateParse(date + 'Z') - 946684800000) / 500);
};
exports.dateToBlockTimestamp = dateToBlockTimestamp;
/** Convert `block_timestamp_type` (half-seconds since a different epoch) to to date in ISO format */
var blockTimestampToDate = function (slot) {
    var s = (new Date(slot * 500 + 946684800000)).toISOString();
    return s.substr(0, s.length - 1);
};
exports.blockTimestampToDate = blockTimestampToDate;
/** Convert `string` to `Symbol`. format: `precision,NAME`. */
var stringToSymbol = function (s) {
    if (typeof s !== 'string') {
        throw new Error('Expected string containing symbol');
    }
    var m = s.match(/^([0-9]+),([A-Z]+)$/);
    if (!m) {
        throw new Error('Invalid symbol');
    }
    return { name: m[2], precision: +m[1] };
};
exports.stringToSymbol = stringToSymbol;
/** Convert `Symbol` to `string`. format: `precision,NAME`. */
var symbolToString = function (_a) {
    var name = _a.name, precision = _a.precision;
    return precision + ',' + name;
};
exports.symbolToString = symbolToString;
/** Convert binary data to hex */
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
    return result.toUpperCase();
};
exports.arrayToHex = arrayToHex;
/** Convert hex to binary data */
var hexToUint8Array = function (hex) {
    if (typeof hex !== 'string') {
        throw new Error('Expected string containing hex digits');
    }
    if (hex.length % 2) {
        throw new Error('Odd number of hex digits');
    }
    var l = hex.length / 2;
    var result = new Uint8Array(l);
    for (var i = 0; i < l; ++i) {
        var x = parseInt(hex.substr(i * 2, 2), 16);
        if (Number.isNaN(x)) {
            throw new Error('Expected hex string');
        }
        result[i] = x;
    }
    return result;
};
exports.hexToUint8Array = hexToUint8Array;
function serializeUnknown(buffer, data) {
    throw new Error('Don\'t know how to serialize ' + this.name);
}
function deserializeUnknown(buffer) {
    throw new Error('Don\'t know how to deserialize ' + this.name);
}
function serializeStruct(buffer, data, state, allowExtensions) {
    var e_2, _a;
    if (state === void 0) { state = new SerializerState(); }
    if (allowExtensions === void 0) { allowExtensions = true; }
    if (typeof data !== 'object') {
        throw new Error('expected object containing data: ' + JSON.stringify(data));
    }
    if (this.base) {
        this.base.serialize(buffer, data, state, allowExtensions);
    }
    try {
        for (var _b = __values(this.fields), _c = _b.next(); !_c.done; _c = _b.next()) {
            var field = _c.value;
            if (field.name in data) {
                if (state.skippedBinaryExtension) {
                    throw new Error('unexpected ' + this.name + '.' + field.name);
                }
                field.type.serialize(buffer, data[field.name], state, allowExtensions && field === this.fields[this.fields.length - 1]);
            }
            else {
                if (allowExtensions && field.type.extensionOf) {
                    state.skippedBinaryExtension = true;
                }
                else {
                    throw new Error('missing ' + this.name + '.' + field.name + ' (type=' + field.type.name + ')');
                }
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
}
function deserializeStruct(buffer, state, allowExtensions) {
    var e_3, _a;
    if (state === void 0) { state = new SerializerState(); }
    if (allowExtensions === void 0) { allowExtensions = true; }
    var result;
    if (this.base) {
        result = this.base.deserialize(buffer, state, allowExtensions);
    }
    else {
        result = {};
    }
    try {
        for (var _b = __values(this.fields), _c = _b.next(); !_c.done; _c = _b.next()) {
            var field = _c.value;
            if (allowExtensions && field.type.extensionOf && !buffer.haveReadData()) {
                state.skippedBinaryExtension = true;
            }
            else {
                result[field.name] = field.type.deserialize(buffer, state, allowExtensions);
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return result;
}
function serializeVariant(buffer, data, state, allowExtensions) {
    if (!Array.isArray(data) || data.length !== 2 || typeof data[0] !== 'string') {
        throw new Error('expected variant: ["type", value]');
    }
    var i = this.fields.findIndex(function (field) { return field.name === data[0]; });
    if (i < 0) {
        throw new Error("type \"".concat(data[0], "\" is not valid for variant"));
    }
    buffer.pushVaruint32(i);
    this.fields[i].type.serialize(buffer, data[1], state, allowExtensions);
}
function deserializeVariant(buffer, state, allowExtensions) {
    var i = buffer.getVaruint32();
    if (i >= this.fields.length) {
        throw new Error("type index ".concat(i, " is not valid for variant"));
    }
    var field = this.fields[i];
    return [field.name, field.type.deserialize(buffer, state, allowExtensions)];
}
function serializeArray(buffer, data, state, allowExtensions) {
    var e_4, _a;
    buffer.pushVaruint32(data.length);
    try {
        for (var data_2 = __values(data), data_2_1 = data_2.next(); !data_2_1.done; data_2_1 = data_2.next()) {
            var item = data_2_1.value;
            this.arrayOf.serialize(buffer, item, state, false);
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (data_2_1 && !data_2_1.done && (_a = data_2.return)) _a.call(data_2);
        }
        finally { if (e_4) throw e_4.error; }
    }
}
function deserializeArray(buffer, state, allowExtensions) {
    var len = buffer.getVaruint32();
    var result = [];
    for (var i = 0; i < len; ++i) {
        result.push(this.arrayOf.deserialize(buffer, state, false));
    }
    return result;
}
function serializeOptional(buffer, data, state, allowExtensions) {
    if (data === null || data === undefined) {
        buffer.push(0);
    }
    else {
        buffer.push(1);
        this.optionalOf.serialize(buffer, data, state, allowExtensions);
    }
}
function deserializeOptional(buffer, state, allowExtensions) {
    if (buffer.get()) {
        return this.optionalOf.deserialize(buffer, state, allowExtensions);
    }
    else {
        return null;
    }
}
function serializeExtension(buffer, data, state, allowExtensions) {
    this.extensionOf.serialize(buffer, data, state, allowExtensions);
}
function deserializeExtension(buffer, state, allowExtensions) {
    return this.extensionOf.deserialize(buffer, state, allowExtensions);
}
function serializeObject(buffer, data, state, allowExtensions) {
    var e_5, _a;
    var entries = Object.entries(data);
    buffer.pushVaruint32(entries.length);
    try {
        for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
            var _b = __read(entries_1_1.value, 2), key = _b[0], value = _b[1];
            var keyType = this.fields[0].type;
            var dataType = this.fields[1].type;
            keyType.serialize(buffer, key, state, allowExtensions);
            dataType.serialize(buffer, value, state, allowExtensions);
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (entries_1_1 && !entries_1_1.done && (_a = entries_1.return)) _a.call(entries_1);
        }
        finally { if (e_5) throw e_5.error; }
    }
}
function deserializeObject(buffer, state, allowExtensions) {
    var len = buffer.getVaruint32();
    var result = {};
    for (var i = 0; i < len; ++i) {
        var keyType = this.fields[0].type;
        var dataType = this.fields[1].type;
        var key = keyType.deserialize(buffer, state, allowExtensions);
        result[key] = dataType.deserialize(buffer, state, allowExtensions);
    }
    return result;
}
function serializePair(buffer, data, state, allowExtensions) {
    var _this = this;
    buffer.pushVaruint32(data.length);
    data.forEach(function (item) {
        _this.fields[0].type.serialize(buffer, item[0], state, allowExtensions);
        _this.fields[1].type.serialize(buffer, item[1], state, allowExtensions);
    });
}
function deserializePair(buffer, state, allowExtensions) {
    var result = [];
    var len = buffer.getVaruint32();
    for (var i = 0; i < len; ++i) {
        result.push(this.fields[0].type.deserialize(buffer, state, allowExtensions));
        result.push(this.fields[1].type.deserialize(buffer, state, allowExtensions));
    }
    return result;
}
var createType = function (attrs) {
    return __assign({ name: '<missing name>', aliasOfName: '', arrayOf: null, optionalOf: null, extensionOf: null, baseName: '', base: null, fields: [], serialize: serializeUnknown, deserialize: deserializeUnknown }, attrs);
};
var checkRange = function (orig, converted) {
    if (Number.isNaN(+orig) || Number.isNaN(+converted) || (typeof orig !== 'number' && typeof orig !== 'string')) {
        throw new Error('Expected number');
    }
    if (+orig !== +converted) {
        throw new Error('Number is out of range');
    }
    return +orig;
};
/** Create the set of types built-in to the abi format */
var createInitialTypes = function () {
    var result = new Map(Object.entries({
        bool: createType({
            name: 'bool',
            serialize: function (buffer, data) {
                if (!(typeof data === 'boolean' || typeof data === 'number' && (data === 1 || data === 0))) {
                    throw new Error('Expected boolean or number equal to 1 or 0');
                }
                buffer.push(data ? 1 : 0);
            },
            deserialize: function (buffer) { return !!buffer.get(); },
        }),
        uint8: createType({
            name: 'uint8',
            serialize: function (buffer, data) { buffer.push(checkRange(data, data & 0xff)); },
            deserialize: function (buffer) { return buffer.get(); },
        }),
        int8: createType({
            name: 'int8',
            serialize: function (buffer, data) { buffer.push(checkRange(data, data << 24 >> 24)); },
            deserialize: function (buffer) { return buffer.get() << 24 >> 24; },
        }),
        uint16: createType({
            name: 'uint16',
            serialize: function (buffer, data) { buffer.pushUint16(checkRange(data, data & 0xffff)); },
            deserialize: function (buffer) { return buffer.getUint16(); },
        }),
        int16: createType({
            name: 'int16',
            serialize: function (buffer, data) { buffer.pushUint16(checkRange(data, data << 16 >> 16)); },
            deserialize: function (buffer) { return buffer.getUint16() << 16 >> 16; },
        }),
        uint32: createType({
            name: 'uint32',
            serialize: function (buffer, data) { buffer.pushUint32(checkRange(data, data >>> 0)); },
            deserialize: function (buffer) { return buffer.getUint32(); },
        }),
        uint64: createType({
            name: 'uint64',
            serialize: function (buffer, data) {
                buffer.pushArray(numeric.decimalToBinary(8, '' + data));
            },
            deserialize: function (buffer) { return numeric.binaryToDecimal(buffer.getUint8Array(8)); },
        }),
        int64: createType({
            name: 'int64',
            serialize: function (buffer, data) {
                buffer.pushArray(numeric.signedDecimalToBinary(8, '' + data));
            },
            deserialize: function (buffer) { return numeric.signedBinaryToDecimal(buffer.getUint8Array(8)); },
        }),
        int32: createType({
            name: 'int32',
            serialize: function (buffer, data) { buffer.pushUint32(checkRange(data, data | 0)); },
            deserialize: function (buffer) { return buffer.getUint32() | 0; },
        }),
        varuint32: createType({
            name: 'varuint32',
            serialize: function (buffer, data) { buffer.pushVaruint32(checkRange(data, data >>> 0)); },
            deserialize: function (buffer) { return buffer.getVaruint32(); },
        }),
        varint32: createType({
            name: 'varint32',
            serialize: function (buffer, data) { buffer.pushVarint32(checkRange(data, data | 0)); },
            deserialize: function (buffer) { return buffer.getVarint32(); },
        }),
        uint128: createType({
            name: 'uint128',
            serialize: function (buffer, data) { buffer.pushArray(numeric.decimalToBinary(16, '' + data)); },
            deserialize: function (buffer) { return numeric.binaryToDecimal(buffer.getUint8Array(16)); },
        }),
        int128: createType({
            name: 'int128',
            serialize: function (buffer, data) {
                buffer.pushArray(numeric.signedDecimalToBinary(16, '' + data));
            },
            deserialize: function (buffer) { return numeric.signedBinaryToDecimal(buffer.getUint8Array(16)); },
        }),
        float32: createType({
            name: 'float32',
            serialize: function (buffer, data) { buffer.pushFloat32(data); },
            deserialize: function (buffer) { return buffer.getFloat32(); },
        }),
        float64: createType({
            name: 'float64',
            serialize: function (buffer, data) { buffer.pushFloat64(data); },
            deserialize: function (buffer) { return buffer.getFloat64(); },
        }),
        float128: createType({
            name: 'float128',
            serialize: function (buffer, data) { buffer.pushUint8ArrayChecked((0, exports.hexToUint8Array)(data), 16); },
            deserialize: function (buffer) { return (0, exports.arrayToHex)(buffer.getUint8Array(16)); },
        }),
        bytes: createType({
            name: 'bytes',
            serialize: function (buffer, data) {
                if (data instanceof Uint8Array || Array.isArray(data)) {
                    buffer.pushBytes(data);
                }
                else {
                    buffer.pushBytes((0, exports.hexToUint8Array)(data));
                }
            },
            deserialize: function (buffer, state) {
                if (state && state.options.bytesAsUint8Array) {
                    return buffer.getBytes();
                }
                else {
                    return (0, exports.arrayToHex)(buffer.getBytes());
                }
            },
        }),
        string: createType({
            name: 'string',
            serialize: function (buffer, data) { buffer.pushString(data); },
            deserialize: function (buffer) { return buffer.getString(); },
        }),
        name: createType({
            name: 'name',
            serialize: function (buffer, data) { buffer.pushName(data); },
            deserialize: function (buffer) { return buffer.getName(); },
        }),
        time_point: createType({
            name: 'time_point',
            serialize: function (buffer, data) { buffer.pushNumberAsUint64((0, exports.dateToTimePoint)(data)); },
            deserialize: function (buffer) { return (0, exports.timePointToDate)(buffer.getUint64AsNumber()); },
        }),
        time_point_sec: createType({
            name: 'time_point_sec',
            serialize: function (buffer, data) { buffer.pushUint32((0, exports.dateToTimePointSec)(data)); },
            deserialize: function (buffer) { return (0, exports.timePointSecToDate)(buffer.getUint32()); },
        }),
        block_timestamp_type: createType({
            name: 'block_timestamp_type',
            serialize: function (buffer, data) { buffer.pushUint32((0, exports.dateToBlockTimestamp)(data)); },
            deserialize: function (buffer) { return (0, exports.blockTimestampToDate)(buffer.getUint32()); },
        }),
        symbol_code: createType({
            name: 'symbol_code',
            serialize: function (buffer, data) { buffer.pushSymbolCode(data); },
            deserialize: function (buffer) { return buffer.getSymbolCode(); },
        }),
        symbol: createType({
            name: 'symbol',
            serialize: function (buffer, data) { buffer.pushSymbol((0, exports.stringToSymbol)(data)); },
            deserialize: function (buffer) { return (0, exports.symbolToString)(buffer.getSymbol()); },
        }),
        asset: createType({
            name: 'asset',
            serialize: function (buffer, data) { buffer.pushAsset(data); },
            deserialize: function (buffer) { return buffer.getAsset(); },
        }),
        checksum160: createType({
            name: 'checksum160',
            serialize: function (buffer, data) { buffer.pushUint8ArrayChecked((0, exports.hexToUint8Array)(data), 20); },
            deserialize: function (buffer) { return (0, exports.arrayToHex)(buffer.getUint8Array(20)); },
        }),
        checksum256: createType({
            name: 'checksum256',
            serialize: function (buffer, data) { buffer.pushUint8ArrayChecked((0, exports.hexToUint8Array)(data), 32); },
            deserialize: function (buffer) { return (0, exports.arrayToHex)(buffer.getUint8Array(32)); },
        }),
        checksum512: createType({
            name: 'checksum512',
            serialize: function (buffer, data) { buffer.pushUint8ArrayChecked((0, exports.hexToUint8Array)(data), 64); },
            deserialize: function (buffer) { return (0, exports.arrayToHex)(buffer.getUint8Array(64)); },
        }),
        public_key: createType({
            name: 'public_key',
            serialize: function (buffer, data) { buffer.pushPublicKey(data); },
            deserialize: function (buffer) { return buffer.getPublicKey(); },
        }),
        private_key: createType({
            name: 'private_key',
            serialize: function (buffer, data) { buffer.pushPrivateKey(data); },
            deserialize: function (buffer) { return buffer.getPrivateKey(); },
        }),
        signature: createType({
            name: 'signature',
            serialize: function (buffer, data) { buffer.pushSignature(data); },
            deserialize: function (buffer) { return buffer.getSignature(); },
        }),
    }));
    result.set('extended_asset', createType({
        name: 'extended_asset',
        baseName: '',
        fields: [
            { name: 'quantity', typeName: 'asset', type: result.get('asset') },
            { name: 'contract', typeName: 'name', type: result.get('name') },
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    return result;
}; // createInitialTypes()
exports.createInitialTypes = createInitialTypes;
var createAbiTypes = function () {
    var initialTypes = (0, exports.createInitialTypes)();
    initialTypes.set('extensions_entry', createType({
        name: 'extensions_entry',
        baseName: '',
        fields: [
            { name: 'tag', typeName: 'uint16', type: null },
            { name: 'value', typeName: 'bytes', type: null }
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('type_def', createType({
        name: 'type_def',
        baseName: '',
        fields: [
            { name: 'new_type_name', typeName: 'string', type: null },
            { name: 'type', typeName: 'string', type: null }
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('field_def', createType({
        name: 'field_def',
        baseName: '',
        fields: [
            { name: 'name', typeName: 'string', type: null },
            { name: 'type', typeName: 'string', type: null }
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('struct_def', createType({
        name: 'struct_def',
        baseName: '',
        fields: [
            { name: 'name', typeName: 'string', type: null },
            { name: 'base', typeName: 'string', type: null },
            { name: 'fields', typeName: 'field_def[]', type: null }
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('action_def', createType({
        name: 'action_def',
        baseName: '',
        fields: [
            { name: 'name', typeName: 'name', type: null },
            { name: 'type', typeName: 'string', type: null },
            { name: 'ricardian_contract', typeName: 'string', type: null }
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('table_def', createType({
        name: 'table_def',
        baseName: '',
        fields: [
            { name: 'name', typeName: 'name', type: null },
            { name: 'index_type', typeName: 'string', type: null },
            { name: 'key_names', typeName: 'string[]', type: null },
            { name: 'key_types', typeName: 'string[]', type: null },
            { name: 'type', typeName: 'string', type: null }
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('clause_pair', createType({
        name: 'clause_pair',
        baseName: '',
        fields: [
            { name: 'id', typeName: 'string', type: null },
            { name: 'body', typeName: 'string', type: null }
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('error_message', createType({
        name: 'error_message',
        baseName: '',
        fields: [
            { name: 'error_code', typeName: 'uint64', type: null },
            { name: 'error_msg', typeName: 'string', type: null }
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('variant_def', createType({
        name: 'variant_def',
        baseName: '',
        fields: [
            { name: 'name', typeName: 'string', type: null },
            { name: 'types', typeName: 'string[]', type: null }
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('action_result', createType({
        name: 'action_result',
        baseName: '',
        fields: [
            { name: 'name', typeName: 'name', type: null },
            { name: 'result_type', typeName: 'string', type: null }
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('primary_key_index_def', createType({
        name: 'primary_key_index_def',
        baseName: '',
        fields: [
            { name: 'name', typeName: 'name', type: null },
            { name: 'type', typeName: 'string', type: null }
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('secondary_index_def', createType({
        name: 'secondary_index_def',
        baseName: '',
        fields: [
            { name: 'type', typeName: 'string', type: null },
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('secondary_indices', createType({
        name: 'secondary_indices',
        baseName: '',
        fields: [
            { name: 'name', typeName: 'name', type: null },
            { name: 'secondary_index_def', typeName: 'secondary_index_def', type: null }
        ],
        serialize: serializeObject,
        deserialize: deserializeObject,
    }));
    initialTypes.set('kv_table_entry_def', createType({
        name: 'kv_table_entry_def',
        baseName: '',
        fields: [
            { name: 'type', typeName: 'string', type: null },
            { name: 'primary_index', typeName: 'primary_key_index_def', type: null },
            { name: 'secondary_indices', typeName: 'secondary_indices', type: null }
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('kv_table', createType({
        name: 'kv_table',
        baseName: '',
        fields: [
            { name: 'name', typeName: 'name', type: null },
            { name: 'kv_table_entry_def', typeName: 'kv_table_entry_def', type: null }
        ],
        serialize: serializeObject,
        deserialize: deserializeObject
    }));
    initialTypes.set('abi_def', createType({
        name: 'abi_def',
        baseName: '',
        fields: [
            { name: 'version', typeName: 'string', type: null },
            { name: 'types', typeName: 'type_def[]', type: null },
            { name: 'structs', typeName: 'struct_def[]', type: null },
            { name: 'actions', typeName: 'action_def[]', type: null },
            { name: 'tables', typeName: 'table_def[]', type: null },
            { name: 'ricardian_clauses', typeName: 'clause_pair[]', type: null },
            { name: 'error_messages', typeName: 'error_message[]', type: null },
            { name: 'abi_extensions', typeName: 'extensions_entry[]', type: null },
            { name: 'variants', typeName: 'variant_def[]$', type: null },
            { name: 'action_results', typeName: 'action_result[]$', type: null },
            { name: 'kv_tables', typeName: 'kv_table$', type: null },
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    return initialTypes;
};
exports.createAbiTypes = createAbiTypes;
var createTransactionExtensionTypes = function () {
    var initialTypes = (0, exports.createInitialTypes)();
    initialTypes.set('resource_payer', createType({
        name: 'resource_payer',
        baseName: '',
        fields: [
            { name: 'payer', typeName: 'name', type: null },
            { name: 'max_net_bytes', typeName: 'uint64', type: null },
            { name: 'max_cpu_us', typeName: 'uint64', type: null },
            { name: 'max_memory_bytes', typeName: 'uint64', type: null },
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    return initialTypes;
};
exports.createTransactionExtensionTypes = createTransactionExtensionTypes;
var createTransactionTypes = function () {
    var initialTypes = (0, exports.createInitialTypes)();
    initialTypes.set('permission_level', createType({
        name: 'permission_level',
        baseName: '',
        fields: [
            { name: 'actor', typeName: 'name', type: null },
            { name: 'permission', typeName: 'name', type: null },
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('action', createType({
        name: 'action',
        baseName: '',
        fields: [
            { name: 'account', typeName: 'name', type: null },
            { name: 'name', typeName: 'name', type: null },
            { name: 'authorization', typeName: 'permission_level[]', type: null },
            { name: 'data', typeName: 'bytes', type: null },
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('extension', createType({
        name: 'extension',
        baseName: '',
        fields: [
            { name: 'type', typeName: 'uint16', type: null },
            { name: 'data', typeName: 'bytes', type: null },
        ],
        serialize: serializePair,
        deserialize: deserializePair,
    }));
    initialTypes.set('transaction_header', createType({
        name: 'transaction_header',
        baseName: '',
        fields: [
            { name: 'expiration', typeName: 'time_point_sec', type: null },
            { name: 'ref_block_num', typeName: 'uint16', type: null },
            { name: 'ref_block_prefix', typeName: 'uint32', type: null },
            { name: 'max_net_usage_words', typeName: 'varuint32', type: null },
            { name: 'max_cpu_usage_ms', typeName: 'uint8', type: null },
            { name: 'delay_sec', typeName: 'varuint32', type: null },
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('transaction', createType({
        name: 'transaction',
        baseName: 'transaction_header',
        fields: [
            { name: 'context_free_actions', typeName: 'action[]', type: null },
            { name: 'actions', typeName: 'action[]', type: null },
            { name: 'transaction_extensions', typeName: 'extension', type: null }
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    return initialTypes;
};
exports.createTransactionTypes = createTransactionTypes;
/** Get type from `types` */
var getType = function (types, name) {
    var type = types.get(name);
    if (type && type.aliasOfName) {
        return (0, exports.getType)(types, type.aliasOfName);
    }
    if (type) {
        return type;
    }
    if (name.endsWith('[]')) {
        return createType({
            name: name,
            arrayOf: (0, exports.getType)(types, name.substr(0, name.length - 2)),
            serialize: serializeArray,
            deserialize: deserializeArray,
        });
    }
    if (name.endsWith('?')) {
        return createType({
            name: name,
            optionalOf: (0, exports.getType)(types, name.substr(0, name.length - 1)),
            serialize: serializeOptional,
            deserialize: deserializeOptional,
        });
    }
    if (name.endsWith('$')) {
        return createType({
            name: name,
            extensionOf: (0, exports.getType)(types, name.substr(0, name.length - 1)),
            serialize: serializeExtension,
            deserialize: deserializeExtension,
        });
    }
    throw new Error('Unknown type: ' + name);
};
exports.getType = getType;
/**
 * Get types from abi
 *
 * @param initialTypes Set of types to build on.
 * In most cases, it's best to fill this from a fresh call to `getTypesFromAbi()`.
 */
var getTypesFromAbi = function (initialTypes, abi) {
    var e_6, _a, e_7, _b, e_8, _c, e_9, _d, e_10, _e;
    var types = new Map(initialTypes);
    if (abi && abi.types) {
        try {
            for (var _f = __values(abi.types), _g = _f.next(); !_g.done; _g = _f.next()) {
                var _h = _g.value, new_type_name = _h.new_type_name, type = _h.type;
                types.set(new_type_name, createType({ name: new_type_name, aliasOfName: type }));
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_a = _f.return)) _a.call(_f);
            }
            finally { if (e_6) throw e_6.error; }
        }
    }
    if (abi && abi.structs) {
        try {
            for (var _j = __values(abi.structs), _k = _j.next(); !_k.done; _k = _j.next()) {
                var _l = _k.value, name_1 = _l.name, base = _l.base, fields = _l.fields;
                types.set(name_1, createType({
                    name: name_1,
                    baseName: base,
                    fields: fields.map(function (_a) {
                        var n = _a.name, type = _a.type;
                        return ({ name: n, typeName: type, type: null });
                    }),
                    serialize: serializeStruct,
                    deserialize: deserializeStruct,
                }));
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_k && !_k.done && (_b = _j.return)) _b.call(_j);
            }
            finally { if (e_7) throw e_7.error; }
        }
    }
    if (abi && abi.variants) {
        try {
            for (var _m = __values(abi.variants), _o = _m.next(); !_o.done; _o = _m.next()) {
                var _p = _o.value, name_2 = _p.name, t = _p.types;
                types.set(name_2, createType({
                    name: name_2,
                    fields: t.map(function (s) { return ({ name: s, typeName: s, type: null }); }),
                    serialize: serializeVariant,
                    deserialize: deserializeVariant,
                }));
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (_o && !_o.done && (_c = _m.return)) _c.call(_m);
            }
            finally { if (e_8) throw e_8.error; }
        }
    }
    try {
        for (var types_1 = __values(types), types_1_1 = types_1.next(); !types_1_1.done; types_1_1 = types_1.next()) {
            var _q = __read(types_1_1.value, 2), name_3 = _q[0], type = _q[1];
            if (type.baseName) {
                type.base = (0, exports.getType)(types, type.baseName);
            }
            try {
                for (var _r = (e_10 = void 0, __values(type.fields)), _s = _r.next(); !_s.done; _s = _r.next()) {
                    var field = _s.value;
                    field.type = (0, exports.getType)(types, field.typeName);
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (_s && !_s.done && (_e = _r.return)) _e.call(_r);
                }
                finally { if (e_10) throw e_10.error; }
            }
        }
    }
    catch (e_9_1) { e_9 = { error: e_9_1 }; }
    finally {
        try {
            if (types_1_1 && !types_1_1.done && (_d = types_1.return)) _d.call(types_1);
        }
        finally { if (e_9) throw e_9.error; }
    }
    return types;
}; // getTypesFromAbi
exports.getTypesFromAbi = getTypesFromAbi;
var reverseHex = function (h) {
    return h.substr(6, 2) + h.substr(4, 2) + h.substr(2, 2) + h.substr(0, 2);
};
/** TAPoS: Return transaction fields which reference `refBlock` and expire `expireSeconds` after `timestamp` */
var transactionHeader = function (refBlock, expireSeconds) {
    var timestamp = refBlock.header ? refBlock.header.timestamp : refBlock.timestamp;
    var prefix = parseInt(reverseHex(refBlock.id.substr(16, 8)), 16);
    return {
        expiration: (0, exports.timePointSecToDate)((0, exports.dateToTimePointSec)(timestamp) + expireSeconds),
        ref_block_num: refBlock.block_num & 0xffff,
        ref_block_prefix: prefix,
    };
};
exports.transactionHeader = transactionHeader;
/** Convert action data to serialized form (hex) */
var serializeActionData = function (contract, account, name, data, textEncoder, textDecoder) {
    var action = contract.actions.get(name);
    if (!action) {
        throw new Error("Unknown action ".concat(name, " in contract ").concat(account));
    }
    var buffer = new SerialBuffer({ textEncoder: textEncoder, textDecoder: textDecoder });
    action.serialize(buffer, data);
    return (0, exports.arrayToHex)(buffer.asUint8Array());
};
exports.serializeActionData = serializeActionData;
/** Return action in serialized form */
var serializeAction = function (contract, account, name, authorization, data, textEncoder, textDecoder) {
    return {
        account: account,
        name: name,
        authorization: authorization,
        data: (0, exports.serializeActionData)(contract, account, name, data, textEncoder, textDecoder),
    };
};
exports.serializeAction = serializeAction;
/** Deserialize action data. If `data` is a `string`, then it's assumed to be in hex. */
var deserializeActionData = function (contract, account, name, data, textEncoder, textDecoder) {
    var action = contract.actions.get(name);
    if (typeof data === 'string') {
        data = (0, exports.hexToUint8Array)(data);
    }
    if (!action) {
        throw new Error("Unknown action ".concat(name, " in contract ").concat(account));
    }
    var buffer = new SerialBuffer({ textDecoder: textDecoder, textEncoder: textEncoder });
    buffer.pushArray(data);
    return action.deserialize(buffer);
};
exports.deserializeActionData = deserializeActionData;
/** Deserialize action. If `data` is a `string`, then it's assumed to be in hex. */
var deserializeAction = function (contract, account, name, authorization, data, textEncoder, textDecoder) {
    return {
        account: account,
        name: name,
        authorization: authorization,
        data: (0, exports.deserializeActionData)(contract, account, name, data, textEncoder, textDecoder),
    };
};
exports.deserializeAction = deserializeAction;
var serializeAnyvar = function (buffer, anyvar) {
    var _a, _b, _c, _d, _e, _f, _g;
    var def;
    var value;
    if (anyvar === null) {
        _a = __read([anyvarDefs.null_t, anyvar], 2), def = _a[0], value = _a[1];
    }
    else if (typeof anyvar === 'string') {
        _b = __read([anyvarDefs.string, anyvar], 2), def = _b[0], value = _b[1];
    }
    else if (typeof anyvar === 'number') {
        _c = __read([anyvarDefs.int32, anyvar], 2), def = _c[0], value = _c[1];
    }
    else if (anyvar instanceof Uint8Array) {
        _d = __read([anyvarDefs.bytes, anyvar], 2), def = _d[0], value = _d[1];
    }
    else if (Array.isArray(anyvar)) {
        _e = __read([anyvarDefs.any_array, anyvar], 2), def = _e[0], value = _e[1];
    }
    else if (Object.keys(anyvar).length === 2 && anyvar.hasOwnProperty('type') && anyvar.hasOwnProperty('value')) {
        _f = __read([anyvarDefs[anyvar.type], anyvar.value], 2), def = _f[0], value = _f[1];
    }
    else {
        _g = __read([anyvarDefs.any_object, anyvar], 2), def = _g[0], value = _g[1];
    }
    buffer.pushVaruint32(def.index);
    def.type.serialize(buffer, value);
};
exports.serializeAnyvar = serializeAnyvar;
var deserializeAnyvar = function (buffer, state) {
    var defIndex = buffer.getVaruint32();
    if (defIndex >= anyvarDefsByIndex.length) {
        throw new Error('Tried to deserialize unknown anyvar type');
    }
    var def = anyvarDefsByIndex[defIndex];
    var value = def.type.deserialize(buffer, state);
    if (state && state.options.useShortForm || def.useShortForm) {
        return value;
    }
    else {
        return { type: def.type.name, value: value };
    }
};
exports.deserializeAnyvar = deserializeAnyvar;
var deserializeAnyvarShort = function (buffer) {
    return (0, exports.deserializeAnyvar)(buffer, new SerializerState({ useShortForm: true }));
};
exports.deserializeAnyvarShort = deserializeAnyvarShort;
var serializeAnyObject = function (buffer, obj) {
    var e_11, _a;
    var entries = Object.entries(obj);
    buffer.pushVaruint32(entries.length);
    try {
        for (var entries_2 = __values(entries), entries_2_1 = entries_2.next(); !entries_2_1.done; entries_2_1 = entries_2.next()) {
            var _b = __read(entries_2_1.value, 2), key = _b[0], value = _b[1];
            buffer.pushString(key);
            (0, exports.serializeAnyvar)(buffer, value);
        }
    }
    catch (e_11_1) { e_11 = { error: e_11_1 }; }
    finally {
        try {
            if (entries_2_1 && !entries_2_1.done && (_a = entries_2.return)) _a.call(entries_2);
        }
        finally { if (e_11) throw e_11.error; }
    }
};
exports.serializeAnyObject = serializeAnyObject;
var deserializeAnyObject = function (buffer, state) {
    var len = buffer.getVaruint32();
    var result = {};
    for (var i = 0; i < len; ++i) {
        var key = buffer.getString();
        if (key in result) {
            var j = 1;
            while (key + '_' + j in result) {
                ++j;
            }
            key = key + '_' + j;
        }
        result[key] = (0, exports.deserializeAnyvar)(buffer, state);
    }
    return result;
};
exports.deserializeAnyObject = deserializeAnyObject;
var serializeAnyArray = function (buffer, arr) {
    var e_12, _a;
    buffer.pushVaruint32(arr.length);
    try {
        for (var arr_1 = __values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
            var x = arr_1_1.value;
            (0, exports.serializeAnyvar)(buffer, x);
        }
    }
    catch (e_12_1) { e_12 = { error: e_12_1 }; }
    finally {
        try {
            if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
        }
        finally { if (e_12) throw e_12.error; }
    }
};
exports.serializeAnyArray = serializeAnyArray;
var deserializeAnyArray = function (buffer, state) {
    var len = buffer.getVaruint32();
    var result = [];
    for (var i = 0; i < len; ++i) {
        result.push((0, exports.deserializeAnyvar)(buffer, state));
    }
    return result;
};
exports.deserializeAnyArray = deserializeAnyArray;
var addAdditionalTypes = function () {
    var initialTypes = (0, exports.createInitialTypes)();
    initialTypes.set('null_t', createType({
        name: 'null_t',
        serialize: function (buffer, anyvar) { },
        deserialize: function (buffer, state) { }
    }));
    initialTypes.set('any_object', createType({
        name: 'any_object',
        serialize: exports.serializeAnyObject,
        deserialize: exports.deserializeAnyObject
    }));
    initialTypes.set('any_array', createType({
        name: 'any_array',
        serialize: exports.serializeAnyArray,
        deserialize: exports.deserializeAnyArray
    }));
    return initialTypes;
};
var additionalTypes = addAdditionalTypes();
var anyvarDefs = {
    null_t: { index: 0, useShortForm: true, type: additionalTypes.get('null_t') },
    int64: { index: 1, useShortForm: false, type: additionalTypes.get('int64') },
    uint64: { index: 2, useShortForm: false, type: additionalTypes.get('uint64') },
    int32: { index: 3, useShortForm: true, type: additionalTypes.get('int32') },
    uint32: { index: 4, useShortForm: false, type: additionalTypes.get('uint32') },
    int16: { index: 5, useShortForm: false, type: additionalTypes.get('int16') },
    uint16: { index: 6, useShortForm: false, type: additionalTypes.get('uint16') },
    int8: { index: 7, useShortForm: false, type: additionalTypes.get('int8') },
    uint8: { index: 8, useShortForm: false, type: additionalTypes.get('uint8') },
    time_point: { index: 9, useShortForm: false, type: additionalTypes.get('time_point') },
    checksum256: { index: 10, useShortForm: false, type: additionalTypes.get('checksum256') },
    float64: { index: 11, useShortForm: false, type: additionalTypes.get('float64') },
    string: { index: 12, useShortForm: true, type: additionalTypes.get('string') },
    any_object: { index: 13, useShortForm: true, type: additionalTypes.get('any_object') },
    any_array: { index: 14, useShortForm: true, type: additionalTypes.get('any_array') },
    bytes: { index: 15, useShortForm: false, type: additionalTypes.get('bytes') },
    symbol: { index: 16, useShortForm: false, type: additionalTypes.get('symbol') },
    symbol_code: { index: 17, useShortForm: false, type: additionalTypes.get('symbol_code') },
    asset: { index: 18, useShortForm: false, type: additionalTypes.get('asset') },
};
var anyvarDefsByIndex = [
    anyvarDefs.null_t,
    anyvarDefs.int64,
    anyvarDefs.uint64,
    anyvarDefs.int32,
    anyvarDefs.uint32,
    anyvarDefs.int16,
    anyvarDefs.uint16,
    anyvarDefs.int8,
    anyvarDefs.uint8,
    anyvarDefs.time_point,
    anyvarDefs.checksum256,
    anyvarDefs.float64,
    anyvarDefs.string,
    anyvarDefs.any_object,
    anyvarDefs.any_array,
    anyvarDefs.bytes,
    anyvarDefs.symbol,
    anyvarDefs.symbol_code,
    anyvarDefs.asset,
];
var serializeQuery = function (buffer, query) {
    var _a, _b, _c, e_13, _d;
    var method;
    var arg;
    var filter;
    if (typeof query === 'string') {
        method = query;
    }
    else if (Array.isArray(query) && query.length === 2) {
        _a = __read(query, 2), method = _a[0], filter = _a[1];
    }
    else if (Array.isArray(query) && query.length === 3) {
        _b = __read(query, 3), method = _b[0], arg = _b[1], filter = _b[2];
    }
    else {
        _c = __read([query.method, query.arg, query.filter], 3), method = _c[0], arg = _c[1], filter = _c[2];
    }
    buffer.pushString(method);
    if (arg === undefined) {
        buffer.push(0);
    }
    else {
        buffer.push(1);
        (0, exports.serializeAnyvar)(buffer, arg);
    }
    if (filter === undefined) {
        buffer.push(0);
    }
    else {
        buffer.pushVaruint32(filter.length);
        try {
            for (var filter_1 = __values(filter), filter_1_1 = filter_1.next(); !filter_1_1.done; filter_1_1 = filter_1.next()) {
                var q = filter_1_1.value;
                (0, exports.serializeQuery)(buffer, q);
            }
        }
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (filter_1_1 && !filter_1_1.done && (_d = filter_1.return)) _d.call(filter_1);
            }
            finally { if (e_13) throw e_13.error; }
        }
    }
};
exports.serializeQuery = serializeQuery;


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
/******/ 			"eosjs_api": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["externals"], () => (__webpack_require__("./src/eosjs-api.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	eosjs_api = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qix1QkFBdUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RkFBd0Y7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLEtBQUs7QUFDaEQ7QUFDQSx5TUFBeU07QUFDek07QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGNBQWM7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsUUFBUTtBQUNwQztBQUNBO0FBQ0E7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QzVELGNBQWMsOENBQThDO0FBQzVELGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDRDQUE0QztBQUMxRCxjQUFjLDhDQUE4QztBQUM1RCxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyw0Q0FBNEM7QUFDMUQsY0FBYyxvREFBb0Q7QUFDbEUsY0FBYyxxREFBcUQ7QUFDbkUsY0FBYyxxREFBcUQ7QUFDbkUsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsNENBQTRDO0FBQzFELGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLG9EQUFvRDtBQUNsRSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyw4Q0FBOEM7QUFDNUQsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsNENBQTRDO0FBQzFELGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDRDQUE0QztBQUMxRCxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyw4Q0FBOEM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyw0Q0FBNEM7QUFDMUQsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsOENBQThDO0FBQzVELGNBQWMsc0VBQXNFO0FBQ3BGLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDRDQUE0QztB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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsNkJBQTZCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZOztBQUVaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVCQUF1QixPQUFPO0FBQzlCO0FBQ0EsMEJBQTBCLGNBQWMsY0FBYyxjQUFjO0FBQ3BFLHdCQUF3QixZQUFZLFlBQVksWUFBWTtBQUM1RCwyQkFBMkIsUUFBUTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O1VDdmRBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQzVCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ0pBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL1tuYW1lXS8uL3NyYy9lb3Nqcy1hcGkudHMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vc3JjL2Vvc2pzLW51bWVyaWMudHMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vc3JjL2Vvc2pzLXNlcmlhbGl6ZS50cyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9zcmMvcmlwZW1kLmpzIiwid2VicGFjazovL1tuYW1lXS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vW25hbWVdL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vW25hbWVdL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG4vKipcclxuICogQG1vZHVsZSBBUElcclxuICovXHJcbi8vIGNvcHlyaWdodCBkZWZpbmVkIGluIGVvc2pzL0xJQ0VOU0UudHh0XHJcbi8qIGVzbGludC1kaXNhYmxlIG1heC1jbGFzc2VzLXBlci1maWxlICovXHJcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcclxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufTtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn07XHJcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufTtcclxudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufTtcclxudmFyIF9fdmFsdWVzID0gKHRoaXMgJiYgdGhpcy5fX3ZhbHVlcykgfHwgZnVuY3Rpb24obykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5BY3Rpb25CdWlsZGVyID0gZXhwb3J0cy5UcmFuc2FjdGlvbkJ1aWxkZXIgPSBleHBvcnRzLkFwaSA9IHZvaWQgMDtcclxudmFyIHBha29fMSA9IHJlcXVpcmUoXCJwYWtvXCIpO1xyXG52YXIgc2VyID0gcmVxdWlyZShcIi4vZW9zanMtc2VyaWFsaXplXCIpO1xyXG52YXIgQXBpID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gYXJnc1xyXG4gICAgICogKiBgcnBjYDogSXNzdWVzIFJQQyBjYWxsc1xyXG4gICAgICogKiBgYXV0aG9yaXR5UHJvdmlkZXJgOiBHZXQgcHVibGljIGtleXMgbmVlZGVkIHRvIG1lZXQgYXV0aG9yaXRpZXMgaW4gYSB0cmFuc2FjdGlvblxyXG4gICAgICogKiBgYWJpUHJvdmlkZXJgOiBTdXBwbGllcyBBQklzIGluIHJhdyBmb3JtIChiaW5hcnkpXHJcbiAgICAgKiAqIGBzaWduYXR1cmVQcm92aWRlcmA6IFNpZ25zIHRyYW5zYWN0aW9uc1xyXG4gICAgICogKiBgY2hhaW5JZGA6IElkZW50aWZpZXMgY2hhaW5cclxuICAgICAqICogYHRleHRFbmNvZGVyYDogYFRleHRFbmNvZGVyYCBpbnN0YW5jZSB0byB1c2UuIFBhc3MgaW4gYG51bGxgIGlmIHJ1bm5pbmcgaW4gYSBicm93c2VyXHJcbiAgICAgKiAqIGB0ZXh0RGVjb2RlcmA6IGBUZXh0RGVjb2RlcmAgaW5zdGFuY2UgdG8gdXNlLiBQYXNzIGluIGBudWxsYCBpZiBydW5uaW5nIGluIGEgYnJvd3NlclxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBBcGkoYXJncykge1xyXG4gICAgICAgIC8qKiBIb2xkcyBpbmZvcm1hdGlvbiBuZWVkZWQgdG8gc2VyaWFsaXplIGNvbnRyYWN0IGFjdGlvbnMgKi9cclxuICAgICAgICB0aGlzLmNvbnRyYWN0cyA9IG5ldyBNYXAoKTtcclxuICAgICAgICAvKiogRmV0Y2hlZCBhYmlzICovXHJcbiAgICAgICAgdGhpcy5jYWNoZWRBYmlzID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIHRoaXMudHJhbnNhY3Rpb25FeHRlbnNpb25zID0gW1xyXG4gICAgICAgICAgICB7IGlkOiAxLCB0eXBlOiAncmVzb3VyY2VfcGF5ZXInLCBrZXlzOiBbJ3BheWVyJywgJ21heF9uZXRfYnl0ZXMnLCAnbWF4X2NwdV91cycsICdtYXhfbWVtb3J5X2J5dGVzJ10gfSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMucnBjID0gYXJncy5ycGM7XHJcbiAgICAgICAgdGhpcy5hdXRob3JpdHlQcm92aWRlciA9IGFyZ3MuYXV0aG9yaXR5UHJvdmlkZXIgfHwgYXJncy5ycGM7XHJcbiAgICAgICAgdGhpcy5hYmlQcm92aWRlciA9IGFyZ3MuYWJpUHJvdmlkZXIgfHwgYXJncy5ycGM7XHJcbiAgICAgICAgdGhpcy5zaWduYXR1cmVQcm92aWRlciA9IGFyZ3Muc2lnbmF0dXJlUHJvdmlkZXI7XHJcbiAgICAgICAgdGhpcy5jaGFpbklkID0gYXJncy5jaGFpbklkO1xyXG4gICAgICAgIHRoaXMudGV4dEVuY29kZXIgPSBhcmdzLnRleHRFbmNvZGVyO1xyXG4gICAgICAgIHRoaXMudGV4dERlY29kZXIgPSBhcmdzLnRleHREZWNvZGVyO1xyXG4gICAgICAgIHRoaXMuYWJpVHlwZXMgPSBzZXIuZ2V0VHlwZXNGcm9tQWJpKHNlci5jcmVhdGVBYmlUeXBlcygpKTtcclxuICAgICAgICB0aGlzLnRyYW5zYWN0aW9uVHlwZXMgPSBzZXIuZ2V0VHlwZXNGcm9tQWJpKHNlci5jcmVhdGVUcmFuc2FjdGlvblR5cGVzKCkpO1xyXG4gICAgfVxyXG4gICAgLyoqIERlY29kZXMgYW4gYWJpIGFzIFVpbnQ4QXJyYXkgaW50byBqc29uLiAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5yYXdBYmlUb0pzb24gPSBmdW5jdGlvbiAocmF3QWJpKSB7XHJcbiAgICAgICAgdmFyIGJ1ZmZlciA9IG5ldyBzZXIuU2VyaWFsQnVmZmVyKHtcclxuICAgICAgICAgICAgdGV4dEVuY29kZXI6IHRoaXMudGV4dEVuY29kZXIsXHJcbiAgICAgICAgICAgIHRleHREZWNvZGVyOiB0aGlzLnRleHREZWNvZGVyLFxyXG4gICAgICAgICAgICBhcnJheTogcmF3QWJpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghc2VyLnN1cHBvcnRlZEFiaVZlcnNpb24oYnVmZmVyLmdldFN0cmluZygpKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIGFiaSB2ZXJzaW9uJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJ1ZmZlci5yZXN0YXJ0UmVhZCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFiaVR5cGVzLmdldCgnYWJpX2RlZicpLmRlc2VyaWFsaXplKGJ1ZmZlcik7XHJcbiAgICB9O1xyXG4gICAgLyoqIEVuY29kZXMgYSBqc29uIGFiaSBhcyBVaW50OEFycmF5LiAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5qc29uVG9SYXdBYmkgPSBmdW5jdGlvbiAoanNvbkFiaSkge1xyXG4gICAgICAgIHZhciBidWZmZXIgPSBuZXcgc2VyLlNlcmlhbEJ1ZmZlcih7XHJcbiAgICAgICAgICAgIHRleHRFbmNvZGVyOiB0aGlzLnRleHRFbmNvZGVyLFxyXG4gICAgICAgICAgICB0ZXh0RGVjb2RlcjogdGhpcy50ZXh0RGVjb2RlcixcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmFiaVR5cGVzLmdldCgnYWJpX2RlZicpLnNlcmlhbGl6ZShidWZmZXIsIGpzb25BYmkpO1xyXG4gICAgICAgIGlmICghc2VyLnN1cHBvcnRlZEFiaVZlcnNpb24oYnVmZmVyLmdldFN0cmluZygpKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIGFiaSB2ZXJzaW9uJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBidWZmZXIuYXNVaW50OEFycmF5KCk7XHJcbiAgICB9O1xyXG4gICAgLyoqIEdldCBhYmkgaW4gYm90aCBiaW5hcnkgYW5kIHN0cnVjdHVyZWQgZm9ybXMuIEZldGNoIHdoZW4gbmVlZGVkLiAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5nZXRDYWNoZWRBYmkgPSBmdW5jdGlvbiAoYWNjb3VudE5hbWUsIHJlbG9hZCkge1xyXG4gICAgICAgIGlmIChyZWxvYWQgPT09IHZvaWQgMCkgeyByZWxvYWQgPSBmYWxzZTsgfVxyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGNhY2hlZEFiaSwgcmF3QWJpLCBhYmksIGVfMTtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZWxvYWQgJiYgdGhpcy5jYWNoZWRBYmlzLmdldChhY2NvdW50TmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLmNhY2hlZEFiaXMuZ2V0KGFjY291bnROYW1lKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFsxLCAzLCAsIDRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5hYmlQcm92aWRlci5nZXRSYXdBYmkoYWNjb3VudE5hbWUpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhd0FiaSA9IChfYS5zZW50KCkpLmFiaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWJpID0gdGhpcy5yYXdBYmlUb0pzb24ocmF3QWJpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVkQWJpID0geyByYXdBYmk6IHJhd0FiaSwgYWJpOiBhYmkgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlXzEgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfMS5tZXNzYWdlID0gXCJmZXRjaGluZyBhYmkgZm9yIFwiLmNvbmNhdChhY2NvdW50TmFtZSwgXCI6IFwiKS5jb25jYXQoZV8xLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlXzE7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNhY2hlZEFiaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBhYmkgZm9yIFwiLmNvbmNhdChhY2NvdW50TmFtZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVkQWJpcy5zZXQoYWNjb3VudE5hbWUsIGNhY2hlZEFiaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBjYWNoZWRBYmldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKiogR2V0IGFiaSBpbiBzdHJ1Y3R1cmVkIGZvcm0uIEZldGNoIHdoZW4gbmVlZGVkLiAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5nZXRBYmkgPSBmdW5jdGlvbiAoYWNjb3VudE5hbWUsIHJlbG9hZCkge1xyXG4gICAgICAgIGlmIChyZWxvYWQgPT09IHZvaWQgMCkgeyByZWxvYWQgPSBmYWxzZTsgfVxyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5nZXRDYWNoZWRBYmkoYWNjb3VudE5hbWUsIHJlbG9hZCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIChfYS5zZW50KCkpLmFiaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKiBHZXQgYWJpcyBuZWVkZWQgYnkgYSB0cmFuc2FjdGlvbiAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5nZXRUcmFuc2FjdGlvbkFiaXMgPSBmdW5jdGlvbiAodHJhbnNhY3Rpb24sIHJlbG9hZCkge1xyXG4gICAgICAgIGlmIChyZWxvYWQgPT09IHZvaWQgMCkgeyByZWxvYWQgPSBmYWxzZTsgfVxyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGFjdGlvbnMsIGFjY291bnRzLCB1bmlxdWVBY2NvdW50cywgYWN0aW9uUHJvbWlzZXM7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbnMgPSAodHJhbnNhY3Rpb24uY29udGV4dF9mcmVlX2FjdGlvbnMgfHwgW10pLmNvbmNhdCh0cmFuc2FjdGlvbi5hY3Rpb25zKTtcclxuICAgICAgICAgICAgICAgIGFjY291bnRzID0gYWN0aW9ucy5tYXAoZnVuY3Rpb24gKGFjdGlvbikgeyByZXR1cm4gYWN0aW9uLmFjY291bnQ7IH0pO1xyXG4gICAgICAgICAgICAgICAgdW5pcXVlQWNjb3VudHMgPSBuZXcgU2V0KGFjY291bnRzKTtcclxuICAgICAgICAgICAgICAgIGFjdGlvblByb21pc2VzID0gX19zcHJlYWRBcnJheShbXSwgX19yZWFkKHVuaXF1ZUFjY291bnRzKSwgZmFsc2UpLm1hcChmdW5jdGlvbiAoYWNjb3VudCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfYTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjb3VudE5hbWU6IGFjY291bnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZ2V0Q2FjaGVkQWJpKGFjY291bnQsIHJlbG9hZCldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzIgLypyZXR1cm4qLywgKF9hLmFiaSA9IChfYi5zZW50KCkpLnJhd0FiaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2EpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFByb21pc2UuYWxsKGFjdGlvblByb21pc2VzKV07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKiBHZXQgZGF0YSBuZWVkZWQgdG8gc2VyaWFsaXplIGFjdGlvbnMgaW4gYSBjb250cmFjdCAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5nZXRDb250cmFjdCA9IGZ1bmN0aW9uIChhY2NvdW50TmFtZSwgcmVsb2FkKSB7XHJcbiAgICAgICAgaWYgKHJlbG9hZCA9PT0gdm9pZCAwKSB7IHJlbG9hZCA9IGZhbHNlOyB9XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgYWJpLCB0eXBlcywgYWN0aW9ucywgX2EsIF9iLCBfYywgbmFtZV8xLCB0eXBlLCByZXN1bHQ7XHJcbiAgICAgICAgICAgIHZhciBlXzIsIF9kO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9lKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9lLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlbG9hZCAmJiB0aGlzLmNvbnRyYWN0cy5nZXQoYWNjb3VudE5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5jb250cmFjdHMuZ2V0KGFjY291bnROYW1lKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5nZXRBYmkoYWNjb3VudE5hbWUsIHJlbG9hZCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWJpID0gX2Uuc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlcyA9IHNlci5nZXRUeXBlc0Zyb21BYmkoc2VyLmNyZWF0ZUluaXRpYWxUeXBlcygpLCBhYmkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zID0gbmV3IE1hcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChfYSA9IF9fdmFsdWVzKGFiaS5hY3Rpb25zKSwgX2IgPSBfYS5uZXh0KCk7ICFfYi5kb25lOyBfYiA9IF9hLm5leHQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jID0gX2IudmFsdWUsIG5hbWVfMSA9IF9jLm5hbWUsIHR5cGUgPSBfYy50eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnMuc2V0KG5hbWVfMSwgc2VyLmdldFR5cGUodHlwZXMsIHR5cGUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZV8yXzEpIHsgZV8yID0geyBlcnJvcjogZV8yXzEgfTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9iICYmICFfYi5kb25lICYmIChfZCA9IF9hLnJldHVybikpIF9kLmNhbGwoX2EpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzIpIHRocm93IGVfMi5lcnJvcjsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHsgdHlwZXM6IHR5cGVzLCBhY3Rpb25zOiBhY3Rpb25zIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udHJhY3RzLnNldChhY2NvdW50TmFtZSwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHJlc3VsdF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKiBDb252ZXJ0IGB2YWx1ZWAgdG8gYmluYXJ5IGZvcm0uIGB0eXBlYCBtdXN0IGJlIGEgYnVpbHQtaW4gYWJpIHR5cGUgb3IgaW4gYHRyYW5zYWN0aW9uLmFiaS5qc29uYC4gKi9cclxuICAgIEFwaS5wcm90b3R5cGUuc2VyaWFsaXplID0gZnVuY3Rpb24gKGJ1ZmZlciwgdHlwZSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLnRyYW5zYWN0aW9uVHlwZXMuZ2V0KHR5cGUpLnNlcmlhbGl6ZShidWZmZXIsIHZhbHVlKTtcclxuICAgIH07XHJcbiAgICAvKiogQ29udmVydCBkYXRhIGluIGBidWZmZXJgIHRvIHN0cnVjdHVyZWQgZm9ybS4gYHR5cGVgIG11c3QgYmUgYSBidWlsdC1pbiBhYmkgdHlwZSBvciBpbiBgdHJhbnNhY3Rpb24uYWJpLmpzb25gLiAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5kZXNlcmlhbGl6ZSA9IGZ1bmN0aW9uIChidWZmZXIsIHR5cGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2FjdGlvblR5cGVzLmdldCh0eXBlKS5kZXNlcmlhbGl6ZShidWZmZXIpO1xyXG4gICAgfTtcclxuICAgIC8qKiBDb252ZXJ0IGEgdHJhbnNhY3Rpb24gdG8gYmluYXJ5ICovXHJcbiAgICBBcGkucHJvdG90eXBlLnNlcmlhbGl6ZVRyYW5zYWN0aW9uID0gZnVuY3Rpb24gKHRyYW5zYWN0aW9uKSB7XHJcbiAgICAgICAgdmFyIGJ1ZmZlciA9IG5ldyBzZXIuU2VyaWFsQnVmZmVyKHsgdGV4dEVuY29kZXI6IHRoaXMudGV4dEVuY29kZXIsIHRleHREZWNvZGVyOiB0aGlzLnRleHREZWNvZGVyIH0pO1xyXG4gICAgICAgIHRoaXMuc2VyaWFsaXplKGJ1ZmZlciwgJ3RyYW5zYWN0aW9uJywgX19hc3NpZ24oeyBtYXhfbmV0X3VzYWdlX3dvcmRzOiAwLCBtYXhfY3B1X3VzYWdlX21zOiAwLCBkZWxheV9zZWM6IDAsIGNvbnRleHRfZnJlZV9hY3Rpb25zOiBbXSwgYWN0aW9uczogW10sIHRyYW5zYWN0aW9uX2V4dGVuc2lvbnM6IFtdIH0sIHRyYW5zYWN0aW9uKSk7XHJcbiAgICAgICAgcmV0dXJuIGJ1ZmZlci5hc1VpbnQ4QXJyYXkoKTtcclxuICAgIH07XHJcbiAgICAvKiogU2VyaWFsaXplIGNvbnRleHQtZnJlZSBkYXRhICovXHJcbiAgICBBcGkucHJvdG90eXBlLnNlcmlhbGl6ZUNvbnRleHRGcmVlRGF0YSA9IGZ1bmN0aW9uIChjb250ZXh0RnJlZURhdGEpIHtcclxuICAgICAgICB2YXIgZV8zLCBfYTtcclxuICAgICAgICBpZiAoIWNvbnRleHRGcmVlRGF0YSB8fCAhY29udGV4dEZyZWVEYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGJ1ZmZlciA9IG5ldyBzZXIuU2VyaWFsQnVmZmVyKHsgdGV4dEVuY29kZXI6IHRoaXMudGV4dEVuY29kZXIsIHRleHREZWNvZGVyOiB0aGlzLnRleHREZWNvZGVyIH0pO1xyXG4gICAgICAgIGJ1ZmZlci5wdXNoVmFydWludDMyKGNvbnRleHRGcmVlRGF0YS5sZW5ndGgpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGNvbnRleHRGcmVlRGF0YV8xID0gX192YWx1ZXMoY29udGV4dEZyZWVEYXRhKSwgY29udGV4dEZyZWVEYXRhXzFfMSA9IGNvbnRleHRGcmVlRGF0YV8xLm5leHQoKTsgIWNvbnRleHRGcmVlRGF0YV8xXzEuZG9uZTsgY29udGV4dEZyZWVEYXRhXzFfMSA9IGNvbnRleHRGcmVlRGF0YV8xLm5leHQoKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBjb250ZXh0RnJlZURhdGFfMV8xLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyLnB1c2hCeXRlcyhkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZV8zXzEpIHsgZV8zID0geyBlcnJvcjogZV8zXzEgfTsgfVxyXG4gICAgICAgIGZpbmFsbHkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHRGcmVlRGF0YV8xXzEgJiYgIWNvbnRleHRGcmVlRGF0YV8xXzEuZG9uZSAmJiAoX2EgPSBjb250ZXh0RnJlZURhdGFfMS5yZXR1cm4pKSBfYS5jYWxsKGNvbnRleHRGcmVlRGF0YV8xKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMykgdGhyb3cgZV8zLmVycm9yOyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBidWZmZXIuYXNVaW50OEFycmF5KCk7XHJcbiAgICB9O1xyXG4gICAgLyoqIENvbnZlcnQgYSB0cmFuc2FjdGlvbiBmcm9tIGJpbmFyeS4gTGVhdmVzIGFjdGlvbnMgaW4gaGV4LiAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS5kZXNlcmlhbGl6ZVRyYW5zYWN0aW9uID0gZnVuY3Rpb24gKHRyYW5zYWN0aW9uKSB7XHJcbiAgICAgICAgdmFyIGJ1ZmZlciA9IG5ldyBzZXIuU2VyaWFsQnVmZmVyKHsgdGV4dEVuY29kZXI6IHRoaXMudGV4dEVuY29kZXIsIHRleHREZWNvZGVyOiB0aGlzLnRleHREZWNvZGVyIH0pO1xyXG4gICAgICAgIGJ1ZmZlci5wdXNoQXJyYXkodHJhbnNhY3Rpb24pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRlc2VyaWFsaXplKGJ1ZmZlciwgJ3RyYW5zYWN0aW9uJyk7XHJcbiAgICB9O1xyXG4gICAgLy8gT3JkZXIgb2YgYWRkaW5nIHRvIHRyYW5zYWN0aW9uX2V4dGVuc2lvbiBpcyB0cmFuc2FjdGlvbl9leHRlbnNpb24gaWQgYXNjZW5kaW5nXHJcbiAgICBBcGkucHJvdG90eXBlLnNlcmlhbGl6ZVRyYW5zYWN0aW9uRXh0ZW5zaW9ucyA9IGZ1bmN0aW9uICh0cmFuc2FjdGlvbikge1xyXG4gICAgICAgIHZhciB0cmFuc2FjdGlvbl9leHRlbnNpb25zID0gW107XHJcbiAgICAgICAgaWYgKHRyYW5zYWN0aW9uLnJlc291cmNlX3BheWVyKSB7XHJcbiAgICAgICAgICAgIHZhciBleHRlbnNpb25CdWZmZXIgPSBuZXcgc2VyLlNlcmlhbEJ1ZmZlcih7IHRleHRFbmNvZGVyOiB0aGlzLnRleHRFbmNvZGVyLCB0ZXh0RGVjb2RlcjogdGhpcy50ZXh0RGVjb2RlciB9KTtcclxuICAgICAgICAgICAgdmFyIHR5cGVzID0gc2VyLmdldFR5cGVzRnJvbUFiaShzZXIuY3JlYXRlVHJhbnNhY3Rpb25FeHRlbnNpb25UeXBlcygpKTtcclxuICAgICAgICAgICAgdHlwZXMuZ2V0KCdyZXNvdXJjZV9wYXllcicpLnNlcmlhbGl6ZShleHRlbnNpb25CdWZmZXIsIHRyYW5zYWN0aW9uLnJlc291cmNlX3BheWVyKTtcclxuICAgICAgICAgICAgdHJhbnNhY3Rpb25fZXh0ZW5zaW9ucyA9IF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShbXSwgX19yZWFkKHRyYW5zYWN0aW9uX2V4dGVuc2lvbnMpLCBmYWxzZSksIFtbMSwgc2VyLmFycmF5VG9IZXgoZXh0ZW5zaW9uQnVmZmVyLmFzVWludDhBcnJheSgpKV1dLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cmFuc2FjdGlvbl9leHRlbnNpb25zO1xyXG4gICAgfTtcclxuICAgIDtcclxuICAgIC8vIFVzYWdlOiB0cmFuc2FjdGlvbiA9IHsuLi50cmFuc2FjdGlvbiwgLi4udGhpcy5kZXNlcmlhbGl6ZVRyYW5zYWN0aW9uRXh0ZW5zaW9ucyh0cmFuc2FjdGlvbi50cmFuc2FjdGlvbl9leHRlbnNpb25zKX1cclxuICAgIEFwaS5wcm90b3R5cGUuZGVzZXJpYWxpemVUcmFuc2FjdGlvbkV4dGVuc2lvbnMgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHRyYW5zYWN0aW9uID0ge307XHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChleHRlbnNpb25EYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciB0cmFuc2FjdGlvbkV4dGVuc2lvbiA9IF90aGlzLnRyYW5zYWN0aW9uRXh0ZW5zaW9ucy5maW5kKGZ1bmN0aW9uIChleHRlbnNpb24pIHsgcmV0dXJuIGV4dGVuc2lvbi5pZCA9PT0gZXh0ZW5zaW9uRGF0YVswXTsgfSk7XHJcbiAgICAgICAgICAgIGlmICh0cmFuc2FjdGlvbkV4dGVuc2lvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUcmFuc2FjdGlvbiBFeHRlbnNpb24gY291bGQgbm90IGJlIGRldGVybWluZWQ6IFwiLmNvbmNhdChleHRlbnNpb25EYXRhKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHR5cGVzID0gc2VyLmdldFR5cGVzRnJvbUFiaShzZXIuY3JlYXRlVHJhbnNhY3Rpb25FeHRlbnNpb25UeXBlcygpKTtcclxuICAgICAgICAgICAgdmFyIGV4dGVuc2lvbkJ1ZmZlciA9IG5ldyBzZXIuU2VyaWFsQnVmZmVyKHsgdGV4dEVuY29kZXI6IF90aGlzLnRleHRFbmNvZGVyLCB0ZXh0RGVjb2RlcjogX3RoaXMudGV4dERlY29kZXIgfSk7XHJcbiAgICAgICAgICAgIGV4dGVuc2lvbkJ1ZmZlci5wdXNoQXJyYXkoc2VyLmhleFRvVWludDhBcnJheShleHRlbnNpb25EYXRhWzFdKSk7XHJcbiAgICAgICAgICAgIHZhciBkZXNlcmlhbGl6ZWRPYmogPSB0eXBlcy5nZXQodHJhbnNhY3Rpb25FeHRlbnNpb24udHlwZSkuZGVzZXJpYWxpemUoZXh0ZW5zaW9uQnVmZmVyKTtcclxuICAgICAgICAgICAgaWYgKGV4dGVuc2lvbkRhdGFbMF0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGRlc2VyaWFsaXplZE9iai5tYXhfbmV0X2J5dGVzID0gTnVtYmVyKGRlc2VyaWFsaXplZE9iai5tYXhfbmV0X2J5dGVzKTtcclxuICAgICAgICAgICAgICAgIGRlc2VyaWFsaXplZE9iai5tYXhfY3B1X3VzID0gTnVtYmVyKGRlc2VyaWFsaXplZE9iai5tYXhfY3B1X3VzKTtcclxuICAgICAgICAgICAgICAgIGRlc2VyaWFsaXplZE9iai5tYXhfbWVtb3J5X2J5dGVzID0gTnVtYmVyKGRlc2VyaWFsaXplZE9iai5tYXhfbWVtb3J5X2J5dGVzKTtcclxuICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uLnJlc291cmNlX3BheWVyID0gZGVzZXJpYWxpemVkT2JqO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRyYW5zYWN0aW9uO1xyXG4gICAgfTtcclxuICAgIDtcclxuICAgIC8vIFRyYW5zYWN0aW9uIGV4dGVuc2lvbnMgYXJlIHNlcmlhbGl6ZWQgYW5kIG1vdmVkIHRvIGB0cmFuc2FjdGlvbl9leHRlbnNpb25zYCwgZGVzZXJpYWxpemVkIG9iamVjdHMgYXJlIG5vdCBuZWVkZWQgb24gdGhlIHRyYW5zYWN0aW9uXHJcbiAgICBBcGkucHJvdG90eXBlLmRlbGV0ZVRyYW5zYWN0aW9uRXh0ZW5zaW9uT2JqZWN0cyA9IGZ1bmN0aW9uICh0cmFuc2FjdGlvbikge1xyXG4gICAgICAgIGRlbGV0ZSB0cmFuc2FjdGlvbi5yZXNvdXJjZV9wYXllcjtcclxuICAgICAgICByZXR1cm4gdHJhbnNhY3Rpb247XHJcbiAgICB9O1xyXG4gICAgLyoqIENvbnZlcnQgYWN0aW9ucyB0byBoZXggKi9cclxuICAgIEFwaS5wcm90b3R5cGUuc2VyaWFsaXplQWN0aW9ucyA9IGZ1bmN0aW9uIChhY3Rpb25zKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCBQcm9taXNlLmFsbChhY3Rpb25zLm1hcChmdW5jdGlvbiAoYWN0aW9uKSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWNjb3VudCwgbmFtZSwgYXV0aG9yaXphdGlvbiwgZGF0YSwgY29udHJhY3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2NvdW50ID0gYWN0aW9uLmFjY291bnQsIG5hbWUgPSBhY3Rpb24ubmFtZSwgYXV0aG9yaXphdGlvbiA9IGFjdGlvbi5hdXRob3JpemF0aW9uLCBkYXRhID0gYWN0aW9uLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmdldENvbnRyYWN0KGFjY291bnQpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJhY3QgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGFjdGlvbl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgc2VyLnNlcmlhbGl6ZUFjdGlvbihjb250cmFjdCwgYWNjb3VudCwgbmFtZSwgYXV0aG9yaXphdGlvbiwgZGF0YSwgdGhpcy50ZXh0RW5jb2RlciwgdGhpcy50ZXh0RGVjb2RlcildO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTsgfSkpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYS5zZW50KCldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKiogQ29udmVydCBhY3Rpb25zIGZyb20gaGV4ICovXHJcbiAgICBBcGkucHJvdG90eXBlLmRlc2VyaWFsaXplQWN0aW9ucyA9IGZ1bmN0aW9uIChhY3Rpb25zKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCBQcm9taXNlLmFsbChhY3Rpb25zLm1hcChmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY2NvdW50ID0gX2EuYWNjb3VudCwgbmFtZSA9IF9hLm5hbWUsIGF1dGhvcml6YXRpb24gPSBfYS5hdXRob3JpemF0aW9uLCBkYXRhID0gX2EuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRyYWN0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmdldENvbnRyYWN0KGFjY291bnQpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cmFjdCA9IF9iLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgc2VyLmRlc2VyaWFsaXplQWN0aW9uKGNvbnRyYWN0LCBhY2NvdW50LCBuYW1lLCBhdXRob3JpemF0aW9uLCBkYXRhLCB0aGlzLnRleHRFbmNvZGVyLCB0aGlzLnRleHREZWNvZGVyKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKiBDb252ZXJ0IGEgdHJhbnNhY3Rpb24gZnJvbSBiaW5hcnkuIEFsc28gZGVzZXJpYWxpemVzIGFjdGlvbnMuICovXHJcbiAgICBBcGkucHJvdG90eXBlLmRlc2VyaWFsaXplVHJhbnNhY3Rpb25XaXRoQWN0aW9ucyA9IGZ1bmN0aW9uICh0cmFuc2FjdGlvbikge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGRlc2VyaWFsaXplZFRyYW5zYWN0aW9uLCBkZXNlcmlhbGl6ZWRDRkFjdGlvbnMsIGRlc2VyaWFsaXplZEFjdGlvbnM7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdHJhbnNhY3Rpb24gPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbiA9IHNlci5oZXhUb1VpbnQ4QXJyYXkodHJhbnNhY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2VyaWFsaXplZFRyYW5zYWN0aW9uID0gdGhpcy5kZXNlcmlhbGl6ZVRyYW5zYWN0aW9uKHRyYW5zYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5kZXNlcmlhbGl6ZUFjdGlvbnMoZGVzZXJpYWxpemVkVHJhbnNhY3Rpb24uY29udGV4dF9mcmVlX2FjdGlvbnMpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2VyaWFsaXplZENGQWN0aW9ucyA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5kZXNlcmlhbGl6ZUFjdGlvbnMoZGVzZXJpYWxpemVkVHJhbnNhY3Rpb24uYWN0aW9ucyldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzZXJpYWxpemVkQWN0aW9ucyA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9fYXNzaWduKF9fYXNzaWduKHt9LCBkZXNlcmlhbGl6ZWRUcmFuc2FjdGlvbiksIHsgY29udGV4dF9mcmVlX2FjdGlvbnM6IGRlc2VyaWFsaXplZENGQWN0aW9ucywgYWN0aW9uczogZGVzZXJpYWxpemVkQWN0aW9ucyB9KV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKiBEZWZsYXRlIGEgc2VyaWFsaXplZCBvYmplY3QgKi9cclxuICAgIEFwaS5wcm90b3R5cGUuZGVmbGF0ZVNlcmlhbGl6ZWRBcnJheSA9IGZ1bmN0aW9uIChzZXJpYWxpemVkQXJyYXkpIHtcclxuICAgICAgICByZXR1cm4gKDAsIHBha29fMS5kZWZsYXRlKShzZXJpYWxpemVkQXJyYXksIHsgbGV2ZWw6IDkgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIEluZmxhdGUgYSBjb21wcmVzc2VkIHNlcmlhbGl6ZWQgb2JqZWN0ICovXHJcbiAgICBBcGkucHJvdG90eXBlLmluZmxhdGVTZXJpYWxpemVkQXJyYXkgPSBmdW5jdGlvbiAoY29tcHJlc3NlZFNlcmlhbGl6ZWRBcnJheSkge1xyXG4gICAgICAgIHJldHVybiAoMCwgcGFrb18xLmluZmxhdGUpKGNvbXByZXNzZWRTZXJpYWxpemVkQXJyYXkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGFuZCBvcHRpb25hbGx5IGJyb2FkY2FzdCBhIHRyYW5zYWN0aW9uLlxyXG4gICAgICpcclxuICAgICAqIE5hbWVkIFBhcmFtZXRlcnM6XHJcbiAgICAgKiBgYnJvYWRjYXN0YDogYnJvYWRjYXN0IHRoaXMgdHJhbnNhY3Rpb24/XHJcbiAgICAgKiBgc2lnbmA6IHNpZ24gdGhpcyB0cmFuc2FjdGlvbj9cclxuICAgICAqIGBjb21wcmVzc2lvbmA6IGNvbXByZXNzIHRoaXMgdHJhbnNhY3Rpb24/XHJcbiAgICAgKiBgcmVhZE9ubHlUcnhgOiByZWFkIG9ubHkgdHJhbnNhY3Rpb24/XHJcbiAgICAgKiBgcmV0dXJuRmFpbHVyZVRyYWNlc2A6IHJldHVybiBmYWlsdXJlIHRyYWNlcz8gKG9ubHkgYXZhaWxhYmxlIGZvciByZWFkIG9ubHkgdHJhbnNhY3Rpb25zIGN1cnJlbnRseSlcclxuICAgICAqXHJcbiAgICAgKiBJZiBib3RoIGBibG9ja3NCZWhpbmRgIGFuZCBgZXhwaXJlU2Vjb25kc2AgYXJlIHByZXNlbnQsXHJcbiAgICAgKiB0aGVuIGZldGNoIHRoZSBibG9jayB3aGljaCBpcyBgYmxvY2tzQmVoaW5kYCBiZWhpbmQgaGVhZCBibG9jayxcclxuICAgICAqIHVzZSBpdCBhcyBhIHJlZmVyZW5jZSBmb3IgVEFQb1MsIGFuZCBleHBpcmUgdGhlIHRyYW5zYWN0aW9uIGBleHBpcmVTZWNvbmRzYCBhZnRlciB0aGF0IGJsb2NrJ3MgdGltZS5cclxuICAgICAqXHJcbiAgICAgKiBJZiBib3RoIGB1c2VMYXN0SXJyZXZlcnNpYmxlYCBhbmQgYGV4cGlyZVNlY29uZHNgIGFyZSBwcmVzZW50LFxyXG4gICAgICogdGhlbiBmZXRjaCB0aGUgbGFzdCBpcnJldmVyc2libGUgYmxvY2ssIHVzZSBpdCBhcyBhIHJlZmVyZW5jZSBmb3IgVEFQb1MsXHJcbiAgICAgKiBhbmQgZXhwaXJlIHRoZSB0cmFuc2FjdGlvbiBgZXhwaXJlU2Vjb25kc2AgYWZ0ZXIgdGhhdCBibG9jaydzIHRpbWUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgbm9kZSByZXNwb25zZSBpZiBgYnJvYWRjYXN0YCwgYHtzaWduYXR1cmVzLCBzZXJpYWxpemVkVHJhbnNhY3Rpb259YCBpZiBgIWJyb2FkY2FzdGBcclxuICAgICAqL1xyXG4gICAgQXBpLnByb3RvdHlwZS50cmFuc2FjdCA9IGZ1bmN0aW9uICh0cmFuc2FjdGlvbiwgX2EpIHtcclxuICAgICAgICB2YXIgX2IgPSBfYSA9PT0gdm9pZCAwID8ge30gOiBfYSwgX2MgPSBfYi5icm9hZGNhc3QsIGJyb2FkY2FzdCA9IF9jID09PSB2b2lkIDAgPyB0cnVlIDogX2MsIF9kID0gX2Iuc2lnbiwgc2lnbiA9IF9kID09PSB2b2lkIDAgPyB0cnVlIDogX2QsIHJlYWRPbmx5VHJ4ID0gX2IucmVhZE9ubHlUcngsIHJldHVybkZhaWx1cmVUcmFjZXMgPSBfYi5yZXR1cm5GYWlsdXJlVHJhY2VzLCByZXF1aXJlZEtleXMgPSBfYi5yZXF1aXJlZEtleXMsIGNvbXByZXNzaW9uID0gX2IuY29tcHJlc3Npb24sIGJsb2Nrc0JlaGluZCA9IF9iLmJsb2Nrc0JlaGluZCwgdXNlTGFzdElycmV2ZXJzaWJsZSA9IF9iLnVzZUxhc3RJcnJldmVyc2libGUsIGV4cGlyZVNlY29uZHMgPSBfYi5leHBpcmVTZWNvbmRzO1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGluZm8sIGFiaXMsIF9lLCBzZXJpYWxpemVkVHJhbnNhY3Rpb24sIHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGEsIHB1c2hUcmFuc2FjdGlvbkFyZ3MsIGF2YWlsYWJsZUtleXM7XHJcbiAgICAgICAgICAgIHZhciBfZjtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfZykge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfZy5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBibG9ja3NCZWhpbmQgPT09ICdudW1iZXInICYmIHVzZUxhc3RJcnJldmVyc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVXNlIGVpdGhlciBibG9ja3NCZWhpbmQgb3IgdXNlTGFzdElycmV2ZXJzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIXRoaXMuY2hhaW5JZCkgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucnBjLmdldF9pbmZvKCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mbyA9IF9nLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFpbklkID0gaW5mby5jaGFpbl9pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2cubGFiZWwgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoKHR5cGVvZiBibG9ja3NCZWhpbmQgPT09ICdudW1iZXInIHx8IHVzZUxhc3RJcnJldmVyc2libGUpICYmIGV4cGlyZVNlY29uZHMpKSByZXR1cm4gWzMgLypicmVhayovLCA0XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5nZW5lcmF0ZVRhcG9zKGluZm8sIHRyYW5zYWN0aW9uLCBibG9ja3NCZWhpbmQsIHVzZUxhc3RJcnJldmVyc2libGUsIGV4cGlyZVNlY29uZHMpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uID0gX2cuc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfZy5sYWJlbCA9IDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaGFzUmVxdWlyZWRUYXBvc0ZpZWxkcyh0cmFuc2FjdGlvbikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUmVxdWlyZWQgY29uZmlndXJhdGlvbiBvciBUQVBPUyBmaWVsZHMgYXJlIG5vdCBwcmVzZW50Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5nZXRUcmFuc2FjdGlvbkFiaXModHJhbnNhY3Rpb24pXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFiaXMgPSBfZy5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9lID0gW19fYXNzaWduKHt9LCB0cmFuc2FjdGlvbildO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfZiA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnNlcmlhbGl6ZVRyYW5zYWN0aW9uRXh0ZW5zaW9ucyh0cmFuc2FjdGlvbildO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2YudHJhbnNhY3Rpb25fZXh0ZW5zaW9ucyA9IF9nLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zZXJpYWxpemVBY3Rpb25zKHRyYW5zYWN0aW9uLmNvbnRleHRfZnJlZV9hY3Rpb25zIHx8IFtdKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfZi5jb250ZXh0X2ZyZWVfYWN0aW9ucyA9IF9nLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zZXJpYWxpemVBY3Rpb25zKHRyYW5zYWN0aW9uLmFjdGlvbnMpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uID0gX19hc3NpZ24uYXBwbHkodm9pZCAwLCBfZS5jb25jYXQoWyhfZi5hY3Rpb25zID0gX2cuc2VudCgpLCBfZildKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uID0gdGhpcy5kZWxldGVUcmFuc2FjdGlvbkV4dGVuc2lvbk9iamVjdHModHJhbnNhY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJpYWxpemVkVHJhbnNhY3Rpb24gPSB0aGlzLnNlcmlhbGl6ZVRyYW5zYWN0aW9uKHRyYW5zYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWFsaXplZENvbnRleHRGcmVlRGF0YSA9IHRoaXMuc2VyaWFsaXplQ29udGV4dEZyZWVEYXRhKHRyYW5zYWN0aW9uLmNvbnRleHRfZnJlZV9kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFRyYW5zYWN0aW9uQXJncyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcmlhbGl6ZWRUcmFuc2FjdGlvbjogc2VyaWFsaXplZFRyYW5zYWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWFsaXplZENvbnRleHRGcmVlRGF0YTogc2VyaWFsaXplZENvbnRleHRGcmVlRGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZXM6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2lnbikgcmV0dXJuIFszIC8qYnJlYWsqLywgMTNdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISFyZXF1aXJlZEtleXMpIHJldHVybiBbMyAvKmJyZWFrKi8sIDExXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zaWduYXR1cmVQcm92aWRlci5nZXRBdmFpbGFibGVLZXlzKCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgOTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXZhaWxhYmxlS2V5cyA9IF9nLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5hdXRob3JpdHlQcm92aWRlci5nZXRSZXF1aXJlZEtleXMoeyB0cmFuc2FjdGlvbjogdHJhbnNhY3Rpb24sIGF2YWlsYWJsZUtleXM6IGF2YWlsYWJsZUtleXMgfSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkS2V5cyA9IF9nLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2cubGFiZWwgPSAxMTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDExOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnNpZ25hdHVyZVByb3ZpZGVyLnNpZ24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhaW5JZDogdGhpcy5jaGFpbklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRLZXlzOiByZXF1aXJlZEtleXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJpYWxpemVkVHJhbnNhY3Rpb246IHNlcmlhbGl6ZWRUcmFuc2FjdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGE6IHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYmlzOiBhYmlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFRyYW5zYWN0aW9uQXJncyA9IF9nLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2cubGFiZWwgPSAxMztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDEzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnJvYWRjYXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tcHJlc3Npb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5wdXNoQ29tcHJlc3NlZFNpZ25lZFRyYW5zYWN0aW9uKHB1c2hUcmFuc2FjdGlvbkFyZ3MsIHJlYWRPbmx5VHJ4LCByZXR1cm5GYWlsdXJlVHJhY2VzKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5wdXNoU2lnbmVkVHJhbnNhY3Rpb24ocHVzaFRyYW5zYWN0aW9uQXJncywgcmVhZE9ubHlUcngsIHJldHVybkZhaWx1cmVUcmFjZXMpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgcHVzaFRyYW5zYWN0aW9uQXJnc107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEFwaS5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbiAoYWNjb3VudCwgc2hvcnQsIHF1ZXJ5LCBfYSkge1xyXG4gICAgICAgIHZhciBzaWduID0gX2Euc2lnbiwgcmVxdWlyZWRLZXlzID0gX2EucmVxdWlyZWRLZXlzLCBfYiA9IF9hLmF1dGhvcml6YXRpb24sIGF1dGhvcml6YXRpb24gPSBfYiA9PT0gdm9pZCAwID8gW10gOiBfYjtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmZvLCByZWZCbG9jaywgcXVlcnlCdWZmZXIsIHRyYW5zYWN0aW9uLCBzZXJpYWxpemVkVHJhbnNhY3Rpb24sIHNpZ25hdHVyZXMsIGFiaXMsIGF2YWlsYWJsZUtleXMsIHNpZ25SZXNwb25zZSwgcmVzcG9uc2UsIHJldHVybkJ1ZmZlcjtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYykge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYy5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5ycGMuZ2V0X2luZm8oKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvID0gX2Muc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnRyeVJlZkJsb2NrRnJvbUdldEluZm8oaW5mbyldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmQmxvY2sgPSBfYy5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5QnVmZmVyID0gbmV3IHNlci5TZXJpYWxCdWZmZXIoeyB0ZXh0RW5jb2RlcjogdGhpcy50ZXh0RW5jb2RlciwgdGV4dERlY29kZXI6IHRoaXMudGV4dERlY29kZXIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlci5zZXJpYWxpemVRdWVyeShxdWVyeUJ1ZmZlciwgcXVlcnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbiA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBzZXIudHJhbnNhY3Rpb25IZWFkZXIocmVmQmxvY2ssIDYwICogMzApKSwgeyBjb250ZXh0X2ZyZWVfYWN0aW9uczogW10sIGFjdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY291bnQ6IGFjY291bnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdxdWVyeWl0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0aG9yaXphdGlvbjogYXV0aG9yaXphdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogc2VyLmFycmF5VG9IZXgocXVlcnlCdWZmZXIuYXNVaW50OEFycmF5KCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJpYWxpemVkVHJhbnNhY3Rpb24gPSB0aGlzLnNlcmlhbGl6ZVRyYW5zYWN0aW9uKHRyYW5zYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmF0dXJlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNpZ24pIHJldHVybiBbMyAvKmJyZWFrKi8sIDhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmdldFRyYW5zYWN0aW9uQWJpcyh0cmFuc2FjdGlvbildO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWJpcyA9IF9jLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhcmVxdWlyZWRLZXlzKSByZXR1cm4gWzMgLypicmVhayovLCA2XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zaWduYXR1cmVQcm92aWRlci5nZXRBdmFpbGFibGVLZXlzKCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXZhaWxhYmxlS2V5cyA9IF9jLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5hdXRob3JpdHlQcm92aWRlci5nZXRSZXF1aXJlZEtleXMoeyB0cmFuc2FjdGlvbjogdHJhbnNhY3Rpb24sIGF2YWlsYWJsZUtleXM6IGF2YWlsYWJsZUtleXMgfSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRLZXlzID0gX2Muc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYy5sYWJlbCA9IDY7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnNpZ25hdHVyZVByb3ZpZGVyLnNpZ24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhaW5JZDogdGhpcy5jaGFpbklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRLZXlzOiByZXF1aXJlZEtleXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJpYWxpemVkVHJhbnNhY3Rpb246IHNlcmlhbGl6ZWRUcmFuc2FjdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGE6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYmlzOiBhYmlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduUmVzcG9uc2UgPSBfYy5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZXMgPSBzaWduUmVzcG9uc2Uuc2lnbmF0dXJlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2MubGFiZWwgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgODogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5ycGMuc2VuZF90cmFuc2FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYXR1cmVzOiBzaWduYXR1cmVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcHJlc3Npb246IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJpYWxpemVkVHJhbnNhY3Rpb246IHNlcmlhbGl6ZWRUcmFuc2FjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9jLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuQnVmZmVyID0gbmV3IHNlci5TZXJpYWxCdWZmZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVuY29kZXI6IHRoaXMudGV4dEVuY29kZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RGVjb2RlcjogdGhpcy50ZXh0RGVjb2RlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5OiBzZXIuaGV4VG9VaW50OEFycmF5KHJlc3BvbnNlLnByb2Nlc3NlZC5hY3Rpb25fdHJhY2VzWzBdWzFdLnJldHVybl92YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaG9ydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHNlci5kZXNlcmlhbGl6ZUFueXZhclNob3J0KHJldHVybkJ1ZmZlcildO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHNlci5kZXNlcmlhbGl6ZUFueXZhcihyZXR1cm5CdWZmZXIpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKiBCcm9hZGNhc3QgYSBzaWduZWQgdHJhbnNhY3Rpb24gKi9cclxuICAgIEFwaS5wcm90b3R5cGUucHVzaFNpZ25lZFRyYW5zYWN0aW9uID0gZnVuY3Rpb24gKF9hLCByZWFkT25seVRyeCwgcmV0dXJuRmFpbHVyZVRyYWNlcykge1xyXG4gICAgICAgIHZhciBzaWduYXR1cmVzID0gX2Euc2lnbmF0dXJlcywgc2VyaWFsaXplZFRyYW5zYWN0aW9uID0gX2Euc2VyaWFsaXplZFRyYW5zYWN0aW9uLCBzZXJpYWxpemVkQ29udGV4dEZyZWVEYXRhID0gX2Euc2VyaWFsaXplZENvbnRleHRGcmVlRGF0YTtcclxuICAgICAgICBpZiAocmVhZE9ubHlUcnggPT09IHZvaWQgMCkgeyByZWFkT25seVRyeCA9IGZhbHNlOyB9XHJcbiAgICAgICAgaWYgKHJldHVybkZhaWx1cmVUcmFjZXMgPT09IHZvaWQgMCkgeyByZXR1cm5GYWlsdXJlVHJhY2VzID0gZmFsc2U7IH1cclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZWFkT25seVRyeCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnJwYy5wdXNoX3JvX3RyYW5zYWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZXM6IHNpZ25hdHVyZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJpYWxpemVkVHJhbnNhY3Rpb246IHNlcmlhbGl6ZWRUcmFuc2FjdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGE6IHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHJldHVybkZhaWx1cmVUcmFjZXMpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnJwYy5wdXNoX3RyYW5zYWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmF0dXJlczogc2lnbmF0dXJlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWFsaXplZFRyYW5zYWN0aW9uOiBzZXJpYWxpemVkVHJhbnNhY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGE6IHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGFcclxuICAgICAgICAgICAgICAgICAgICB9KV07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEFwaS5wcm90b3R5cGUucHVzaENvbXByZXNzZWRTaWduZWRUcmFuc2FjdGlvbiA9IGZ1bmN0aW9uIChfYSwgcmVhZE9ubHlUcngsIHJldHVybkZhaWx1cmVUcmFjZXMpIHtcclxuICAgICAgICB2YXIgc2lnbmF0dXJlcyA9IF9hLnNpZ25hdHVyZXMsIHNlcmlhbGl6ZWRUcmFuc2FjdGlvbiA9IF9hLnNlcmlhbGl6ZWRUcmFuc2FjdGlvbiwgc2VyaWFsaXplZENvbnRleHRGcmVlRGF0YSA9IF9hLnNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGE7XHJcbiAgICAgICAgaWYgKHJlYWRPbmx5VHJ4ID09PSB2b2lkIDApIHsgcmVhZE9ubHlUcnggPSBmYWxzZTsgfVxyXG4gICAgICAgIGlmIChyZXR1cm5GYWlsdXJlVHJhY2VzID09PSB2b2lkIDApIHsgcmV0dXJuRmFpbHVyZVRyYWNlcyA9IGZhbHNlOyB9XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgY29tcHJlc3NlZFNlcmlhbGl6ZWRUcmFuc2FjdGlvbiwgY29tcHJlc3NlZFNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGE7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcclxuICAgICAgICAgICAgICAgIGNvbXByZXNzZWRTZXJpYWxpemVkVHJhbnNhY3Rpb24gPSB0aGlzLmRlZmxhdGVTZXJpYWxpemVkQXJyYXkoc2VyaWFsaXplZFRyYW5zYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIGNvbXByZXNzZWRTZXJpYWxpemVkQ29udGV4dEZyZWVEYXRhID0gdGhpcy5kZWZsYXRlU2VyaWFsaXplZEFycmF5KHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGEgfHwgbmV3IFVpbnQ4QXJyYXkoMCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlYWRPbmx5VHJ4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMucnBjLnB1c2hfcm9fdHJhbnNhY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmF0dXJlczogc2lnbmF0dXJlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXByZXNzaW9uOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWFsaXplZFRyYW5zYWN0aW9uOiBjb21wcmVzc2VkU2VyaWFsaXplZFRyYW5zYWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWFsaXplZENvbnRleHRGcmVlRGF0YTogY29tcHJlc3NlZFNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgcmV0dXJuRmFpbHVyZVRyYWNlcyldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMucnBjLnB1c2hfdHJhbnNhY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduYXR1cmVzOiBzaWduYXR1cmVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wcmVzc2lvbjogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWFsaXplZFRyYW5zYWN0aW9uOiBjb21wcmVzc2VkU2VyaWFsaXplZFRyYW5zYWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJpYWxpemVkQ29udGV4dEZyZWVEYXRhOiBjb21wcmVzc2VkU2VyaWFsaXplZENvbnRleHRGcmVlRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgQXBpLnByb3RvdHlwZS5nZW5lcmF0ZVRhcG9zID0gZnVuY3Rpb24gKGluZm8sIHRyYW5zYWN0aW9uLCBibG9ja3NCZWhpbmQsIHVzZUxhc3RJcnJldmVyc2libGUsIGV4cGlyZVNlY29uZHMpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBibG9jaywgdGFwb3NCbG9ja051bWJlciwgcmVmQmxvY2ssIF9hO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISFpbmZvKSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5ycGMuZ2V0X2luZm8oKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvID0gX2Iuc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXVzZUxhc3RJcnJldmVyc2libGUpIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnRyeVJlZkJsb2NrRnJvbUdldEluZm8oaW5mbyldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2sgPSBfYi5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgc2VyLnRyYW5zYWN0aW9uSGVhZGVyKGJsb2NrLCBleHBpcmVTZWNvbmRzKSksIHRyYW5zYWN0aW9uKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXBvc0Jsb2NrTnVtYmVyID0gaW5mby5oZWFkX2Jsb2NrX251bSAtIGJsb2Nrc0JlaGluZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEodGFwb3NCbG9ja051bWJlciA8PSBpbmZvLmxhc3RfaXJyZXZlcnNpYmxlX2Jsb2NrX251bSkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDZdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnRyeUdldEJsb2NrSW5mbyh0YXBvc0Jsb2NrTnVtYmVyKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IF9iLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgOF07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnRyeUdldEJsb2NrSGVhZGVyU3RhdGUodGFwb3NCbG9ja051bWJlcildO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSBfYi5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gODtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZkJsb2NrID0gX2E7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgc2VyLnRyYW5zYWN0aW9uSGVhZGVyKHJlZkJsb2NrLCBleHBpcmVTZWNvbmRzKSksIHRyYW5zYWN0aW9uKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8vIGV2ZW50dWFsbHkgYnJlYWsgb3V0IGludG8gVHJhbnNhY3Rpb25WYWxpZGF0b3IgY2xhc3NcclxuICAgIEFwaS5wcm90b3R5cGUuaGFzUmVxdWlyZWRUYXBvc0ZpZWxkcyA9IGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgIHZhciBleHBpcmF0aW9uID0gX2EuZXhwaXJhdGlvbiwgcmVmX2Jsb2NrX251bSA9IF9hLnJlZl9ibG9ja19udW0sIHJlZl9ibG9ja19wcmVmaXggPSBfYS5yZWZfYmxvY2tfcHJlZml4O1xyXG4gICAgICAgIHJldHVybiAhIShleHBpcmF0aW9uICYmIHR5cGVvZiAocmVmX2Jsb2NrX251bSkgPT09ICdudW1iZXInICYmIHR5cGVvZiAocmVmX2Jsb2NrX3ByZWZpeCkgPT09ICdudW1iZXInKTtcclxuICAgIH07XHJcbiAgICBBcGkucHJvdG90eXBlLnRyeUdldEJsb2NrSGVhZGVyU3RhdGUgPSBmdW5jdGlvbiAodGFwb3NCbG9ja051bWJlcikge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGVycm9yXzE7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMCwgMiwgLCA0XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucnBjLmdldF9ibG9ja19oZWFkZXJfc3RhdGUodGFwb3NCbG9ja051bWJlcildO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcl8xID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnRyeUdldEJsb2NrSW5mbyh0YXBvc0Jsb2NrTnVtYmVyKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Euc2VudCgpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgQXBpLnByb3RvdHlwZS50cnlHZXRCbG9ja0luZm8gPSBmdW5jdGlvbiAoYmxvY2tOdW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBlcnJvcl8yO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzAsIDIsICwgNF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJwYy5nZXRfYmxvY2tfaW5mbyhibG9ja051bWJlcildO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcl8yID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJwYy5nZXRfYmxvY2soYmxvY2tOdW1iZXIpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IHJldHVybiBbMiAvKnJldHVybiovLCBfYS5zZW50KCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBBcGkucHJvdG90eXBlLnRyeVJlZkJsb2NrRnJvbUdldEluZm8gPSBmdW5jdGlvbiAoaW5mbykge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGJsb2NrO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShpbmZvLmhhc093blByb3BlcnR5KCdsYXN0X2lycmV2ZXJzaWJsZV9ibG9ja19pZCcpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvLmhhc093blByb3BlcnR5KCdsYXN0X2lycmV2ZXJzaWJsZV9ibG9ja19udW0nKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mby5oYXNPd25Qcm9wZXJ0eSgnbGFzdF9pcnJldmVyc2libGVfYmxvY2tfdGltZScpKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tfbnVtOiBpbmZvLmxhc3RfaXJyZXZlcnNpYmxlX2Jsb2NrX251bSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogaW5mby5sYXN0X2lycmV2ZXJzaWJsZV9ibG9ja19pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IGluZm8ubGFzdF9pcnJldmVyc2libGVfYmxvY2tfdGltZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy50cnlHZXRCbG9ja0luZm8oaW5mby5sYXN0X2lycmV2ZXJzaWJsZV9ibG9ja19udW0pXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrX251bTogYmxvY2suYmxvY2tfbnVtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBibG9jay5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IGJsb2NrLnRpbWVzdGFtcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBBcGkucHJvdG90eXBlLndpdGggPSBmdW5jdGlvbiAoYWNjb3VudE5hbWUpIHtcclxuICAgICAgICByZXR1cm4gbmV3IEFjdGlvbkJ1aWxkZXIodGhpcywgYWNjb3VudE5hbWUpO1xyXG4gICAgfTtcclxuICAgIEFwaS5wcm90b3R5cGUuYnVpbGRUcmFuc2FjdGlvbiA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgIHZhciB0eCA9IG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIodGhpcyk7XHJcbiAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjYih0eCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0eDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQXBpO1xyXG59KCkpOyAvLyBBcGlcclxuZXhwb3J0cy5BcGkgPSBBcGk7XHJcbnZhciBUcmFuc2FjdGlvbkJ1aWxkZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBUcmFuc2FjdGlvbkJ1aWxkZXIoYXBpKSB7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25zID0gW107XHJcbiAgICAgICAgdGhpcy5jb250ZXh0RnJlZUdyb3VwcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuYXBpID0gYXBpO1xyXG4gICAgfVxyXG4gICAgVHJhbnNhY3Rpb25CdWlsZGVyLnByb3RvdHlwZS53aXRoID0gZnVuY3Rpb24gKGFjY291bnROYW1lKSB7XHJcbiAgICAgICAgdmFyIGFjdGlvbkJ1aWxkZXIgPSBuZXcgQWN0aW9uQnVpbGRlcih0aGlzLmFwaSwgYWNjb3VudE5hbWUpO1xyXG4gICAgICAgIHRoaXMuYWN0aW9ucy5wdXNoKGFjdGlvbkJ1aWxkZXIpO1xyXG4gICAgICAgIHJldHVybiBhY3Rpb25CdWlsZGVyO1xyXG4gICAgfTtcclxuICAgIFRyYW5zYWN0aW9uQnVpbGRlci5wcm90b3R5cGUuYXNzb2NpYXRlQ29udGV4dEZyZWUgPSBmdW5jdGlvbiAoY29udGV4dEZyZWVHcm91cCkge1xyXG4gICAgICAgIHRoaXMuY29udGV4dEZyZWVHcm91cHMucHVzaChjb250ZXh0RnJlZUdyb3VwKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBUcmFuc2FjdGlvbkJ1aWxkZXIucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgY29udGV4dEZyZWVEYXRhU2V0LCBjb250ZXh0RnJlZUFjdGlvbnMsIGFjdGlvbnM7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRGcmVlRGF0YVNldCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0RnJlZUFjdGlvbnMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9ucyA9IHRoaXMuYWN0aW9ucy5tYXAoZnVuY3Rpb24gKGFjdGlvbkJ1aWxkZXIpIHsgcmV0dXJuIGFjdGlvbkJ1aWxkZXIuc2VyaWFsaXplZERhdGE7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBQcm9taXNlLmFsbCh0aGlzLmNvbnRleHRGcmVlR3JvdXBzLm1hcChmdW5jdGlvbiAoY29udGV4dEZyZWVDYWxsYmFjaykgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYSwgYWN0aW9uLCBjb250ZXh0RnJlZUFjdGlvbiwgY29udGV4dEZyZWVEYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSBjb250ZXh0RnJlZUNhbGxiYWNrKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNmZDogY29udGV4dEZyZWVEYXRhU2V0Lmxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNmYTogY29udGV4dEZyZWVBY3Rpb25zLmxlbmd0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSwgYWN0aW9uID0gX2EuYWN0aW9uLCBjb250ZXh0RnJlZUFjdGlvbiA9IF9hLmNvbnRleHRGcmVlQWN0aW9uLCBjb250ZXh0RnJlZURhdGEgPSBfYS5jb250ZXh0RnJlZURhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnMucHVzaChhY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0RnJlZUFjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dEZyZWVBY3Rpb25zLnB1c2goY29udGV4dEZyZWVBY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0RnJlZURhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRGcmVlRGF0YVNldC5wdXNoKGNvbnRleHRGcmVlRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7IH0pKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dEZyZWVHcm91cHMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuYXBpLnRyYW5zYWN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2ZyZWVfZGF0YTogY29udGV4dEZyZWVEYXRhU2V0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRfZnJlZV9hY3Rpb25zOiBjb250ZXh0RnJlZUFjdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uczogYWN0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgY29uZmlnKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Euc2VudCgpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFRyYW5zYWN0aW9uQnVpbGRlcjtcclxufSgpKTtcclxuZXhwb3J0cy5UcmFuc2FjdGlvbkJ1aWxkZXIgPSBUcmFuc2FjdGlvbkJ1aWxkZXI7XHJcbnZhciBBY3Rpb25CdWlsZGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQWN0aW9uQnVpbGRlcihhcGksIGFjY291bnROYW1lKSB7XHJcbiAgICAgICAgdGhpcy5hcGkgPSBhcGk7XHJcbiAgICAgICAgdGhpcy5hY2NvdW50TmFtZSA9IGFjY291bnROYW1lO1xyXG4gICAgfVxyXG4gICAgQWN0aW9uQnVpbGRlci5wcm90b3R5cGUuYXMgPSBmdW5jdGlvbiAoYWN0b3JOYW1lKSB7XHJcbiAgICAgICAgaWYgKGFjdG9yTmFtZSA9PT0gdm9pZCAwKSB7IGFjdG9yTmFtZSA9IFtdOyB9XHJcbiAgICAgICAgdmFyIGF1dGhvcml6YXRpb24gPSBbXTtcclxuICAgICAgICBpZiAoYWN0b3JOYW1lICYmIHR5cGVvZiBhY3Rvck5hbWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb24gPSBbeyBhY3RvcjogYWN0b3JOYW1lLCBwZXJtaXNzaW9uOiAnYWN0aXZlJyB9XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb24gPSBhY3Rvck5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgQWN0aW9uU2VyaWFsaXplcih0aGlzLCB0aGlzLmFwaSwgdGhpcy5hY2NvdW50TmFtZSwgYXV0aG9yaXphdGlvbik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEFjdGlvbkJ1aWxkZXI7XHJcbn0oKSk7XHJcbmV4cG9ydHMuQWN0aW9uQnVpbGRlciA9IEFjdGlvbkJ1aWxkZXI7XHJcbnZhciBBY3Rpb25TZXJpYWxpemVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQWN0aW9uU2VyaWFsaXplcihwYXJlbnQsIGFwaSwgYWNjb3VudE5hbWUsIGF1dGhvcml6YXRpb24pIHtcclxuICAgICAgICB2YXIgZV80LCBfYTtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBqc29uQWJpID0gYXBpLmNhY2hlZEFiaXMuZ2V0KGFjY291bnROYW1lKTtcclxuICAgICAgICBpZiAoIWpzb25BYmkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBQkkgbXVzdCBiZSBjYWNoZWQgYmVmb3JlIHVzaW5nIEFjdGlvbkJ1aWxkZXIsIHJ1biBhcGkuZ2V0QWJpKCknKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHR5cGVzID0gc2VyLmdldFR5cGVzRnJvbUFiaShzZXIuY3JlYXRlSW5pdGlhbFR5cGVzKCksIGpzb25BYmkuYWJpKTtcclxuICAgICAgICB2YXIgYWN0aW9ucyA9IG5ldyBNYXAoKTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKGpzb25BYmkuYWJpLmFjdGlvbnMpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2QgPSBfYy52YWx1ZSwgbmFtZV8yID0gX2QubmFtZSwgdHlwZSA9IF9kLnR5cGU7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb25zLnNldChuYW1lXzIsIHNlci5nZXRUeXBlKHR5cGVzLCB0eXBlKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVfNF8xKSB7IGVfNCA9IHsgZXJyb3I6IGVfNF8xIH07IH1cclxuICAgICAgICBmaW5hbGx5IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfNCkgdGhyb3cgZV80LmVycm9yOyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSwgbmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oX3RoaXMsIChfYSA9IHt9LFxyXG4gICAgICAgICAgICAgICAgX2FbbmFtZV0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgYXJncy5mb3JFYWNoKGZ1bmN0aW9uIChhcmcsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9IHR5cGUuZmllbGRzW2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtmaWVsZC5uYW1lXSA9IGFyZztcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VyaWFsaXplZERhdGEgPSBzZXIuc2VyaWFsaXplQWN0aW9uKHsgdHlwZXM6IHR5cGVzLCBhY3Rpb25zOiBhY3Rpb25zIH0sIGFjY291bnROYW1lLCBuYW1lLCBhdXRob3JpemF0aW9uLCBkYXRhLCBhcGkudGV4dEVuY29kZXIsIGFwaS50ZXh0RGVjb2Rlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50LnNlcmlhbGl6ZWREYXRhID0gc2VyaWFsaXplZERhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcmlhbGl6ZWREYXRhO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIF9hKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQWN0aW9uU2VyaWFsaXplcjtcclxufSgpKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufTtcclxudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufTtcclxudmFyIF9fdmFsdWVzID0gKHRoaXMgJiYgdGhpcy5fX3ZhbHVlcykgfHwgZnVuY3Rpb24obykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5zaWduYXR1cmVUb1N0cmluZyA9IGV4cG9ydHMuc3RyaW5nVG9TaWduYXR1cmUgPSBleHBvcnRzLnByaXZhdGVLZXlUb1N0cmluZyA9IGV4cG9ydHMucHJpdmF0ZUtleVRvTGVnYWN5U3RyaW5nID0gZXhwb3J0cy5zdHJpbmdUb1ByaXZhdGVLZXkgPSBleHBvcnRzLmNvbnZlcnRMZWdhY3lQdWJsaWNLZXlzID0gZXhwb3J0cy5jb252ZXJ0TGVnYWN5UHVibGljS2V5ID0gZXhwb3J0cy5wdWJsaWNLZXlUb1N0cmluZyA9IGV4cG9ydHMucHVibGljS2V5VG9MZWdhY3lTdHJpbmcgPSBleHBvcnRzLnN0cmluZ1RvUHVibGljS2V5ID0gZXhwb3J0cy5zaWduYXR1cmVEYXRhU2l6ZSA9IGV4cG9ydHMucHJpdmF0ZUtleURhdGFTaXplID0gZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZSA9IGV4cG9ydHMuS2V5VHlwZSA9IGV4cG9ydHMuYmFzZTY0VG9CaW5hcnkgPSBleHBvcnRzLmJpbmFyeVRvQmFzZTU4ID0gZXhwb3J0cy5iYXNlNThUb0JpbmFyeSA9IGV4cG9ydHMuc2lnbmVkQmluYXJ5VG9EZWNpbWFsID0gZXhwb3J0cy5iaW5hcnlUb0RlY2ltYWwgPSBleHBvcnRzLnNpZ25lZERlY2ltYWxUb0JpbmFyeSA9IGV4cG9ydHMuZGVjaW1hbFRvQmluYXJ5ID0gZXhwb3J0cy5uZWdhdGUgPSBleHBvcnRzLmlzTmVnYXRpdmUgPSB2b2lkIDA7XHJcbi8qKlxyXG4gKiBAbW9kdWxlIE51bWVyaWNcclxuICovXHJcbnZhciBoYXNoX2pzXzEgPSByZXF1aXJlKFwiaGFzaC5qc1wiKTtcclxuLy8gY29weXJpZ2h0IGRlZmluZWQgaW4gZW9zanMvTElDRU5TRS50eHRcclxudmFyIHJpcGVtZDE2MCA9IHJlcXVpcmUoJy4vcmlwZW1kJykuUklQRU1EMTYwLmhhc2g7XHJcbnZhciBiYXNlNThDaGFycyA9ICcxMjM0NTY3ODlBQkNERUZHSEpLTE1OUFFSU1RVVldYWVphYmNkZWZnaGlqa21ub3BxcnN0dXZ3eHl6JztcclxudmFyIGJhc2U2NENoYXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nO1xyXG52YXIgY3JlYXRlX2Jhc2U1OF9tYXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgYmFzZTU4TSA9IEFycmF5KDI1NikuZmlsbCgtMSk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJhc2U1OENoYXJzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgYmFzZTU4TVtiYXNlNThDaGFycy5jaGFyQ29kZUF0KGkpXSA9IGk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYmFzZTU4TTtcclxufTtcclxudmFyIGJhc2U1OE1hcCA9IGNyZWF0ZV9iYXNlNThfbWFwKCk7XHJcbnZhciBjcmVhdGVfYmFzZTY0X21hcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBiYXNlNjRNID0gQXJyYXkoMjU2KS5maWxsKC0xKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmFzZTY0Q2hhcnMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBiYXNlNjRNW2Jhc2U2NENoYXJzLmNoYXJDb2RlQXQoaSldID0gaTtcclxuICAgIH1cclxuICAgIGJhc2U2NE1bJz0nLmNoYXJDb2RlQXQoMCldID0gMDtcclxuICAgIHJldHVybiBiYXNlNjRNO1xyXG59O1xyXG52YXIgYmFzZTY0TWFwID0gY3JlYXRlX2Jhc2U2NF9tYXAoKTtcclxuLyoqIElzIGBiaWdudW1gIGEgbmVnYXRpdmUgbnVtYmVyPyAqL1xyXG52YXIgaXNOZWdhdGl2ZSA9IGZ1bmN0aW9uIChiaWdudW0pIHtcclxuICAgIHJldHVybiAoYmlnbnVtW2JpZ251bS5sZW5ndGggLSAxXSAmIDB4ODApICE9PSAwO1xyXG59O1xyXG5leHBvcnRzLmlzTmVnYXRpdmUgPSBpc05lZ2F0aXZlO1xyXG4vKiogTmVnYXRlIGBiaWdudW1gICovXHJcbnZhciBuZWdhdGUgPSBmdW5jdGlvbiAoYmlnbnVtKSB7XHJcbiAgICB2YXIgY2FycnkgPSAxO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiaWdudW0ubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICB2YXIgeCA9ICh+YmlnbnVtW2ldICYgMHhmZikgKyBjYXJyeTtcclxuICAgICAgICBiaWdudW1baV0gPSB4O1xyXG4gICAgICAgIGNhcnJ5ID0geCA+PiA4O1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLm5lZ2F0ZSA9IG5lZ2F0ZTtcclxuLyoqXHJcbiAqIENvbnZlcnQgYW4gdW5zaWduZWQgZGVjaW1hbCBudW1iZXIgaW4gYHNgIHRvIGEgYmlnbnVtXHJcbiAqXHJcbiAqIEBwYXJhbSBzaXplIGJpZ251bSBzaXplIChieXRlcylcclxuICovXHJcbnZhciBkZWNpbWFsVG9CaW5hcnkgPSBmdW5jdGlvbiAoc2l6ZSwgcykge1xyXG4gICAgdmFyIHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KHNpemUpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgdmFyIHNyY0RpZ2l0ID0gcy5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICAgIGlmIChzcmNEaWdpdCA8ICcwJy5jaGFyQ29kZUF0KDApIHx8IHNyY0RpZ2l0ID4gJzknLmNoYXJDb2RlQXQoMCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIG51bWJlcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY2FycnkgPSBzcmNEaWdpdCAtICcwJy5jaGFyQ29kZUF0KDApO1xyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2l6ZTsgKytqKSB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gcmVzdWx0W2pdICogMTAgKyBjYXJyeTtcclxuICAgICAgICAgICAgcmVzdWx0W2pdID0geDtcclxuICAgICAgICAgICAgY2FycnkgPSB4ID4+IDg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjYXJyeSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ251bWJlciBpcyBvdXQgb2YgcmFuZ2UnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5leHBvcnRzLmRlY2ltYWxUb0JpbmFyeSA9IGRlY2ltYWxUb0JpbmFyeTtcclxuLyoqXHJcbiAqIENvbnZlcnQgYSBzaWduZWQgZGVjaW1hbCBudW1iZXIgaW4gYHNgIHRvIGEgYmlnbnVtXHJcbiAqXHJcbiAqIEBwYXJhbSBzaXplIGJpZ251bSBzaXplIChieXRlcylcclxuICovXHJcbnZhciBzaWduZWREZWNpbWFsVG9CaW5hcnkgPSBmdW5jdGlvbiAoc2l6ZSwgcykge1xyXG4gICAgdmFyIG5lZ2F0aXZlID0gc1swXSA9PT0gJy0nO1xyXG4gICAgaWYgKG5lZ2F0aXZlKSB7XHJcbiAgICAgICAgcyA9IHMuc3Vic3RyKDEpO1xyXG4gICAgfVxyXG4gICAgdmFyIHJlc3VsdCA9ICgwLCBleHBvcnRzLmRlY2ltYWxUb0JpbmFyeSkoc2l6ZSwgcyk7XHJcbiAgICBpZiAobmVnYXRpdmUpIHtcclxuICAgICAgICAoMCwgZXhwb3J0cy5uZWdhdGUpKHJlc3VsdCk7XHJcbiAgICAgICAgaWYgKCEoMCwgZXhwb3J0cy5pc05lZ2F0aXZlKShyZXN1bHQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbnVtYmVyIGlzIG91dCBvZiByYW5nZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCgwLCBleHBvcnRzLmlzTmVnYXRpdmUpKHJlc3VsdCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ251bWJlciBpcyBvdXQgb2YgcmFuZ2UnKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcbmV4cG9ydHMuc2lnbmVkRGVjaW1hbFRvQmluYXJ5ID0gc2lnbmVkRGVjaW1hbFRvQmluYXJ5O1xyXG4vKipcclxuICogQ29udmVydCBgYmlnbnVtYCB0byBhbiB1bnNpZ25lZCBkZWNpbWFsIG51bWJlclxyXG4gKlxyXG4gKiBAcGFyYW0gbWluRGlnaXRzIDAtcGFkIHJlc3VsdCB0byB0aGlzIG1hbnkgZGlnaXRzXHJcbiAqL1xyXG52YXIgYmluYXJ5VG9EZWNpbWFsID0gZnVuY3Rpb24gKGJpZ251bSwgbWluRGlnaXRzKSB7XHJcbiAgICBpZiAobWluRGlnaXRzID09PSB2b2lkIDApIHsgbWluRGlnaXRzID0gMTsgfVxyXG4gICAgdmFyIHJlc3VsdCA9IEFycmF5KG1pbkRpZ2l0cykuZmlsbCgnMCcuY2hhckNvZGVBdCgwKSk7XHJcbiAgICBmb3IgKHZhciBpID0gYmlnbnVtLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XHJcbiAgICAgICAgdmFyIGNhcnJ5ID0gYmlnbnVtW2ldO1xyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmVzdWx0Lmxlbmd0aDsgKytqKSB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gKChyZXN1bHRbal0gLSAnMCcuY2hhckNvZGVBdCgwKSkgPDwgOCkgKyBjYXJyeTtcclxuICAgICAgICAgICAgcmVzdWx0W2pdID0gJzAnLmNoYXJDb2RlQXQoMCkgKyB4ICUgMTA7XHJcbiAgICAgICAgICAgIGNhcnJ5ID0gKHggLyAxMCkgfCAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aGlsZSAoY2FycnkpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goJzAnLmNoYXJDb2RlQXQoMCkgKyBjYXJyeSAlIDEwKTtcclxuICAgICAgICAgICAgY2FycnkgPSAoY2FycnkgLyAxMCkgfCAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlc3VsdC5yZXZlcnNlKCk7XHJcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIF9fc3ByZWFkQXJyYXkoW10sIF9fcmVhZChyZXN1bHQpLCBmYWxzZSkpO1xyXG59O1xyXG5leHBvcnRzLmJpbmFyeVRvRGVjaW1hbCA9IGJpbmFyeVRvRGVjaW1hbDtcclxuLyoqXHJcbiAqIENvbnZlcnQgYGJpZ251bWAgdG8gYSBzaWduZWQgZGVjaW1hbCBudW1iZXJcclxuICpcclxuICogQHBhcmFtIG1pbkRpZ2l0cyAwLXBhZCByZXN1bHQgdG8gdGhpcyBtYW55IGRpZ2l0c1xyXG4gKi9cclxudmFyIHNpZ25lZEJpbmFyeVRvRGVjaW1hbCA9IGZ1bmN0aW9uIChiaWdudW0sIG1pbkRpZ2l0cykge1xyXG4gICAgaWYgKG1pbkRpZ2l0cyA9PT0gdm9pZCAwKSB7IG1pbkRpZ2l0cyA9IDE7IH1cclxuICAgIGlmICgoMCwgZXhwb3J0cy5pc05lZ2F0aXZlKShiaWdudW0pKSB7XHJcbiAgICAgICAgdmFyIHggPSBiaWdudW0uc2xpY2UoKTtcclxuICAgICAgICAoMCwgZXhwb3J0cy5uZWdhdGUpKHgpO1xyXG4gICAgICAgIHJldHVybiAnLScgKyAoMCwgZXhwb3J0cy5iaW5hcnlUb0RlY2ltYWwpKHgsIG1pbkRpZ2l0cyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKDAsIGV4cG9ydHMuYmluYXJ5VG9EZWNpbWFsKShiaWdudW0sIG1pbkRpZ2l0cyk7XHJcbn07XHJcbmV4cG9ydHMuc2lnbmVkQmluYXJ5VG9EZWNpbWFsID0gc2lnbmVkQmluYXJ5VG9EZWNpbWFsO1xyXG52YXIgYmFzZTU4VG9CaW5hcnlWYXJTaXplID0gZnVuY3Rpb24gKHMpIHtcclxuICAgIHZhciBlXzEsIF9hO1xyXG4gICAgdmFyIHJlc3VsdCA9IFtdO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgdmFyIGNhcnJ5ID0gYmFzZTU4TWFwW3MuY2hhckNvZGVBdChpKV07XHJcbiAgICAgICAgaWYgKGNhcnJ5IDwgMCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgYmFzZS01OCB2YWx1ZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJlc3VsdC5sZW5ndGg7ICsraikge1xyXG4gICAgICAgICAgICB2YXIgeCA9IHJlc3VsdFtqXSAqIDU4ICsgY2Fycnk7XHJcbiAgICAgICAgICAgIHJlc3VsdFtqXSA9IHggJiAweGZmO1xyXG4gICAgICAgICAgICBjYXJyeSA9IHggPj4gODtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNhcnJ5KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNhcnJ5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGZvciAodmFyIHNfMSA9IF9fdmFsdWVzKHMpLCBzXzFfMSA9IHNfMS5uZXh0KCk7ICFzXzFfMS5kb25lOyBzXzFfMSA9IHNfMS5uZXh0KCkpIHtcclxuICAgICAgICAgICAgdmFyIGNoID0gc18xXzEudmFsdWU7XHJcbiAgICAgICAgICAgIGlmIChjaCA9PT0gJzEnKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCgwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChzXzFfMSAmJiAhc18xXzEuZG9uZSAmJiAoX2EgPSBzXzEucmV0dXJuKSkgX2EuY2FsbChzXzEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXN1bHQucmV2ZXJzZSgpO1xyXG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHJlc3VsdCk7XHJcbn07XHJcbi8qKlxyXG4gKiBDb252ZXJ0IGFuIHVuc2lnbmVkIGJhc2UtNTggbnVtYmVyIGluIGBzYCB0byBhIGJpZ251bVxyXG4gKlxyXG4gKiBAcGFyYW0gc2l6ZSBiaWdudW0gc2l6ZSAoYnl0ZXMpXHJcbiAqL1xyXG52YXIgYmFzZTU4VG9CaW5hcnkgPSBmdW5jdGlvbiAoc2l6ZSwgcykge1xyXG4gICAgaWYgKCFzaXplKSB7XHJcbiAgICAgICAgcmV0dXJuIGJhc2U1OFRvQmluYXJ5VmFyU2l6ZShzKTtcclxuICAgIH1cclxuICAgIHZhciByZXN1bHQgPSBuZXcgVWludDhBcnJheShzaXplKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIHZhciBjYXJyeSA9IGJhc2U1OE1hcFtzLmNoYXJDb2RlQXQoaSldO1xyXG4gICAgICAgIGlmIChjYXJyeSA8IDApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGJhc2UtNTggdmFsdWUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzaXplOyArK2opIHtcclxuICAgICAgICAgICAgdmFyIHggPSByZXN1bHRbal0gKiA1OCArIGNhcnJ5O1xyXG4gICAgICAgICAgICByZXN1bHRbal0gPSB4O1xyXG4gICAgICAgICAgICBjYXJyeSA9IHggPj4gODtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNhcnJ5KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYmFzZS01OCB2YWx1ZSBpcyBvdXQgb2YgcmFuZ2UnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXN1bHQucmV2ZXJzZSgpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuZXhwb3J0cy5iYXNlNThUb0JpbmFyeSA9IGJhc2U1OFRvQmluYXJ5O1xyXG4vKipcclxuICogQ29udmVydCBgYmlnbnVtYCB0byBhIGJhc2UtNTggbnVtYmVyXHJcbiAqXHJcbiAqIEBwYXJhbSBtaW5EaWdpdHMgMC1wYWQgcmVzdWx0IHRvIHRoaXMgbWFueSBkaWdpdHNcclxuICovXHJcbnZhciBiaW5hcnlUb0Jhc2U1OCA9IGZ1bmN0aW9uIChiaWdudW0sIG1pbkRpZ2l0cykge1xyXG4gICAgdmFyIGVfMiwgX2EsIGVfMywgX2I7XHJcbiAgICBpZiAobWluRGlnaXRzID09PSB2b2lkIDApIHsgbWluRGlnaXRzID0gMTsgfVxyXG4gICAgdmFyIHJlc3VsdCA9IFtdO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBmb3IgKHZhciBiaWdudW1fMSA9IF9fdmFsdWVzKGJpZ251bSksIGJpZ251bV8xXzEgPSBiaWdudW1fMS5uZXh0KCk7ICFiaWdudW1fMV8xLmRvbmU7IGJpZ251bV8xXzEgPSBiaWdudW1fMS5uZXh0KCkpIHtcclxuICAgICAgICAgICAgdmFyIGJ5dGUgPSBiaWdudW1fMV8xLnZhbHVlO1xyXG4gICAgICAgICAgICB2YXIgY2FycnkgPSBieXRlO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJlc3VsdC5sZW5ndGg7ICsraikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHggPSAoYmFzZTU4TWFwW3Jlc3VsdFtqXV0gPDwgOCkgKyBjYXJyeTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdFtqXSA9IGJhc2U1OENoYXJzLmNoYXJDb2RlQXQoeCAlIDU4KTtcclxuICAgICAgICAgICAgICAgIGNhcnJ5ID0gKHggLyA1OCkgfCAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdoaWxlIChjYXJyeSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goYmFzZTU4Q2hhcnMuY2hhckNvZGVBdChjYXJyeSAlIDU4KSk7XHJcbiAgICAgICAgICAgICAgICBjYXJyeSA9IChjYXJyeSAvIDU4KSB8IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZV8yXzEpIHsgZV8yID0geyBlcnJvcjogZV8yXzEgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGJpZ251bV8xXzEgJiYgIWJpZ251bV8xXzEuZG9uZSAmJiAoX2EgPSBiaWdudW1fMS5yZXR1cm4pKSBfYS5jYWxsKGJpZ251bV8xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlXzIpIHRocm93IGVfMi5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgICBmb3IgKHZhciBiaWdudW1fMiA9IF9fdmFsdWVzKGJpZ251bSksIGJpZ251bV8yXzEgPSBiaWdudW1fMi5uZXh0KCk7ICFiaWdudW1fMl8xLmRvbmU7IGJpZ251bV8yXzEgPSBiaWdudW1fMi5uZXh0KCkpIHtcclxuICAgICAgICAgICAgdmFyIGJ5dGUgPSBiaWdudW1fMl8xLnZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoYnl0ZSkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCgnMScuY2hhckNvZGVBdCgwKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZV8zXzEpIHsgZV8zID0geyBlcnJvcjogZV8zXzEgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGJpZ251bV8yXzEgJiYgIWJpZ251bV8yXzEuZG9uZSAmJiAoX2IgPSBiaWdudW1fMi5yZXR1cm4pKSBfYi5jYWxsKGJpZ251bV8yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlXzMpIHRocm93IGVfMy5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmVzdWx0LnJldmVyc2UoKTtcclxuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgX19zcHJlYWRBcnJheShbXSwgX19yZWFkKHJlc3VsdCksIGZhbHNlKSk7XHJcbn07XHJcbmV4cG9ydHMuYmluYXJ5VG9CYXNlNTggPSBiaW5hcnlUb0Jhc2U1ODtcclxuLyoqIENvbnZlcnQgYW4gdW5zaWduZWQgYmFzZS02NCBudW1iZXIgaW4gYHNgIHRvIGEgYmlnbnVtICovXHJcbnZhciBiYXNlNjRUb0JpbmFyeSA9IGZ1bmN0aW9uIChzKSB7XHJcbiAgICB2YXIgbGVuID0gcy5sZW5ndGg7XHJcbiAgICBpZiAoKGxlbiAmIDMpID09PSAxICYmIHNbbGVuIC0gMV0gPT09ICc9Jykge1xyXG4gICAgICAgIGxlbiAtPSAxO1xyXG4gICAgfSAvLyBmYyBhcHBlbmRzIGFuIGV4dHJhICc9J1xyXG4gICAgaWYgKChsZW4gJiAzKSAhPT0gMCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYmFzZS02NCB2YWx1ZSBpcyBub3QgcGFkZGVkIGNvcnJlY3RseScpO1xyXG4gICAgfVxyXG4gICAgdmFyIGdyb3VwcyA9IGxlbiA+PiAyO1xyXG4gICAgdmFyIGJ5dGVzID0gZ3JvdXBzICogMztcclxuICAgIGlmIChsZW4gPiAwICYmIHNbbGVuIC0gMV0gPT09ICc9Jykge1xyXG4gICAgICAgIGlmIChzW2xlbiAtIDJdID09PSAnPScpIHtcclxuICAgICAgICAgICAgYnl0ZXMgLT0gMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGJ5dGVzIC09IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFyIHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KGJ5dGVzKTtcclxuICAgIGZvciAodmFyIGdyb3VwID0gMDsgZ3JvdXAgPCBncm91cHM7ICsrZ3JvdXApIHtcclxuICAgICAgICB2YXIgZGlnaXQwID0gYmFzZTY0TWFwW3MuY2hhckNvZGVBdChncm91cCAqIDQgKyAwKV07XHJcbiAgICAgICAgdmFyIGRpZ2l0MSA9IGJhc2U2NE1hcFtzLmNoYXJDb2RlQXQoZ3JvdXAgKiA0ICsgMSldO1xyXG4gICAgICAgIHZhciBkaWdpdDIgPSBiYXNlNjRNYXBbcy5jaGFyQ29kZUF0KGdyb3VwICogNCArIDIpXTtcclxuICAgICAgICB2YXIgZGlnaXQzID0gYmFzZTY0TWFwW3MuY2hhckNvZGVBdChncm91cCAqIDQgKyAzKV07XHJcbiAgICAgICAgcmVzdWx0W2dyb3VwICogMyArIDBdID0gKGRpZ2l0MCA8PCAyKSB8IChkaWdpdDEgPj4gNCk7XHJcbiAgICAgICAgaWYgKGdyb3VwICogMyArIDEgPCBieXRlcykge1xyXG4gICAgICAgICAgICByZXN1bHRbZ3JvdXAgKiAzICsgMV0gPSAoKGRpZ2l0MSAmIDE1KSA8PCA0KSB8IChkaWdpdDIgPj4gMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChncm91cCAqIDMgKyAyIDwgYnl0ZXMpIHtcclxuICAgICAgICAgICAgcmVzdWx0W2dyb3VwICogMyArIDJdID0gKChkaWdpdDIgJiAzKSA8PCA2KSB8IGRpZ2l0MztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5leHBvcnRzLmJhc2U2NFRvQmluYXJ5ID0gYmFzZTY0VG9CaW5hcnk7XHJcbi8qKiBLZXkgdHlwZXMgdGhpcyBsaWJyYXJ5IHN1cHBvcnRzICovXHJcbnZhciBLZXlUeXBlO1xyXG4oZnVuY3Rpb24gKEtleVR5cGUpIHtcclxuICAgIEtleVR5cGVbS2V5VHlwZVtcImsxXCJdID0gMF0gPSBcImsxXCI7XHJcbiAgICBLZXlUeXBlW0tleVR5cGVbXCJyMVwiXSA9IDFdID0gXCJyMVwiO1xyXG4gICAgS2V5VHlwZVtLZXlUeXBlW1wid2FcIl0gPSAyXSA9IFwid2FcIjtcclxufSkoS2V5VHlwZSA9IGV4cG9ydHMuS2V5VHlwZSB8fCAoZXhwb3J0cy5LZXlUeXBlID0ge30pKTtcclxuLyoqIFB1YmxpYyBrZXkgZGF0YSBzaXplLCBleGNsdWRpbmcgdHlwZSBmaWVsZCAqL1xyXG5leHBvcnRzLnB1YmxpY0tleURhdGFTaXplID0gMzM7XHJcbi8qKiBQcml2YXRlIGtleSBkYXRhIHNpemUsIGV4Y2x1ZGluZyB0eXBlIGZpZWxkICovXHJcbmV4cG9ydHMucHJpdmF0ZUtleURhdGFTaXplID0gMzI7XHJcbi8qKiBTaWduYXR1cmUgZGF0YSBzaXplLCBleGNsdWRpbmcgdHlwZSBmaWVsZCAqL1xyXG5leHBvcnRzLnNpZ25hdHVyZURhdGFTaXplID0gNjU7XHJcbnZhciBkaWdlc3RTdWZmaXhSaXBlbWQxNjAgPSBmdW5jdGlvbiAoZGF0YSwgc3VmZml4KSB7XHJcbiAgICB2YXIgZCA9IG5ldyBVaW50OEFycmF5KGRhdGEubGVuZ3RoICsgc3VmZml4Lmxlbmd0aCk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBkW2ldID0gZGF0YVtpXTtcclxuICAgIH1cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3VmZml4Lmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgZFtkYXRhLmxlbmd0aCArIGldID0gc3VmZml4LmNoYXJDb2RlQXQoaSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmlwZW1kMTYwKGQpO1xyXG59O1xyXG52YXIgc3RyaW5nVG9LZXkgPSBmdW5jdGlvbiAocywgdHlwZSwgc2l6ZSwgc3VmZml4KSB7XHJcbiAgICB2YXIgd2hvbGUgPSAoMCwgZXhwb3J0cy5iYXNlNThUb0JpbmFyeSkoc2l6ZSA/IHNpemUgKyA0IDogMCwgcyk7XHJcbiAgICB2YXIgcmVzdWx0ID0geyB0eXBlOiB0eXBlLCBkYXRhOiBuZXcgVWludDhBcnJheSh3aG9sZS5idWZmZXIsIDAsIHdob2xlLmxlbmd0aCAtIDQpIH07XHJcbiAgICB2YXIgZGlnZXN0ID0gbmV3IFVpbnQ4QXJyYXkoZGlnZXN0U3VmZml4UmlwZW1kMTYwKHJlc3VsdC5kYXRhLCBzdWZmaXgpKTtcclxuICAgIGlmIChkaWdlc3RbMF0gIT09IHdob2xlW3dob2xlLmxlbmd0aCAtIDRdIHx8IGRpZ2VzdFsxXSAhPT0gd2hvbGVbd2hvbGUubGVuZ3RoIC0gM11cclxuICAgICAgICB8fCBkaWdlc3RbMl0gIT09IHdob2xlW3dob2xlLmxlbmd0aCAtIDJdIHx8IGRpZ2VzdFszXSAhPT0gd2hvbGVbd2hvbGUubGVuZ3RoIC0gMV0pIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NoZWNrc3VtIGRvZXNuXFwndCBtYXRjaCcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxudmFyIGtleVRvU3RyaW5nID0gZnVuY3Rpb24gKGtleSwgc3VmZml4LCBwcmVmaXgpIHtcclxuICAgIHZhciBkaWdlc3QgPSBuZXcgVWludDhBcnJheShkaWdlc3RTdWZmaXhSaXBlbWQxNjAoa2V5LmRhdGEsIHN1ZmZpeCkpO1xyXG4gICAgdmFyIHdob2xlID0gbmV3IFVpbnQ4QXJyYXkoa2V5LmRhdGEubGVuZ3RoICsgNCk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleS5kYXRhLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgd2hvbGVbaV0gPSBrZXkuZGF0YVtpXTtcclxuICAgIH1cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgKytpKSB7XHJcbiAgICAgICAgd2hvbGVbaSArIGtleS5kYXRhLmxlbmd0aF0gPSBkaWdlc3RbaV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJlZml4ICsgKDAsIGV4cG9ydHMuYmluYXJ5VG9CYXNlNTgpKHdob2xlKTtcclxufTtcclxuLyoqIENvbnZlcnQga2V5IGluIGBzYCB0byBiaW5hcnkgZm9ybSAqL1xyXG52YXIgc3RyaW5nVG9QdWJsaWNLZXkgPSBmdW5jdGlvbiAocykge1xyXG4gICAgaWYgKHR5cGVvZiBzICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZXhwZWN0ZWQgc3RyaW5nIGNvbnRhaW5pbmcgcHVibGljIGtleScpO1xyXG4gICAgfVxyXG4gICAgaWYgKHMuc3Vic3RyKDAsIDMpID09PSAnRU9TJykge1xyXG4gICAgICAgIHZhciB3aG9sZSA9ICgwLCBleHBvcnRzLmJhc2U1OFRvQmluYXJ5KShleHBvcnRzLnB1YmxpY0tleURhdGFTaXplICsgNCwgcy5zdWJzdHIoMykpO1xyXG4gICAgICAgIHZhciBrZXkgPSB7IHR5cGU6IEtleVR5cGUuazEsIGRhdGE6IG5ldyBVaW50OEFycmF5KGV4cG9ydHMucHVibGljS2V5RGF0YVNpemUpIH07XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBvcnRzLnB1YmxpY0tleURhdGFTaXplOyArK2kpIHtcclxuICAgICAgICAgICAga2V5LmRhdGFbaV0gPSB3aG9sZVtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGRpZ2VzdCA9IG5ldyBVaW50OEFycmF5KHJpcGVtZDE2MChrZXkuZGF0YSkpO1xyXG4gICAgICAgIGlmIChkaWdlc3RbMF0gIT09IHdob2xlW2V4cG9ydHMucHVibGljS2V5RGF0YVNpemVdIHx8IGRpZ2VzdFsxXSAhPT0gd2hvbGVbMzRdXHJcbiAgICAgICAgICAgIHx8IGRpZ2VzdFsyXSAhPT0gd2hvbGVbMzVdIHx8IGRpZ2VzdFszXSAhPT0gd2hvbGVbMzZdKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY2hlY2tzdW0gZG9lc25cXCd0IG1hdGNoJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBrZXk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChzLnN1YnN0cigwLCA3KSA9PT0gJ1BVQl9LMV8nKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZ1RvS2V5KHMuc3Vic3RyKDcpLCBLZXlUeXBlLmsxLCBleHBvcnRzLnB1YmxpY0tleURhdGFTaXplLCAnSzEnKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHMuc3Vic3RyKDAsIDcpID09PSAnUFVCX1IxXycpIHtcclxuICAgICAgICByZXR1cm4gc3RyaW5nVG9LZXkocy5zdWJzdHIoNyksIEtleVR5cGUucjEsIGV4cG9ydHMucHVibGljS2V5RGF0YVNpemUsICdSMScpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocy5zdWJzdHIoMCwgNykgPT09ICdQVUJfV0FfJykge1xyXG4gICAgICAgIHJldHVybiBzdHJpbmdUb0tleShzLnN1YnN0cig3KSwgS2V5VHlwZS53YSwgMCwgJ1dBJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VucmVjb2duaXplZCBwdWJsaWMga2V5IGZvcm1hdCcpO1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLnN0cmluZ1RvUHVibGljS2V5ID0gc3RyaW5nVG9QdWJsaWNLZXk7XHJcbi8qKiBDb252ZXJ0IHB1YmxpYyBga2V5YCB0byBsZWdhY3kgc3RyaW5nIChiYXNlLTU4KSBmb3JtICovXHJcbnZhciBwdWJsaWNLZXlUb0xlZ2FjeVN0cmluZyA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgIGlmIChrZXkudHlwZSA9PT0gS2V5VHlwZS5rMSAmJiBrZXkuZGF0YS5sZW5ndGggPT09IGV4cG9ydHMucHVibGljS2V5RGF0YVNpemUpIHtcclxuICAgICAgICByZXR1cm4ga2V5VG9TdHJpbmcoa2V5LCAnJywgJ0VPUycpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoa2V5LnR5cGUgPT09IEtleVR5cGUucjEgfHwga2V5LnR5cGUgPT09IEtleVR5cGUud2EpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0tleSBmb3JtYXQgbm90IHN1cHBvcnRlZCBpbiBsZWdhY3kgY29udmVyc2lvbicpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnJlY29nbml6ZWQgcHVibGljIGtleSBmb3JtYXQnKTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0cy5wdWJsaWNLZXlUb0xlZ2FjeVN0cmluZyA9IHB1YmxpY0tleVRvTGVnYWN5U3RyaW5nO1xyXG4vKiogQ29udmVydCBga2V5YCB0byBzdHJpbmcgKGJhc2UtNTgpIGZvcm0gKi9cclxudmFyIHB1YmxpY0tleVRvU3RyaW5nID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgaWYgKGtleS50eXBlID09PSBLZXlUeXBlLmsxICYmIGtleS5kYXRhLmxlbmd0aCA9PT0gZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZSkge1xyXG4gICAgICAgIHJldHVybiBrZXlUb1N0cmluZyhrZXksICdLMScsICdQVUJfSzFfJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChrZXkudHlwZSA9PT0gS2V5VHlwZS5yMSAmJiBrZXkuZGF0YS5sZW5ndGggPT09IGV4cG9ydHMucHVibGljS2V5RGF0YVNpemUpIHtcclxuICAgICAgICByZXR1cm4ga2V5VG9TdHJpbmcoa2V5LCAnUjEnLCAnUFVCX1IxXycpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoa2V5LnR5cGUgPT09IEtleVR5cGUud2EpIHtcclxuICAgICAgICByZXR1cm4ga2V5VG9TdHJpbmcoa2V5LCAnV0EnLCAnUFVCX1dBXycpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnJlY29nbml6ZWQgcHVibGljIGtleSBmb3JtYXQnKTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0cy5wdWJsaWNLZXlUb1N0cmluZyA9IHB1YmxpY0tleVRvU3RyaW5nO1xyXG4vKiogSWYgYSBrZXkgaXMgaW4gdGhlIGxlZ2FjeSBmb3JtYXQgKGBFT1NgIHByZWZpeCksIHRoZW4gY29udmVydCBpdCB0byB0aGUgbmV3IGZvcm1hdCAoYFBVQl9LMV9gKS5cclxuICogTGVhdmVzIG90aGVyIGZvcm1hdHMgdW50b3VjaGVkXHJcbiAqL1xyXG52YXIgY29udmVydExlZ2FjeVB1YmxpY0tleSA9IGZ1bmN0aW9uIChzKSB7XHJcbiAgICBpZiAocy5zdWJzdHIoMCwgMykgPT09ICdFT1MnKSB7XHJcbiAgICAgICAgcmV0dXJuICgwLCBleHBvcnRzLnB1YmxpY0tleVRvU3RyaW5nKSgoMCwgZXhwb3J0cy5zdHJpbmdUb1B1YmxpY0tleSkocykpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHM7XHJcbn07XHJcbmV4cG9ydHMuY29udmVydExlZ2FjeVB1YmxpY0tleSA9IGNvbnZlcnRMZWdhY3lQdWJsaWNLZXk7XHJcbi8qKiBJZiBhIGtleSBpcyBpbiB0aGUgbGVnYWN5IGZvcm1hdCAoYEVPU2AgcHJlZml4KSwgdGhlbiBjb252ZXJ0IGl0IHRvIHRoZSBuZXcgZm9ybWF0IChgUFVCX0sxX2ApLlxyXG4gKiBMZWF2ZXMgb3RoZXIgZm9ybWF0cyB1bnRvdWNoZWRcclxuICovXHJcbnZhciBjb252ZXJ0TGVnYWN5UHVibGljS2V5cyA9IGZ1bmN0aW9uIChrZXlzKSB7XHJcbiAgICByZXR1cm4ga2V5cy5tYXAoZXhwb3J0cy5jb252ZXJ0TGVnYWN5UHVibGljS2V5KTtcclxufTtcclxuZXhwb3J0cy5jb252ZXJ0TGVnYWN5UHVibGljS2V5cyA9IGNvbnZlcnRMZWdhY3lQdWJsaWNLZXlzO1xyXG4vKiogQ29udmVydCBrZXkgaW4gYHNgIHRvIGJpbmFyeSBmb3JtICovXHJcbnZhciBzdHJpbmdUb1ByaXZhdGVLZXkgPSBmdW5jdGlvbiAocykge1xyXG4gICAgaWYgKHR5cGVvZiBzICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZXhwZWN0ZWQgc3RyaW5nIGNvbnRhaW5pbmcgcHJpdmF0ZSBrZXknKTtcclxuICAgIH1cclxuICAgIGlmIChzLnN1YnN0cigwLCA3KSA9PT0gJ1BWVF9SMV8nKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZ1RvS2V5KHMuc3Vic3RyKDcpLCBLZXlUeXBlLnIxLCBleHBvcnRzLnByaXZhdGVLZXlEYXRhU2l6ZSwgJ1IxJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChzLnN1YnN0cigwLCA3KSA9PT0gJ1BWVF9LMV8nKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZ1RvS2V5KHMuc3Vic3RyKDcpLCBLZXlUeXBlLmsxLCBleHBvcnRzLnByaXZhdGVLZXlEYXRhU2l6ZSwgJ0sxJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAvLyB0b2RvOiBWZXJpZnkgY2hlY2tzdW06IHNoYTI1NihzaGEyNTYoa2V5LmRhdGEpKS5cclxuICAgICAgICAvLyAgICAgICBOb3QgY3JpdGljYWwgc2luY2UgYSBiYWQga2V5IHdpbGwgZmFpbCB0byBwcm9kdWNlIGFcclxuICAgICAgICAvLyAgICAgICB2YWxpZCBzaWduYXR1cmUgYW55d2F5LlxyXG4gICAgICAgIHZhciB3aG9sZSA9ICgwLCBleHBvcnRzLmJhc2U1OFRvQmluYXJ5KShleHBvcnRzLnByaXZhdGVLZXlEYXRhU2l6ZSArIDUsIHMpO1xyXG4gICAgICAgIHZhciBrZXkgPSB7IHR5cGU6IEtleVR5cGUuazEsIGRhdGE6IG5ldyBVaW50OEFycmF5KGV4cG9ydHMucHJpdmF0ZUtleURhdGFTaXplKSB9O1xyXG4gICAgICAgIGlmICh3aG9sZVswXSAhPT0gMHg4MCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VucmVjb2duaXplZCBwcml2YXRlIGtleSB0eXBlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwb3J0cy5wcml2YXRlS2V5RGF0YVNpemU7ICsraSkge1xyXG4gICAgICAgICAgICBrZXkuZGF0YVtpXSA9IHdob2xlW2kgKyAxXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGtleTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0cy5zdHJpbmdUb1ByaXZhdGVLZXkgPSBzdHJpbmdUb1ByaXZhdGVLZXk7XHJcbi8qKiBDb252ZXJ0IHByaXZhdGUgYGtleWAgdG8gbGVnYWN5IHN0cmluZyAoYmFzZS01OCkgZm9ybSAqL1xyXG52YXIgcHJpdmF0ZUtleVRvTGVnYWN5U3RyaW5nID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgaWYgKGtleS50eXBlID09PSBLZXlUeXBlLmsxICYmIGtleS5kYXRhLmxlbmd0aCA9PT0gZXhwb3J0cy5wcml2YXRlS2V5RGF0YVNpemUpIHtcclxuICAgICAgICB2YXIgd2hvbGVfMSA9IFtdO1xyXG4gICAgICAgIHdob2xlXzEucHVzaCgxMjgpO1xyXG4gICAgICAgIGtleS5kYXRhLmZvckVhY2goZnVuY3Rpb24gKGJ5dGUpIHsgcmV0dXJuIHdob2xlXzEucHVzaChieXRlKTsgfSk7XHJcbiAgICAgICAgdmFyIGRpZ2VzdCA9IG5ldyBVaW50OEFycmF5KCgwLCBoYXNoX2pzXzEuc2hhMjU2KSgpLnVwZGF0ZSgoMCwgaGFzaF9qc18xLnNoYTI1NikoKS51cGRhdGUod2hvbGVfMSkuZGlnZXN0KCkpLmRpZ2VzdCgpKTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkoZXhwb3J0cy5wcml2YXRlS2V5RGF0YVNpemUgKyA1KTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdob2xlXzEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcmVzdWx0W2ldID0gd2hvbGVfMVtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICAgICAgcmVzdWx0W2kgKyB3aG9sZV8xLmxlbmd0aF0gPSBkaWdlc3RbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoMCwgZXhwb3J0cy5iaW5hcnlUb0Jhc2U1OCkocmVzdWx0KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGtleS50eXBlID09PSBLZXlUeXBlLnIxIHx8IGtleS50eXBlID09PSBLZXlUeXBlLndhKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdLZXkgZm9ybWF0IG5vdCBzdXBwb3J0ZWQgaW4gbGVnYWN5IGNvbnZlcnNpb24nKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHB1YmxpYyBrZXkgZm9ybWF0Jyk7XHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydHMucHJpdmF0ZUtleVRvTGVnYWN5U3RyaW5nID0gcHJpdmF0ZUtleVRvTGVnYWN5U3RyaW5nO1xyXG4vKiogQ29udmVydCBga2V5YCB0byBzdHJpbmcgKGJhc2UtNTgpIGZvcm0gKi9cclxudmFyIHByaXZhdGVLZXlUb1N0cmluZyA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgIGlmIChrZXkudHlwZSA9PT0gS2V5VHlwZS5yMSkge1xyXG4gICAgICAgIHJldHVybiBrZXlUb1N0cmluZyhrZXksICdSMScsICdQVlRfUjFfJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChrZXkudHlwZSA9PT0gS2V5VHlwZS5rMSkge1xyXG4gICAgICAgIHJldHVybiBrZXlUb1N0cmluZyhrZXksICdLMScsICdQVlRfSzFfJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VucmVjb2duaXplZCBwcml2YXRlIGtleSBmb3JtYXQnKTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0cy5wcml2YXRlS2V5VG9TdHJpbmcgPSBwcml2YXRlS2V5VG9TdHJpbmc7XHJcbi8qKiBDb252ZXJ0IGtleSBpbiBgc2AgdG8gYmluYXJ5IGZvcm0gKi9cclxudmFyIHN0cmluZ1RvU2lnbmF0dXJlID0gZnVuY3Rpb24gKHMpIHtcclxuICAgIGlmICh0eXBlb2YgcyAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2V4cGVjdGVkIHN0cmluZyBjb250YWluaW5nIHNpZ25hdHVyZScpO1xyXG4gICAgfVxyXG4gICAgaWYgKHMuc3Vic3RyKDAsIDcpID09PSAnU0lHX0sxXycpIHtcclxuICAgICAgICByZXR1cm4gc3RyaW5nVG9LZXkocy5zdWJzdHIoNyksIEtleVR5cGUuazEsIGV4cG9ydHMuc2lnbmF0dXJlRGF0YVNpemUsICdLMScpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocy5zdWJzdHIoMCwgNykgPT09ICdTSUdfUjFfJykge1xyXG4gICAgICAgIHJldHVybiBzdHJpbmdUb0tleShzLnN1YnN0cig3KSwgS2V5VHlwZS5yMSwgZXhwb3J0cy5zaWduYXR1cmVEYXRhU2l6ZSwgJ1IxJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChzLnN1YnN0cigwLCA3KSA9PT0gJ1NJR19XQV8nKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZ1RvS2V5KHMuc3Vic3RyKDcpLCBLZXlUeXBlLndhLCAwLCAnV0EnKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHNpZ25hdHVyZSBmb3JtYXQnKTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0cy5zdHJpbmdUb1NpZ25hdHVyZSA9IHN0cmluZ1RvU2lnbmF0dXJlO1xyXG4vKiogQ29udmVydCBgc2lnbmF0dXJlYCB0byBzdHJpbmcgKGJhc2UtNTgpIGZvcm0gKi9cclxudmFyIHNpZ25hdHVyZVRvU3RyaW5nID0gZnVuY3Rpb24gKHNpZ25hdHVyZSkge1xyXG4gICAgaWYgKHNpZ25hdHVyZS50eXBlID09PSBLZXlUeXBlLmsxKSB7XHJcbiAgICAgICAgcmV0dXJuIGtleVRvU3RyaW5nKHNpZ25hdHVyZSwgJ0sxJywgJ1NJR19LMV8nKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHNpZ25hdHVyZS50eXBlID09PSBLZXlUeXBlLnIxKSB7XHJcbiAgICAgICAgcmV0dXJuIGtleVRvU3RyaW5nKHNpZ25hdHVyZSwgJ1IxJywgJ1NJR19SMV8nKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHNpZ25hdHVyZS50eXBlID09PSBLZXlUeXBlLndhKSB7XHJcbiAgICAgICAgcmV0dXJuIGtleVRvU3RyaW5nKHNpZ25hdHVyZSwgJ1dBJywgJ1NJR19XQV8nKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHNpZ25hdHVyZSBmb3JtYXQnKTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0cy5zaWduYXR1cmVUb1N0cmluZyA9IHNpZ25hdHVyZVRvU3RyaW5nO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuLyoqXHJcbiAqIEBtb2R1bGUgU2VyaWFsaXplXHJcbiAqL1xyXG4vLyBjb3B5cmlnaHQgZGVmaW5lZCBpbiBlb3Nqcy9MSUNFTlNFLnR4dFxyXG4vKiBlc2xpbnQtZGlzYWJsZSBtYXgtY2xhc3Nlcy1wZXItZmlsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBqc2RvYy9jaGVjay1pbmRlbnRhdGlvbiAqL1xyXG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXHJcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn07XHJcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufTtcclxudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufTtcclxudmFyIF9fdmFsdWVzID0gKHRoaXMgJiYgdGhpcy5fX3ZhbHVlcykgfHwgZnVuY3Rpb24obykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5zZXJpYWxpemVRdWVyeSA9IGV4cG9ydHMuZGVzZXJpYWxpemVBbnlBcnJheSA9IGV4cG9ydHMuc2VyaWFsaXplQW55QXJyYXkgPSBleHBvcnRzLmRlc2VyaWFsaXplQW55T2JqZWN0ID0gZXhwb3J0cy5zZXJpYWxpemVBbnlPYmplY3QgPSBleHBvcnRzLmRlc2VyaWFsaXplQW55dmFyU2hvcnQgPSBleHBvcnRzLmRlc2VyaWFsaXplQW55dmFyID0gZXhwb3J0cy5zZXJpYWxpemVBbnl2YXIgPSBleHBvcnRzLmRlc2VyaWFsaXplQWN0aW9uID0gZXhwb3J0cy5kZXNlcmlhbGl6ZUFjdGlvbkRhdGEgPSBleHBvcnRzLnNlcmlhbGl6ZUFjdGlvbiA9IGV4cG9ydHMuc2VyaWFsaXplQWN0aW9uRGF0YSA9IGV4cG9ydHMudHJhbnNhY3Rpb25IZWFkZXIgPSBleHBvcnRzLmdldFR5cGVzRnJvbUFiaSA9IGV4cG9ydHMuZ2V0VHlwZSA9IGV4cG9ydHMuY3JlYXRlVHJhbnNhY3Rpb25UeXBlcyA9IGV4cG9ydHMuY3JlYXRlVHJhbnNhY3Rpb25FeHRlbnNpb25UeXBlcyA9IGV4cG9ydHMuY3JlYXRlQWJpVHlwZXMgPSBleHBvcnRzLmNyZWF0ZUluaXRpYWxUeXBlcyA9IGV4cG9ydHMuaGV4VG9VaW50OEFycmF5ID0gZXhwb3J0cy5hcnJheVRvSGV4ID0gZXhwb3J0cy5zeW1ib2xUb1N0cmluZyA9IGV4cG9ydHMuc3RyaW5nVG9TeW1ib2wgPSBleHBvcnRzLmJsb2NrVGltZXN0YW1wVG9EYXRlID0gZXhwb3J0cy5kYXRlVG9CbG9ja1RpbWVzdGFtcCA9IGV4cG9ydHMudGltZVBvaW50U2VjVG9EYXRlID0gZXhwb3J0cy5kYXRlVG9UaW1lUG9pbnRTZWMgPSBleHBvcnRzLnRpbWVQb2ludFRvRGF0ZSA9IGV4cG9ydHMuZGF0ZVRvVGltZVBvaW50ID0gZXhwb3J0cy5zdXBwb3J0ZWRBYmlWZXJzaW9uID0gZXhwb3J0cy5TZXJpYWxCdWZmZXIgPSBleHBvcnRzLlNlcmlhbGl6ZXJTdGF0ZSA9IHZvaWQgMDtcclxudmFyIG51bWVyaWMgPSByZXF1aXJlKFwiLi9lb3Nqcy1udW1lcmljXCIpO1xyXG4vKiogU3RhdGUgZm9yIHNlcmlhbGl6ZSgpIGFuZCBkZXNlcmlhbGl6ZSgpICovXHJcbnZhciBTZXJpYWxpemVyU3RhdGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBTZXJpYWxpemVyU3RhdGUob3B0aW9ucykge1xyXG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XHJcbiAgICAgICAgLyoqIEhhdmUgYW55IGJpbmFyeSBleHRlbnNpb25zIGJlZW4gc2tpcHBlZD8gKi9cclxuICAgICAgICB0aGlzLnNraXBwZWRCaW5hcnlFeHRlbnNpb24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFNlcmlhbGl6ZXJTdGF0ZTtcclxufSgpKTtcclxuZXhwb3J0cy5TZXJpYWxpemVyU3RhdGUgPSBTZXJpYWxpemVyU3RhdGU7XHJcbi8qKiBTZXJpYWxpemUgYW5kIGRlc2VyaWFsaXplIGRhdGEgKi9cclxudmFyIFNlcmlhbEJ1ZmZlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIF9fbmFtZWRQYXJhbWV0ZXJzXHJcbiAgICAgKiBgYXJyYXlgOiBgbnVsbGAgaWYgc2VyaWFsaXppbmcsIG9yIGJpbmFyeSBkYXRhIHRvIGRlc2VyaWFsaXplXHJcbiAgICAgKiBgdGV4dEVuY29kZXJgOiBgVGV4dEVuY29kZXJgIGluc3RhbmNlIHRvIHVzZS4gUGFzcyBpbiBgbnVsbGAgaWYgcnVubmluZyBpbiBhIGJyb3dzZXJcclxuICAgICAqIGB0ZXh0RGVjb2RlcmA6IGBUZXh0RGVjaWRlcmAgaW5zdGFuY2UgdG8gdXNlLiBQYXNzIGluIGBudWxsYCBpZiBydW5uaW5nIGluIGEgYnJvd3NlclxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBTZXJpYWxCdWZmZXIoX2EpIHtcclxuICAgICAgICB2YXIgX2IgPSBfYSA9PT0gdm9pZCAwID8ge30gOiBfYSwgdGV4dEVuY29kZXIgPSBfYi50ZXh0RW5jb2RlciwgdGV4dERlY29kZXIgPSBfYi50ZXh0RGVjb2RlciwgYXJyYXkgPSBfYi5hcnJheTtcclxuICAgICAgICAvKiogQ3VycmVudCBwb3NpdGlvbiB3aGlsZSByZWFkaW5nIChkZXNlcmlhbGl6aW5nKSAqL1xyXG4gICAgICAgIHRoaXMucmVhZFBvcyA9IDA7XHJcbiAgICAgICAgdGhpcy5hcnJheSA9IGFycmF5IHx8IG5ldyBVaW50OEFycmF5KDEwMjQpO1xyXG4gICAgICAgIHRoaXMubGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xyXG4gICAgICAgIHRoaXMudGV4dEVuY29kZXIgPSB0ZXh0RW5jb2RlciB8fCBuZXcgVGV4dEVuY29kZXIoKTtcclxuICAgICAgICB0aGlzLnRleHREZWNvZGVyID0gdGV4dERlY29kZXIgfHwgbmV3IFRleHREZWNvZGVyKCd1dGYtOCcsIHsgZmF0YWw6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgICAvKiogUmVzaXplIGBhcnJheWAgaWYgbmVlZGVkIHRvIGhhdmUgYXQgbGVhc3QgYHNpemVgIGJ5dGVzIGZyZWUgKi9cclxuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUucmVzZXJ2ZSA9IGZ1bmN0aW9uIChzaXplKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoICsgc2l6ZSA8PSB0aGlzLmFycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBsID0gdGhpcy5hcnJheS5sZW5ndGg7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMubGVuZ3RoICsgc2l6ZSA+IGwpIHtcclxuICAgICAgICAgICAgbCA9IE1hdGguY2VpbChsICogMS41KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG5ld0FycmF5ID0gbmV3IFVpbnQ4QXJyYXkobCk7XHJcbiAgICAgICAgbmV3QXJyYXkuc2V0KHRoaXMuYXJyYXkpO1xyXG4gICAgICAgIHRoaXMuYXJyYXkgPSBuZXdBcnJheTtcclxuICAgIH07XHJcbiAgICAvKiogSXMgdGhlcmUgZGF0YSBhdmFpbGFibGUgdG8gcmVhZD8gKi9cclxuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuaGF2ZVJlYWREYXRhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlYWRQb3MgPCB0aGlzLmxlbmd0aDtcclxuICAgIH07XHJcbiAgICAvKiogUmVzdGFydCByZWFkaW5nIGZyb20gdGhlIGJlZ2lubmluZyAqL1xyXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5yZXN0YXJ0UmVhZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnJlYWRQb3MgPSAwO1xyXG4gICAgfTtcclxuICAgIC8qKiBSZXR1cm4gZGF0YSB3aXRoIGV4Y2VzcyBzdG9yYWdlIHRyaW1tZWQgYXdheSAqL1xyXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5hc1VpbnQ4QXJyYXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHRoaXMuYXJyYXkuYnVmZmVyLCB0aGlzLmFycmF5LmJ5dGVPZmZzZXQsIHRoaXMubGVuZ3RoKTtcclxuICAgIH07XHJcbiAgICAvKiogQXBwZW5kIGJ5dGVzICovXHJcbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLnB1c2hBcnJheSA9IGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgdGhpcy5yZXNlcnZlKHYubGVuZ3RoKTtcclxuICAgICAgICB0aGlzLmFycmF5LnNldCh2LCB0aGlzLmxlbmd0aCk7XHJcbiAgICAgICAgdGhpcy5sZW5ndGggKz0gdi5sZW5ndGg7XHJcbiAgICB9O1xyXG4gICAgLyoqIEFwcGVuZCBieXRlcyAqL1xyXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB2ID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgdltfaV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnB1c2hBcnJheSh2KTtcclxuICAgIH07XHJcbiAgICAvKiogR2V0IGEgc2luZ2xlIGJ5dGUgKi9cclxuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJlYWRQb3MgPCB0aGlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcnJheVt0aGlzLnJlYWRQb3MrK107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUmVhZCBwYXN0IGVuZCBvZiBidWZmZXInKTtcclxuICAgIH07XHJcbiAgICAvKiogQXBwZW5kIGJ5dGVzIGluIGB2YC4gVGhyb3dzIGlmIGBsZW5gIGRvZXNuJ3QgbWF0Y2ggYHYubGVuZ3RoYCAqL1xyXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5wdXNoVWludDhBcnJheUNoZWNrZWQgPSBmdW5jdGlvbiAodiwgbGVuKSB7XHJcbiAgICAgICAgaWYgKHYubGVuZ3RoICE9PSBsZW4pIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCaW5hcnkgZGF0YSBoYXMgaW5jb3JyZWN0IHNpemUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wdXNoQXJyYXkodik7XHJcbiAgICB9O1xyXG4gICAgLyoqIEdldCBgbGVuYCBieXRlcyAqL1xyXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5nZXRVaW50OEFycmF5ID0gZnVuY3Rpb24gKGxlbikge1xyXG4gICAgICAgIGlmICh0aGlzLnJlYWRQb3MgKyBsZW4gPiB0aGlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlYWQgcGFzdCBlbmQgb2YgYnVmZmVyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgVWludDhBcnJheSh0aGlzLmFycmF5LmJ1ZmZlciwgdGhpcy5hcnJheS5ieXRlT2Zmc2V0ICsgdGhpcy5yZWFkUG9zLCBsZW4pO1xyXG4gICAgICAgIHRoaXMucmVhZFBvcyArPSBsZW47XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcbiAgICAvKiogU2tpcCBgbGVuYCBieXRlcyAqL1xyXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5za2lwID0gZnVuY3Rpb24gKGxlbikge1xyXG4gICAgICAgIGlmICh0aGlzLnJlYWRQb3MgKyBsZW4gPiB0aGlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlYWQgcGFzdCBlbmQgb2YgYnVmZmVyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVhZFBvcyArPSBsZW47XHJcbiAgICB9O1xyXG4gICAgLyoqIEFwcGVuZCBhIGB1aW50MTZgICovXHJcbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLnB1c2hVaW50MTYgPSBmdW5jdGlvbiAodikge1xyXG4gICAgICAgIHRoaXMucHVzaCgodiA+PiAwKSAmIDB4ZmYsICh2ID4+IDgpICYgMHhmZik7XHJcbiAgICB9O1xyXG4gICAgLyoqIEdldCBhIGB1aW50MTZgICovXHJcbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLmdldFVpbnQxNiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdiA9IDA7XHJcbiAgICAgICAgdiB8PSB0aGlzLmdldCgpIDw8IDA7XHJcbiAgICAgICAgdiB8PSB0aGlzLmdldCgpIDw8IDg7XHJcbiAgICAgICAgcmV0dXJuIHY7XHJcbiAgICB9O1xyXG4gICAgLyoqIEFwcGVuZCBhIGB1aW50MzJgICovXHJcbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLnB1c2hVaW50MzIgPSBmdW5jdGlvbiAodikge1xyXG4gICAgICAgIHRoaXMucHVzaCgodiA+PiAwKSAmIDB4ZmYsICh2ID4+IDgpICYgMHhmZiwgKHYgPj4gMTYpICYgMHhmZiwgKHYgPj4gMjQpICYgMHhmZik7XHJcbiAgICB9O1xyXG4gICAgLyoqIEdldCBhIGB1aW50MzJgICovXHJcbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLmdldFVpbnQzMiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdiA9IDA7XHJcbiAgICAgICAgdiB8PSB0aGlzLmdldCgpIDw8IDA7XHJcbiAgICAgICAgdiB8PSB0aGlzLmdldCgpIDw8IDg7XHJcbiAgICAgICAgdiB8PSB0aGlzLmdldCgpIDw8IDE2O1xyXG4gICAgICAgIHYgfD0gdGhpcy5nZXQoKSA8PCAyNDtcclxuICAgICAgICByZXR1cm4gdiA+Pj4gMDtcclxuICAgIH07XHJcbiAgICAvKiogQXBwZW5kIGEgYHVpbnQ2NGAuICpDYXV0aW9uKjogYG51bWJlcmAgb25seSBoYXMgNTMgYml0cyBvZiBwcmVjaXNpb24gKi9cclxuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUucHVzaE51bWJlckFzVWludDY0ID0gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICB0aGlzLnB1c2hVaW50MzIodiA+Pj4gMCk7XHJcbiAgICAgICAgdGhpcy5wdXNoVWludDMyKE1hdGguZmxvb3IodiAvIDQyOTQ5NjcyOTYpID4+PiAwKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEdldCBhIGB1aW50NjRgIGFzIGEgYG51bWJlcmAuICpDYXV0aW9uKjogYG51bWJlcmAgb25seSBoYXMgNTMgYml0cyBvZiBwcmVjaXNpb247IHNvbWUgdmFsdWVzIHdpbGwgY2hhbmdlLlxyXG4gICAgICogYG51bWVyaWMuYmluYXJ5VG9EZWNpbWFsKHNlcmlhbEJ1ZmZlci5nZXRVaW50OEFycmF5KDgpKWAgcmVjb21tZW5kZWQgaW5zdGVhZFxyXG4gICAgICovXHJcbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLmdldFVpbnQ2NEFzTnVtYmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBsb3cgPSB0aGlzLmdldFVpbnQzMigpO1xyXG4gICAgICAgIHZhciBoaWdoID0gdGhpcy5nZXRVaW50MzIoKTtcclxuICAgICAgICByZXR1cm4gKGhpZ2ggPj4+IDApICogNDI5NDk2NzI5NiArIChsb3cgPj4+IDApO1xyXG4gICAgfTtcclxuICAgIC8qKiBBcHBlbmQgYSBgdmFydWludDMyYCAqL1xyXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5wdXNoVmFydWludDMyID0gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICBpZiAodiA+Pj4gNykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wdXNoKDB4ODAgfCAodiAmIDB4N2YpKTtcclxuICAgICAgICAgICAgICAgIHYgPSB2ID4+PiA3O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wdXNoKHYpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqIEdldCBhIGB2YXJ1aW50MzJgICovXHJcbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLmdldFZhcnVpbnQzMiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdiA9IDA7XHJcbiAgICAgICAgdmFyIGJpdCA9IDA7XHJcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICAgICAgdmFyIGIgPSB0aGlzLmdldCgpO1xyXG4gICAgICAgICAgICB2IHw9IChiICYgMHg3ZikgPDwgYml0O1xyXG4gICAgICAgICAgICBiaXQgKz0gNztcclxuICAgICAgICAgICAgaWYgKCEoYiAmIDB4ODApKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdiA+Pj4gMDtcclxuICAgIH07XHJcbiAgICAvKiogQXBwZW5kIGEgYHZhcmludDMyYCAqL1xyXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5wdXNoVmFyaW50MzIgPSBmdW5jdGlvbiAodikge1xyXG4gICAgICAgIHRoaXMucHVzaFZhcnVpbnQzMigodiA8PCAxKSBeICh2ID4+IDMxKSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIEdldCBhIGB2YXJpbnQzMmAgKi9cclxuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuZ2V0VmFyaW50MzIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHYgPSB0aGlzLmdldFZhcnVpbnQzMigpO1xyXG4gICAgICAgIGlmICh2ICYgMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gKCh+dikgPj4gMSkgfCAyMTQ3NDgzNjQ4O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHYgPj4+IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKiBBcHBlbmQgYSBgZmxvYXQzMmAgKi9cclxuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUucHVzaEZsb2F0MzIgPSBmdW5jdGlvbiAodikge1xyXG4gICAgICAgIHRoaXMucHVzaEFycmF5KG5ldyBVaW50OEFycmF5KChuZXcgRmxvYXQzMkFycmF5KFt2XSkpLmJ1ZmZlcikpO1xyXG4gICAgfTtcclxuICAgIC8qKiBHZXQgYSBgZmxvYXQzMmAgKi9cclxuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuZ2V0RmxvYXQzMiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IEZsb2F0MzJBcnJheSh0aGlzLmdldFVpbnQ4QXJyYXkoNCkuc2xpY2UoKS5idWZmZXIpWzBdO1xyXG4gICAgfTtcclxuICAgIC8qKiBBcHBlbmQgYSBgZmxvYXQ2NGAgKi9cclxuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUucHVzaEZsb2F0NjQgPSBmdW5jdGlvbiAodikge1xyXG4gICAgICAgIHRoaXMucHVzaEFycmF5KG5ldyBVaW50OEFycmF5KChuZXcgRmxvYXQ2NEFycmF5KFt2XSkpLmJ1ZmZlcikpO1xyXG4gICAgfTtcclxuICAgIC8qKiBHZXQgYSBgZmxvYXQ2NGAgKi9cclxuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuZ2V0RmxvYXQ2NCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IEZsb2F0NjRBcnJheSh0aGlzLmdldFVpbnQ4QXJyYXkoOCkuc2xpY2UoKS5idWZmZXIpWzBdO1xyXG4gICAgfTtcclxuICAgIC8qKiBBcHBlbmQgYSBgbmFtZWAgKi9cclxuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUucHVzaE5hbWUgPSBmdW5jdGlvbiAocykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgcyAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBzdHJpbmcgY29udGFpbmluZyBuYW1lJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoL15bLjEtNWEtel17MCwxMn1bLjEtNWEtal0/JC8pO1xyXG4gICAgICAgIGlmICghcmVnZXgudGVzdChzKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05hbWUgc2hvdWxkIGJlIGxlc3MgdGhhbiAxMyBjaGFyYWN0ZXJzLCBvciBsZXNzIHRoYW4gMTQgaWYgbGFzdCBjaGFyYWN0ZXIgaXMgYmV0d2VlbiAxLTUgb3IgYS1qLCBhbmQgb25seSBjb250YWluIHRoZSBmb2xsb3dpbmcgc3ltYm9scyAuMTIzNDVhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjaGFyVG9TeW1ib2wgPSBmdW5jdGlvbiAoYykge1xyXG4gICAgICAgICAgICBpZiAoYyA+PSAnYScuY2hhckNvZGVBdCgwKSAmJiBjIDw9ICd6Jy5jaGFyQ29kZUF0KDApKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKGMgLSAnYScuY2hhckNvZGVBdCgwKSkgKyA2O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjID49ICcxJy5jaGFyQ29kZUF0KDApICYmIGMgPD0gJzUnLmNoYXJDb2RlQXQoMCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoYyAtICcxJy5jaGFyQ29kZUF0KDApKSArIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgYSA9IG5ldyBVaW50OEFycmF5KDgpO1xyXG4gICAgICAgIHZhciBiaXQgPSA2MztcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgdmFyIGMgPSBjaGFyVG9TeW1ib2wocy5jaGFyQ29kZUF0KGkpKTtcclxuICAgICAgICAgICAgaWYgKGJpdCA8IDUpIHtcclxuICAgICAgICAgICAgICAgIGMgPSBjIDw8IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDQ7IGogPj0gMDsgLS1qKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYml0ID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBhW01hdGguZmxvb3IoYml0IC8gOCldIHw9ICgoYyA+PiBqKSAmIDEpIDw8IChiaXQgJSA4KTtcclxuICAgICAgICAgICAgICAgICAgICAtLWJpdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnB1c2hBcnJheShhKTtcclxuICAgIH07XHJcbiAgICAvKiogR2V0IGEgYG5hbWVgICovXHJcbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLmdldE5hbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGEgPSB0aGlzLmdldFVpbnQ4QXJyYXkoOCk7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9ICcnO1xyXG4gICAgICAgIGZvciAodmFyIGJpdCA9IDYzOyBiaXQgPj0gMDspIHtcclxuICAgICAgICAgICAgdmFyIGMgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDU7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJpdCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYyA9IChjIDw8IDEpIHwgKChhW01hdGguZmxvb3IoYml0IC8gOCldID4+IChiaXQgJSA4KSkgJiAxKTtcclxuICAgICAgICAgICAgICAgICAgICAtLWJpdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYyA+PSA2KSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjICsgJ2EnLmNoYXJDb2RlQXQoMCkgLSA2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjID49IDEpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGMgKyAnMScuY2hhckNvZGVBdCgwKSAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9ICcuJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB3aGlsZSAocmVzdWx0LmVuZHNXaXRoKCcuJykpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnN1YnN0cigwLCByZXN1bHQubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG4gICAgLyoqIEFwcGVuZCBsZW5ndGgtcHJlZml4ZWQgYmluYXJ5IGRhdGEgKi9cclxuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUucHVzaEJ5dGVzID0gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICB0aGlzLnB1c2hWYXJ1aW50MzIodi5sZW5ndGgpO1xyXG4gICAgICAgIHRoaXMucHVzaEFycmF5KHYpO1xyXG4gICAgfTtcclxuICAgIC8qKiBHZXQgbGVuZ3RoLXByZWZpeGVkIGJpbmFyeSBkYXRhICovXHJcbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLmdldEJ5dGVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFVpbnQ4QXJyYXkodGhpcy5nZXRWYXJ1aW50MzIoKSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIEFwcGVuZCBhIHN0cmluZyAqL1xyXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5wdXNoU3RyaW5nID0gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICB0aGlzLnB1c2hCeXRlcyh0aGlzLnRleHRFbmNvZGVyLmVuY29kZSh2KSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIEdldCBhIHN0cmluZyAqL1xyXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5nZXRTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dERlY29kZXIuZGVjb2RlKHRoaXMuZ2V0Qnl0ZXMoKSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIEFwcGVuZCBhIGBzeW1ib2xfY29kZWAuIFVubGlrZSBgc3ltYm9sYCwgYHN5bWJvbF9jb2RlYCBkb2Vzbid0IGluY2x1ZGUgYSBwcmVjaXNpb24uICovXHJcbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLnB1c2hTeW1ib2xDb2RlID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgc3RyaW5nIGNvbnRhaW5pbmcgc3ltYm9sX2NvZGUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGEgPSBbXTtcclxuICAgICAgICBhLnB1c2guYXBwbHkoYSwgX19zcHJlYWRBcnJheShbXSwgX19yZWFkKHRoaXMudGV4dEVuY29kZXIuZW5jb2RlKG5hbWUpKSwgZmFsc2UpKTtcclxuICAgICAgICB3aGlsZSAoYS5sZW5ndGggPCA4KSB7XHJcbiAgICAgICAgICAgIGEucHVzaCgwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wdXNoQXJyYXkoYS5zbGljZSgwLCA4KSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIEdldCBhIGBzeW1ib2xfY29kZWAuIFVubGlrZSBgc3ltYm9sYCwgYHN5bWJvbF9jb2RlYCBkb2Vzbid0IGluY2x1ZGUgYSBwcmVjaXNpb24uICovXHJcbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLmdldFN5bWJvbENvZGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGEgPSB0aGlzLmdldFVpbnQ4QXJyYXkoOCk7XHJcbiAgICAgICAgdmFyIGxlbjtcclxuICAgICAgICBmb3IgKGxlbiA9IDA7IGxlbiA8IGEubGVuZ3RoOyArK2xlbikge1xyXG4gICAgICAgICAgICBpZiAoIWFbbGVuXSkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLnRleHREZWNvZGVyLmRlY29kZShuZXcgVWludDhBcnJheShhLmJ1ZmZlciwgYS5ieXRlT2Zmc2V0LCBsZW4pKTtcclxuICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgIH07XHJcbiAgICAvKiogQXBwZW5kIGEgYHN5bWJvbGAgKi9cclxuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUucHVzaFN5bWJvbCA9IGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgIHZhciBuYW1lID0gX2EubmFtZSwgcHJlY2lzaW9uID0gX2EucHJlY2lzaW9uO1xyXG4gICAgICAgIGlmICghL15bQS1aXXsxLDd9JC8udGVzdChuYW1lKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHN5bWJvbCB0byBiZSBBLVogYW5kIGJldHdlZW4gb25lIGFuZCBzZXZlbiBjaGFyYWN0ZXJzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBhID0gW3ByZWNpc2lvbiAmIDB4ZmZdO1xyXG4gICAgICAgIGEucHVzaC5hcHBseShhLCBfX3NwcmVhZEFycmF5KFtdLCBfX3JlYWQodGhpcy50ZXh0RW5jb2Rlci5lbmNvZGUobmFtZSkpLCBmYWxzZSkpO1xyXG4gICAgICAgIHdoaWxlIChhLmxlbmd0aCA8IDgpIHtcclxuICAgICAgICAgICAgYS5wdXNoKDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnB1c2hBcnJheShhLnNsaWNlKDAsIDgpKTtcclxuICAgIH07XHJcbiAgICAvKiogR2V0IGEgYHN5bWJvbGAgKi9cclxuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuZ2V0U3ltYm9sID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBwcmVjaXNpb24gPSB0aGlzLmdldCgpO1xyXG4gICAgICAgIHZhciBhID0gdGhpcy5nZXRVaW50OEFycmF5KDcpO1xyXG4gICAgICAgIHZhciBsZW47XHJcbiAgICAgICAgZm9yIChsZW4gPSAwOyBsZW4gPCBhLmxlbmd0aDsgKytsZW4pIHtcclxuICAgICAgICAgICAgaWYgKCFhW2xlbl0pIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBuYW1lID0gdGhpcy50ZXh0RGVjb2Rlci5kZWNvZGUobmV3IFVpbnQ4QXJyYXkoYS5idWZmZXIsIGEuYnl0ZU9mZnNldCwgbGVuKSk7XHJcbiAgICAgICAgcmV0dXJuIHsgbmFtZTogbmFtZSwgcHJlY2lzaW9uOiBwcmVjaXNpb24gfTtcclxuICAgIH07XHJcbiAgICAvKiogQXBwZW5kIGFuIGFzc2V0ICovXHJcbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLnB1c2hBc3NldCA9IGZ1bmN0aW9uIChzKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHN0cmluZyBjb250YWluaW5nIGFzc2V0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHMgPSBzLnRyaW0oKTtcclxuICAgICAgICB2YXIgcG9zID0gMDtcclxuICAgICAgICB2YXIgYW1vdW50ID0gJyc7XHJcbiAgICAgICAgdmFyIHByZWNpc2lvbiA9IDA7XHJcbiAgICAgICAgaWYgKHNbcG9zXSA9PT0gJy0nKSB7XHJcbiAgICAgICAgICAgIGFtb3VudCArPSAnLSc7XHJcbiAgICAgICAgICAgICsrcG9zO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZm91bmREaWdpdCA9IGZhbHNlO1xyXG4gICAgICAgIHdoaWxlIChwb3MgPCBzLmxlbmd0aCAmJiBzLmNoYXJDb2RlQXQocG9zKSA+PSAnMCcuY2hhckNvZGVBdCgwKSAmJiBzLmNoYXJDb2RlQXQocG9zKSA8PSAnOScuY2hhckNvZGVBdCgwKSkge1xyXG4gICAgICAgICAgICBmb3VuZERpZ2l0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgYW1vdW50ICs9IHNbcG9zXTtcclxuICAgICAgICAgICAgKytwb3M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZm91bmREaWdpdCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fzc2V0IG11c3QgYmVnaW4gd2l0aCBhIG51bWJlcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc1twb3NdID09PSAnLicpIHtcclxuICAgICAgICAgICAgKytwb3M7XHJcbiAgICAgICAgICAgIHdoaWxlIChwb3MgPCBzLmxlbmd0aCAmJiBzLmNoYXJDb2RlQXQocG9zKSA+PSAnMCcuY2hhckNvZGVBdCgwKSAmJiBzLmNoYXJDb2RlQXQocG9zKSA8PSAnOScuY2hhckNvZGVBdCgwKSkge1xyXG4gICAgICAgICAgICAgICAgYW1vdW50ICs9IHNbcG9zXTtcclxuICAgICAgICAgICAgICAgICsrcHJlY2lzaW9uO1xyXG4gICAgICAgICAgICAgICAgKytwb3M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG5hbWUgPSBzLnN1YnN0cihwb3MpLnRyaW0oKTtcclxuICAgICAgICB0aGlzLnB1c2hBcnJheShudW1lcmljLnNpZ25lZERlY2ltYWxUb0JpbmFyeSg4LCBhbW91bnQpKTtcclxuICAgICAgICB0aGlzLnB1c2hTeW1ib2woeyBuYW1lOiBuYW1lLCBwcmVjaXNpb246IHByZWNpc2lvbiB9KTtcclxuICAgIH07XHJcbiAgICAvKiogR2V0IGFuIGFzc2V0ICovXHJcbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLmdldEFzc2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhbW91bnQgPSB0aGlzLmdldFVpbnQ4QXJyYXkoOCk7XHJcbiAgICAgICAgdmFyIF9hID0gdGhpcy5nZXRTeW1ib2woKSwgbmFtZSA9IF9hLm5hbWUsIHByZWNpc2lvbiA9IF9hLnByZWNpc2lvbjtcclxuICAgICAgICB2YXIgcyA9IG51bWVyaWMuc2lnbmVkQmluYXJ5VG9EZWNpbWFsKGFtb3VudCwgcHJlY2lzaW9uICsgMSk7XHJcbiAgICAgICAgaWYgKHByZWNpc2lvbikge1xyXG4gICAgICAgICAgICBzID0gcy5zdWJzdHIoMCwgcy5sZW5ndGggLSBwcmVjaXNpb24pICsgJy4nICsgcy5zdWJzdHIocy5sZW5ndGggLSBwcmVjaXNpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcyArICcgJyArIG5hbWU7XHJcbiAgICB9O1xyXG4gICAgLyoqIEFwcGVuZCBhIHB1YmxpYyBrZXkgKi9cclxuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUucHVzaFB1YmxpY0tleSA9IGZ1bmN0aW9uIChzKSB7XHJcbiAgICAgICAgdmFyIGtleSA9IG51bWVyaWMuc3RyaW5nVG9QdWJsaWNLZXkocyk7XHJcbiAgICAgICAgdGhpcy5wdXNoKGtleS50eXBlKTtcclxuICAgICAgICB0aGlzLnB1c2hBcnJheShrZXkuZGF0YSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIEdldCBhIHB1YmxpYyBrZXkgKi9cclxuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuZ2V0UHVibGljS2V5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB0eXBlID0gdGhpcy5nZXQoKTtcclxuICAgICAgICB2YXIgZGF0YTtcclxuICAgICAgICBpZiAodHlwZSA9PT0gbnVtZXJpYy5LZXlUeXBlLndhKSB7XHJcbiAgICAgICAgICAgIHZhciBiZWdpbiA9IHRoaXMucmVhZFBvcztcclxuICAgICAgICAgICAgdGhpcy5za2lwKDM0KTtcclxuICAgICAgICAgICAgdGhpcy5za2lwKHRoaXMuZ2V0VmFydWludDMyKCkpO1xyXG4gICAgICAgICAgICBkYXRhID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5hcnJheS5idWZmZXIsIHRoaXMuYXJyYXkuYnl0ZU9mZnNldCArIGJlZ2luLCB0aGlzLnJlYWRQb3MgLSBiZWdpbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5nZXRVaW50OEFycmF5KG51bWVyaWMucHVibGljS2V5RGF0YVNpemUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVtZXJpYy5wdWJsaWNLZXlUb1N0cmluZyh7IHR5cGU6IHR5cGUsIGRhdGE6IGRhdGEgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIEFwcGVuZCBhIHByaXZhdGUga2V5ICovXHJcbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLnB1c2hQcml2YXRlS2V5ID0gZnVuY3Rpb24gKHMpIHtcclxuICAgICAgICB2YXIga2V5ID0gbnVtZXJpYy5zdHJpbmdUb1ByaXZhdGVLZXkocyk7XHJcbiAgICAgICAgdGhpcy5wdXNoKGtleS50eXBlKTtcclxuICAgICAgICB0aGlzLnB1c2hBcnJheShrZXkuZGF0YSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIEdldCBhIHByaXZhdGUga2V5ICovXHJcbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLmdldFByaXZhdGVLZXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHR5cGUgPSB0aGlzLmdldCgpO1xyXG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5nZXRVaW50OEFycmF5KG51bWVyaWMucHJpdmF0ZUtleURhdGFTaXplKTtcclxuICAgICAgICByZXR1cm4gbnVtZXJpYy5wcml2YXRlS2V5VG9TdHJpbmcoeyB0eXBlOiB0eXBlLCBkYXRhOiBkYXRhIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKiBBcHBlbmQgYSBzaWduYXR1cmUgKi9cclxuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUucHVzaFNpZ25hdHVyZSA9IGZ1bmN0aW9uIChzKSB7XHJcbiAgICAgICAgdmFyIGtleSA9IG51bWVyaWMuc3RyaW5nVG9TaWduYXR1cmUocyk7XHJcbiAgICAgICAgdGhpcy5wdXNoKGtleS50eXBlKTtcclxuICAgICAgICB0aGlzLnB1c2hBcnJheShrZXkuZGF0YSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIEdldCBhIHNpZ25hdHVyZSAqL1xyXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5nZXRTaWduYXR1cmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHR5cGUgPSB0aGlzLmdldCgpO1xyXG4gICAgICAgIHZhciBkYXRhO1xyXG4gICAgICAgIGlmICh0eXBlID09PSBudW1lcmljLktleVR5cGUud2EpIHtcclxuICAgICAgICAgICAgdmFyIGJlZ2luID0gdGhpcy5yZWFkUG9zO1xyXG4gICAgICAgICAgICB0aGlzLnNraXAoNjUpO1xyXG4gICAgICAgICAgICB0aGlzLnNraXAodGhpcy5nZXRWYXJ1aW50MzIoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpcCh0aGlzLmdldFZhcnVpbnQzMigpKTtcclxuICAgICAgICAgICAgZGF0YSA9IG5ldyBVaW50OEFycmF5KHRoaXMuYXJyYXkuYnVmZmVyLCB0aGlzLmFycmF5LmJ5dGVPZmZzZXQgKyBiZWdpbiwgdGhpcy5yZWFkUG9zIC0gYmVnaW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuZ2V0VWludDhBcnJheShudW1lcmljLnNpZ25hdHVyZURhdGFTaXplKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bWVyaWMuc2lnbmF0dXJlVG9TdHJpbmcoeyB0eXBlOiB0eXBlLCBkYXRhOiBkYXRhIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBTZXJpYWxCdWZmZXI7XHJcbn0oKSk7IC8vIFNlcmlhbEJ1ZmZlclxyXG5leHBvcnRzLlNlcmlhbEJ1ZmZlciA9IFNlcmlhbEJ1ZmZlcjtcclxuLyoqIElzIHRoaXMgYSBzdXBwb3J0ZWQgQUJJIHZlcnNpb24/ICovXHJcbnZhciBzdXBwb3J0ZWRBYmlWZXJzaW9uID0gZnVuY3Rpb24gKHZlcnNpb24pIHtcclxuICAgIHJldHVybiB2ZXJzaW9uLnN0YXJ0c1dpdGgoJ2Vvc2lvOjphYmkvMS4nKTtcclxufTtcclxuZXhwb3J0cy5zdXBwb3J0ZWRBYmlWZXJzaW9uID0gc3VwcG9ydGVkQWJpVmVyc2lvbjtcclxudmFyIGNoZWNrRGF0ZVBhcnNlID0gZnVuY3Rpb24gKGRhdGUpIHtcclxuICAgIHZhciByZXN1bHQgPSBEYXRlLnBhcnNlKGRhdGUpO1xyXG4gICAgaWYgKE51bWJlci5pc05hTihyZXN1bHQpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHRpbWUgZm9ybWF0Jyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG4vKiogQ29udmVydCBkYXRlIGluIElTTyBmb3JtYXQgdG8gYHRpbWVfcG9pbnRgIChtaWxpc2Vjb25kcyBzaW5jZSBlcG9jaCkgKi9cclxudmFyIGRhdGVUb1RpbWVQb2ludCA9IGZ1bmN0aW9uIChkYXRlKSB7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZChjaGVja0RhdGVQYXJzZShkYXRlICsgJ1onKSAqIDEwMDApO1xyXG59O1xyXG5leHBvcnRzLmRhdGVUb1RpbWVQb2ludCA9IGRhdGVUb1RpbWVQb2ludDtcclxuLyoqIENvbnZlcnQgYHRpbWVfcG9pbnRgIChtaWxpc2Vjb25kcyBzaW5jZSBlcG9jaCkgdG8gZGF0ZSBpbiBJU08gZm9ybWF0ICovXHJcbnZhciB0aW1lUG9pbnRUb0RhdGUgPSBmdW5jdGlvbiAodXMpIHtcclxuICAgIHZhciBzID0gKG5ldyBEYXRlKHVzIC8gMTAwMCkpLnRvSVNPU3RyaW5nKCk7XHJcbiAgICByZXR1cm4gcy5zdWJzdHIoMCwgcy5sZW5ndGggLSAxKTtcclxufTtcclxuZXhwb3J0cy50aW1lUG9pbnRUb0RhdGUgPSB0aW1lUG9pbnRUb0RhdGU7XHJcbi8qKiBDb252ZXJ0IGRhdGUgaW4gSVNPIGZvcm1hdCB0byBgdGltZV9wb2ludF9zZWNgIChzZWNvbmRzIHNpbmNlIGVwb2NoKSAqL1xyXG52YXIgZGF0ZVRvVGltZVBvaW50U2VjID0gZnVuY3Rpb24gKGRhdGUpIHtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKGNoZWNrRGF0ZVBhcnNlKGRhdGUgKyAnWicpIC8gMTAwMCk7XHJcbn07XHJcbmV4cG9ydHMuZGF0ZVRvVGltZVBvaW50U2VjID0gZGF0ZVRvVGltZVBvaW50U2VjO1xyXG4vKiogQ29udmVydCBgdGltZV9wb2ludF9zZWNgIChzZWNvbmRzIHNpbmNlIGVwb2NoKSB0byB0byBkYXRlIGluIElTTyBmb3JtYXQgKi9cclxudmFyIHRpbWVQb2ludFNlY1RvRGF0ZSA9IGZ1bmN0aW9uIChzZWMpIHtcclxuICAgIHZhciBzID0gKG5ldyBEYXRlKHNlYyAqIDEwMDApKS50b0lTT1N0cmluZygpO1xyXG4gICAgcmV0dXJuIHMuc3Vic3RyKDAsIHMubGVuZ3RoIC0gMSk7XHJcbn07XHJcbmV4cG9ydHMudGltZVBvaW50U2VjVG9EYXRlID0gdGltZVBvaW50U2VjVG9EYXRlO1xyXG4vKiogQ29udmVydCBkYXRlIGluIElTTyBmb3JtYXQgdG8gYGJsb2NrX3RpbWVzdGFtcF90eXBlYCAoaGFsZi1zZWNvbmRzIHNpbmNlIGEgZGlmZmVyZW50IGVwb2NoKSAqL1xyXG52YXIgZGF0ZVRvQmxvY2tUaW1lc3RhbXAgPSBmdW5jdGlvbiAoZGF0ZSkge1xyXG4gICAgcmV0dXJuIE1hdGgucm91bmQoKGNoZWNrRGF0ZVBhcnNlKGRhdGUgKyAnWicpIC0gOTQ2Njg0ODAwMDAwKSAvIDUwMCk7XHJcbn07XHJcbmV4cG9ydHMuZGF0ZVRvQmxvY2tUaW1lc3RhbXAgPSBkYXRlVG9CbG9ja1RpbWVzdGFtcDtcclxuLyoqIENvbnZlcnQgYGJsb2NrX3RpbWVzdGFtcF90eXBlYCAoaGFsZi1zZWNvbmRzIHNpbmNlIGEgZGlmZmVyZW50IGVwb2NoKSB0byB0byBkYXRlIGluIElTTyBmb3JtYXQgKi9cclxudmFyIGJsb2NrVGltZXN0YW1wVG9EYXRlID0gZnVuY3Rpb24gKHNsb3QpIHtcclxuICAgIHZhciBzID0gKG5ldyBEYXRlKHNsb3QgKiA1MDAgKyA5NDY2ODQ4MDAwMDApKS50b0lTT1N0cmluZygpO1xyXG4gICAgcmV0dXJuIHMuc3Vic3RyKDAsIHMubGVuZ3RoIC0gMSk7XHJcbn07XHJcbmV4cG9ydHMuYmxvY2tUaW1lc3RhbXBUb0RhdGUgPSBibG9ja1RpbWVzdGFtcFRvRGF0ZTtcclxuLyoqIENvbnZlcnQgYHN0cmluZ2AgdG8gYFN5bWJvbGAuIGZvcm1hdDogYHByZWNpc2lvbixOQU1FYC4gKi9cclxudmFyIHN0cmluZ1RvU3ltYm9sID0gZnVuY3Rpb24gKHMpIHtcclxuICAgIGlmICh0eXBlb2YgcyAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHN0cmluZyBjb250YWluaW5nIHN5bWJvbCcpO1xyXG4gICAgfVxyXG4gICAgdmFyIG0gPSBzLm1hdGNoKC9eKFswLTldKyksKFtBLVpdKykkLyk7XHJcbiAgICBpZiAoIW0pIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3ltYm9sJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4geyBuYW1lOiBtWzJdLCBwcmVjaXNpb246ICttWzFdIH07XHJcbn07XHJcbmV4cG9ydHMuc3RyaW5nVG9TeW1ib2wgPSBzdHJpbmdUb1N5bWJvbDtcclxuLyoqIENvbnZlcnQgYFN5bWJvbGAgdG8gYHN0cmluZ2AuIGZvcm1hdDogYHByZWNpc2lvbixOQU1FYC4gKi9cclxudmFyIHN5bWJvbFRvU3RyaW5nID0gZnVuY3Rpb24gKF9hKSB7XHJcbiAgICB2YXIgbmFtZSA9IF9hLm5hbWUsIHByZWNpc2lvbiA9IF9hLnByZWNpc2lvbjtcclxuICAgIHJldHVybiBwcmVjaXNpb24gKyAnLCcgKyBuYW1lO1xyXG59O1xyXG5leHBvcnRzLnN5bWJvbFRvU3RyaW5nID0gc3ltYm9sVG9TdHJpbmc7XHJcbi8qKiBDb252ZXJ0IGJpbmFyeSBkYXRhIHRvIGhleCAqL1xyXG52YXIgYXJyYXlUb0hleCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICB2YXIgZV8xLCBfYTtcclxuICAgIHZhciByZXN1bHQgPSAnJztcclxuICAgIHRyeSB7XHJcbiAgICAgICAgZm9yICh2YXIgZGF0YV8xID0gX192YWx1ZXMoZGF0YSksIGRhdGFfMV8xID0gZGF0YV8xLm5leHQoKTsgIWRhdGFfMV8xLmRvbmU7IGRhdGFfMV8xID0gZGF0YV8xLm5leHQoKSkge1xyXG4gICAgICAgICAgICB2YXIgeCA9IGRhdGFfMV8xLnZhbHVlO1xyXG4gICAgICAgICAgICByZXN1bHQgKz0gKCcwMCcgKyB4LnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YV8xXzEgJiYgIWRhdGFfMV8xLmRvbmUgJiYgKF9hID0gZGF0YV8xLnJldHVybikpIF9hLmNhbGwoZGF0YV8xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdC50b1VwcGVyQ2FzZSgpO1xyXG59O1xyXG5leHBvcnRzLmFycmF5VG9IZXggPSBhcnJheVRvSGV4O1xyXG4vKiogQ29udmVydCBoZXggdG8gYmluYXJ5IGRhdGEgKi9cclxudmFyIGhleFRvVWludDhBcnJheSA9IGZ1bmN0aW9uIChoZXgpIHtcclxuICAgIGlmICh0eXBlb2YgaGV4ICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgc3RyaW5nIGNvbnRhaW5pbmcgaGV4IGRpZ2l0cycpO1xyXG4gICAgfVxyXG4gICAgaWYgKGhleC5sZW5ndGggJSAyKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPZGQgbnVtYmVyIG9mIGhleCBkaWdpdHMnKTtcclxuICAgIH1cclxuICAgIHZhciBsID0gaGV4Lmxlbmd0aCAvIDI7XHJcbiAgICB2YXIgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkobCk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGw7ICsraSkge1xyXG4gICAgICAgIHZhciB4ID0gcGFyc2VJbnQoaGV4LnN1YnN0cihpICogMiwgMiksIDE2KTtcclxuICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKHgpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgaGV4IHN0cmluZycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHRbaV0gPSB4O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuZXhwb3J0cy5oZXhUb1VpbnQ4QXJyYXkgPSBoZXhUb1VpbnQ4QXJyYXk7XHJcbmZ1bmN0aW9uIHNlcmlhbGl6ZVVua25vd24oYnVmZmVyLCBkYXRhKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0RvblxcJ3Qga25vdyBob3cgdG8gc2VyaWFsaXplICcgKyB0aGlzLm5hbWUpO1xyXG59XHJcbmZ1bmN0aW9uIGRlc2VyaWFsaXplVW5rbm93bihidWZmZXIpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignRG9uXFwndCBrbm93IGhvdyB0byBkZXNlcmlhbGl6ZSAnICsgdGhpcy5uYW1lKTtcclxufVxyXG5mdW5jdGlvbiBzZXJpYWxpemVTdHJ1Y3QoYnVmZmVyLCBkYXRhLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKSB7XHJcbiAgICB2YXIgZV8yLCBfYTtcclxuICAgIGlmIChzdGF0ZSA9PT0gdm9pZCAwKSB7IHN0YXRlID0gbmV3IFNlcmlhbGl6ZXJTdGF0ZSgpOyB9XHJcbiAgICBpZiAoYWxsb3dFeHRlbnNpb25zID09PSB2b2lkIDApIHsgYWxsb3dFeHRlbnNpb25zID0gdHJ1ZTsgfVxyXG4gICAgaWYgKHR5cGVvZiBkYXRhICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZXhwZWN0ZWQgb2JqZWN0IGNvbnRhaW5pbmcgZGF0YTogJyArIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmJhc2UpIHtcclxuICAgICAgICB0aGlzLmJhc2Uuc2VyaWFsaXplKGJ1ZmZlciwgZGF0YSwgc3RhdGUsIGFsbG93RXh0ZW5zaW9ucyk7XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGZvciAodmFyIF9iID0gX192YWx1ZXModGhpcy5maWVsZHMpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XHJcbiAgICAgICAgICAgIHZhciBmaWVsZCA9IF9jLnZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoZmllbGQubmFtZSBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUuc2tpcHBlZEJpbmFyeUV4dGVuc2lvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndW5leHBlY3RlZCAnICsgdGhpcy5uYW1lICsgJy4nICsgZmllbGQubmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmaWVsZC50eXBlLnNlcmlhbGl6ZShidWZmZXIsIGRhdGFbZmllbGQubmFtZV0sIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMgJiYgZmllbGQgPT09IHRoaXMuZmllbGRzW3RoaXMuZmllbGRzLmxlbmd0aCAtIDFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChhbGxvd0V4dGVuc2lvbnMgJiYgZmllbGQudHlwZS5leHRlbnNpb25PZikge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnNraXBwZWRCaW5hcnlFeHRlbnNpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nICcgKyB0aGlzLm5hbWUgKyAnLicgKyBmaWVsZC5uYW1lICsgJyAodHlwZT0nICsgZmllbGQudHlwZS5uYW1lICsgJyknKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNhdGNoIChlXzJfMSkgeyBlXzIgPSB7IGVycm9yOiBlXzJfMSB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoX2MgJiYgIV9jLmRvbmUgJiYgKF9hID0gX2IucmV0dXJuKSkgX2EuY2FsbChfYik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZV8yKSB0aHJvdyBlXzIuZXJyb3I7IH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBkZXNlcmlhbGl6ZVN0cnVjdChidWZmZXIsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpIHtcclxuICAgIHZhciBlXzMsIF9hO1xyXG4gICAgaWYgKHN0YXRlID09PSB2b2lkIDApIHsgc3RhdGUgPSBuZXcgU2VyaWFsaXplclN0YXRlKCk7IH1cclxuICAgIGlmIChhbGxvd0V4dGVuc2lvbnMgPT09IHZvaWQgMCkgeyBhbGxvd0V4dGVuc2lvbnMgPSB0cnVlOyB9XHJcbiAgICB2YXIgcmVzdWx0O1xyXG4gICAgaWYgKHRoaXMuYmFzZSkge1xyXG4gICAgICAgIHJlc3VsdCA9IHRoaXMuYmFzZS5kZXNlcmlhbGl6ZShidWZmZXIsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmVzdWx0ID0ge307XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGZvciAodmFyIF9iID0gX192YWx1ZXModGhpcy5maWVsZHMpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XHJcbiAgICAgICAgICAgIHZhciBmaWVsZCA9IF9jLnZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoYWxsb3dFeHRlbnNpb25zICYmIGZpZWxkLnR5cGUuZXh0ZW5zaW9uT2YgJiYgIWJ1ZmZlci5oYXZlUmVhZERhdGEoKSkge1xyXG4gICAgICAgICAgICAgICAgc3RhdGUuc2tpcHBlZEJpbmFyeUV4dGVuc2lvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRbZmllbGQubmFtZV0gPSBmaWVsZC50eXBlLmRlc2VyaWFsaXplKGJ1ZmZlciwgc3RhdGUsIGFsbG93RXh0ZW5zaW9ucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZV8zXzEpIHsgZV8zID0geyBlcnJvcjogZV8zXzEgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iLnJldHVybikpIF9hLmNhbGwoX2IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMykgdGhyb3cgZV8zLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcbmZ1bmN0aW9uIHNlcmlhbGl6ZVZhcmlhbnQoYnVmZmVyLCBkYXRhLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKSB7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkgfHwgZGF0YS5sZW5ndGggIT09IDIgfHwgdHlwZW9mIGRhdGFbMF0gIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdleHBlY3RlZCB2YXJpYW50OiBbXCJ0eXBlXCIsIHZhbHVlXScpO1xyXG4gICAgfVxyXG4gICAgdmFyIGkgPSB0aGlzLmZpZWxkcy5maW5kSW5kZXgoZnVuY3Rpb24gKGZpZWxkKSB7IHJldHVybiBmaWVsZC5uYW1lID09PSBkYXRhWzBdOyB9KTtcclxuICAgIGlmIChpIDwgMCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInR5cGUgXFxcIlwiLmNvbmNhdChkYXRhWzBdLCBcIlxcXCIgaXMgbm90IHZhbGlkIGZvciB2YXJpYW50XCIpKTtcclxuICAgIH1cclxuICAgIGJ1ZmZlci5wdXNoVmFydWludDMyKGkpO1xyXG4gICAgdGhpcy5maWVsZHNbaV0udHlwZS5zZXJpYWxpemUoYnVmZmVyLCBkYXRhWzFdLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKTtcclxufVxyXG5mdW5jdGlvbiBkZXNlcmlhbGl6ZVZhcmlhbnQoYnVmZmVyLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKSB7XHJcbiAgICB2YXIgaSA9IGJ1ZmZlci5nZXRWYXJ1aW50MzIoKTtcclxuICAgIGlmIChpID49IHRoaXMuZmllbGRzLmxlbmd0aCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInR5cGUgaW5kZXggXCIuY29uY2F0KGksIFwiIGlzIG5vdCB2YWxpZCBmb3IgdmFyaWFudFwiKSk7XHJcbiAgICB9XHJcbiAgICB2YXIgZmllbGQgPSB0aGlzLmZpZWxkc1tpXTtcclxuICAgIHJldHVybiBbZmllbGQubmFtZSwgZmllbGQudHlwZS5kZXNlcmlhbGl6ZShidWZmZXIsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpXTtcclxufVxyXG5mdW5jdGlvbiBzZXJpYWxpemVBcnJheShidWZmZXIsIGRhdGEsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpIHtcclxuICAgIHZhciBlXzQsIF9hO1xyXG4gICAgYnVmZmVyLnB1c2hWYXJ1aW50MzIoZGF0YS5sZW5ndGgpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBmb3IgKHZhciBkYXRhXzIgPSBfX3ZhbHVlcyhkYXRhKSwgZGF0YV8yXzEgPSBkYXRhXzIubmV4dCgpOyAhZGF0YV8yXzEuZG9uZTsgZGF0YV8yXzEgPSBkYXRhXzIubmV4dCgpKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gZGF0YV8yXzEudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuYXJyYXlPZi5zZXJpYWxpemUoYnVmZmVyLCBpdGVtLCBzdGF0ZSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNhdGNoIChlXzRfMSkgeyBlXzQgPSB7IGVycm9yOiBlXzRfMSB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YV8yXzEgJiYgIWRhdGFfMl8xLmRvbmUgJiYgKF9hID0gZGF0YV8yLnJldHVybikpIF9hLmNhbGwoZGF0YV8yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlXzQpIHRocm93IGVfNC5lcnJvcjsgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGRlc2VyaWFsaXplQXJyYXkoYnVmZmVyLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKSB7XHJcbiAgICB2YXIgbGVuID0gYnVmZmVyLmdldFZhcnVpbnQzMigpO1xyXG4gICAgdmFyIHJlc3VsdCA9IFtdO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuYXJyYXlPZi5kZXNlcmlhbGl6ZShidWZmZXIsIHN0YXRlLCBmYWxzZSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5mdW5jdGlvbiBzZXJpYWxpemVPcHRpb25hbChidWZmZXIsIGRhdGEsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpIHtcclxuICAgIGlmIChkYXRhID09PSBudWxsIHx8IGRhdGEgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGJ1ZmZlci5wdXNoKDApO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgYnVmZmVyLnB1c2goMSk7XHJcbiAgICAgICAgdGhpcy5vcHRpb25hbE9mLnNlcmlhbGl6ZShidWZmZXIsIGRhdGEsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGRlc2VyaWFsaXplT3B0aW9uYWwoYnVmZmVyLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKSB7XHJcbiAgICBpZiAoYnVmZmVyLmdldCgpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uYWxPZi5kZXNlcmlhbGl6ZShidWZmZXIsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gc2VyaWFsaXplRXh0ZW5zaW9uKGJ1ZmZlciwgZGF0YSwgc3RhdGUsIGFsbG93RXh0ZW5zaW9ucykge1xyXG4gICAgdGhpcy5leHRlbnNpb25PZi5zZXJpYWxpemUoYnVmZmVyLCBkYXRhLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKTtcclxufVxyXG5mdW5jdGlvbiBkZXNlcmlhbGl6ZUV4dGVuc2lvbihidWZmZXIsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpIHtcclxuICAgIHJldHVybiB0aGlzLmV4dGVuc2lvbk9mLmRlc2VyaWFsaXplKGJ1ZmZlciwgc3RhdGUsIGFsbG93RXh0ZW5zaW9ucyk7XHJcbn1cclxuZnVuY3Rpb24gc2VyaWFsaXplT2JqZWN0KGJ1ZmZlciwgZGF0YSwgc3RhdGUsIGFsbG93RXh0ZW5zaW9ucykge1xyXG4gICAgdmFyIGVfNSwgX2E7XHJcbiAgICB2YXIgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKGRhdGEpO1xyXG4gICAgYnVmZmVyLnB1c2hWYXJ1aW50MzIoZW50cmllcy5sZW5ndGgpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBmb3IgKHZhciBlbnRyaWVzXzEgPSBfX3ZhbHVlcyhlbnRyaWVzKSwgZW50cmllc18xXzEgPSBlbnRyaWVzXzEubmV4dCgpOyAhZW50cmllc18xXzEuZG9uZTsgZW50cmllc18xXzEgPSBlbnRyaWVzXzEubmV4dCgpKSB7XHJcbiAgICAgICAgICAgIHZhciBfYiA9IF9fcmVhZChlbnRyaWVzXzFfMS52YWx1ZSwgMiksIGtleSA9IF9iWzBdLCB2YWx1ZSA9IF9iWzFdO1xyXG4gICAgICAgICAgICB2YXIga2V5VHlwZSA9IHRoaXMuZmllbGRzWzBdLnR5cGU7XHJcbiAgICAgICAgICAgIHZhciBkYXRhVHlwZSA9IHRoaXMuZmllbGRzWzFdLnR5cGU7XHJcbiAgICAgICAgICAgIGtleVR5cGUuc2VyaWFsaXplKGJ1ZmZlciwga2V5LCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKTtcclxuICAgICAgICAgICAgZGF0YVR5cGUuc2VyaWFsaXplKGJ1ZmZlciwgdmFsdWUsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNhdGNoIChlXzVfMSkgeyBlXzUgPSB7IGVycm9yOiBlXzVfMSB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZW50cmllc18xXzEgJiYgIWVudHJpZXNfMV8xLmRvbmUgJiYgKF9hID0gZW50cmllc18xLnJldHVybikpIF9hLmNhbGwoZW50cmllc18xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlXzUpIHRocm93IGVfNS5lcnJvcjsgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGRlc2VyaWFsaXplT2JqZWN0KGJ1ZmZlciwgc3RhdGUsIGFsbG93RXh0ZW5zaW9ucykge1xyXG4gICAgdmFyIGxlbiA9IGJ1ZmZlci5nZXRWYXJ1aW50MzIoKTtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgICB2YXIga2V5VHlwZSA9IHRoaXMuZmllbGRzWzBdLnR5cGU7XHJcbiAgICAgICAgdmFyIGRhdGFUeXBlID0gdGhpcy5maWVsZHNbMV0udHlwZTtcclxuICAgICAgICB2YXIga2V5ID0ga2V5VHlwZS5kZXNlcmlhbGl6ZShidWZmZXIsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpO1xyXG4gICAgICAgIHJlc3VsdFtrZXldID0gZGF0YVR5cGUuZGVzZXJpYWxpemUoYnVmZmVyLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuZnVuY3Rpb24gc2VyaWFsaXplUGFpcihidWZmZXIsIGRhdGEsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpIHtcclxuICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICBidWZmZXIucHVzaFZhcnVpbnQzMihkYXRhLmxlbmd0aCk7XHJcbiAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICBfdGhpcy5maWVsZHNbMF0udHlwZS5zZXJpYWxpemUoYnVmZmVyLCBpdGVtWzBdLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKTtcclxuICAgICAgICBfdGhpcy5maWVsZHNbMV0udHlwZS5zZXJpYWxpemUoYnVmZmVyLCBpdGVtWzFdLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKTtcclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIGRlc2VyaWFsaXplUGFpcihidWZmZXIsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpIHtcclxuICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgIHZhciBsZW4gPSBidWZmZXIuZ2V0VmFydWludDMyKCk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgcmVzdWx0LnB1c2godGhpcy5maWVsZHNbMF0udHlwZS5kZXNlcmlhbGl6ZShidWZmZXIsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpKTtcclxuICAgICAgICByZXN1bHQucHVzaCh0aGlzLmZpZWxkc1sxXS50eXBlLmRlc2VyaWFsaXplKGJ1ZmZlciwgc3RhdGUsIGFsbG93RXh0ZW5zaW9ucykpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG52YXIgY3JlYXRlVHlwZSA9IGZ1bmN0aW9uIChhdHRycykge1xyXG4gICAgcmV0dXJuIF9fYXNzaWduKHsgbmFtZTogJzxtaXNzaW5nIG5hbWU+JywgYWxpYXNPZk5hbWU6ICcnLCBhcnJheU9mOiBudWxsLCBvcHRpb25hbE9mOiBudWxsLCBleHRlbnNpb25PZjogbnVsbCwgYmFzZU5hbWU6ICcnLCBiYXNlOiBudWxsLCBmaWVsZHM6IFtdLCBzZXJpYWxpemU6IHNlcmlhbGl6ZVVua25vd24sIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZVVua25vd24gfSwgYXR0cnMpO1xyXG59O1xyXG52YXIgY2hlY2tSYW5nZSA9IGZ1bmN0aW9uIChvcmlnLCBjb252ZXJ0ZWQpIHtcclxuICAgIGlmIChOdW1iZXIuaXNOYU4oK29yaWcpIHx8IE51bWJlci5pc05hTigrY29udmVydGVkKSB8fCAodHlwZW9mIG9yaWcgIT09ICdudW1iZXInICYmIHR5cGVvZiBvcmlnICE9PSAnc3RyaW5nJykpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIG51bWJlcicpO1xyXG4gICAgfVxyXG4gICAgaWYgKCtvcmlnICE9PSArY29udmVydGVkKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOdW1iZXIgaXMgb3V0IG9mIHJhbmdlJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gK29yaWc7XHJcbn07XHJcbi8qKiBDcmVhdGUgdGhlIHNldCBvZiB0eXBlcyBidWlsdC1pbiB0byB0aGUgYWJpIGZvcm1hdCAqL1xyXG52YXIgY3JlYXRlSW5pdGlhbFR5cGVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHJlc3VsdCA9IG5ldyBNYXAoT2JqZWN0LmVudHJpZXMoe1xyXG4gICAgICAgIGJvb2w6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgICAgICBuYW1lOiAnYm9vbCcsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEodHlwZW9mIGRhdGEgPT09ICdib29sZWFuJyB8fCB0eXBlb2YgZGF0YSA9PT0gJ251bWJlcicgJiYgKGRhdGEgPT09IDEgfHwgZGF0YSA9PT0gMCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBib29sZWFuIG9yIG51bWJlciBlcXVhbCB0byAxIG9yIDAnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoKGRhdGEgPyAxIDogMCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiAhIWJ1ZmZlci5nZXQoKTsgfSxcclxuICAgICAgICB9KSxcclxuICAgICAgICB1aW50ODogY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgICAgIG5hbWU6ICd1aW50OCcsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaChjaGVja1JhbmdlKGRhdGEsIGRhdGEgJiAweGZmKSk7IH0sXHJcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0KCk7IH0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgaW50ODogY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgICAgIG5hbWU6ICdpbnQ4JyxcclxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoKGNoZWNrUmFuZ2UoZGF0YSwgZGF0YSA8PCAyNCA+PiAyNCkpOyB9LFxyXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldCgpIDw8IDI0ID4+IDI0OyB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHVpbnQxNjogY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgICAgIG5hbWU6ICd1aW50MTYnLFxyXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2hVaW50MTYoY2hlY2tSYW5nZShkYXRhLCBkYXRhICYgMHhmZmZmKSk7IH0sXHJcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0VWludDE2KCk7IH0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgaW50MTY6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgICAgICBuYW1lOiAnaW50MTYnLFxyXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2hVaW50MTYoY2hlY2tSYW5nZShkYXRhLCBkYXRhIDw8IDE2ID4+IDE2KSk7IH0sXHJcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0VWludDE2KCkgPDwgMTYgPj4gMTY7IH0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgdWludDMyOiBjcmVhdGVUeXBlKHtcclxuICAgICAgICAgICAgbmFtZTogJ3VpbnQzMicsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaFVpbnQzMihjaGVja1JhbmdlKGRhdGEsIGRhdGEgPj4+IDApKTsgfSxcclxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRVaW50MzIoKTsgfSxcclxuICAgICAgICB9KSxcclxuICAgICAgICB1aW50NjQ6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgICAgICBuYW1lOiAndWludDY0JyxcclxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBidWZmZXIucHVzaEFycmF5KG51bWVyaWMuZGVjaW1hbFRvQmluYXJ5KDgsICcnICsgZGF0YSkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gbnVtZXJpYy5iaW5hcnlUb0RlY2ltYWwoYnVmZmVyLmdldFVpbnQ4QXJyYXkoOCkpOyB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGludDY0OiBjcmVhdGVUeXBlKHtcclxuICAgICAgICAgICAgbmFtZTogJ2ludDY0JyxcclxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBidWZmZXIucHVzaEFycmF5KG51bWVyaWMuc2lnbmVkRGVjaW1hbFRvQmluYXJ5KDgsICcnICsgZGF0YSkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gbnVtZXJpYy5zaWduZWRCaW5hcnlUb0RlY2ltYWwoYnVmZmVyLmdldFVpbnQ4QXJyYXkoOCkpOyB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGludDMyOiBjcmVhdGVUeXBlKHtcclxuICAgICAgICAgICAgbmFtZTogJ2ludDMyJyxcclxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoVWludDMyKGNoZWNrUmFuZ2UoZGF0YSwgZGF0YSB8IDApKTsgfSxcclxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRVaW50MzIoKSB8IDA7IH0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgdmFydWludDMyOiBjcmVhdGVUeXBlKHtcclxuICAgICAgICAgICAgbmFtZTogJ3ZhcnVpbnQzMicsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaFZhcnVpbnQzMihjaGVja1JhbmdlKGRhdGEsIGRhdGEgPj4+IDApKTsgfSxcclxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRWYXJ1aW50MzIoKTsgfSxcclxuICAgICAgICB9KSxcclxuICAgICAgICB2YXJpbnQzMjogY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgICAgIG5hbWU6ICd2YXJpbnQzMicsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaFZhcmludDMyKGNoZWNrUmFuZ2UoZGF0YSwgZGF0YSB8IDApKTsgfSxcclxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRWYXJpbnQzMigpOyB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHVpbnQxMjg6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgICAgICBuYW1lOiAndWludDEyOCcsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaEFycmF5KG51bWVyaWMuZGVjaW1hbFRvQmluYXJ5KDE2LCAnJyArIGRhdGEpKTsgfSxcclxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIG51bWVyaWMuYmluYXJ5VG9EZWNpbWFsKGJ1ZmZlci5nZXRVaW50OEFycmF5KDE2KSk7IH0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgaW50MTI4OiBjcmVhdGVUeXBlKHtcclxuICAgICAgICAgICAgbmFtZTogJ2ludDEyOCcsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyLnB1c2hBcnJheShudW1lcmljLnNpZ25lZERlY2ltYWxUb0JpbmFyeSgxNiwgJycgKyBkYXRhKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBudW1lcmljLnNpZ25lZEJpbmFyeVRvRGVjaW1hbChidWZmZXIuZ2V0VWludDhBcnJheSgxNikpOyB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGZsb2F0MzI6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgICAgICBuYW1lOiAnZmxvYXQzMicsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaEZsb2F0MzIoZGF0YSk7IH0sXHJcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0RmxvYXQzMigpOyB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGZsb2F0NjQ6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgICAgICBuYW1lOiAnZmxvYXQ2NCcsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaEZsb2F0NjQoZGF0YSk7IH0sXHJcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0RmxvYXQ2NCgpOyB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGZsb2F0MTI4OiBjcmVhdGVUeXBlKHtcclxuICAgICAgICAgICAgbmFtZTogJ2Zsb2F0MTI4JyxcclxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoVWludDhBcnJheUNoZWNrZWQoKDAsIGV4cG9ydHMuaGV4VG9VaW50OEFycmF5KShkYXRhKSwgMTYpOyB9LFxyXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gKDAsIGV4cG9ydHMuYXJyYXlUb0hleCkoYnVmZmVyLmdldFVpbnQ4QXJyYXkoMTYpKTsgfSxcclxuICAgICAgICB9KSxcclxuICAgICAgICBieXRlczogY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgICAgIG5hbWU6ICdieXRlcycsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBVaW50OEFycmF5IHx8IEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBidWZmZXIucHVzaEJ5dGVzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyLnB1c2hCeXRlcygoMCwgZXhwb3J0cy5oZXhUb1VpbnQ4QXJyYXkpKGRhdGEpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIHN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUgJiYgc3RhdGUub3B0aW9ucy5ieXRlc0FzVWludDhBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBidWZmZXIuZ2V0Qnl0ZXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoMCwgZXhwb3J0cy5hcnJheVRvSGV4KShidWZmZXIuZ2V0Qnl0ZXMoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgc3RyaW5nOiBjcmVhdGVUeXBlKHtcclxuICAgICAgICAgICAgbmFtZTogJ3N0cmluZycsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaFN0cmluZyhkYXRhKTsgfSxcclxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRTdHJpbmcoKTsgfSxcclxuICAgICAgICB9KSxcclxuICAgICAgICBuYW1lOiBjcmVhdGVUeXBlKHtcclxuICAgICAgICAgICAgbmFtZTogJ25hbWUnLFxyXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2hOYW1lKGRhdGEpOyB9LFxyXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldE5hbWUoKTsgfSxcclxuICAgICAgICB9KSxcclxuICAgICAgICB0aW1lX3BvaW50OiBjcmVhdGVUeXBlKHtcclxuICAgICAgICAgICAgbmFtZTogJ3RpbWVfcG9pbnQnLFxyXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2hOdW1iZXJBc1VpbnQ2NCgoMCwgZXhwb3J0cy5kYXRlVG9UaW1lUG9pbnQpKGRhdGEpKTsgfSxcclxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuICgwLCBleHBvcnRzLnRpbWVQb2ludFRvRGF0ZSkoYnVmZmVyLmdldFVpbnQ2NEFzTnVtYmVyKCkpOyB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHRpbWVfcG9pbnRfc2VjOiBjcmVhdGVUeXBlKHtcclxuICAgICAgICAgICAgbmFtZTogJ3RpbWVfcG9pbnRfc2VjJyxcclxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoVWludDMyKCgwLCBleHBvcnRzLmRhdGVUb1RpbWVQb2ludFNlYykoZGF0YSkpOyB9LFxyXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gKDAsIGV4cG9ydHMudGltZVBvaW50U2VjVG9EYXRlKShidWZmZXIuZ2V0VWludDMyKCkpOyB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGJsb2NrX3RpbWVzdGFtcF90eXBlOiBjcmVhdGVUeXBlKHtcclxuICAgICAgICAgICAgbmFtZTogJ2Jsb2NrX3RpbWVzdGFtcF90eXBlJyxcclxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoVWludDMyKCgwLCBleHBvcnRzLmRhdGVUb0Jsb2NrVGltZXN0YW1wKShkYXRhKSk7IH0sXHJcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiAoMCwgZXhwb3J0cy5ibG9ja1RpbWVzdGFtcFRvRGF0ZSkoYnVmZmVyLmdldFVpbnQzMigpKTsgfSxcclxuICAgICAgICB9KSxcclxuICAgICAgICBzeW1ib2xfY29kZTogY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgICAgIG5hbWU6ICdzeW1ib2xfY29kZScsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaFN5bWJvbENvZGUoZGF0YSk7IH0sXHJcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0U3ltYm9sQ29kZSgpOyB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHN5bWJvbDogY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgICAgIG5hbWU6ICdzeW1ib2wnLFxyXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2hTeW1ib2woKDAsIGV4cG9ydHMuc3RyaW5nVG9TeW1ib2wpKGRhdGEpKTsgfSxcclxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuICgwLCBleHBvcnRzLnN5bWJvbFRvU3RyaW5nKShidWZmZXIuZ2V0U3ltYm9sKCkpOyB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGFzc2V0OiBjcmVhdGVUeXBlKHtcclxuICAgICAgICAgICAgbmFtZTogJ2Fzc2V0JyxcclxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoQXNzZXQoZGF0YSk7IH0sXHJcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0QXNzZXQoKTsgfSxcclxuICAgICAgICB9KSxcclxuICAgICAgICBjaGVja3N1bTE2MDogY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgICAgIG5hbWU6ICdjaGVja3N1bTE2MCcsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaFVpbnQ4QXJyYXlDaGVja2VkKCgwLCBleHBvcnRzLmhleFRvVWludDhBcnJheSkoZGF0YSksIDIwKTsgfSxcclxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuICgwLCBleHBvcnRzLmFycmF5VG9IZXgpKGJ1ZmZlci5nZXRVaW50OEFycmF5KDIwKSk7IH0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgY2hlY2tzdW0yNTY6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgICAgICBuYW1lOiAnY2hlY2tzdW0yNTYnLFxyXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2hVaW50OEFycmF5Q2hlY2tlZCgoMCwgZXhwb3J0cy5oZXhUb1VpbnQ4QXJyYXkpKGRhdGEpLCAzMik7IH0sXHJcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiAoMCwgZXhwb3J0cy5hcnJheVRvSGV4KShidWZmZXIuZ2V0VWludDhBcnJheSgzMikpOyB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGNoZWNrc3VtNTEyOiBjcmVhdGVUeXBlKHtcclxuICAgICAgICAgICAgbmFtZTogJ2NoZWNrc3VtNTEyJyxcclxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoVWludDhBcnJheUNoZWNrZWQoKDAsIGV4cG9ydHMuaGV4VG9VaW50OEFycmF5KShkYXRhKSwgNjQpOyB9LFxyXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gKDAsIGV4cG9ydHMuYXJyYXlUb0hleCkoYnVmZmVyLmdldFVpbnQ4QXJyYXkoNjQpKTsgfSxcclxuICAgICAgICB9KSxcclxuICAgICAgICBwdWJsaWNfa2V5OiBjcmVhdGVUeXBlKHtcclxuICAgICAgICAgICAgbmFtZTogJ3B1YmxpY19rZXknLFxyXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2hQdWJsaWNLZXkoZGF0YSk7IH0sXHJcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0UHVibGljS2V5KCk7IH0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgcHJpdmF0ZV9rZXk6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgICAgICBuYW1lOiAncHJpdmF0ZV9rZXknLFxyXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2hQcml2YXRlS2V5KGRhdGEpOyB9LFxyXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldFByaXZhdGVLZXkoKTsgfSxcclxuICAgICAgICB9KSxcclxuICAgICAgICBzaWduYXR1cmU6IGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgICAgICBuYW1lOiAnc2lnbmF0dXJlJyxcclxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoU2lnbmF0dXJlKGRhdGEpOyB9LFxyXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldFNpZ25hdHVyZSgpOyB9LFxyXG4gICAgICAgIH0pLFxyXG4gICAgfSkpO1xyXG4gICAgcmVzdWx0LnNldCgnZXh0ZW5kZWRfYXNzZXQnLCBjcmVhdGVUeXBlKHtcclxuICAgICAgICBuYW1lOiAnZXh0ZW5kZWRfYXNzZXQnLFxyXG4gICAgICAgIGJhc2VOYW1lOiAnJyxcclxuICAgICAgICBmaWVsZHM6IFtcclxuICAgICAgICAgICAgeyBuYW1lOiAncXVhbnRpdHknLCB0eXBlTmFtZTogJ2Fzc2V0JywgdHlwZTogcmVzdWx0LmdldCgnYXNzZXQnKSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdjb250cmFjdCcsIHR5cGVOYW1lOiAnbmFtZScsIHR5cGU6IHJlc3VsdC5nZXQoJ25hbWUnKSB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgc2VyaWFsaXplOiBzZXJpYWxpemVTdHJ1Y3QsXHJcbiAgICAgICAgZGVzZXJpYWxpemU6IGRlc2VyaWFsaXplU3RydWN0LFxyXG4gICAgfSkpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTsgLy8gY3JlYXRlSW5pdGlhbFR5cGVzKClcclxuZXhwb3J0cy5jcmVhdGVJbml0aWFsVHlwZXMgPSBjcmVhdGVJbml0aWFsVHlwZXM7XHJcbnZhciBjcmVhdGVBYmlUeXBlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBpbml0aWFsVHlwZXMgPSAoMCwgZXhwb3J0cy5jcmVhdGVJbml0aWFsVHlwZXMpKCk7XHJcbiAgICBpbml0aWFsVHlwZXMuc2V0KCdleHRlbnNpb25zX2VudHJ5JywgY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgbmFtZTogJ2V4dGVuc2lvbnNfZW50cnknLFxyXG4gICAgICAgIGJhc2VOYW1lOiAnJyxcclxuICAgICAgICBmaWVsZHM6IFtcclxuICAgICAgICAgICAgeyBuYW1lOiAndGFnJywgdHlwZU5hbWU6ICd1aW50MTYnLCB0eXBlOiBudWxsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ3ZhbHVlJywgdHlwZU5hbWU6ICdieXRlcycsIHR5cGU6IG51bGwgfVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgc2VyaWFsaXplOiBzZXJpYWxpemVTdHJ1Y3QsXHJcbiAgICAgICAgZGVzZXJpYWxpemU6IGRlc2VyaWFsaXplU3RydWN0LFxyXG4gICAgfSkpO1xyXG4gICAgaW5pdGlhbFR5cGVzLnNldCgndHlwZV9kZWYnLCBjcmVhdGVUeXBlKHtcclxuICAgICAgICBuYW1lOiAndHlwZV9kZWYnLFxyXG4gICAgICAgIGJhc2VOYW1lOiAnJyxcclxuICAgICAgICBmaWVsZHM6IFtcclxuICAgICAgICAgICAgeyBuYW1lOiAnbmV3X3R5cGVfbmFtZScsIHR5cGVOYW1lOiAnc3RyaW5nJywgdHlwZTogbnVsbCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICd0eXBlJywgdHlwZU5hbWU6ICdzdHJpbmcnLCB0eXBlOiBudWxsIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplU3RydWN0LFxyXG4gICAgICAgIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZVN0cnVjdCxcclxuICAgIH0pKTtcclxuICAgIGluaXRpYWxUeXBlcy5zZXQoJ2ZpZWxkX2RlZicsIGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgIG5hbWU6ICdmaWVsZF9kZWYnLFxyXG4gICAgICAgIGJhc2VOYW1lOiAnJyxcclxuICAgICAgICBmaWVsZHM6IFtcclxuICAgICAgICAgICAgeyBuYW1lOiAnbmFtZScsIHR5cGVOYW1lOiAnc3RyaW5nJywgdHlwZTogbnVsbCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICd0eXBlJywgdHlwZU5hbWU6ICdzdHJpbmcnLCB0eXBlOiBudWxsIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplU3RydWN0LFxyXG4gICAgICAgIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZVN0cnVjdCxcclxuICAgIH0pKTtcclxuICAgIGluaXRpYWxUeXBlcy5zZXQoJ3N0cnVjdF9kZWYnLCBjcmVhdGVUeXBlKHtcclxuICAgICAgICBuYW1lOiAnc3RydWN0X2RlZicsXHJcbiAgICAgICAgYmFzZU5hbWU6ICcnLFxyXG4gICAgICAgIGZpZWxkczogW1xyXG4gICAgICAgICAgICB7IG5hbWU6ICduYW1lJywgdHlwZU5hbWU6ICdzdHJpbmcnLCB0eXBlOiBudWxsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ2Jhc2UnLCB0eXBlTmFtZTogJ3N0cmluZycsIHR5cGU6IG51bGwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnZmllbGRzJywgdHlwZU5hbWU6ICdmaWVsZF9kZWZbXScsIHR5cGU6IG51bGwgfVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgc2VyaWFsaXplOiBzZXJpYWxpemVTdHJ1Y3QsXHJcbiAgICAgICAgZGVzZXJpYWxpemU6IGRlc2VyaWFsaXplU3RydWN0LFxyXG4gICAgfSkpO1xyXG4gICAgaW5pdGlhbFR5cGVzLnNldCgnYWN0aW9uX2RlZicsIGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgIG5hbWU6ICdhY3Rpb25fZGVmJyxcclxuICAgICAgICBiYXNlTmFtZTogJycsXHJcbiAgICAgICAgZmllbGRzOiBbXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ25hbWUnLCB0eXBlTmFtZTogJ25hbWUnLCB0eXBlOiBudWxsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ3R5cGUnLCB0eXBlTmFtZTogJ3N0cmluZycsIHR5cGU6IG51bGwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAncmljYXJkaWFuX2NvbnRyYWN0JywgdHlwZU5hbWU6ICdzdHJpbmcnLCB0eXBlOiBudWxsIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplU3RydWN0LFxyXG4gICAgICAgIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZVN0cnVjdCxcclxuICAgIH0pKTtcclxuICAgIGluaXRpYWxUeXBlcy5zZXQoJ3RhYmxlX2RlZicsIGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgIG5hbWU6ICd0YWJsZV9kZWYnLFxyXG4gICAgICAgIGJhc2VOYW1lOiAnJyxcclxuICAgICAgICBmaWVsZHM6IFtcclxuICAgICAgICAgICAgeyBuYW1lOiAnbmFtZScsIHR5cGVOYW1lOiAnbmFtZScsIHR5cGU6IG51bGwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnaW5kZXhfdHlwZScsIHR5cGVOYW1lOiAnc3RyaW5nJywgdHlwZTogbnVsbCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdrZXlfbmFtZXMnLCB0eXBlTmFtZTogJ3N0cmluZ1tdJywgdHlwZTogbnVsbCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdrZXlfdHlwZXMnLCB0eXBlTmFtZTogJ3N0cmluZ1tdJywgdHlwZTogbnVsbCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICd0eXBlJywgdHlwZU5hbWU6ICdzdHJpbmcnLCB0eXBlOiBudWxsIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplU3RydWN0LFxyXG4gICAgICAgIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZVN0cnVjdCxcclxuICAgIH0pKTtcclxuICAgIGluaXRpYWxUeXBlcy5zZXQoJ2NsYXVzZV9wYWlyJywgY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgbmFtZTogJ2NsYXVzZV9wYWlyJyxcclxuICAgICAgICBiYXNlTmFtZTogJycsXHJcbiAgICAgICAgZmllbGRzOiBbXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ2lkJywgdHlwZU5hbWU6ICdzdHJpbmcnLCB0eXBlOiBudWxsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ2JvZHknLCB0eXBlTmFtZTogJ3N0cmluZycsIHR5cGU6IG51bGwgfVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgc2VyaWFsaXplOiBzZXJpYWxpemVTdHJ1Y3QsXHJcbiAgICAgICAgZGVzZXJpYWxpemU6IGRlc2VyaWFsaXplU3RydWN0LFxyXG4gICAgfSkpO1xyXG4gICAgaW5pdGlhbFR5cGVzLnNldCgnZXJyb3JfbWVzc2FnZScsIGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgIG5hbWU6ICdlcnJvcl9tZXNzYWdlJyxcclxuICAgICAgICBiYXNlTmFtZTogJycsXHJcbiAgICAgICAgZmllbGRzOiBbXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ2Vycm9yX2NvZGUnLCB0eXBlTmFtZTogJ3VpbnQ2NCcsIHR5cGU6IG51bGwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnZXJyb3JfbXNnJywgdHlwZU5hbWU6ICdzdHJpbmcnLCB0eXBlOiBudWxsIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplU3RydWN0LFxyXG4gICAgICAgIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZVN0cnVjdCxcclxuICAgIH0pKTtcclxuICAgIGluaXRpYWxUeXBlcy5zZXQoJ3ZhcmlhbnRfZGVmJywgY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgbmFtZTogJ3ZhcmlhbnRfZGVmJyxcclxuICAgICAgICBiYXNlTmFtZTogJycsXHJcbiAgICAgICAgZmllbGRzOiBbXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ25hbWUnLCB0eXBlTmFtZTogJ3N0cmluZycsIHR5cGU6IG51bGwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAndHlwZXMnLCB0eXBlTmFtZTogJ3N0cmluZ1tdJywgdHlwZTogbnVsbCB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBzZXJpYWxpemU6IHNlcmlhbGl6ZVN0cnVjdCxcclxuICAgICAgICBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVTdHJ1Y3QsXHJcbiAgICB9KSk7XHJcbiAgICBpbml0aWFsVHlwZXMuc2V0KCdhY3Rpb25fcmVzdWx0JywgY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgbmFtZTogJ2FjdGlvbl9yZXN1bHQnLFxyXG4gICAgICAgIGJhc2VOYW1lOiAnJyxcclxuICAgICAgICBmaWVsZHM6IFtcclxuICAgICAgICAgICAgeyBuYW1lOiAnbmFtZScsIHR5cGVOYW1lOiAnbmFtZScsIHR5cGU6IG51bGwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAncmVzdWx0X3R5cGUnLCB0eXBlTmFtZTogJ3N0cmluZycsIHR5cGU6IG51bGwgfVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgc2VyaWFsaXplOiBzZXJpYWxpemVTdHJ1Y3QsXHJcbiAgICAgICAgZGVzZXJpYWxpemU6IGRlc2VyaWFsaXplU3RydWN0LFxyXG4gICAgfSkpO1xyXG4gICAgaW5pdGlhbFR5cGVzLnNldCgncHJpbWFyeV9rZXlfaW5kZXhfZGVmJywgY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgbmFtZTogJ3ByaW1hcnlfa2V5X2luZGV4X2RlZicsXHJcbiAgICAgICAgYmFzZU5hbWU6ICcnLFxyXG4gICAgICAgIGZpZWxkczogW1xyXG4gICAgICAgICAgICB7IG5hbWU6ICduYW1lJywgdHlwZU5hbWU6ICduYW1lJywgdHlwZTogbnVsbCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICd0eXBlJywgdHlwZU5hbWU6ICdzdHJpbmcnLCB0eXBlOiBudWxsIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplU3RydWN0LFxyXG4gICAgICAgIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZVN0cnVjdCxcclxuICAgIH0pKTtcclxuICAgIGluaXRpYWxUeXBlcy5zZXQoJ3NlY29uZGFyeV9pbmRleF9kZWYnLCBjcmVhdGVUeXBlKHtcclxuICAgICAgICBuYW1lOiAnc2Vjb25kYXJ5X2luZGV4X2RlZicsXHJcbiAgICAgICAgYmFzZU5hbWU6ICcnLFxyXG4gICAgICAgIGZpZWxkczogW1xyXG4gICAgICAgICAgICB7IG5hbWU6ICd0eXBlJywgdHlwZU5hbWU6ICdzdHJpbmcnLCB0eXBlOiBudWxsIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgICBzZXJpYWxpemU6IHNlcmlhbGl6ZVN0cnVjdCxcclxuICAgICAgICBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVTdHJ1Y3QsXHJcbiAgICB9KSk7XHJcbiAgICBpbml0aWFsVHlwZXMuc2V0KCdzZWNvbmRhcnlfaW5kaWNlcycsIGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgIG5hbWU6ICdzZWNvbmRhcnlfaW5kaWNlcycsXHJcbiAgICAgICAgYmFzZU5hbWU6ICcnLFxyXG4gICAgICAgIGZpZWxkczogW1xyXG4gICAgICAgICAgICB7IG5hbWU6ICduYW1lJywgdHlwZU5hbWU6ICduYW1lJywgdHlwZTogbnVsbCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdzZWNvbmRhcnlfaW5kZXhfZGVmJywgdHlwZU5hbWU6ICdzZWNvbmRhcnlfaW5kZXhfZGVmJywgdHlwZTogbnVsbCB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBzZXJpYWxpemU6IHNlcmlhbGl6ZU9iamVjdCxcclxuICAgICAgICBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVPYmplY3QsXHJcbiAgICB9KSk7XHJcbiAgICBpbml0aWFsVHlwZXMuc2V0KCdrdl90YWJsZV9lbnRyeV9kZWYnLCBjcmVhdGVUeXBlKHtcclxuICAgICAgICBuYW1lOiAna3ZfdGFibGVfZW50cnlfZGVmJyxcclxuICAgICAgICBiYXNlTmFtZTogJycsXHJcbiAgICAgICAgZmllbGRzOiBbXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ3R5cGUnLCB0eXBlTmFtZTogJ3N0cmluZycsIHR5cGU6IG51bGwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAncHJpbWFyeV9pbmRleCcsIHR5cGVOYW1lOiAncHJpbWFyeV9rZXlfaW5kZXhfZGVmJywgdHlwZTogbnVsbCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdzZWNvbmRhcnlfaW5kaWNlcycsIHR5cGVOYW1lOiAnc2Vjb25kYXJ5X2luZGljZXMnLCB0eXBlOiBudWxsIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplU3RydWN0LFxyXG4gICAgICAgIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZVN0cnVjdCxcclxuICAgIH0pKTtcclxuICAgIGluaXRpYWxUeXBlcy5zZXQoJ2t2X3RhYmxlJywgY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgbmFtZTogJ2t2X3RhYmxlJyxcclxuICAgICAgICBiYXNlTmFtZTogJycsXHJcbiAgICAgICAgZmllbGRzOiBbXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ25hbWUnLCB0eXBlTmFtZTogJ25hbWUnLCB0eXBlOiBudWxsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ2t2X3RhYmxlX2VudHJ5X2RlZicsIHR5cGVOYW1lOiAna3ZfdGFibGVfZW50cnlfZGVmJywgdHlwZTogbnVsbCB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBzZXJpYWxpemU6IHNlcmlhbGl6ZU9iamVjdCxcclxuICAgICAgICBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVPYmplY3RcclxuICAgIH0pKTtcclxuICAgIGluaXRpYWxUeXBlcy5zZXQoJ2FiaV9kZWYnLCBjcmVhdGVUeXBlKHtcclxuICAgICAgICBuYW1lOiAnYWJpX2RlZicsXHJcbiAgICAgICAgYmFzZU5hbWU6ICcnLFxyXG4gICAgICAgIGZpZWxkczogW1xyXG4gICAgICAgICAgICB7IG5hbWU6ICd2ZXJzaW9uJywgdHlwZU5hbWU6ICdzdHJpbmcnLCB0eXBlOiBudWxsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ3R5cGVzJywgdHlwZU5hbWU6ICd0eXBlX2RlZltdJywgdHlwZTogbnVsbCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdzdHJ1Y3RzJywgdHlwZU5hbWU6ICdzdHJ1Y3RfZGVmW10nLCB0eXBlOiBudWxsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ2FjdGlvbnMnLCB0eXBlTmFtZTogJ2FjdGlvbl9kZWZbXScsIHR5cGU6IG51bGwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAndGFibGVzJywgdHlwZU5hbWU6ICd0YWJsZV9kZWZbXScsIHR5cGU6IG51bGwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAncmljYXJkaWFuX2NsYXVzZXMnLCB0eXBlTmFtZTogJ2NsYXVzZV9wYWlyW10nLCB0eXBlOiBudWxsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ2Vycm9yX21lc3NhZ2VzJywgdHlwZU5hbWU6ICdlcnJvcl9tZXNzYWdlW10nLCB0eXBlOiBudWxsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ2FiaV9leHRlbnNpb25zJywgdHlwZU5hbWU6ICdleHRlbnNpb25zX2VudHJ5W10nLCB0eXBlOiBudWxsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ3ZhcmlhbnRzJywgdHlwZU5hbWU6ICd2YXJpYW50X2RlZltdJCcsIHR5cGU6IG51bGwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnYWN0aW9uX3Jlc3VsdHMnLCB0eXBlTmFtZTogJ2FjdGlvbl9yZXN1bHRbXSQnLCB0eXBlOiBudWxsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ2t2X3RhYmxlcycsIHR5cGVOYW1lOiAna3ZfdGFibGUkJywgdHlwZTogbnVsbCB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgc2VyaWFsaXplOiBzZXJpYWxpemVTdHJ1Y3QsXHJcbiAgICAgICAgZGVzZXJpYWxpemU6IGRlc2VyaWFsaXplU3RydWN0LFxyXG4gICAgfSkpO1xyXG4gICAgcmV0dXJuIGluaXRpYWxUeXBlcztcclxufTtcclxuZXhwb3J0cy5jcmVhdGVBYmlUeXBlcyA9IGNyZWF0ZUFiaVR5cGVzO1xyXG52YXIgY3JlYXRlVHJhbnNhY3Rpb25FeHRlbnNpb25UeXBlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBpbml0aWFsVHlwZXMgPSAoMCwgZXhwb3J0cy5jcmVhdGVJbml0aWFsVHlwZXMpKCk7XHJcbiAgICBpbml0aWFsVHlwZXMuc2V0KCdyZXNvdXJjZV9wYXllcicsIGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgIG5hbWU6ICdyZXNvdXJjZV9wYXllcicsXHJcbiAgICAgICAgYmFzZU5hbWU6ICcnLFxyXG4gICAgICAgIGZpZWxkczogW1xyXG4gICAgICAgICAgICB7IG5hbWU6ICdwYXllcicsIHR5cGVOYW1lOiAnbmFtZScsIHR5cGU6IG51bGwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnbWF4X25ldF9ieXRlcycsIHR5cGVOYW1lOiAndWludDY0JywgdHlwZTogbnVsbCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdtYXhfY3B1X3VzJywgdHlwZU5hbWU6ICd1aW50NjQnLCB0eXBlOiBudWxsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ21heF9tZW1vcnlfYnl0ZXMnLCB0eXBlTmFtZTogJ3VpbnQ2NCcsIHR5cGU6IG51bGwgfSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplU3RydWN0LFxyXG4gICAgICAgIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZVN0cnVjdCxcclxuICAgIH0pKTtcclxuICAgIHJldHVybiBpbml0aWFsVHlwZXM7XHJcbn07XHJcbmV4cG9ydHMuY3JlYXRlVHJhbnNhY3Rpb25FeHRlbnNpb25UeXBlcyA9IGNyZWF0ZVRyYW5zYWN0aW9uRXh0ZW5zaW9uVHlwZXM7XHJcbnZhciBjcmVhdGVUcmFuc2FjdGlvblR5cGVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGluaXRpYWxUeXBlcyA9ICgwLCBleHBvcnRzLmNyZWF0ZUluaXRpYWxUeXBlcykoKTtcclxuICAgIGluaXRpYWxUeXBlcy5zZXQoJ3Blcm1pc3Npb25fbGV2ZWwnLCBjcmVhdGVUeXBlKHtcclxuICAgICAgICBuYW1lOiAncGVybWlzc2lvbl9sZXZlbCcsXHJcbiAgICAgICAgYmFzZU5hbWU6ICcnLFxyXG4gICAgICAgIGZpZWxkczogW1xyXG4gICAgICAgICAgICB7IG5hbWU6ICdhY3RvcicsIHR5cGVOYW1lOiAnbmFtZScsIHR5cGU6IG51bGwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAncGVybWlzc2lvbicsIHR5cGVOYW1lOiAnbmFtZScsIHR5cGU6IG51bGwgfSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplU3RydWN0LFxyXG4gICAgICAgIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZVN0cnVjdCxcclxuICAgIH0pKTtcclxuICAgIGluaXRpYWxUeXBlcy5zZXQoJ2FjdGlvbicsIGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgIG5hbWU6ICdhY3Rpb24nLFxyXG4gICAgICAgIGJhc2VOYW1lOiAnJyxcclxuICAgICAgICBmaWVsZHM6IFtcclxuICAgICAgICAgICAgeyBuYW1lOiAnYWNjb3VudCcsIHR5cGVOYW1lOiAnbmFtZScsIHR5cGU6IG51bGwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnbmFtZScsIHR5cGVOYW1lOiAnbmFtZScsIHR5cGU6IG51bGwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnYXV0aG9yaXphdGlvbicsIHR5cGVOYW1lOiAncGVybWlzc2lvbl9sZXZlbFtdJywgdHlwZTogbnVsbCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdkYXRhJywgdHlwZU5hbWU6ICdieXRlcycsIHR5cGU6IG51bGwgfSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplU3RydWN0LFxyXG4gICAgICAgIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZVN0cnVjdCxcclxuICAgIH0pKTtcclxuICAgIGluaXRpYWxUeXBlcy5zZXQoJ2V4dGVuc2lvbicsIGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgIG5hbWU6ICdleHRlbnNpb24nLFxyXG4gICAgICAgIGJhc2VOYW1lOiAnJyxcclxuICAgICAgICBmaWVsZHM6IFtcclxuICAgICAgICAgICAgeyBuYW1lOiAndHlwZScsIHR5cGVOYW1lOiAndWludDE2JywgdHlwZTogbnVsbCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdkYXRhJywgdHlwZU5hbWU6ICdieXRlcycsIHR5cGU6IG51bGwgfSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplUGFpcixcclxuICAgICAgICBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVQYWlyLFxyXG4gICAgfSkpO1xyXG4gICAgaW5pdGlhbFR5cGVzLnNldCgndHJhbnNhY3Rpb25faGVhZGVyJywgY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgbmFtZTogJ3RyYW5zYWN0aW9uX2hlYWRlcicsXHJcbiAgICAgICAgYmFzZU5hbWU6ICcnLFxyXG4gICAgICAgIGZpZWxkczogW1xyXG4gICAgICAgICAgICB7IG5hbWU6ICdleHBpcmF0aW9uJywgdHlwZU5hbWU6ICd0aW1lX3BvaW50X3NlYycsIHR5cGU6IG51bGwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAncmVmX2Jsb2NrX251bScsIHR5cGVOYW1lOiAndWludDE2JywgdHlwZTogbnVsbCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdyZWZfYmxvY2tfcHJlZml4JywgdHlwZU5hbWU6ICd1aW50MzInLCB0eXBlOiBudWxsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ21heF9uZXRfdXNhZ2Vfd29yZHMnLCB0eXBlTmFtZTogJ3ZhcnVpbnQzMicsIHR5cGU6IG51bGwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnbWF4X2NwdV91c2FnZV9tcycsIHR5cGVOYW1lOiAndWludDgnLCB0eXBlOiBudWxsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ2RlbGF5X3NlYycsIHR5cGVOYW1lOiAndmFydWludDMyJywgdHlwZTogbnVsbCB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgc2VyaWFsaXplOiBzZXJpYWxpemVTdHJ1Y3QsXHJcbiAgICAgICAgZGVzZXJpYWxpemU6IGRlc2VyaWFsaXplU3RydWN0LFxyXG4gICAgfSkpO1xyXG4gICAgaW5pdGlhbFR5cGVzLnNldCgndHJhbnNhY3Rpb24nLCBjcmVhdGVUeXBlKHtcclxuICAgICAgICBuYW1lOiAndHJhbnNhY3Rpb24nLFxyXG4gICAgICAgIGJhc2VOYW1lOiAndHJhbnNhY3Rpb25faGVhZGVyJyxcclxuICAgICAgICBmaWVsZHM6IFtcclxuICAgICAgICAgICAgeyBuYW1lOiAnY29udGV4dF9mcmVlX2FjdGlvbnMnLCB0eXBlTmFtZTogJ2FjdGlvbltdJywgdHlwZTogbnVsbCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdhY3Rpb25zJywgdHlwZU5hbWU6ICdhY3Rpb25bXScsIHR5cGU6IG51bGwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAndHJhbnNhY3Rpb25fZXh0ZW5zaW9ucycsIHR5cGVOYW1lOiAnZXh0ZW5zaW9uJywgdHlwZTogbnVsbCB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBzZXJpYWxpemU6IHNlcmlhbGl6ZVN0cnVjdCxcclxuICAgICAgICBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVTdHJ1Y3QsXHJcbiAgICB9KSk7XHJcbiAgICByZXR1cm4gaW5pdGlhbFR5cGVzO1xyXG59O1xyXG5leHBvcnRzLmNyZWF0ZVRyYW5zYWN0aW9uVHlwZXMgPSBjcmVhdGVUcmFuc2FjdGlvblR5cGVzO1xyXG4vKiogR2V0IHR5cGUgZnJvbSBgdHlwZXNgICovXHJcbnZhciBnZXRUeXBlID0gZnVuY3Rpb24gKHR5cGVzLCBuYW1lKSB7XHJcbiAgICB2YXIgdHlwZSA9IHR5cGVzLmdldChuYW1lKTtcclxuICAgIGlmICh0eXBlICYmIHR5cGUuYWxpYXNPZk5hbWUpIHtcclxuICAgICAgICByZXR1cm4gKDAsIGV4cG9ydHMuZ2V0VHlwZSkodHlwZXMsIHR5cGUuYWxpYXNPZk5hbWUpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGUpIHtcclxuICAgICAgICByZXR1cm4gdHlwZTtcclxuICAgIH1cclxuICAgIGlmIChuYW1lLmVuZHNXaXRoKCdbXScpKSB7XHJcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICBhcnJheU9mOiAoMCwgZXhwb3J0cy5nZXRUeXBlKSh0eXBlcywgbmFtZS5zdWJzdHIoMCwgbmFtZS5sZW5ndGggLSAyKSksXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplQXJyYXksXHJcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZUFycmF5LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKG5hbWUuZW5kc1dpdGgoJz8nKSkge1xyXG4gICAgICAgIHJldHVybiBjcmVhdGVUeXBlKHtcclxuICAgICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgb3B0aW9uYWxPZjogKDAsIGV4cG9ydHMuZ2V0VHlwZSkodHlwZXMsIG5hbWUuc3Vic3RyKDAsIG5hbWUubGVuZ3RoIC0gMSkpLFxyXG4gICAgICAgICAgICBzZXJpYWxpemU6IHNlcmlhbGl6ZU9wdGlvbmFsLFxyXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVPcHRpb25hbCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChuYW1lLmVuZHNXaXRoKCckJykpIHtcclxuICAgICAgICByZXR1cm4gY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgIGV4dGVuc2lvbk9mOiAoMCwgZXhwb3J0cy5nZXRUeXBlKSh0eXBlcywgbmFtZS5zdWJzdHIoMCwgbmFtZS5sZW5ndGggLSAxKSksXHJcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplRXh0ZW5zaW9uLFxyXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVFeHRlbnNpb24sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gdHlwZTogJyArIG5hbWUpO1xyXG59O1xyXG5leHBvcnRzLmdldFR5cGUgPSBnZXRUeXBlO1xyXG4vKipcclxuICogR2V0IHR5cGVzIGZyb20gYWJpXHJcbiAqXHJcbiAqIEBwYXJhbSBpbml0aWFsVHlwZXMgU2V0IG9mIHR5cGVzIHRvIGJ1aWxkIG9uLlxyXG4gKiBJbiBtb3N0IGNhc2VzLCBpdCdzIGJlc3QgdG8gZmlsbCB0aGlzIGZyb20gYSBmcmVzaCBjYWxsIHRvIGBnZXRUeXBlc0Zyb21BYmkoKWAuXHJcbiAqL1xyXG52YXIgZ2V0VHlwZXNGcm9tQWJpID0gZnVuY3Rpb24gKGluaXRpYWxUeXBlcywgYWJpKSB7XHJcbiAgICB2YXIgZV82LCBfYSwgZV83LCBfYiwgZV84LCBfYywgZV85LCBfZCwgZV8xMCwgX2U7XHJcbiAgICB2YXIgdHlwZXMgPSBuZXcgTWFwKGluaXRpYWxUeXBlcyk7XHJcbiAgICBpZiAoYWJpICYmIGFiaS50eXBlcykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIF9mID0gX192YWx1ZXMoYWJpLnR5cGVzKSwgX2cgPSBfZi5uZXh0KCk7ICFfZy5kb25lOyBfZyA9IF9mLm5leHQoKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9oID0gX2cudmFsdWUsIG5ld190eXBlX25hbWUgPSBfaC5uZXdfdHlwZV9uYW1lLCB0eXBlID0gX2gudHlwZTtcclxuICAgICAgICAgICAgICAgIHR5cGVzLnNldChuZXdfdHlwZV9uYW1lLCBjcmVhdGVUeXBlKHsgbmFtZTogbmV3X3R5cGVfbmFtZSwgYWxpYXNPZk5hbWU6IHR5cGUgfSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlXzZfMSkgeyBlXzYgPSB7IGVycm9yOiBlXzZfMSB9OyB9XHJcbiAgICAgICAgZmluYWxseSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX2cgJiYgIV9nLmRvbmUgJiYgKF9hID0gX2YucmV0dXJuKSkgX2EuY2FsbChfZik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzYpIHRocm93IGVfNi5lcnJvcjsgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChhYmkgJiYgYWJpLnN0cnVjdHMpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBfaiA9IF9fdmFsdWVzKGFiaS5zdHJ1Y3RzKSwgX2sgPSBfai5uZXh0KCk7ICFfay5kb25lOyBfayA9IF9qLm5leHQoKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9sID0gX2sudmFsdWUsIG5hbWVfMSA9IF9sLm5hbWUsIGJhc2UgPSBfbC5iYXNlLCBmaWVsZHMgPSBfbC5maWVsZHM7XHJcbiAgICAgICAgICAgICAgICB0eXBlcy5zZXQobmFtZV8xLCBjcmVhdGVUeXBlKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lXzEsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZU5hbWU6IGJhc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzOiBmaWVsZHMubWFwKGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbiA9IF9hLm5hbWUsIHR5cGUgPSBfYS50eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHsgbmFtZTogbiwgdHlwZU5hbWU6IHR5cGUsIHR5cGU6IG51bGwgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgc2VyaWFsaXplOiBzZXJpYWxpemVTdHJ1Y3QsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzZXJpYWxpemU6IGRlc2VyaWFsaXplU3RydWN0LFxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlXzdfMSkgeyBlXzcgPSB7IGVycm9yOiBlXzdfMSB9OyB9XHJcbiAgICAgICAgZmluYWxseSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX2sgJiYgIV9rLmRvbmUgJiYgKF9iID0gX2oucmV0dXJuKSkgX2IuY2FsbChfaik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzcpIHRocm93IGVfNy5lcnJvcjsgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChhYmkgJiYgYWJpLnZhcmlhbnRzKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZm9yICh2YXIgX20gPSBfX3ZhbHVlcyhhYmkudmFyaWFudHMpLCBfbyA9IF9tLm5leHQoKTsgIV9vLmRvbmU7IF9vID0gX20ubmV4dCgpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3AgPSBfby52YWx1ZSwgbmFtZV8yID0gX3AubmFtZSwgdCA9IF9wLnR5cGVzO1xyXG4gICAgICAgICAgICAgICAgdHlwZXMuc2V0KG5hbWVfMiwgY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZV8yLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkczogdC5tYXAoZnVuY3Rpb24gKHMpIHsgcmV0dXJuICh7IG5hbWU6IHMsIHR5cGVOYW1lOiBzLCB0eXBlOiBudWxsIH0pOyB9KSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJpYWxpemU6IHNlcmlhbGl6ZVZhcmlhbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzZXJpYWxpemU6IGRlc2VyaWFsaXplVmFyaWFudCxcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZV84XzEpIHsgZV84ID0geyBlcnJvcjogZV84XzEgfTsgfVxyXG4gICAgICAgIGZpbmFsbHkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9vICYmICFfby5kb25lICYmIChfYyA9IF9tLnJldHVybikpIF9jLmNhbGwoX20pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV84KSB0aHJvdyBlXzguZXJyb3I7IH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGZvciAodmFyIHR5cGVzXzEgPSBfX3ZhbHVlcyh0eXBlcyksIHR5cGVzXzFfMSA9IHR5cGVzXzEubmV4dCgpOyAhdHlwZXNfMV8xLmRvbmU7IHR5cGVzXzFfMSA9IHR5cGVzXzEubmV4dCgpKSB7XHJcbiAgICAgICAgICAgIHZhciBfcSA9IF9fcmVhZCh0eXBlc18xXzEudmFsdWUsIDIpLCBuYW1lXzMgPSBfcVswXSwgdHlwZSA9IF9xWzFdO1xyXG4gICAgICAgICAgICBpZiAodHlwZS5iYXNlTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdHlwZS5iYXNlID0gKDAsIGV4cG9ydHMuZ2V0VHlwZSkodHlwZXMsIHR5cGUuYmFzZU5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBfciA9IChlXzEwID0gdm9pZCAwLCBfX3ZhbHVlcyh0eXBlLmZpZWxkcykpLCBfcyA9IF9yLm5leHQoKTsgIV9zLmRvbmU7IF9zID0gX3IubmV4dCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpZWxkID0gX3MudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQudHlwZSA9ICgwLCBleHBvcnRzLmdldFR5cGUpKHR5cGVzLCBmaWVsZC50eXBlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVfMTBfMSkgeyBlXzEwID0geyBlcnJvcjogZV8xMF8xIH07IH1cclxuICAgICAgICAgICAgZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfcyAmJiAhX3MuZG9uZSAmJiAoX2UgPSBfci5yZXR1cm4pKSBfZS5jYWxsKF9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xMCkgdGhyb3cgZV8xMC5lcnJvcjsgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVfOV8xKSB7IGVfOSA9IHsgZXJyb3I6IGVfOV8xIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlc18xXzEgJiYgIXR5cGVzXzFfMS5kb25lICYmIChfZCA9IHR5cGVzXzEucmV0dXJuKSkgX2QuY2FsbCh0eXBlc18xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlXzkpIHRocm93IGVfOS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHR5cGVzO1xyXG59OyAvLyBnZXRUeXBlc0Zyb21BYmlcclxuZXhwb3J0cy5nZXRUeXBlc0Zyb21BYmkgPSBnZXRUeXBlc0Zyb21BYmk7XHJcbnZhciByZXZlcnNlSGV4ID0gZnVuY3Rpb24gKGgpIHtcclxuICAgIHJldHVybiBoLnN1YnN0cig2LCAyKSArIGguc3Vic3RyKDQsIDIpICsgaC5zdWJzdHIoMiwgMikgKyBoLnN1YnN0cigwLCAyKTtcclxufTtcclxuLyoqIFRBUG9TOiBSZXR1cm4gdHJhbnNhY3Rpb24gZmllbGRzIHdoaWNoIHJlZmVyZW5jZSBgcmVmQmxvY2tgIGFuZCBleHBpcmUgYGV4cGlyZVNlY29uZHNgIGFmdGVyIGB0aW1lc3RhbXBgICovXHJcbnZhciB0cmFuc2FjdGlvbkhlYWRlciA9IGZ1bmN0aW9uIChyZWZCbG9jaywgZXhwaXJlU2Vjb25kcykge1xyXG4gICAgdmFyIHRpbWVzdGFtcCA9IHJlZkJsb2NrLmhlYWRlciA/IHJlZkJsb2NrLmhlYWRlci50aW1lc3RhbXAgOiByZWZCbG9jay50aW1lc3RhbXA7XHJcbiAgICB2YXIgcHJlZml4ID0gcGFyc2VJbnQocmV2ZXJzZUhleChyZWZCbG9jay5pZC5zdWJzdHIoMTYsIDgpKSwgMTYpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBleHBpcmF0aW9uOiAoMCwgZXhwb3J0cy50aW1lUG9pbnRTZWNUb0RhdGUpKCgwLCBleHBvcnRzLmRhdGVUb1RpbWVQb2ludFNlYykodGltZXN0YW1wKSArIGV4cGlyZVNlY29uZHMpLFxyXG4gICAgICAgIHJlZl9ibG9ja19udW06IHJlZkJsb2NrLmJsb2NrX251bSAmIDB4ZmZmZixcclxuICAgICAgICByZWZfYmxvY2tfcHJlZml4OiBwcmVmaXgsXHJcbiAgICB9O1xyXG59O1xyXG5leHBvcnRzLnRyYW5zYWN0aW9uSGVhZGVyID0gdHJhbnNhY3Rpb25IZWFkZXI7XHJcbi8qKiBDb252ZXJ0IGFjdGlvbiBkYXRhIHRvIHNlcmlhbGl6ZWQgZm9ybSAoaGV4KSAqL1xyXG52YXIgc2VyaWFsaXplQWN0aW9uRGF0YSA9IGZ1bmN0aW9uIChjb250cmFjdCwgYWNjb3VudCwgbmFtZSwgZGF0YSwgdGV4dEVuY29kZXIsIHRleHREZWNvZGVyKSB7XHJcbiAgICB2YXIgYWN0aW9uID0gY29udHJhY3QuYWN0aW9ucy5nZXQobmFtZSk7XHJcbiAgICBpZiAoIWFjdGlvbikge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gYWN0aW9uIFwiLmNvbmNhdChuYW1lLCBcIiBpbiBjb250cmFjdCBcIikuY29uY2F0KGFjY291bnQpKTtcclxuICAgIH1cclxuICAgIHZhciBidWZmZXIgPSBuZXcgU2VyaWFsQnVmZmVyKHsgdGV4dEVuY29kZXI6IHRleHRFbmNvZGVyLCB0ZXh0RGVjb2RlcjogdGV4dERlY29kZXIgfSk7XHJcbiAgICBhY3Rpb24uc2VyaWFsaXplKGJ1ZmZlciwgZGF0YSk7XHJcbiAgICByZXR1cm4gKDAsIGV4cG9ydHMuYXJyYXlUb0hleCkoYnVmZmVyLmFzVWludDhBcnJheSgpKTtcclxufTtcclxuZXhwb3J0cy5zZXJpYWxpemVBY3Rpb25EYXRhID0gc2VyaWFsaXplQWN0aW9uRGF0YTtcclxuLyoqIFJldHVybiBhY3Rpb24gaW4gc2VyaWFsaXplZCBmb3JtICovXHJcbnZhciBzZXJpYWxpemVBY3Rpb24gPSBmdW5jdGlvbiAoY29udHJhY3QsIGFjY291bnQsIG5hbWUsIGF1dGhvcml6YXRpb24sIGRhdGEsIHRleHRFbmNvZGVyLCB0ZXh0RGVjb2Rlcikge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhY2NvdW50OiBhY2NvdW50LFxyXG4gICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgYXV0aG9yaXphdGlvbjogYXV0aG9yaXphdGlvbixcclxuICAgICAgICBkYXRhOiAoMCwgZXhwb3J0cy5zZXJpYWxpemVBY3Rpb25EYXRhKShjb250cmFjdCwgYWNjb3VudCwgbmFtZSwgZGF0YSwgdGV4dEVuY29kZXIsIHRleHREZWNvZGVyKSxcclxuICAgIH07XHJcbn07XHJcbmV4cG9ydHMuc2VyaWFsaXplQWN0aW9uID0gc2VyaWFsaXplQWN0aW9uO1xyXG4vKiogRGVzZXJpYWxpemUgYWN0aW9uIGRhdGEuIElmIGBkYXRhYCBpcyBhIGBzdHJpbmdgLCB0aGVuIGl0J3MgYXNzdW1lZCB0byBiZSBpbiBoZXguICovXHJcbnZhciBkZXNlcmlhbGl6ZUFjdGlvbkRhdGEgPSBmdW5jdGlvbiAoY29udHJhY3QsIGFjY291bnQsIG5hbWUsIGRhdGEsIHRleHRFbmNvZGVyLCB0ZXh0RGVjb2Rlcikge1xyXG4gICAgdmFyIGFjdGlvbiA9IGNvbnRyYWN0LmFjdGlvbnMuZ2V0KG5hbWUpO1xyXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGRhdGEgPSAoMCwgZXhwb3J0cy5oZXhUb1VpbnQ4QXJyYXkpKGRhdGEpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFhY3Rpb24pIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGFjdGlvbiBcIi5jb25jYXQobmFtZSwgXCIgaW4gY29udHJhY3QgXCIpLmNvbmNhdChhY2NvdW50KSk7XHJcbiAgICB9XHJcbiAgICB2YXIgYnVmZmVyID0gbmV3IFNlcmlhbEJ1ZmZlcih7IHRleHREZWNvZGVyOiB0ZXh0RGVjb2RlciwgdGV4dEVuY29kZXI6IHRleHRFbmNvZGVyIH0pO1xyXG4gICAgYnVmZmVyLnB1c2hBcnJheShkYXRhKTtcclxuICAgIHJldHVybiBhY3Rpb24uZGVzZXJpYWxpemUoYnVmZmVyKTtcclxufTtcclxuZXhwb3J0cy5kZXNlcmlhbGl6ZUFjdGlvbkRhdGEgPSBkZXNlcmlhbGl6ZUFjdGlvbkRhdGE7XHJcbi8qKiBEZXNlcmlhbGl6ZSBhY3Rpb24uIElmIGBkYXRhYCBpcyBhIGBzdHJpbmdgLCB0aGVuIGl0J3MgYXNzdW1lZCB0byBiZSBpbiBoZXguICovXHJcbnZhciBkZXNlcmlhbGl6ZUFjdGlvbiA9IGZ1bmN0aW9uIChjb250cmFjdCwgYWNjb3VudCwgbmFtZSwgYXV0aG9yaXphdGlvbiwgZGF0YSwgdGV4dEVuY29kZXIsIHRleHREZWNvZGVyKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGFjY291bnQ6IGFjY291bnQsXHJcbiAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICBhdXRob3JpemF0aW9uOiBhdXRob3JpemF0aW9uLFxyXG4gICAgICAgIGRhdGE6ICgwLCBleHBvcnRzLmRlc2VyaWFsaXplQWN0aW9uRGF0YSkoY29udHJhY3QsIGFjY291bnQsIG5hbWUsIGRhdGEsIHRleHRFbmNvZGVyLCB0ZXh0RGVjb2RlciksXHJcbiAgICB9O1xyXG59O1xyXG5leHBvcnRzLmRlc2VyaWFsaXplQWN0aW9uID0gZGVzZXJpYWxpemVBY3Rpb247XHJcbnZhciBzZXJpYWxpemVBbnl2YXIgPSBmdW5jdGlvbiAoYnVmZmVyLCBhbnl2YXIpIHtcclxuICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZztcclxuICAgIHZhciBkZWY7XHJcbiAgICB2YXIgdmFsdWU7XHJcbiAgICBpZiAoYW55dmFyID09PSBudWxsKSB7XHJcbiAgICAgICAgX2EgPSBfX3JlYWQoW2FueXZhckRlZnMubnVsbF90LCBhbnl2YXJdLCAyKSwgZGVmID0gX2FbMF0sIHZhbHVlID0gX2FbMV07XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0eXBlb2YgYW55dmFyID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIF9iID0gX19yZWFkKFthbnl2YXJEZWZzLnN0cmluZywgYW55dmFyXSwgMiksIGRlZiA9IF9iWzBdLCB2YWx1ZSA9IF9iWzFdO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodHlwZW9mIGFueXZhciA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICBfYyA9IF9fcmVhZChbYW55dmFyRGVmcy5pbnQzMiwgYW55dmFyXSwgMiksIGRlZiA9IF9jWzBdLCB2YWx1ZSA9IF9jWzFdO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoYW55dmFyIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xyXG4gICAgICAgIF9kID0gX19yZWFkKFthbnl2YXJEZWZzLmJ5dGVzLCBhbnl2YXJdLCAyKSwgZGVmID0gX2RbMF0sIHZhbHVlID0gX2RbMV07XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFueXZhcikpIHtcclxuICAgICAgICBfZSA9IF9fcmVhZChbYW55dmFyRGVmcy5hbnlfYXJyYXksIGFueXZhcl0sIDIpLCBkZWYgPSBfZVswXSwgdmFsdWUgPSBfZVsxXTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKE9iamVjdC5rZXlzKGFueXZhcikubGVuZ3RoID09PSAyICYmIGFueXZhci5oYXNPd25Qcm9wZXJ0eSgndHlwZScpICYmIGFueXZhci5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSkge1xyXG4gICAgICAgIF9mID0gX19yZWFkKFthbnl2YXJEZWZzW2FueXZhci50eXBlXSwgYW55dmFyLnZhbHVlXSwgMiksIGRlZiA9IF9mWzBdLCB2YWx1ZSA9IF9mWzFdO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgX2cgPSBfX3JlYWQoW2FueXZhckRlZnMuYW55X29iamVjdCwgYW55dmFyXSwgMiksIGRlZiA9IF9nWzBdLCB2YWx1ZSA9IF9nWzFdO1xyXG4gICAgfVxyXG4gICAgYnVmZmVyLnB1c2hWYXJ1aW50MzIoZGVmLmluZGV4KTtcclxuICAgIGRlZi50eXBlLnNlcmlhbGl6ZShidWZmZXIsIHZhbHVlKTtcclxufTtcclxuZXhwb3J0cy5zZXJpYWxpemVBbnl2YXIgPSBzZXJpYWxpemVBbnl2YXI7XHJcbnZhciBkZXNlcmlhbGl6ZUFueXZhciA9IGZ1bmN0aW9uIChidWZmZXIsIHN0YXRlKSB7XHJcbiAgICB2YXIgZGVmSW5kZXggPSBidWZmZXIuZ2V0VmFydWludDMyKCk7XHJcbiAgICBpZiAoZGVmSW5kZXggPj0gYW55dmFyRGVmc0J5SW5kZXgubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmllZCB0byBkZXNlcmlhbGl6ZSB1bmtub3duIGFueXZhciB0eXBlJyk7XHJcbiAgICB9XHJcbiAgICB2YXIgZGVmID0gYW55dmFyRGVmc0J5SW5kZXhbZGVmSW5kZXhdO1xyXG4gICAgdmFyIHZhbHVlID0gZGVmLnR5cGUuZGVzZXJpYWxpemUoYnVmZmVyLCBzdGF0ZSk7XHJcbiAgICBpZiAoc3RhdGUgJiYgc3RhdGUub3B0aW9ucy51c2VTaG9ydEZvcm0gfHwgZGVmLnVzZVNob3J0Rm9ybSkge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6IGRlZi50eXBlLm5hbWUsIHZhbHVlOiB2YWx1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLmRlc2VyaWFsaXplQW55dmFyID0gZGVzZXJpYWxpemVBbnl2YXI7XHJcbnZhciBkZXNlcmlhbGl6ZUFueXZhclNob3J0ID0gZnVuY3Rpb24gKGJ1ZmZlcikge1xyXG4gICAgcmV0dXJuICgwLCBleHBvcnRzLmRlc2VyaWFsaXplQW55dmFyKShidWZmZXIsIG5ldyBTZXJpYWxpemVyU3RhdGUoeyB1c2VTaG9ydEZvcm06IHRydWUgfSkpO1xyXG59O1xyXG5leHBvcnRzLmRlc2VyaWFsaXplQW55dmFyU2hvcnQgPSBkZXNlcmlhbGl6ZUFueXZhclNob3J0O1xyXG52YXIgc2VyaWFsaXplQW55T2JqZWN0ID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2JqKSB7XHJcbiAgICB2YXIgZV8xMSwgX2E7XHJcbiAgICB2YXIgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKG9iaik7XHJcbiAgICBidWZmZXIucHVzaFZhcnVpbnQzMihlbnRyaWVzLmxlbmd0aCk7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGZvciAodmFyIGVudHJpZXNfMiA9IF9fdmFsdWVzKGVudHJpZXMpLCBlbnRyaWVzXzJfMSA9IGVudHJpZXNfMi5uZXh0KCk7ICFlbnRyaWVzXzJfMS5kb25lOyBlbnRyaWVzXzJfMSA9IGVudHJpZXNfMi5uZXh0KCkpIHtcclxuICAgICAgICAgICAgdmFyIF9iID0gX19yZWFkKGVudHJpZXNfMl8xLnZhbHVlLCAyKSwga2V5ID0gX2JbMF0sIHZhbHVlID0gX2JbMV07XHJcbiAgICAgICAgICAgIGJ1ZmZlci5wdXNoU3RyaW5nKGtleSk7XHJcbiAgICAgICAgICAgICgwLCBleHBvcnRzLnNlcmlhbGl6ZUFueXZhcikoYnVmZmVyLCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVfMTFfMSkgeyBlXzExID0geyBlcnJvcjogZV8xMV8xIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChlbnRyaWVzXzJfMSAmJiAhZW50cmllc18yXzEuZG9uZSAmJiAoX2EgPSBlbnRyaWVzXzIucmV0dXJuKSkgX2EuY2FsbChlbnRyaWVzXzIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMTEpIHRocm93IGVfMTEuZXJyb3I7IH1cclxuICAgIH1cclxufTtcclxuZXhwb3J0cy5zZXJpYWxpemVBbnlPYmplY3QgPSBzZXJpYWxpemVBbnlPYmplY3Q7XHJcbnZhciBkZXNlcmlhbGl6ZUFueU9iamVjdCA9IGZ1bmN0aW9uIChidWZmZXIsIHN0YXRlKSB7XHJcbiAgICB2YXIgbGVuID0gYnVmZmVyLmdldFZhcnVpbnQzMigpO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgIHZhciBrZXkgPSBidWZmZXIuZ2V0U3RyaW5nKCk7XHJcbiAgICAgICAgaWYgKGtleSBpbiByZXN1bHQpIHtcclxuICAgICAgICAgICAgdmFyIGogPSAxO1xyXG4gICAgICAgICAgICB3aGlsZSAoa2V5ICsgJ18nICsgaiBpbiByZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICsrajtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBrZXkgPSBrZXkgKyAnXycgKyBqO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHRba2V5XSA9ICgwLCBleHBvcnRzLmRlc2VyaWFsaXplQW55dmFyKShidWZmZXIsIHN0YXRlKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcbmV4cG9ydHMuZGVzZXJpYWxpemVBbnlPYmplY3QgPSBkZXNlcmlhbGl6ZUFueU9iamVjdDtcclxudmFyIHNlcmlhbGl6ZUFueUFycmF5ID0gZnVuY3Rpb24gKGJ1ZmZlciwgYXJyKSB7XHJcbiAgICB2YXIgZV8xMiwgX2E7XHJcbiAgICBidWZmZXIucHVzaFZhcnVpbnQzMihhcnIubGVuZ3RoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgZm9yICh2YXIgYXJyXzEgPSBfX3ZhbHVlcyhhcnIpLCBhcnJfMV8xID0gYXJyXzEubmV4dCgpOyAhYXJyXzFfMS5kb25lOyBhcnJfMV8xID0gYXJyXzEubmV4dCgpKSB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gYXJyXzFfMS52YWx1ZTtcclxuICAgICAgICAgICAgKDAsIGV4cG9ydHMuc2VyaWFsaXplQW55dmFyKShidWZmZXIsIHgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNhdGNoIChlXzEyXzEpIHsgZV8xMiA9IHsgZXJyb3I6IGVfMTJfMSB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoYXJyXzFfMSAmJiAhYXJyXzFfMS5kb25lICYmIChfYSA9IGFycl8xLnJldHVybikpIF9hLmNhbGwoYXJyXzEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMTIpIHRocm93IGVfMTIuZXJyb3I7IH1cclxuICAgIH1cclxufTtcclxuZXhwb3J0cy5zZXJpYWxpemVBbnlBcnJheSA9IHNlcmlhbGl6ZUFueUFycmF5O1xyXG52YXIgZGVzZXJpYWxpemVBbnlBcnJheSA9IGZ1bmN0aW9uIChidWZmZXIsIHN0YXRlKSB7XHJcbiAgICB2YXIgbGVuID0gYnVmZmVyLmdldFZhcnVpbnQzMigpO1xyXG4gICAgdmFyIHJlc3VsdCA9IFtdO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgIHJlc3VsdC5wdXNoKCgwLCBleHBvcnRzLmRlc2VyaWFsaXplQW55dmFyKShidWZmZXIsIHN0YXRlKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5leHBvcnRzLmRlc2VyaWFsaXplQW55QXJyYXkgPSBkZXNlcmlhbGl6ZUFueUFycmF5O1xyXG52YXIgYWRkQWRkaXRpb25hbFR5cGVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGluaXRpYWxUeXBlcyA9ICgwLCBleHBvcnRzLmNyZWF0ZUluaXRpYWxUeXBlcykoKTtcclxuICAgIGluaXRpYWxUeXBlcy5zZXQoJ251bGxfdCcsIGNyZWF0ZVR5cGUoe1xyXG4gICAgICAgIG5hbWU6ICdudWxsX3QnLFxyXG4gICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgYW55dmFyKSB7IH0sXHJcbiAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIHN0YXRlKSB7IH1cclxuICAgIH0pKTtcclxuICAgIGluaXRpYWxUeXBlcy5zZXQoJ2FueV9vYmplY3QnLCBjcmVhdGVUeXBlKHtcclxuICAgICAgICBuYW1lOiAnYW55X29iamVjdCcsXHJcbiAgICAgICAgc2VyaWFsaXplOiBleHBvcnRzLnNlcmlhbGl6ZUFueU9iamVjdCxcclxuICAgICAgICBkZXNlcmlhbGl6ZTogZXhwb3J0cy5kZXNlcmlhbGl6ZUFueU9iamVjdFxyXG4gICAgfSkpO1xyXG4gICAgaW5pdGlhbFR5cGVzLnNldCgnYW55X2FycmF5JywgY3JlYXRlVHlwZSh7XHJcbiAgICAgICAgbmFtZTogJ2FueV9hcnJheScsXHJcbiAgICAgICAgc2VyaWFsaXplOiBleHBvcnRzLnNlcmlhbGl6ZUFueUFycmF5LFxyXG4gICAgICAgIGRlc2VyaWFsaXplOiBleHBvcnRzLmRlc2VyaWFsaXplQW55QXJyYXlcclxuICAgIH0pKTtcclxuICAgIHJldHVybiBpbml0aWFsVHlwZXM7XHJcbn07XHJcbnZhciBhZGRpdGlvbmFsVHlwZXMgPSBhZGRBZGRpdGlvbmFsVHlwZXMoKTtcclxudmFyIGFueXZhckRlZnMgPSB7XHJcbiAgICBudWxsX3Q6IHsgaW5kZXg6IDAsIHVzZVNob3J0Rm9ybTogdHJ1ZSwgdHlwZTogYWRkaXRpb25hbFR5cGVzLmdldCgnbnVsbF90JykgfSxcclxuICAgIGludDY0OiB7IGluZGV4OiAxLCB1c2VTaG9ydEZvcm06IGZhbHNlLCB0eXBlOiBhZGRpdGlvbmFsVHlwZXMuZ2V0KCdpbnQ2NCcpIH0sXHJcbiAgICB1aW50NjQ6IHsgaW5kZXg6IDIsIHVzZVNob3J0Rm9ybTogZmFsc2UsIHR5cGU6IGFkZGl0aW9uYWxUeXBlcy5nZXQoJ3VpbnQ2NCcpIH0sXHJcbiAgICBpbnQzMjogeyBpbmRleDogMywgdXNlU2hvcnRGb3JtOiB0cnVlLCB0eXBlOiBhZGRpdGlvbmFsVHlwZXMuZ2V0KCdpbnQzMicpIH0sXHJcbiAgICB1aW50MzI6IHsgaW5kZXg6IDQsIHVzZVNob3J0Rm9ybTogZmFsc2UsIHR5cGU6IGFkZGl0aW9uYWxUeXBlcy5nZXQoJ3VpbnQzMicpIH0sXHJcbiAgICBpbnQxNjogeyBpbmRleDogNSwgdXNlU2hvcnRGb3JtOiBmYWxzZSwgdHlwZTogYWRkaXRpb25hbFR5cGVzLmdldCgnaW50MTYnKSB9LFxyXG4gICAgdWludDE2OiB7IGluZGV4OiA2LCB1c2VTaG9ydEZvcm06IGZhbHNlLCB0eXBlOiBhZGRpdGlvbmFsVHlwZXMuZ2V0KCd1aW50MTYnKSB9LFxyXG4gICAgaW50ODogeyBpbmRleDogNywgdXNlU2hvcnRGb3JtOiBmYWxzZSwgdHlwZTogYWRkaXRpb25hbFR5cGVzLmdldCgnaW50OCcpIH0sXHJcbiAgICB1aW50ODogeyBpbmRleDogOCwgdXNlU2hvcnRGb3JtOiBmYWxzZSwgdHlwZTogYWRkaXRpb25hbFR5cGVzLmdldCgndWludDgnKSB9LFxyXG4gICAgdGltZV9wb2ludDogeyBpbmRleDogOSwgdXNlU2hvcnRGb3JtOiBmYWxzZSwgdHlwZTogYWRkaXRpb25hbFR5cGVzLmdldCgndGltZV9wb2ludCcpIH0sXHJcbiAgICBjaGVja3N1bTI1NjogeyBpbmRleDogMTAsIHVzZVNob3J0Rm9ybTogZmFsc2UsIHR5cGU6IGFkZGl0aW9uYWxUeXBlcy5nZXQoJ2NoZWNrc3VtMjU2JykgfSxcclxuICAgIGZsb2F0NjQ6IHsgaW5kZXg6IDExLCB1c2VTaG9ydEZvcm06IGZhbHNlLCB0eXBlOiBhZGRpdGlvbmFsVHlwZXMuZ2V0KCdmbG9hdDY0JykgfSxcclxuICAgIHN0cmluZzogeyBpbmRleDogMTIsIHVzZVNob3J0Rm9ybTogdHJ1ZSwgdHlwZTogYWRkaXRpb25hbFR5cGVzLmdldCgnc3RyaW5nJykgfSxcclxuICAgIGFueV9vYmplY3Q6IHsgaW5kZXg6IDEzLCB1c2VTaG9ydEZvcm06IHRydWUsIHR5cGU6IGFkZGl0aW9uYWxUeXBlcy5nZXQoJ2FueV9vYmplY3QnKSB9LFxyXG4gICAgYW55X2FycmF5OiB7IGluZGV4OiAxNCwgdXNlU2hvcnRGb3JtOiB0cnVlLCB0eXBlOiBhZGRpdGlvbmFsVHlwZXMuZ2V0KCdhbnlfYXJyYXknKSB9LFxyXG4gICAgYnl0ZXM6IHsgaW5kZXg6IDE1LCB1c2VTaG9ydEZvcm06IGZhbHNlLCB0eXBlOiBhZGRpdGlvbmFsVHlwZXMuZ2V0KCdieXRlcycpIH0sXHJcbiAgICBzeW1ib2w6IHsgaW5kZXg6IDE2LCB1c2VTaG9ydEZvcm06IGZhbHNlLCB0eXBlOiBhZGRpdGlvbmFsVHlwZXMuZ2V0KCdzeW1ib2wnKSB9LFxyXG4gICAgc3ltYm9sX2NvZGU6IHsgaW5kZXg6IDE3LCB1c2VTaG9ydEZvcm06IGZhbHNlLCB0eXBlOiBhZGRpdGlvbmFsVHlwZXMuZ2V0KCdzeW1ib2xfY29kZScpIH0sXHJcbiAgICBhc3NldDogeyBpbmRleDogMTgsIHVzZVNob3J0Rm9ybTogZmFsc2UsIHR5cGU6IGFkZGl0aW9uYWxUeXBlcy5nZXQoJ2Fzc2V0JykgfSxcclxufTtcclxudmFyIGFueXZhckRlZnNCeUluZGV4ID0gW1xyXG4gICAgYW55dmFyRGVmcy5udWxsX3QsXHJcbiAgICBhbnl2YXJEZWZzLmludDY0LFxyXG4gICAgYW55dmFyRGVmcy51aW50NjQsXHJcbiAgICBhbnl2YXJEZWZzLmludDMyLFxyXG4gICAgYW55dmFyRGVmcy51aW50MzIsXHJcbiAgICBhbnl2YXJEZWZzLmludDE2LFxyXG4gICAgYW55dmFyRGVmcy51aW50MTYsXHJcbiAgICBhbnl2YXJEZWZzLmludDgsXHJcbiAgICBhbnl2YXJEZWZzLnVpbnQ4LFxyXG4gICAgYW55dmFyRGVmcy50aW1lX3BvaW50LFxyXG4gICAgYW55dmFyRGVmcy5jaGVja3N1bTI1NixcclxuICAgIGFueXZhckRlZnMuZmxvYXQ2NCxcclxuICAgIGFueXZhckRlZnMuc3RyaW5nLFxyXG4gICAgYW55dmFyRGVmcy5hbnlfb2JqZWN0LFxyXG4gICAgYW55dmFyRGVmcy5hbnlfYXJyYXksXHJcbiAgICBhbnl2YXJEZWZzLmJ5dGVzLFxyXG4gICAgYW55dmFyRGVmcy5zeW1ib2wsXHJcbiAgICBhbnl2YXJEZWZzLnN5bWJvbF9jb2RlLFxyXG4gICAgYW55dmFyRGVmcy5hc3NldCxcclxuXTtcclxudmFyIHNlcmlhbGl6ZVF1ZXJ5ID0gZnVuY3Rpb24gKGJ1ZmZlciwgcXVlcnkpIHtcclxuICAgIHZhciBfYSwgX2IsIF9jLCBlXzEzLCBfZDtcclxuICAgIHZhciBtZXRob2Q7XHJcbiAgICB2YXIgYXJnO1xyXG4gICAgdmFyIGZpbHRlcjtcclxuICAgIGlmICh0eXBlb2YgcXVlcnkgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgbWV0aG9kID0gcXVlcnk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHF1ZXJ5KSAmJiBxdWVyeS5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICBfYSA9IF9fcmVhZChxdWVyeSwgMiksIG1ldGhvZCA9IF9hWzBdLCBmaWx0ZXIgPSBfYVsxXTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocXVlcnkpICYmIHF1ZXJ5Lmxlbmd0aCA9PT0gMykge1xyXG4gICAgICAgIF9iID0gX19yZWFkKHF1ZXJ5LCAzKSwgbWV0aG9kID0gX2JbMF0sIGFyZyA9IF9iWzFdLCBmaWx0ZXIgPSBfYlsyXTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIF9jID0gX19yZWFkKFtxdWVyeS5tZXRob2QsIHF1ZXJ5LmFyZywgcXVlcnkuZmlsdGVyXSwgMyksIG1ldGhvZCA9IF9jWzBdLCBhcmcgPSBfY1sxXSwgZmlsdGVyID0gX2NbMl07XHJcbiAgICB9XHJcbiAgICBidWZmZXIucHVzaFN0cmluZyhtZXRob2QpO1xyXG4gICAgaWYgKGFyZyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgYnVmZmVyLnB1c2goMCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBidWZmZXIucHVzaCgxKTtcclxuICAgICAgICAoMCwgZXhwb3J0cy5zZXJpYWxpemVBbnl2YXIpKGJ1ZmZlciwgYXJnKTtcclxuICAgIH1cclxuICAgIGlmIChmaWx0ZXIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGJ1ZmZlci5wdXNoKDApO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgYnVmZmVyLnB1c2hWYXJ1aW50MzIoZmlsdGVyLmxlbmd0aCk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZm9yICh2YXIgZmlsdGVyXzEgPSBfX3ZhbHVlcyhmaWx0ZXIpLCBmaWx0ZXJfMV8xID0gZmlsdGVyXzEubmV4dCgpOyAhZmlsdGVyXzFfMS5kb25lOyBmaWx0ZXJfMV8xID0gZmlsdGVyXzEubmV4dCgpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcSA9IGZpbHRlcl8xXzEudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAoMCwgZXhwb3J0cy5zZXJpYWxpemVRdWVyeSkoYnVmZmVyLCBxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZV8xM18xKSB7IGVfMTMgPSB7IGVycm9yOiBlXzEzXzEgfTsgfVxyXG4gICAgICAgIGZpbmFsbHkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlcl8xXzEgJiYgIWZpbHRlcl8xXzEuZG9uZSAmJiAoX2QgPSBmaWx0ZXJfMS5yZXR1cm4pKSBfZC5jYWxsKGZpbHRlcl8xKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMTMpIHRocm93IGVfMTMuZXJyb3I7IH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydHMuc2VyaWFsaXplUXVlcnkgPSBzZXJpYWxpemVRdWVyeTtcclxuIiwiLy8gaHR0cHM6Ly9naXN0LmdpdGh1YnVzZXJjb250ZW50LmNvbS93bHpsYTAwMC9iYWM4M2RmNmQzYzUxOTE2YzRkZDBiYzk0N2U0Njk0Ny9yYXcvN2VlMzQ2MmIwOTVhYjIyNTgwZGRhZjE5MWY0NGE1OTBkYTZmZTMzYi9SSVBFTUQtMTYwLmpzXG5cbi8qXG5cdFJJUEVNRC0xNjAuanNcblxuXHRcdGRldmVsb3BlZFxuXHRcdFx0YnkgSy4gKGh0dHBzOi8vZ2l0aHViLmNvbS93bHpsYTAwMClcblx0XHRcdG9uIERlY2VtYmVyIDI3LTI5LCAyMDE3LFxuXG5cdFx0bGljZW5zZWQgdW5kZXJcblxuXG5cdFx0dGhlIE1JVCBsaWNlbnNlXG5cblx0XHRDb3B5cmlnaHQgKGMpIDIwMTcgSy5cblxuXHRcdCBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuXHRcdG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG5cdFx0ZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0XG5cdFx0cmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsXG5cdFx0Y29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG5cdFx0c2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGVcblx0XHRTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZ1xuXHRcdGNvbmRpdGlvbnM6XG5cblx0XHQgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcblx0XHRpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuXHRcdCBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELFxuXHRcdEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFU1xuXHRcdE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EXG5cdFx0Tk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFRcblx0XHRIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSxcblx0XHRXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcblx0XHRGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SXG5cdFx0T1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBSSVBFTUQxNjBcbntcbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICAvLyBodHRwczovL3dlYmNhY2hlLmdvb2dsZXVzZXJjb250ZW50LmNvbS9zZWFyY2g/cT1jYWNoZTpDbkxPZ29sVEhZRUo6aHR0cHM6Ly93d3cuY29zaWMuZXNhdC5rdWxldXZlbi5iZS9wdWJsaWNhdGlvbnMvYXJ0aWNsZS0zMTcucGRmXG4gICAgICAgIC8vIGh0dHA6Ly9zaG9kaGdhbmdhLmluZmxpYm5ldC5hYy5pbi9iaXRzdHJlYW0vMTA2MDMvMjI5NzgvMTMvMTNfYXBwZW5kaXgucGRmXG4gICAgfVxuXG4gICAgc3RhdGljIGdldF9uX3BhZF9ieXRlcyhtZXNzYWdlX3NpemUgLyogaW4gYnl0ZXMsIDEgYnl0ZSBpcyA4IGJpdHMuICovKVxuICAgIHtcbiAgICAgICAgLy8gIE9idGFpbiB0aGUgbnVtYmVyIG9mIGJ5dGVzIG5lZWRlZCB0byBwYWQgdGhlIG1lc3NhZ2UuXG4gICAgICAgIC8vIEl0IGRvZXMgbm90IGNvbnRhaW4gdGhlIHNpemUgb2YgdGhlIG1lc3NhZ2Ugc2l6ZSBpbmZvcm1hdGlvbi5cbiAgICAgICAgLypcblx0XHRcdGh0dHBzOi8vd2ViY2FjaGUuZ29vZ2xldXNlcmNvbnRlbnQuY29tL3NlYXJjaD9xPWNhY2hlOkNuTE9nb2xUSFlFSjpodHRwczovL3d3dy5jb3NpYy5lc2F0Lmt1bGV1dmVuLmJlL3B1YmxpY2F0aW9ucy9hcnRpY2xlLTMxNy5wZGZcblxuXHRcdFx0VGhlIENyeXB0b2dyYXBoaWMgSGFzaCBGdW5jdGlvbiBSSVBFTUQtMTYwXG5cblx0XHRcdHdyaXR0ZW4gYnlcblx0XHRcdFx0QmFydCBQcmVuZWVsLFxuXHRcdFx0XHRIYW5zIERvYmJlcnRpbixcblx0XHRcdFx0QW50b29uIEJvc3NlbGFlcnNcblx0XHRcdGluXG5cdFx0XHRcdDE5OTcuXG5cblx0XHRcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0XHRcdMKnNSAgICAgRGVzY3JpcHRpb24gb2YgUklQRU1ELTE2MFxuXG5cdFx0XHQuLi4uLi5cblxuXHRcdFx0IEluIG9yZGVyIHRvIGd1YXJhbnRlZSB0aGF0IHRoZSB0b3RhbCBpbnB1dCBzaXplIGlzIGFcblx0XHRcdG11bHRpcGxlIG9mIDUxMiBiaXRzLCB0aGUgaW5wdXQgaXMgcGFkZGVkIGluIHRoZSBzYW1lXG5cdFx0XHR3YXkgYXMgZm9yIGFsbCB0aGUgbWVtYmVycyBvZiB0aGUgTUQ0LWZhbWlseTogb25lXG5cdFx0XHRhcHBlbmRzIGEgc2luZ2xlIDEgZm9sbG93ZWQgYnkgYSBzdHJpbmcgb2YgMHMgKHRoZVxuXHRcdFx0bnVtYmVyIG9mIDBzIGxpZXMgYmV0d2VlbiAwIGFuZCA1MTEpOyB0aGUgbGFzdCA2NCBiaXRzXG5cdFx0XHRvZiB0aGUgZXh0ZW5kZWQgaW5wdXQgY29udGFpbiB0aGUgYmluYXJ5IHJlcHJlc2VudGF0aW9uXG5cdFx0XHRvZiB0aGUgaW5wdXQgc2l6ZSBpbiBiaXRzLCBsZWFzdCBzaWduaWZpY2FudCBieXRlIGZpcnN0LlxuXHRcdCovXG4gICAgICAgIC8qXG5cdFx0XHRodHRwczovL3Rvb2xzLmlldGYub3JnL3JmYy9yZmMxMTg2LnR4dFxuXG5cdFx0XHRSRkMgMTE4NjogTUQ0IE1lc3NhZ2UgRGlnZXN0IEFsZ29yaXRobS5cblxuXHRcdFx0d3JpdHRlbiBieVxuXHRcdFx0XHRSb25hbGQgTGlubiBSaXZlc3Rcblx0XHRcdGluXG5cdFx0XHRcdE9jdG9iZXIgMTk5MC5cblxuXHRcdFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdFx0wqczICAgICBNRDQgQWxnb3JpdGhtIERlc2NyaXB0aW9uXG5cblx0XHRcdC4uLi4uLlxuXG5cdFx0XHRTdGVwIDEuIEFwcGVuZCBwYWRkaW5nIGJpdHNcblxuXHRcdFx0IFRoZSBtZXNzYWdlIGlzIFwicGFkZGVkXCIgKGV4dGVuZGVkKSBzbyB0aGF0IGl0cyBsZW5ndGhcblx0XHRcdChpbiBiaXRzKSBpcyBjb25ncnVlbnQgdG8gNDQ4LCBtb2R1bG8gNTEyLiBUaGF0IGlzLCB0aGVcblx0XHRcdG1lc3NhZ2UgaXMgZXh0ZW5kZWQgc28gdGhhdCBpdCBpcyBqdXN0IDY0IGJpdHMgc2h5IG9mXG5cdFx0XHRiZWluZyBhIG11bHRpcGxlIG9mIDUxMiBiaXRzIGxvbmcuIFBhZGRpbmcgaXMgYWx3YXlzXG5cdFx0XHRwZXJmb3JtZWQsIGV2ZW4gaWYgdGhlIGxlbmd0aCBvZiB0aGUgbWVzc2FnZSBpcyBhbHJlYWR5XG5cdFx0XHRjb25ncnVlbnQgdG8gNDQ4LCBtb2R1bG8gNTEyIChpbiB3aGljaCBjYXNlIDUxMiBiaXRzIG9mXG5cdFx0XHRwYWRkaW5nIGFyZSBhZGRlZCkuXG5cblx0XHRcdCBQYWRkaW5nIGlzIHBlcmZvcm1lZCBhcyBmb2xsb3dzOiBhIHNpbmdsZSBcIjFcIiBiaXQgaXNcblx0XHRcdGFwcGVuZGVkIHRvIHRoZSBtZXNzYWdlLCBhbmQgdGhlbiBlbm91Z2ggemVybyBiaXRzIGFyZVxuXHRcdFx0YXBwZW5kZWQgc28gdGhhdCB0aGUgbGVuZ3RoIGluIGJpdHMgb2YgdGhlIHBhZGRlZFxuXHRcdFx0bWVzc2FnZSBiZWNvbWVzIGNvbmdydWVudCB0byA0NDgsIG1vZHVsbyA1MTIuXG5cblx0XHRcdFN0ZXAgMi4gQXBwZW5kIGxlbmd0aFxuXG5cdFx0XHQgQSA2NC1iaXQgcmVwcmVzZW50YXRpb24gb2YgYiAodGhlIGxlbmd0aCBvZiB0aGUgbWVzc2FnZVxuXHRcdFx0YmVmb3JlIHRoZSBwYWRkaW5nIGJpdHMgd2VyZSBhZGRlZCkgaXMgYXBwZW5kZWQgdG8gdGhlXG5cdFx0XHRyZXN1bHQgb2YgdGhlIHByZXZpb3VzIHN0ZXAuIEluIHRoZSB1bmxpa2VseSBldmVudCB0aGF0XG5cdFx0XHRiIGlzIGdyZWF0ZXIgdGhhbiAyXjY0LCB0aGVuIG9ubHkgdGhlIGxvdy1vcmRlciA2NCBiaXRzXG5cdFx0XHRvZiBiIGFyZSB1c2VkLiAoVGhlc2UgYml0cyBhcmUgYXBwZW5kZWQgYXMgdHdvIDMyLWJpdFxuXHRcdFx0d29yZHMgYW5kIGFwcGVuZGVkIGxvdy1vcmRlciB3b3JkIGZpcnN0IGluIGFjY29yZGFuY2Vcblx0XHRcdHdpdGggdGhlIHByZXZpb3VzIGNvbnZlbnRpb25zLilcblxuXHRcdFx0IEF0IHRoaXMgcG9pbnQgdGhlIHJlc3VsdGluZyBtZXNzYWdlIChhZnRlciBwYWRkaW5nIHdpdGhcblx0XHRcdGJpdHMgYW5kIHdpdGggYikgaGFzIGEgbGVuZ3RoIHRoYXQgaXMgYW4gZXhhY3QgbXVsdGlwbGVcblx0XHRcdG9mIDUxMiBiaXRzLiBFcXVpdmFsZW50bHksIHRoaXMgbWVzc2FnZSBoYXMgYSBsZW5ndGhcblx0XHRcdHRoYXQgaXMgYW4gZXhhY3QgbXVsdGlwbGUgb2YgMTYgKDMyLWJpdCkgd29yZHMuIExldFxuXHRcdFx0TVswIC4uLiBOLTFdIGRlbm90ZSB0aGUgd29yZHMgb2YgdGhlIHJlc3VsdGluZyBtZXNzYWdlLFxuXHRcdFx0d2hlcmUgTiBpcyBhIG11bHRpcGxlIG9mIDE2LlxuXHRcdCovXG4gICAgICAgIC8vIGh0dHBzOi8vY3J5cHRvLnN0YWNrZXhjaGFuZ2UuY29tL2EvMzI0MDcvNTQ1NjhcbiAgICAgICAgLypcblx0XHRcdEV4YW1wbGUgY2FzZSAgIyAxXG5cdFx0XHRcdFswIGJpdDogbWVzc2FnZS5dXG5cdFx0XHRcdFsxIGJpdDogMS5dXG5cdFx0XHRcdFs0NDcgYml0czogMC5dXG5cdFx0XHRcdFs2NCBiaXRzOiBtZXNzYWdlIHNpemUgaW5mb3JtYXRpb24uXVxuXG5cdFx0XHRFeGFtcGxlIGNhc2UgICMgMlxuXHRcdFx0XHRbNTEyLWJpdHM6IG1lc3NhZ2VdXG5cdFx0XHRcdFsxIGJpdDogMS5dXG5cdFx0XHRcdFs0NDcgYml0czogMC5dXG5cdFx0XHRcdFs2NCBiaXRzOiBtZXNzYWdlIHNpemUgaW5mb3JtYXRpb24uXVxuXG5cdFx0XHRFeGFtcGxlIGNhc2UgICMgM1xuXHRcdFx0XHRbKDUxMiAtIDY0ID0gNDQ4KSBiaXRzOiBtZXNzYWdlLl1cblx0XHRcdFx0WzEgYml0OiAxLl1cblx0XHRcdFx0WzUxMSBiaXRzOiAwLl1cblx0XHRcdFx0WzY0IGJpdHM6IG1lc3NhZ2Ugc2l6ZSBpbmZvcm1hdGlvbi5dXG5cblx0XHRcdEV4YW1wbGUgY2FzZSAgIyA0XG5cdFx0XHRcdFsoNTEyIC0gNjUgPSA0NDcpIGJpdHM6IG1lc3NhZ2UuXVxuXHRcdFx0XHRbMSBiaXQ6IDEuXVxuXHRcdFx0XHRbMCBiaXQ6IDAuXVxuXHRcdFx0XHRbNjQgYml0czogbWVzc2FnZSBzaXplIGluZm9ybWF0aW9uLl1cblx0XHQqL1xuICAgICAgICAvLyBUaGUgbnVtYmVyIG9mIHBhZGRpbmcgemVybyBiaXRzOlxuICAgICAgICAvLyAgICAgIDUxMSAtIFt7KG1lc3NhZ2Ugc2l6ZSBpbiBiaXRzKSArIDY0fSAobW9kIDUxMildXG4gICAgICAgIHJldHVybiA2NCAtICgobWVzc2FnZV9zaXplICsgOCkgJiAwYjAwMTExMTExIC8qIDYzICovKTtcbiAgICB9XG4gICAgc3RhdGljIHBhZChtZXNzYWdlIC8qIEFuIEFycmF5QnVmZmVyLiAqLylcbiAgICB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2Vfc2l6ZSA9IG1lc3NhZ2UuYnl0ZUxlbmd0aDtcbiAgICAgICAgY29uc3Qgbl9wYWQgPSBSSVBFTUQxNjAuZ2V0X25fcGFkX2J5dGVzKG1lc3NhZ2Vfc2l6ZSk7XG5cbiAgICAgICAgLy8gIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAgaXMgKCgyICoqIDUzKSAtIDEpIGFuZFxuICAgICAgICAvLyBiaXR3aXNlIG9wZXJhdGlvbiBpbiBKYXZhc2NyaXB0IGlzIGRvbmUgb24gMzItYml0cyBvcGVyYW5kcy5cbiAgICAgICAgY29uc3QgZGl2bW9kID0gKGRpdmlkZW5kLCBkaXZpc29yKSA9PiBbXG4gICAgICAgICAgICBNYXRoLmZsb29yKGRpdmlkZW5kIC8gZGl2aXNvciksXG4gICAgICAgICAgICBkaXZpZGVuZCAlIGRpdmlzb3JcbiAgICAgICAgXTtcbiAgICAgICAgLypcblRvIHNoaWZ0XG5cbiAgIDAwMDAwMDAwIDAwMD8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdCBvXG4gICAwMDAwMDAwMCA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/PzAwMFxuXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5NZXRob2QgIzFcblxuICAgIDAwMDAwMDAwIDAwMD8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ICA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/P1xuICAgWzAwMDAwMDAwIDAwMEFBQUFBIEFBQUFBQUFBIEFBQUFBQUFBXSAoPEE+IGNhcHR1cmVkKVxuICAgWzAwMDAwMDAwIEFBQUFBQUFBIEFBQUFBQUFBIEFBQUFBMDAwXSAoPEE+IHNoaWZ0ZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgKDxCPiBjYXB0dXJlZCkgW0JCQkJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCXVxuICAgICAgICAgICAgICAgICAgICAgKDxCPiBzaGlmdGVkKSBbQkJCXVtCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQjAwMF1cbiAgIFswMDAwMDAwMCBBQUFBQUFBQSBBQUFBQUFBQSBBQUFBQUJCQl0gKDxBPiAmIDxCXzI+IG1lcmdlZClcbiAgIFswMDAwMDAwMCBBQUFBQUFBQSBBQUFBQUFBQSBBQUFBQUJCQl1bQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkIwMDBdXG4gICAgMDAwMDAwMDAgPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/MDAwXG5cblx0XHRjb25zdCB1aW50MzJfbWF4X3BsdXNfMSA9IDB4MTAwMDAwMDAwOyAvLyAoMiAqKiAzMilcblx0XHRjb25zdCBbXG5cdFx0XHRtc2dfYnl0ZV9zaXplX21vc3QsIC8vIFZhbHVlIHJhbmdlIFswLCAoMiAqKiAyMSkgLSAxXS5cblx0XHRcdG1zZ19ieXRlX3NpemVfbGVhc3QgLy8gVmFsdWUgcmFuZ2UgWzAsICgyICoqIDMyKSAtIDFdLlxuXHRcdF0gPSBkaXZtb2QobWVzc2FnZV9zaXplLCB1aW50MzJfbWF4X3BsdXNfMSk7XG5cdFx0Y29uc3QgW1xuXHRcdFx0Y2FycnksIC8vIFZhbHVlIHJhbmdlIFswLCA3XS5cblx0XHRcdG1zZ19iaXRfc2l6ZV9sZWFzdCAvLyBWYWx1ZSByYW5nZSBbMCwgKDIgKiogMzIpIC0gOF0uXG5cdFx0XSA9IGRpdm1vZChtZXNzYWdlX2J5dGVfc2l6ZV9sZWFzdCAqIDgsIHVpbnQzMl9tYXhfcGx1c18xKTtcblx0XHRjb25zdCBtZXNzYWdlX2JpdF9zaXplX21vc3QgPSBtZXNzYWdlX2J5dGVfc2l6ZV9tb3N0ICogOFxuXHRcdFx0KyBjYXJyeTsgLy8gVmFsdWUgcmFuZ2UgWzAsICgyICoqIDI0KSAtIDFdLlxuXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5NZXRob2QgIzJcbiAgICAwMDAwMDAwMCAwMDA/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyAgPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz9cbiAgICAgIFswMDAwMCAwMDBBQUFBQSBBQUFBQUFBQSBBQUFBQUFBQSAgQUFBXSAoPEE+IGNhcHR1cmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICg8Qj4gY2FwdHVyZWQpIFswMDBCQkJCQiBCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQkJCQl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKDxCPiBzaGlmdGVkKSBbQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkIwMDBdXG4gICBbMDAwMDAwMDAgQUFBQUFBQUEgQUFBQUFBQUEgQUFBQUFBQUFdW0JCQkJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCIEJCQkJCMDAwXVxuICAgIDAwMDAwMDAwID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ICA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/PzAwMFxuXG5cdFx0Ki9cbiAgICAgICAgY29uc3QgW1xuICAgICAgICAgICAgbXNnX2JpdF9zaXplX21vc3QsXG4gICAgICAgICAgICBtc2dfYml0X3NpemVfbGVhc3RcbiAgICAgICAgXSA9IGRpdm1vZChtZXNzYWdlX3NpemUsIDUzNjg3MDkxMiAvKiAoMiAqKiAyOSkgKi8pXG4gICAgICAgICAgICAubWFwKCh4LCBpbmRleCkgPT4gKGluZGV4ID8gKHggKiA4KSA6IHgpKTtcblxuICAgICAgICAvLyBgQXJyYXlCdWZmZXIudHJhbnNmZXIoKWAgaXMgbm90IHN1cHBvcnRlZC5cbiAgICAgICAgY29uc3QgcGFkZGVkID0gbmV3IFVpbnQ4QXJyYXkobWVzc2FnZV9zaXplICsgbl9wYWQgKyA4KTtcbiAgICAgICAgcGFkZGVkLnNldChuZXcgVWludDhBcnJheShtZXNzYWdlKSwgMCk7XG4gICAgICAgIGNvbnN0IGRhdGFfdmlldyA9IG5ldyBEYXRhVmlldyhwYWRkZWQuYnVmZmVyKTtcbiAgICAgICAgZGF0YV92aWV3LnNldFVpbnQ4KG1lc3NhZ2Vfc2l6ZSwgMGIxMDAwMDAwMCk7XG4gICAgICAgIGRhdGFfdmlldy5zZXRVaW50MzIoXG4gICAgICAgICAgICBtZXNzYWdlX3NpemUgKyBuX3BhZCxcbiAgICAgICAgICAgIG1zZ19iaXRfc2l6ZV9sZWFzdCxcbiAgICAgICAgICAgIHRydWUgLy8gTGl0dGxlLWVuZGlhblxuICAgICAgICApO1xuICAgICAgICBkYXRhX3ZpZXcuc2V0VWludDMyKFxuICAgICAgICAgICAgbWVzc2FnZV9zaXplICsgbl9wYWQgKyA0LFxuICAgICAgICAgICAgbXNnX2JpdF9zaXplX21vc3QsXG4gICAgICAgICAgICB0cnVlIC8vIExpdHRsZS1lbmRpYW5cbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gcGFkZGVkLmJ1ZmZlcjtcbiAgICB9XG5cbiAgICBzdGF0aWMgZihqLCB4LCB5LCB6KVxuICAgIHtcbiAgICAgICAgaWYoMCA8PSBqICYmIGogPD0gMTUpXG4gICAgICAgIHsgLy8gRXhjbHVzaXZlLU9SXG4gICAgICAgICAgICByZXR1cm4geCBeIHkgXiB6O1xuICAgICAgICB9XG4gICAgICAgIGlmKDE2IDw9IGogJiYgaiA8PSAzMSlcbiAgICAgICAgeyAvLyBNdWx0aXBsZXhpbmcgKG11eGluZylcbiAgICAgICAgICAgIHJldHVybiAoeCAmIHkpIHwgKH54ICYgeik7XG4gICAgICAgIH1cbiAgICAgICAgaWYoMzIgPD0gaiAmJiBqIDw9IDQ3KVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gKHggfCB+eSkgXiB6O1xuICAgICAgICB9XG4gICAgICAgIGlmKDQ4IDw9IGogJiYgaiA8PSA2MylcbiAgICAgICAgeyAvLyBNdWx0aXBsZXhpbmcgKG11eGluZylcbiAgICAgICAgICAgIHJldHVybiAoeCAmIHopIHwgKHkgJiB+eik7XG4gICAgICAgIH1cbiAgICAgICAgaWYoNjQgPD0gaiAmJiBqIDw9IDc5KVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4geCBeICh5IHwgfnopO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBLKGopXG4gICAge1xuICAgICAgICBpZigwIDw9IGogJiYgaiA8PSAxNSlcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIDB4MDAwMDAwMDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYoMTYgPD0gaiAmJiBqIDw9IDMxKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBNYXRoLmZsb29yKCgyICoqIDMwKSAqIE1hdGguU1FSVDIpXG4gICAgICAgICAgICByZXR1cm4gMHg1QTgyNzk5OTtcbiAgICAgICAgfVxuICAgICAgICBpZigzMiA8PSBqICYmIGogPD0gNDcpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIE1hdGguZmxvb3IoKDIgKiogMzApICogTWF0aC5zcXJ0KDMpKVxuICAgICAgICAgICAgcmV0dXJuIDB4NkVEOUVCQTE7XG4gICAgICAgIH1cbiAgICAgICAgaWYoNDggPD0gaiAmJiBqIDw9IDYzKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBNYXRoLmZsb29yKCgyICoqIDMwKSAqIE1hdGguc3FydCg1KSlcbiAgICAgICAgICAgIHJldHVybiAweDhGMUJCQ0RDO1xuICAgICAgICB9XG4gICAgICAgIGlmKDY0IDw9IGogJiYgaiA8PSA3OSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gTWF0aC5mbG9vcigoMiAqKiAzMCkgKiBNYXRoLnNxcnQoNykpXG4gICAgICAgICAgICByZXR1cm4gMHhBOTUzRkQ0RTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgS1AoaikgLy8gSydcbiAgICB7XG4gICAgICAgIGlmKDAgPD0gaiAmJiBqIDw9IDE1KVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBNYXRoLmZsb29yKCgyICoqIDMwKSAqIE1hdGguY2JydCgyKSlcbiAgICAgICAgICAgIHJldHVybiAweDUwQTI4QkU2O1xuICAgICAgICB9XG4gICAgICAgIGlmKDE2IDw9IGogJiYgaiA8PSAzMSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gTWF0aC5mbG9vcigoMiAqKiAzMCkgKiBNYXRoLmNicnQoMykpXG4gICAgICAgICAgICByZXR1cm4gMHg1QzRERDEyNDtcbiAgICAgICAgfVxuICAgICAgICBpZigzMiA8PSBqICYmIGogPD0gNDcpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIE1hdGguZmxvb3IoKDIgKiogMzApICogTWF0aC5jYnJ0KDUpKVxuICAgICAgICAgICAgcmV0dXJuIDB4NkQ3MDNFRjM7XG4gICAgICAgIH1cbiAgICAgICAgaWYoNDggPD0gaiAmJiBqIDw9IDYzKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBNYXRoLmZsb29yKCgyICoqIDMwKSAqIE1hdGguY2JydCg3KSlcbiAgICAgICAgICAgIHJldHVybiAweDdBNkQ3NkU5O1xuICAgICAgICB9XG4gICAgICAgIGlmKDY0IDw9IGogJiYgaiA8PSA3OSlcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIDB4MDAwMDAwMDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGFkZF9tb2R1bG8zMigvKiAuLi4uLi4gKi8pXG4gICAge1xuICAgICAgICAvLyAxLiAgTW9kdWxvIGFkZGl0aW9uIChhZGRpdGlvbiBtb2R1bG8pIGlzIGFzc29jaWF0aXZlLlxuICAgICAgICAvLyAgICBodHRwczovL3Byb29md2lraS5vcmcvd2lraS9Nb2R1bG9fQWRkaXRpb25faXNfQXNzb2NpYXRpdmVcbiBcdFx0Ly8gMi4gIEJpdHdpc2Ugb3BlcmF0aW9uIGluIEphdmFzY3JpcHRcbiAgICAgICAgLy8gICAgaXMgZG9uZSBvbiAzMi1iaXRzIG9wZXJhbmRzXG4gICAgICAgIC8vICAgIGFuZCByZXN1bHRzIGluIGEgMzItYml0cyB2YWx1ZS5cbiAgICAgICAgcmV0dXJuIEFycmF5XG4gICAgICAgICAgICAuZnJvbShhcmd1bWVudHMpXG4gICAgICAgICAgICAucmVkdWNlKChhLCBiKSA9PiAoYSArIGIpLCAwKSB8IDA7XG4gICAgfVxuICAgIHN0YXRpYyByb2wzMih2YWx1ZSwgY291bnQpXG4gICAgeyAvLyBDeWNsaWMgbGVmdCBzaGlmdCAocm90YXRlKSBvbiAzMi1iaXRzIHZhbHVlLlxuICAgICAgICByZXR1cm4gKHZhbHVlIDw8IGNvdW50KSB8ICh2YWx1ZSA+Pj4gKDMyIC0gY291bnQpKTtcbiAgICB9XG4gICAgc3RhdGljIGhhc2gobWVzc2FnZSAvKiBBbiBBcnJheUJ1ZmZlci4gKi8pXG4gICAge1xuICAgICAgICAvLyAvLy8vLy8vLyAgICAgICBQYWRkaW5nICAgICAgIC8vLy8vLy8vLy9cblxuICAgICAgICAvLyBUaGUgcGFkZGVkIG1lc3NhZ2UuXG4gICAgICAgIGNvbnN0IHBhZGRlZCA9IFJJUEVNRDE2MC5wYWQobWVzc2FnZSk7XG5cbiAgICAgICAgLy8gLy8vLy8vLy8gICAgIENvbXByZXNzaW9uICAgICAvLy8vLy8vLy8vXG5cbiAgICAgICAgLy8gTWVzc2FnZSB3b3JkIHNlbGVjdG9ycy5cbiAgICAgICAgY29uc3QgciA9IFtcbiAgICAgICAgICAgIDAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsXG4gICAgICAgICAgICA3LCA0LCAxMywgMSwgMTAsIDYsIDE1LCAzLCAxMiwgMCwgOSwgNSwgMiwgMTQsIDExLCA4LFxuICAgICAgICAgICAgMywgMTAsIDE0LCA0LCA5LCAxNSwgOCwgMSwgMiwgNywgMCwgNiwgMTMsIDExLCA1LCAxMixcbiAgICAgICAgICAgIDEsIDksIDExLCAxMCwgMCwgOCwgMTIsIDQsIDEzLCAzLCA3LCAxNSwgMTQsIDUsIDYsIDIsXG4gICAgICAgICAgICA0LCAwLCA1LCA5LCA3LCAxMiwgMiwgMTAsIDE0LCAxLCAzLCA4LCAxMSwgNiwgMTUsIDEzXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IHJQID0gWyAvLyByJ1xuICAgICAgICAgICAgNSwgMTQsIDcsIDAsIDksIDIsIDExLCA0LCAxMywgNiwgMTUsIDgsIDEsIDEwLCAzLCAxMixcbiAgICAgICAgICAgIDYsIDExLCAzLCA3LCAwLCAxMywgNSwgMTAsIDE0LCAxNSwgOCwgMTIsIDQsIDksIDEsIDIsXG4gICAgICAgICAgICAxNSwgNSwgMSwgMywgNywgMTQsIDYsIDksIDExLCA4LCAxMiwgMiwgMTAsIDAsIDQsIDEzLFxuICAgICAgICAgICAgOCwgNiwgNCwgMSwgMywgMTEsIDE1LCAwLCA1LCAxMiwgMiwgMTMsIDksIDcsIDEwLCAxNCxcbiAgICAgICAgICAgIDEyLCAxNSwgMTAsIDQsIDEsIDUsIDgsIDcsIDYsIDIsIDEzLCAxNCwgMCwgMywgOSwgMTFcbiAgICAgICAgXTtcblxuICAgICAgICAvLyBBbW91bnRzIGZvciAncm90YXRlIGxlZnQnIG9wZXJhdGlvbi5cbiAgICAgICAgY29uc3QgcyA9IFtcbiAgICAgICAgICAgIDExLCAxNCwgMTUsIDEyLCA1LCA4LCA3LCA5LCAxMSwgMTMsIDE0LCAxNSwgNiwgNywgOSwgOCxcbiAgICAgICAgICAgIDcsIDYsIDgsIDEzLCAxMSwgOSwgNywgMTUsIDcsIDEyLCAxNSwgOSwgMTEsIDcsIDEzLCAxMixcbiAgICAgICAgICAgIDExLCAxMywgNiwgNywgMTQsIDksIDEzLCAxNSwgMTQsIDgsIDEzLCA2LCA1LCAxMiwgNywgNSxcbiAgICAgICAgICAgIDExLCAxMiwgMTQsIDE1LCAxNCwgMTUsIDksIDgsIDksIDE0LCA1LCA2LCA4LCA2LCA1LCAxMixcbiAgICAgICAgICAgIDksIDE1LCA1LCAxMSwgNiwgOCwgMTMsIDEyLCA1LCAxMiwgMTMsIDE0LCAxMSwgOCwgNSwgNlxuICAgICAgICBdO1xuICAgICAgICBjb25zdCBzUCA9IFsgLy8gcydcbiAgICAgICAgICAgIDgsIDksIDksIDExLCAxMywgMTUsIDE1LCA1LCA3LCA3LCA4LCAxMSwgMTQsIDE0LCAxMiwgNixcbiAgICAgICAgICAgIDksIDEzLCAxNSwgNywgMTIsIDgsIDksIDExLCA3LCA3LCAxMiwgNywgNiwgMTUsIDEzLCAxMSxcbiAgICAgICAgICAgIDksIDcsIDE1LCAxMSwgOCwgNiwgNiwgMTQsIDEyLCAxMywgNSwgMTQsIDEzLCAxMywgNywgNSxcbiAgICAgICAgICAgIDE1LCA1LCA4LCAxMSwgMTQsIDE0LCA2LCAxNCwgNiwgOSwgMTIsIDksIDEyLCA1LCAxNSwgOCxcbiAgICAgICAgICAgIDgsIDUsIDEyLCA5LCAxMiwgNSwgMTQsIDYsIDgsIDEzLCA2LCA1LCAxNSwgMTMsIDExLCAxMVxuICAgICAgICBdO1xuXG4gICAgICAgIC8vIFRoZSBzaXplLCBpbiBieXRlcywgb2YgYSB3b3JkLlxuICAgICAgICBjb25zdCB3b3JkX3NpemUgPSA0O1xuXG4gICAgICAgIC8vIFRoZSBzaXplLCBpbiBieXRlcywgb2YgYSAxNi13b3JkcyBibG9jay5cbiAgICAgICAgY29uc3QgYmxvY2tfc2l6ZSA9IDY0O1xuXG4gICAgICAgIC8vIFRoZSBudW1iZXIgb2YgdGhlIDE2LXdvcmRzIGJsb2Nrcy5cbiAgICAgICAgY29uc3QgdCA9IHBhZGRlZC5ieXRlTGVuZ3RoIC8gYmxvY2tfc2l6ZTtcblxuICAgICAgICAvLyAgVGhlIG1lc3NhZ2UgYWZ0ZXIgcGFkZGluZyBjb25zaXN0cyBvZiB0IDE2LXdvcmQgYmxvY2tzIHRoYXRcbiAgICAgICAgLy8gYXJlIGRlbm90ZWQgd2l0aCBYX2lbal0sIHdpdGggMOKJpGniiaQodCDiiJIgMSkgYW5kIDDiiaRq4omkMTUuXG4gICAgICAgIGNvbnN0IFggPSAobmV3IEFycmF5KHQpKVxuICAgICAgICAgICAgLmZpbGwodW5kZWZpbmVkKVxuICAgICAgICAgICAgLm1hcCgoXywgaSkgPT4gaiA9PiAoXG4gICAgICAgICAgICAgICAgbmV3IERhdGFWaWV3KFxuICAgICAgICAgICAgICAgICAgICBwYWRkZWQsIGkgKiBibG9ja19zaXplLCBibG9ja19zaXplXG4gICAgICAgICAgICAgICAgKS5nZXRVaW50MzIoXG4gICAgICAgICAgICAgICAgICAgIGogKiB3b3JkX3NpemUsXG4gICAgICAgICAgICAgICAgICAgIHRydWUgLy8gTGl0dGxlLWVuZGlhblxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkpO1xuXG4gICAgICAgIC8vICBUaGUgcmVzdWx0IG9mIFJJUEVNRC0xNjAgaXMgY29udGFpbmVkIGluIGZpdmUgMzItYml0IHdvcmRzLFxuICAgICAgICAvLyB3aGljaCBmb3JtIHRoZSBpbnRlcm5hbCBzdGF0ZSBvZiB0aGUgYWxnb3JpdGhtLiBUaGUgZmluYWxcbiAgICAgICAgLy8gY29udGVudCBvZiB0aGVzZSBmaXZlIDMyLWJpdCB3b3JkcyBpcyBjb252ZXJ0ZWQgdG8gYSAxNjAtYml0XG4gICAgICAgIC8vIHN0cmluZywgYWdhaW4gdXNpbmcgdGhlIGxpdHRsZS1lbmRpYW4gY29udmVudGlvbi5cbiAgICAgICAgY29uc3QgaCA9IFtcbiAgICAgICAgICAgIDB4Njc0NTIzMDEsIC8vIGhfMFxuICAgICAgICAgICAgMHhFRkNEQUI4OSwgLy8gaF8xXG4gICAgICAgICAgICAweDk4QkFEQ0ZFLCAvLyBoXzJcbiAgICAgICAgICAgIDB4MTAzMjU0NzYsIC8vIGhfM1xuICAgICAgICAgICAgMHhDM0QyRTFGMCAgLy8gaF80XG4gICAgICAgIF07XG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHQ7ICsraSlcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IEEgPSBoWzBdOyBsZXQgQiA9IGhbMV07IGxldCBDID0gaFsyXTsgbGV0IEQgPSBoWzNdOyBsZXQgRSA9IGhbNF07XG4gICAgICAgICAgICBsZXQgQVAgPSBBOyBsZXQgQlAgPSBCOyBsZXQgQ1AgPSBDOyBsZXQgRFAgPSBEOyBsZXQgRVAgPSBFO1xuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IDgwOyArK2opXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gTGVmdCByb3VuZHNcbiAgICAgICAgICAgICAgICBsZXQgVCA9IFJJUEVNRDE2MC5hZGRfbW9kdWxvMzIoIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2hhZG93XG4gICAgICAgICAgICAgICAgICAgIFJJUEVNRDE2MC5yb2wzMihcbiAgICAgICAgICAgICAgICAgICAgICAgIFJJUEVNRDE2MC5hZGRfbW9kdWxvMzIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSSVBFTUQxNjAuZihqLCBCLCBDLCBEKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBYW2ldKHJbal0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJJUEVNRDE2MC5LKGopXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgc1tqXVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBFXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBBID0gRTtcbiAgICAgICAgICAgICAgICBFID0gRDtcbiAgICAgICAgICAgICAgICBEID0gUklQRU1EMTYwLnJvbDMyKEMsIDEwKTtcbiAgICAgICAgICAgICAgICBDID0gQjtcbiAgICAgICAgICAgICAgICBCID0gVDtcblxuICAgICAgICAgICAgICAgIC8vIFJpZ2h0IHJvdW5kc1xuICAgICAgICAgICAgICAgIFQgPSBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKFxuICAgICAgICAgICAgICAgICAgICBSSVBFTUQxNjAucm9sMzIoXG4gICAgICAgICAgICAgICAgICAgICAgICBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFQLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJJUEVNRDE2MC5mKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA3OSAtIGosXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJQLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDUCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRFBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFhbaV0oclBbal0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJJUEVNRDE2MC5LUChqKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNQW2pdXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIEVQXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBBUCA9IEVQO1xuICAgICAgICAgICAgICAgIEVQID0gRFA7XG4gICAgICAgICAgICAgICAgRFAgPSBSSVBFTUQxNjAucm9sMzIoQ1AsIDEwKTtcbiAgICAgICAgICAgICAgICBDUCA9IEJQO1xuICAgICAgICAgICAgICAgIEJQID0gVDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IFQgPSBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKGhbMV0sIEMsIERQKTtcbiAgICAgICAgICAgIGhbMV0gPSBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKGhbMl0sIEQsIEVQKTtcbiAgICAgICAgICAgIGhbMl0gPSBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKGhbM10sIEUsIEFQKTtcbiAgICAgICAgICAgIGhbM10gPSBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKGhbNF0sIEEsIEJQKTtcbiAgICAgICAgICAgIGhbNF0gPSBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKGhbMF0sIEIsIENQKTtcbiAgICAgICAgICAgIGhbMF0gPSBUO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gIFRoZSBmaW5hbCBvdXRwdXQgc3RyaW5nIHRoZW4gY29uc2lzdHMgb2YgdGhlIGNvbmNhdGVuYXRhdGlvblxuICAgICAgICAvLyBvZiBoXzAsIGhfMSwgaF8yLCBoXzMsIGFuZCBoXzQgYWZ0ZXIgY29udmVydGluZyBlYWNoIGhfaSB0byBhXG4gICAgICAgIC8vIDQtYnl0ZSBzdHJpbmcgdXNpbmcgdGhlIGxpdHRsZS1lbmRpYW4gY29udmVudGlvbi5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5QnVmZmVyKDIwKTtcbiAgICAgICAgY29uc3QgZGF0YV92aWV3ID0gbmV3IERhdGFWaWV3KHJlc3VsdCk7XG4gICAgICAgIGguZm9yRWFjaCgoaF9pLCBpKSA9PiBkYXRhX3ZpZXcuc2V0VWludDMyKGkgKiA0LCBoX2ksIHRydWUpKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIFJJUEVNRDE2MFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImVvc2pzX2FwaVwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtfbmFtZV9cIl0gPSBzZWxmW1wid2VicGFja0NodW5rX25hbWVfXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJleHRlcm5hbHNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvZW9zanMtYXBpLnRzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=