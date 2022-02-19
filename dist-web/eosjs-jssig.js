var eosjs_jssig;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/PrivateKey.ts":
/*!***************************!*\
  !*** ./src/PrivateKey.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrivateKey = void 0;
var eosjs_numeric_1 = __webpack_require__(/*! ./eosjs-numeric */ "./src/eosjs-numeric.ts");
var eosjs_key_conversions_1 = __webpack_require__(/*! ./eosjs-key-conversions */ "./src/eosjs-key-conversions.ts");
/** Represents/stores a private key and provides easy conversion for use with `elliptic` lib */
var PrivateKey = /** @class */ (function () {
    function PrivateKey(key, ec) {
        this.key = key;
        this.ec = ec;
    }
    /** Instantiate private key from an `elliptic`-format private key */
    PrivateKey.fromElliptic = function (privKey, keyType, ec) {
        if (!ec) {
            ec = (0, eosjs_key_conversions_1.constructElliptic)(keyType);
        }
        return new PrivateKey({
            type: keyType,
            data: privKey.getPrivate().toArrayLike(Buffer, 'be', 32),
        }, ec);
    };
    /** Instantiate private key from an EOSIO-format private key */
    PrivateKey.fromString = function (keyString, ec) {
        var privateKey = (0, eosjs_numeric_1.stringToPrivateKey)(keyString);
        if (!ec) {
            ec = (0, eosjs_key_conversions_1.constructElliptic)(privateKey.type);
        }
        return new PrivateKey(privateKey, ec);
    };
    /** Export private key as `elliptic`-format private key */
    PrivateKey.prototype.toElliptic = function () {
        return this.ec.keyFromPrivate(this.key.data);
    };
    PrivateKey.prototype.toLegacyString = function () {
        return (0, eosjs_numeric_1.privateKeyToLegacyString)(this.key);
    };
    /** Export private key as EOSIO-format private key */
    PrivateKey.prototype.toString = function () {
        return (0, eosjs_numeric_1.privateKeyToString)(this.key);
    };
    /** Get key type from key */
    PrivateKey.prototype.getType = function () {
        return this.key.type;
    };
    /** Retrieve the public key from a private key */
    PrivateKey.prototype.getPublicKey = function () {
        var ellipticPrivateKey = this.toElliptic();
        return eosjs_key_conversions_1.PublicKey.fromElliptic(ellipticPrivateKey, this.getType(), this.ec);
    };
    /** Sign a message or hashed message digest with private key */
    PrivateKey.prototype.sign = function (data, shouldHash, encoding) {
        var _this = this;
        if (shouldHash === void 0) { shouldHash = true; }
        if (encoding === void 0) { encoding = 'utf8'; }
        if (shouldHash) {
            if (typeof data === 'string') {
                data = Buffer.from(data, encoding);
            }
            data = this.ec.hash().update(data).digest();
        }
        var tries = 0;
        var signature;
        var isCanonical = function (sigData) {
            return !(sigData[1] & 0x80) && !(sigData[1] === 0 && !(sigData[2] & 0x80))
                && !(sigData[33] & 0x80) && !(sigData[33] === 0 && !(sigData[34] & 0x80));
        };
        var constructSignature = function (options) {
            var ellipticPrivateKey = _this.toElliptic();
            var ellipticSignature = ellipticPrivateKey.sign(data, options);
            return eosjs_key_conversions_1.Signature.fromElliptic(ellipticSignature, _this.getType(), _this.ec);
        };
        if (this.key.type === eosjs_numeric_1.KeyType.k1) {
            do {
                signature = constructSignature({ canonical: true, pers: [++tries] });
            } while (!isCanonical(signature.toBinary()));
        }
        else {
            signature = constructSignature({ canonical: true });
        }
        return signature;
    };
    /** Validate a private key */
    PrivateKey.prototype.isValid = function () {
        try {
            var ellipticPrivateKey = this.toElliptic();
            var validationObj = ellipticPrivateKey.validate();
            return validationObj.result;
        }
        catch (_a) {
            return false;
        }
    };
    return PrivateKey;
}());
exports.PrivateKey = PrivateKey;


/***/ }),

/***/ "./src/PublicKey.ts":
/*!**************************!*\
  !*** ./src/PublicKey.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PublicKey = void 0;
var eosjs_numeric_1 = __webpack_require__(/*! ./eosjs-numeric */ "./src/eosjs-numeric.ts");
var eosjs_key_conversions_1 = __webpack_require__(/*! ./eosjs-key-conversions */ "./src/eosjs-key-conversions.ts");
/** Represents/stores a public key and provides easy conversion for use with `elliptic` lib */
var PublicKey = /** @class */ (function () {
    function PublicKey(key, ec) {
        this.key = key;
        this.ec = ec;
    }
    /** Instantiate public key from an EOSIO-format public key */
    PublicKey.fromString = function (publicKeyStr, ec) {
        var key = (0, eosjs_numeric_1.stringToPublicKey)(publicKeyStr);
        if (!ec) {
            ec = (0, eosjs_key_conversions_1.constructElliptic)(key.type);
        }
        return new PublicKey(key, ec);
    };
    /** Instantiate public key from an `elliptic`-format public key */
    PublicKey.fromElliptic = function (publicKey, keyType, ec) {
        var x = publicKey.getPublic().getX().toArray('be', 32);
        var y = publicKey.getPublic().getY().toArray('be', 32);
        if (!ec) {
            ec = (0, eosjs_key_conversions_1.constructElliptic)(keyType);
        }
        return new PublicKey({
            type: keyType,
            data: new Uint8Array([(y[31] & 1) ? 3 : 2].concat(x)),
        }, ec);
    };
    /** Export public key as EOSIO-format public key */
    PublicKey.prototype.toString = function () {
        return (0, eosjs_numeric_1.publicKeyToString)(this.key);
    };
    /** Export public key as Legacy EOSIO-format public key */
    PublicKey.prototype.toLegacyString = function () {
        return (0, eosjs_numeric_1.publicKeyToLegacyString)(this.key);
    };
    /** Export public key as `elliptic`-format public key */
    PublicKey.prototype.toElliptic = function () {
        return this.ec.keyPair({
            pub: Buffer.from(this.key.data),
        });
    };
    /** Get key type from key */
    PublicKey.prototype.getType = function () {
        return this.key.type;
    };
    /** Validate a public key */
    PublicKey.prototype.isValid = function () {
        try {
            var ellipticPublicKey = this.toElliptic();
            var validationObj = ellipticPublicKey.validate();
            return validationObj.result;
        }
        catch (_a) {
            return false;
        }
    };
    return PublicKey;
}());
exports.PublicKey = PublicKey;


/***/ }),

/***/ "./src/Signature.ts":
/*!**************************!*\
  !*** ./src/Signature.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Signature = void 0;
var BN = __webpack_require__(/*! bn.js */ "./node_modules/bn.js/lib/bn.js");
var eosjs_numeric_1 = __webpack_require__(/*! ./eosjs-numeric */ "./src/eosjs-numeric.ts");
var eosjs_key_conversions_1 = __webpack_require__(/*! ./eosjs-key-conversions */ "./src/eosjs-key-conversions.ts");
/** Represents/stores a Signature and provides easy conversion for use with `elliptic` lib */
var Signature = /** @class */ (function () {
    function Signature(signature, ec) {
        this.signature = signature;
        this.ec = ec;
    }
    /** Instantiate Signature from an EOSIO-format Signature */
    Signature.fromString = function (sig, ec) {
        var signature = (0, eosjs_numeric_1.stringToSignature)(sig);
        if (!ec) {
            ec = (0, eosjs_key_conversions_1.constructElliptic)(signature.type);
        }
        return new Signature(signature, ec);
    };
    /** Instantiate Signature from an `elliptic`-format Signature */
    Signature.fromElliptic = function (ellipticSig, keyType, ec) {
        var r = ellipticSig.r.toArray('be', 32);
        var s = ellipticSig.s.toArray('be', 32);
        var eosioRecoveryParam;
        if (keyType === eosjs_numeric_1.KeyType.k1 || keyType === eosjs_numeric_1.KeyType.r1) {
            eosioRecoveryParam = ellipticSig.recoveryParam + 27;
            if (ellipticSig.recoveryParam <= 3) {
                eosioRecoveryParam += 4;
            }
        }
        else if (keyType === eosjs_numeric_1.KeyType.wa) {
            eosioRecoveryParam = ellipticSig.recoveryParam;
        }
        var sigData = new Uint8Array([eosioRecoveryParam].concat(r, s));
        if (!ec) {
            ec = (0, eosjs_key_conversions_1.constructElliptic)(keyType);
        }
        return new Signature({
            type: keyType,
            data: sigData,
        }, ec);
    };
    /** Export Signature as `elliptic`-format Signature
     * NOTE: This isn't an actual elliptic-format Signature, as ec.Signature is not exported by the library.
     * That's also why the return type is `any`.  We're *actually* returning an object with the 3 params
     * not an ec.Signature.
     * Further NOTE: @types/elliptic shows ec.Signature as exported; it is *not*.  Hence the `any`.
     */
    Signature.prototype.toElliptic = function () {
        var lengthOfR = 32;
        var lengthOfS = 32;
        var r = new BN(this.signature.data.slice(1, lengthOfR + 1));
        var s = new BN(this.signature.data.slice(lengthOfR + 1, lengthOfR + lengthOfS + 1));
        var ellipticRecoveryBitField;
        if (this.signature.type === eosjs_numeric_1.KeyType.k1 || this.signature.type === eosjs_numeric_1.KeyType.r1) {
            ellipticRecoveryBitField = this.signature.data[0] - 27;
            if (ellipticRecoveryBitField > 3) {
                ellipticRecoveryBitField -= 4;
            }
        }
        else if (this.signature.type === eosjs_numeric_1.KeyType.wa) {
            ellipticRecoveryBitField = this.signature.data[0];
        }
        var recoveryParam = ellipticRecoveryBitField & 3;
        return { r: r, s: s, recoveryParam: recoveryParam };
    };
    /** Export Signature as EOSIO-format Signature */
    Signature.prototype.toString = function () {
        return (0, eosjs_numeric_1.signatureToString)(this.signature);
    };
    /** Export Signature in binary format */
    Signature.prototype.toBinary = function () {
        return this.signature.data;
    };
    /** Get key type from signature */
    Signature.prototype.getType = function () {
        return this.signature.type;
    };
    /** Verify a signature with a message or hashed message digest and public key */
    Signature.prototype.verify = function (data, publicKey, shouldHash, encoding) {
        if (shouldHash === void 0) { shouldHash = true; }
        if (encoding === void 0) { encoding = 'utf8'; }
        if (shouldHash) {
            if (typeof data === 'string') {
                data = Buffer.from(data, encoding);
            }
            data = this.ec.hash().update(data).digest();
        }
        var ellipticSignature = this.toElliptic();
        var ellipticPublicKey = publicKey.toElliptic();
        return this.ec.verify(data, ellipticSignature, ellipticPublicKey, encoding);
    };
    /** Recover a public key from a message or hashed message digest and signature */
    Signature.prototype.recover = function (data, shouldHash, encoding) {
        if (shouldHash === void 0) { shouldHash = true; }
        if (encoding === void 0) { encoding = 'utf8'; }
        if (shouldHash) {
            if (typeof data === 'string') {
                data = Buffer.from(data, encoding);
            }
            data = this.ec.hash().update(data).digest();
        }
        var ellipticSignature = this.toElliptic();
        var recoveredPublicKey = this.ec.recoverPubKey(data, ellipticSignature, ellipticSignature.recoveryParam, encoding);
        var ellipticKPub = this.ec.keyFromPublic(recoveredPublicKey);
        return eosjs_key_conversions_1.PublicKey.fromElliptic(ellipticKPub, this.getType(), this.ec);
    };
    return Signature;
}());
exports.Signature = Signature;


/***/ }),

/***/ "./src/eosjs-jssig.ts":
/*!****************************!*\
  !*** ./src/eosjs-jssig.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];

/**
 * @module JS-Sig
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
exports.JsSignatureProvider = exports.digestFromSerializedData = exports.Signature = exports.PublicKey = exports.PrivateKey = void 0;
var elliptic_1 = __webpack_require__(/*! elliptic */ "./node_modules/elliptic/lib/elliptic.js");
var eosjs_key_conversions_1 = __webpack_require__(/*! ./eosjs-key-conversions */ "./src/eosjs-key-conversions.ts");
Object.defineProperty(exports, "PrivateKey", ({ enumerable: true, get: function () { return eosjs_key_conversions_1.PrivateKey; } }));
Object.defineProperty(exports, "PublicKey", ({ enumerable: true, get: function () { return eosjs_key_conversions_1.PublicKey; } }));
Object.defineProperty(exports, "Signature", ({ enumerable: true, get: function () { return eosjs_key_conversions_1.Signature; } }));
var eosjs_numeric_1 = __webpack_require__(/*! ./eosjs-numeric */ "./src/eosjs-numeric.ts");
/** expensive to construct; so we do it once and reuse it */
var defaultEc = new elliptic_1.ec('secp256k1');
/** Construct the digest from transaction details */
var digestFromSerializedData = function (chainId, serializedTransaction, serializedContextFreeData, e) {
    if (e === void 0) { e = defaultEc; }
    var signBuf = Buffer.concat([
        Buffer.from(chainId, 'hex'),
        Buffer.from(serializedTransaction),
        Buffer.from(serializedContextFreeData ?
            new Uint8Array(e.hash().update(serializedContextFreeData).digest()) :
            new Uint8Array(32)),
    ]);
    return e.hash().update(signBuf).digest();
};
exports.digestFromSerializedData = digestFromSerializedData;
/** Signs transactions using in-process private keys */
var JsSignatureProvider = /** @class */ (function () {
    /** @param privateKeys private keys to sign with */
    function JsSignatureProvider(privateKeys) {
        var e_1, _a;
        /** map public to private keys */
        this.keys = new Map();
        /** public keys */
        this.availableKeys = [];
        try {
            for (var privateKeys_1 = __values(privateKeys), privateKeys_1_1 = privateKeys_1.next(); !privateKeys_1_1.done; privateKeys_1_1 = privateKeys_1.next()) {
                var k = privateKeys_1_1.value;
                var priv = eosjs_key_conversions_1.PrivateKey.fromString(k);
                var privElliptic = priv.toElliptic();
                var pubStr = priv.getPublicKey().toString();
                this.keys.set(pubStr, privElliptic);
                this.availableKeys.push(pubStr);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (privateKeys_1_1 && !privateKeys_1_1.done && (_a = privateKeys_1.return)) _a.call(privateKeys_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    /** Public keys associated with the private keys that the `SignatureProvider` holds */
    JsSignatureProvider.prototype.getAvailableKeys = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.availableKeys];
            });
        });
    };
    /** Sign a transaction */
    JsSignatureProvider.prototype.sign = function (_a) {
        var chainId = _a.chainId, requiredKeys = _a.requiredKeys, serializedTransaction = _a.serializedTransaction, serializedContextFreeData = _a.serializedContextFreeData;
        return __awaiter(this, void 0, void 0, function () {
            var digest, signatures, requiredKeys_1, requiredKeys_1_1, key, publicKey, ellipticPrivateKey, privateKey, signature;
            var e_2, _b;
            return __generator(this, function (_c) {
                digest = digestFromSerializedData(chainId, serializedTransaction, serializedContextFreeData, defaultEc);
                signatures = [];
                try {
                    for (requiredKeys_1 = __values(requiredKeys), requiredKeys_1_1 = requiredKeys_1.next(); !requiredKeys_1_1.done; requiredKeys_1_1 = requiredKeys_1.next()) {
                        key = requiredKeys_1_1.value;
                        publicKey = eosjs_key_conversions_1.PublicKey.fromString(key);
                        ellipticPrivateKey = this.keys.get((0, eosjs_numeric_1.convertLegacyPublicKey)(key));
                        privateKey = eosjs_key_conversions_1.PrivateKey.fromElliptic(ellipticPrivateKey, publicKey.getType());
                        signature = privateKey.sign(digest, false);
                        signatures.push(signature.toString());
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (requiredKeys_1_1 && !requiredKeys_1_1.done && (_b = requiredKeys_1.return)) _b.call(requiredKeys_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                return [2 /*return*/, { signatures: signatures, serializedTransaction: serializedTransaction, serializedContextFreeData: serializedContextFreeData }];
            });
        });
    };
    return JsSignatureProvider;
}());
exports.JsSignatureProvider = JsSignatureProvider;


/***/ }),

/***/ "./src/eosjs-key-conversions.ts":
/*!**************************************!*\
  !*** ./src/eosjs-key-conversions.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sha256 = exports.generateKeyPair = exports.constructElliptic = exports.Signature = exports.PublicKey = exports.PrivateKey = void 0;
var elliptic_1 = __webpack_require__(/*! elliptic */ "./node_modules/elliptic/lib/elliptic.js");
var hash = __webpack_require__(/*! hash.js */ "./node_modules/hash.js/lib/hash.js");
var eosjs_numeric_1 = __webpack_require__(/*! ./eosjs-numeric */ "./src/eosjs-numeric.ts");
var PublicKey_1 = __webpack_require__(/*! ./PublicKey */ "./src/PublicKey.ts");
var PrivateKey_1 = __webpack_require__(/*! ./PrivateKey */ "./src/PrivateKey.ts");
var PrivateKey_2 = __webpack_require__(/*! ./PrivateKey */ "./src/PrivateKey.ts");
Object.defineProperty(exports, "PrivateKey", ({ enumerable: true, get: function () { return PrivateKey_2.PrivateKey; } }));
var PublicKey_2 = __webpack_require__(/*! ./PublicKey */ "./src/PublicKey.ts");
Object.defineProperty(exports, "PublicKey", ({ enumerable: true, get: function () { return PublicKey_2.PublicKey; } }));
var Signature_1 = __webpack_require__(/*! ./Signature */ "./src/Signature.ts");
Object.defineProperty(exports, "Signature", ({ enumerable: true, get: function () { return Signature_1.Signature; } }));
/** Construct the elliptic curve object based on key type */
var constructElliptic = function (type) {
    if (type === eosjs_numeric_1.KeyType.k1) {
        return new elliptic_1.ec('secp256k1');
    }
    return new elliptic_1.ec('p256');
};
exports.constructElliptic = constructElliptic;
var generateKeyPair = function (type, options) {
    if (options === void 0) { options = {}; }
    if (!options.secureEnv) {
        throw new Error('Key generation is completely INSECURE in production environments in the browser. ' +
            'If you are absolutely certain this does NOT describe your environment, set `secureEnv` in your ' +
            'options to `true`.  If this does describe your environment and you set `secureEnv` to `true`, ' +
            'YOU DO SO AT YOUR OWN RISK AND THE RISK OF YOUR USERS.');
    }
    var ec;
    if (type === eosjs_numeric_1.KeyType.k1) {
        ec = new elliptic_1.ec('secp256k1');
    }
    else {
        ec = new elliptic_1.ec('p256');
    }
    var ellipticKeyPair = ec.genKeyPair(options.ecOptions);
    var publicKey = PublicKey_1.PublicKey.fromElliptic(ellipticKeyPair, type, ec);
    var privateKey = PrivateKey_1.PrivateKey.fromElliptic(ellipticKeyPair, type, ec);
    return { publicKey: publicKey, privateKey: privateKey };
};
exports.generateKeyPair = generateKeyPair;
var sha256 = function (data) {
    return hash.sha256().update(data).digest();
};
exports.sha256 = sha256;


/***/ }),

/***/ "./src/eosjs-numeric.ts":
/*!******************************!*\
  !*** ./src/eosjs-numeric.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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

/***/ "./src/ripemd.js":
/*!***********************!*\
  !*** ./src/ripemd.js ***!
  \***********************/
/***/ ((module) => {

"use strict";
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


/***/ }),

/***/ "?8131":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?3fc0":
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?7bec":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

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
/******/ 			"eosjs_jssig": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["externals"], () => (__webpack_require__("./src/eosjs-jssig.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	eosjs_jssig = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsNkJBQTZCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZOztBQUVaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVCQUF1QixPQUFPO0FBQzlCO0FBQ0EsMEJBQTBCLGNBQWMsY0FBYyxjQUFjO0FBQ3BFLHdCQUF3QixZQUFZLFlBQVksWUFBWTtBQUM1RCwyQkFBMkIsUUFBUTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3ZkQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQzVCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ0pBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL1tuYW1lXS8uL3NyYy9Qcml2YXRlS2V5LnRzIiwid2VicGFjazovL1tuYW1lXS8uL3NyYy9QdWJsaWNLZXkudHMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vc3JjL1NpZ25hdHVyZS50cyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9zcmMvZW9zanMtanNzaWcudHMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vc3JjL2Vvc2pzLWtleS1jb252ZXJzaW9ucy50cyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9zcmMvZW9zanMtbnVtZXJpYy50cyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9zcmMvcmlwZW1kLmpzIiwid2VicGFjazovL1tuYW1lXS9pZ25vcmVkfEQ6XFx3b3JrXFxlb3Nqcy0yMi4xLjBcXG5vZGVfbW9kdWxlc1xcYm4uanNcXGxpYnxidWZmZXIiLCJ3ZWJwYWNrOi8vW25hbWVdL2lnbm9yZWR8RDpcXHdvcmtcXGVvc2pzLTIyLjEuMFxcbm9kZV9tb2R1bGVzXFxicm9yYW5kfGNyeXB0byIsIndlYnBhY2s6Ly9bbmFtZV0vaWdub3JlZHxEOlxcd29ya1xcZW9zanMtMjIuMS4wXFxub2RlX21vZHVsZXNcXGVsbGlwdGljXFxub2RlX21vZHVsZXNcXGJuLmpzXFxsaWJ8YnVmZmVyIiwid2VicGFjazovL1tuYW1lXS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vW25hbWVdL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vW25hbWVdL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuUHJpdmF0ZUtleSA9IHZvaWQgMDtcclxudmFyIGVvc2pzX251bWVyaWNfMSA9IHJlcXVpcmUoXCIuL2Vvc2pzLW51bWVyaWNcIik7XHJcbnZhciBlb3Nqc19rZXlfY29udmVyc2lvbnNfMSA9IHJlcXVpcmUoXCIuL2Vvc2pzLWtleS1jb252ZXJzaW9uc1wiKTtcclxuLyoqIFJlcHJlc2VudHMvc3RvcmVzIGEgcHJpdmF0ZSBrZXkgYW5kIHByb3ZpZGVzIGVhc3kgY29udmVyc2lvbiBmb3IgdXNlIHdpdGggYGVsbGlwdGljYCBsaWIgKi9cclxudmFyIFByaXZhdGVLZXkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBQcml2YXRlS2V5KGtleSwgZWMpIHtcclxuICAgICAgICB0aGlzLmtleSA9IGtleTtcclxuICAgICAgICB0aGlzLmVjID0gZWM7XHJcbiAgICB9XHJcbiAgICAvKiogSW5zdGFudGlhdGUgcHJpdmF0ZSBrZXkgZnJvbSBhbiBgZWxsaXB0aWNgLWZvcm1hdCBwcml2YXRlIGtleSAqL1xyXG4gICAgUHJpdmF0ZUtleS5mcm9tRWxsaXB0aWMgPSBmdW5jdGlvbiAocHJpdktleSwga2V5VHlwZSwgZWMpIHtcclxuICAgICAgICBpZiAoIWVjKSB7XHJcbiAgICAgICAgICAgIGVjID0gKDAsIGVvc2pzX2tleV9jb252ZXJzaW9uc18xLmNvbnN0cnVjdEVsbGlwdGljKShrZXlUeXBlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcml2YXRlS2V5KHtcclxuICAgICAgICAgICAgdHlwZToga2V5VHlwZSxcclxuICAgICAgICAgICAgZGF0YTogcHJpdktleS5nZXRQcml2YXRlKCkudG9BcnJheUxpa2UoQnVmZmVyLCAnYmUnLCAzMiksXHJcbiAgICAgICAgfSwgZWMpO1xyXG4gICAgfTtcclxuICAgIC8qKiBJbnN0YW50aWF0ZSBwcml2YXRlIGtleSBmcm9tIGFuIEVPU0lPLWZvcm1hdCBwcml2YXRlIGtleSAqL1xyXG4gICAgUHJpdmF0ZUtleS5mcm9tU3RyaW5nID0gZnVuY3Rpb24gKGtleVN0cmluZywgZWMpIHtcclxuICAgICAgICB2YXIgcHJpdmF0ZUtleSA9ICgwLCBlb3Nqc19udW1lcmljXzEuc3RyaW5nVG9Qcml2YXRlS2V5KShrZXlTdHJpbmcpO1xyXG4gICAgICAgIGlmICghZWMpIHtcclxuICAgICAgICAgICAgZWMgPSAoMCwgZW9zanNfa2V5X2NvbnZlcnNpb25zXzEuY29uc3RydWN0RWxsaXB0aWMpKHByaXZhdGVLZXkudHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgUHJpdmF0ZUtleShwcml2YXRlS2V5LCBlYyk7XHJcbiAgICB9O1xyXG4gICAgLyoqIEV4cG9ydCBwcml2YXRlIGtleSBhcyBgZWxsaXB0aWNgLWZvcm1hdCBwcml2YXRlIGtleSAqL1xyXG4gICAgUHJpdmF0ZUtleS5wcm90b3R5cGUudG9FbGxpcHRpYyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lYy5rZXlGcm9tUHJpdmF0ZSh0aGlzLmtleS5kYXRhKTtcclxuICAgIH07XHJcbiAgICBQcml2YXRlS2V5LnByb3RvdHlwZS50b0xlZ2FjeVN0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gKDAsIGVvc2pzX251bWVyaWNfMS5wcml2YXRlS2V5VG9MZWdhY3lTdHJpbmcpKHRoaXMua2V5KTtcclxuICAgIH07XHJcbiAgICAvKiogRXhwb3J0IHByaXZhdGUga2V5IGFzIEVPU0lPLWZvcm1hdCBwcml2YXRlIGtleSAqL1xyXG4gICAgUHJpdmF0ZUtleS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICgwLCBlb3Nqc19udW1lcmljXzEucHJpdmF0ZUtleVRvU3RyaW5nKSh0aGlzLmtleSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIEdldCBrZXkgdHlwZSBmcm9tIGtleSAqL1xyXG4gICAgUHJpdmF0ZUtleS5wcm90b3R5cGUuZ2V0VHlwZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5rZXkudHlwZTtcclxuICAgIH07XHJcbiAgICAvKiogUmV0cmlldmUgdGhlIHB1YmxpYyBrZXkgZnJvbSBhIHByaXZhdGUga2V5ICovXHJcbiAgICBQcml2YXRlS2V5LnByb3RvdHlwZS5nZXRQdWJsaWNLZXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGVsbGlwdGljUHJpdmF0ZUtleSA9IHRoaXMudG9FbGxpcHRpYygpO1xyXG4gICAgICAgIHJldHVybiBlb3Nqc19rZXlfY29udmVyc2lvbnNfMS5QdWJsaWNLZXkuZnJvbUVsbGlwdGljKGVsbGlwdGljUHJpdmF0ZUtleSwgdGhpcy5nZXRUeXBlKCksIHRoaXMuZWMpO1xyXG4gICAgfTtcclxuICAgIC8qKiBTaWduIGEgbWVzc2FnZSBvciBoYXNoZWQgbWVzc2FnZSBkaWdlc3Qgd2l0aCBwcml2YXRlIGtleSAqL1xyXG4gICAgUHJpdmF0ZUtleS5wcm90b3R5cGUuc2lnbiA9IGZ1bmN0aW9uIChkYXRhLCBzaG91bGRIYXNoLCBlbmNvZGluZykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKHNob3VsZEhhc2ggPT09IHZvaWQgMCkgeyBzaG91bGRIYXNoID0gdHJ1ZTsgfVxyXG4gICAgICAgIGlmIChlbmNvZGluZyA9PT0gdm9pZCAwKSB7IGVuY29kaW5nID0gJ3V0ZjgnOyB9XHJcbiAgICAgICAgaWYgKHNob3VsZEhhc2gpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IEJ1ZmZlci5mcm9tKGRhdGEsIGVuY29kaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5lYy5oYXNoKCkudXBkYXRlKGRhdGEpLmRpZ2VzdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdHJpZXMgPSAwO1xyXG4gICAgICAgIHZhciBzaWduYXR1cmU7XHJcbiAgICAgICAgdmFyIGlzQ2Fub25pY2FsID0gZnVuY3Rpb24gKHNpZ0RhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEoc2lnRGF0YVsxXSAmIDB4ODApICYmICEoc2lnRGF0YVsxXSA9PT0gMCAmJiAhKHNpZ0RhdGFbMl0gJiAweDgwKSlcclxuICAgICAgICAgICAgICAgICYmICEoc2lnRGF0YVszM10gJiAweDgwKSAmJiAhKHNpZ0RhdGFbMzNdID09PSAwICYmICEoc2lnRGF0YVszNF0gJiAweDgwKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgY29uc3RydWN0U2lnbmF0dXJlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIGVsbGlwdGljUHJpdmF0ZUtleSA9IF90aGlzLnRvRWxsaXB0aWMoKTtcclxuICAgICAgICAgICAgdmFyIGVsbGlwdGljU2lnbmF0dXJlID0gZWxsaXB0aWNQcml2YXRlS2V5LnNpZ24oZGF0YSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHJldHVybiBlb3Nqc19rZXlfY29udmVyc2lvbnNfMS5TaWduYXR1cmUuZnJvbUVsbGlwdGljKGVsbGlwdGljU2lnbmF0dXJlLCBfdGhpcy5nZXRUeXBlKCksIF90aGlzLmVjKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh0aGlzLmtleS50eXBlID09PSBlb3Nqc19udW1lcmljXzEuS2V5VHlwZS5rMSkge1xyXG4gICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICBzaWduYXR1cmUgPSBjb25zdHJ1Y3RTaWduYXR1cmUoeyBjYW5vbmljYWw6IHRydWUsIHBlcnM6IFsrK3RyaWVzXSB9KTtcclxuICAgICAgICAgICAgfSB3aGlsZSAoIWlzQ2Fub25pY2FsKHNpZ25hdHVyZS50b0JpbmFyeSgpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzaWduYXR1cmUgPSBjb25zdHJ1Y3RTaWduYXR1cmUoeyBjYW5vbmljYWw6IHRydWUgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzaWduYXR1cmU7XHJcbiAgICB9O1xyXG4gICAgLyoqIFZhbGlkYXRlIGEgcHJpdmF0ZSBrZXkgKi9cclxuICAgIFByaXZhdGVLZXkucHJvdG90eXBlLmlzVmFsaWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIGVsbGlwdGljUHJpdmF0ZUtleSA9IHRoaXMudG9FbGxpcHRpYygpO1xyXG4gICAgICAgICAgICB2YXIgdmFsaWRhdGlvbk9iaiA9IGVsbGlwdGljUHJpdmF0ZUtleS52YWxpZGF0ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsaWRhdGlvbk9iai5yZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChfYSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBQcml2YXRlS2V5O1xyXG59KCkpO1xyXG5leHBvcnRzLlByaXZhdGVLZXkgPSBQcml2YXRlS2V5O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlB1YmxpY0tleSA9IHZvaWQgMDtcclxudmFyIGVvc2pzX251bWVyaWNfMSA9IHJlcXVpcmUoXCIuL2Vvc2pzLW51bWVyaWNcIik7XHJcbnZhciBlb3Nqc19rZXlfY29udmVyc2lvbnNfMSA9IHJlcXVpcmUoXCIuL2Vvc2pzLWtleS1jb252ZXJzaW9uc1wiKTtcclxuLyoqIFJlcHJlc2VudHMvc3RvcmVzIGEgcHVibGljIGtleSBhbmQgcHJvdmlkZXMgZWFzeSBjb252ZXJzaW9uIGZvciB1c2Ugd2l0aCBgZWxsaXB0aWNgIGxpYiAqL1xyXG52YXIgUHVibGljS2V5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gUHVibGljS2V5KGtleSwgZWMpIHtcclxuICAgICAgICB0aGlzLmtleSA9IGtleTtcclxuICAgICAgICB0aGlzLmVjID0gZWM7XHJcbiAgICB9XHJcbiAgICAvKiogSW5zdGFudGlhdGUgcHVibGljIGtleSBmcm9tIGFuIEVPU0lPLWZvcm1hdCBwdWJsaWMga2V5ICovXHJcbiAgICBQdWJsaWNLZXkuZnJvbVN0cmluZyA9IGZ1bmN0aW9uIChwdWJsaWNLZXlTdHIsIGVjKSB7XHJcbiAgICAgICAgdmFyIGtleSA9ICgwLCBlb3Nqc19udW1lcmljXzEuc3RyaW5nVG9QdWJsaWNLZXkpKHB1YmxpY0tleVN0cik7XHJcbiAgICAgICAgaWYgKCFlYykge1xyXG4gICAgICAgICAgICBlYyA9ICgwLCBlb3Nqc19rZXlfY29udmVyc2lvbnNfMS5jb25zdHJ1Y3RFbGxpcHRpYykoa2V5LnR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IFB1YmxpY0tleShrZXksIGVjKTtcclxuICAgIH07XHJcbiAgICAvKiogSW5zdGFudGlhdGUgcHVibGljIGtleSBmcm9tIGFuIGBlbGxpcHRpY2AtZm9ybWF0IHB1YmxpYyBrZXkgKi9cclxuICAgIFB1YmxpY0tleS5mcm9tRWxsaXB0aWMgPSBmdW5jdGlvbiAocHVibGljS2V5LCBrZXlUeXBlLCBlYykge1xyXG4gICAgICAgIHZhciB4ID0gcHVibGljS2V5LmdldFB1YmxpYygpLmdldFgoKS50b0FycmF5KCdiZScsIDMyKTtcclxuICAgICAgICB2YXIgeSA9IHB1YmxpY0tleS5nZXRQdWJsaWMoKS5nZXRZKCkudG9BcnJheSgnYmUnLCAzMik7XHJcbiAgICAgICAgaWYgKCFlYykge1xyXG4gICAgICAgICAgICBlYyA9ICgwLCBlb3Nqc19rZXlfY29udmVyc2lvbnNfMS5jb25zdHJ1Y3RFbGxpcHRpYykoa2V5VHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgUHVibGljS2V5KHtcclxuICAgICAgICAgICAgdHlwZToga2V5VHlwZSxcclxuICAgICAgICAgICAgZGF0YTogbmV3IFVpbnQ4QXJyYXkoWyh5WzMxXSAmIDEpID8gMyA6IDJdLmNvbmNhdCh4KSksXHJcbiAgICAgICAgfSwgZWMpO1xyXG4gICAgfTtcclxuICAgIC8qKiBFeHBvcnQgcHVibGljIGtleSBhcyBFT1NJTy1mb3JtYXQgcHVibGljIGtleSAqL1xyXG4gICAgUHVibGljS2V5LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gKDAsIGVvc2pzX251bWVyaWNfMS5wdWJsaWNLZXlUb1N0cmluZykodGhpcy5rZXkpO1xyXG4gICAgfTtcclxuICAgIC8qKiBFeHBvcnQgcHVibGljIGtleSBhcyBMZWdhY3kgRU9TSU8tZm9ybWF0IHB1YmxpYyBrZXkgKi9cclxuICAgIFB1YmxpY0tleS5wcm90b3R5cGUudG9MZWdhY3lTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICgwLCBlb3Nqc19udW1lcmljXzEucHVibGljS2V5VG9MZWdhY3lTdHJpbmcpKHRoaXMua2V5KTtcclxuICAgIH07XHJcbiAgICAvKiogRXhwb3J0IHB1YmxpYyBrZXkgYXMgYGVsbGlwdGljYC1mb3JtYXQgcHVibGljIGtleSAqL1xyXG4gICAgUHVibGljS2V5LnByb3RvdHlwZS50b0VsbGlwdGljID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVjLmtleVBhaXIoe1xyXG4gICAgICAgICAgICBwdWI6IEJ1ZmZlci5mcm9tKHRoaXMua2V5LmRhdGEpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKiBHZXQga2V5IHR5cGUgZnJvbSBrZXkgKi9cclxuICAgIFB1YmxpY0tleS5wcm90b3R5cGUuZ2V0VHlwZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5rZXkudHlwZTtcclxuICAgIH07XHJcbiAgICAvKiogVmFsaWRhdGUgYSBwdWJsaWMga2V5ICovXHJcbiAgICBQdWJsaWNLZXkucHJvdG90eXBlLmlzVmFsaWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIGVsbGlwdGljUHVibGljS2V5ID0gdGhpcy50b0VsbGlwdGljKCk7XHJcbiAgICAgICAgICAgIHZhciB2YWxpZGF0aW9uT2JqID0gZWxsaXB0aWNQdWJsaWNLZXkudmFsaWRhdGUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbGlkYXRpb25PYmoucmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoX2EpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gUHVibGljS2V5O1xyXG59KCkpO1xyXG5leHBvcnRzLlB1YmxpY0tleSA9IFB1YmxpY0tleTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5TaWduYXR1cmUgPSB2b2lkIDA7XHJcbnZhciBCTiA9IHJlcXVpcmUoXCJibi5qc1wiKTtcclxudmFyIGVvc2pzX251bWVyaWNfMSA9IHJlcXVpcmUoXCIuL2Vvc2pzLW51bWVyaWNcIik7XHJcbnZhciBlb3Nqc19rZXlfY29udmVyc2lvbnNfMSA9IHJlcXVpcmUoXCIuL2Vvc2pzLWtleS1jb252ZXJzaW9uc1wiKTtcclxuLyoqIFJlcHJlc2VudHMvc3RvcmVzIGEgU2lnbmF0dXJlIGFuZCBwcm92aWRlcyBlYXN5IGNvbnZlcnNpb24gZm9yIHVzZSB3aXRoIGBlbGxpcHRpY2AgbGliICovXHJcbnZhciBTaWduYXR1cmUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBTaWduYXR1cmUoc2lnbmF0dXJlLCBlYykge1xyXG4gICAgICAgIHRoaXMuc2lnbmF0dXJlID0gc2lnbmF0dXJlO1xyXG4gICAgICAgIHRoaXMuZWMgPSBlYztcclxuICAgIH1cclxuICAgIC8qKiBJbnN0YW50aWF0ZSBTaWduYXR1cmUgZnJvbSBhbiBFT1NJTy1mb3JtYXQgU2lnbmF0dXJlICovXHJcbiAgICBTaWduYXR1cmUuZnJvbVN0cmluZyA9IGZ1bmN0aW9uIChzaWcsIGVjKSB7XHJcbiAgICAgICAgdmFyIHNpZ25hdHVyZSA9ICgwLCBlb3Nqc19udW1lcmljXzEuc3RyaW5nVG9TaWduYXR1cmUpKHNpZyk7XHJcbiAgICAgICAgaWYgKCFlYykge1xyXG4gICAgICAgICAgICBlYyA9ICgwLCBlb3Nqc19rZXlfY29udmVyc2lvbnNfMS5jb25zdHJ1Y3RFbGxpcHRpYykoc2lnbmF0dXJlLnR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IFNpZ25hdHVyZShzaWduYXR1cmUsIGVjKTtcclxuICAgIH07XHJcbiAgICAvKiogSW5zdGFudGlhdGUgU2lnbmF0dXJlIGZyb20gYW4gYGVsbGlwdGljYC1mb3JtYXQgU2lnbmF0dXJlICovXHJcbiAgICBTaWduYXR1cmUuZnJvbUVsbGlwdGljID0gZnVuY3Rpb24gKGVsbGlwdGljU2lnLCBrZXlUeXBlLCBlYykge1xyXG4gICAgICAgIHZhciByID0gZWxsaXB0aWNTaWcuci50b0FycmF5KCdiZScsIDMyKTtcclxuICAgICAgICB2YXIgcyA9IGVsbGlwdGljU2lnLnMudG9BcnJheSgnYmUnLCAzMik7XHJcbiAgICAgICAgdmFyIGVvc2lvUmVjb3ZlcnlQYXJhbTtcclxuICAgICAgICBpZiAoa2V5VHlwZSA9PT0gZW9zanNfbnVtZXJpY18xLktleVR5cGUuazEgfHwga2V5VHlwZSA9PT0gZW9zanNfbnVtZXJpY18xLktleVR5cGUucjEpIHtcclxuICAgICAgICAgICAgZW9zaW9SZWNvdmVyeVBhcmFtID0gZWxsaXB0aWNTaWcucmVjb3ZlcnlQYXJhbSArIDI3O1xyXG4gICAgICAgICAgICBpZiAoZWxsaXB0aWNTaWcucmVjb3ZlcnlQYXJhbSA8PSAzKSB7XHJcbiAgICAgICAgICAgICAgICBlb3Npb1JlY292ZXJ5UGFyYW0gKz0gNDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChrZXlUeXBlID09PSBlb3Nqc19udW1lcmljXzEuS2V5VHlwZS53YSkge1xyXG4gICAgICAgICAgICBlb3Npb1JlY292ZXJ5UGFyYW0gPSBlbGxpcHRpY1NpZy5yZWNvdmVyeVBhcmFtO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc2lnRGF0YSA9IG5ldyBVaW50OEFycmF5KFtlb3Npb1JlY292ZXJ5UGFyYW1dLmNvbmNhdChyLCBzKSk7XHJcbiAgICAgICAgaWYgKCFlYykge1xyXG4gICAgICAgICAgICBlYyA9ICgwLCBlb3Nqc19rZXlfY29udmVyc2lvbnNfMS5jb25zdHJ1Y3RFbGxpcHRpYykoa2V5VHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgU2lnbmF0dXJlKHtcclxuICAgICAgICAgICAgdHlwZToga2V5VHlwZSxcclxuICAgICAgICAgICAgZGF0YTogc2lnRGF0YSxcclxuICAgICAgICB9LCBlYyk7XHJcbiAgICB9O1xyXG4gICAgLyoqIEV4cG9ydCBTaWduYXR1cmUgYXMgYGVsbGlwdGljYC1mb3JtYXQgU2lnbmF0dXJlXHJcbiAgICAgKiBOT1RFOiBUaGlzIGlzbid0IGFuIGFjdHVhbCBlbGxpcHRpYy1mb3JtYXQgU2lnbmF0dXJlLCBhcyBlYy5TaWduYXR1cmUgaXMgbm90IGV4cG9ydGVkIGJ5IHRoZSBsaWJyYXJ5LlxyXG4gICAgICogVGhhdCdzIGFsc28gd2h5IHRoZSByZXR1cm4gdHlwZSBpcyBgYW55YC4gIFdlJ3JlICphY3R1YWxseSogcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIHRoZSAzIHBhcmFtc1xyXG4gICAgICogbm90IGFuIGVjLlNpZ25hdHVyZS5cclxuICAgICAqIEZ1cnRoZXIgTk9URTogQHR5cGVzL2VsbGlwdGljIHNob3dzIGVjLlNpZ25hdHVyZSBhcyBleHBvcnRlZDsgaXQgaXMgKm5vdCouICBIZW5jZSB0aGUgYGFueWAuXHJcbiAgICAgKi9cclxuICAgIFNpZ25hdHVyZS5wcm90b3R5cGUudG9FbGxpcHRpYyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbGVuZ3RoT2ZSID0gMzI7XHJcbiAgICAgICAgdmFyIGxlbmd0aE9mUyA9IDMyO1xyXG4gICAgICAgIHZhciByID0gbmV3IEJOKHRoaXMuc2lnbmF0dXJlLmRhdGEuc2xpY2UoMSwgbGVuZ3RoT2ZSICsgMSkpO1xyXG4gICAgICAgIHZhciBzID0gbmV3IEJOKHRoaXMuc2lnbmF0dXJlLmRhdGEuc2xpY2UobGVuZ3RoT2ZSICsgMSwgbGVuZ3RoT2ZSICsgbGVuZ3RoT2ZTICsgMSkpO1xyXG4gICAgICAgIHZhciBlbGxpcHRpY1JlY292ZXJ5Qml0RmllbGQ7XHJcbiAgICAgICAgaWYgKHRoaXMuc2lnbmF0dXJlLnR5cGUgPT09IGVvc2pzX251bWVyaWNfMS5LZXlUeXBlLmsxIHx8IHRoaXMuc2lnbmF0dXJlLnR5cGUgPT09IGVvc2pzX251bWVyaWNfMS5LZXlUeXBlLnIxKSB7XHJcbiAgICAgICAgICAgIGVsbGlwdGljUmVjb3ZlcnlCaXRGaWVsZCA9IHRoaXMuc2lnbmF0dXJlLmRhdGFbMF0gLSAyNztcclxuICAgICAgICAgICAgaWYgKGVsbGlwdGljUmVjb3ZlcnlCaXRGaWVsZCA+IDMpIHtcclxuICAgICAgICAgICAgICAgIGVsbGlwdGljUmVjb3ZlcnlCaXRGaWVsZCAtPSA0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc2lnbmF0dXJlLnR5cGUgPT09IGVvc2pzX251bWVyaWNfMS5LZXlUeXBlLndhKSB7XHJcbiAgICAgICAgICAgIGVsbGlwdGljUmVjb3ZlcnlCaXRGaWVsZCA9IHRoaXMuc2lnbmF0dXJlLmRhdGFbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZWNvdmVyeVBhcmFtID0gZWxsaXB0aWNSZWNvdmVyeUJpdEZpZWxkICYgMztcclxuICAgICAgICByZXR1cm4geyByOiByLCBzOiBzLCByZWNvdmVyeVBhcmFtOiByZWNvdmVyeVBhcmFtIH07XHJcbiAgICB9O1xyXG4gICAgLyoqIEV4cG9ydCBTaWduYXR1cmUgYXMgRU9TSU8tZm9ybWF0IFNpZ25hdHVyZSAqL1xyXG4gICAgU2lnbmF0dXJlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gKDAsIGVvc2pzX251bWVyaWNfMS5zaWduYXR1cmVUb1N0cmluZykodGhpcy5zaWduYXR1cmUpO1xyXG4gICAgfTtcclxuICAgIC8qKiBFeHBvcnQgU2lnbmF0dXJlIGluIGJpbmFyeSBmb3JtYXQgKi9cclxuICAgIFNpZ25hdHVyZS5wcm90b3R5cGUudG9CaW5hcnkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2lnbmF0dXJlLmRhdGE7XHJcbiAgICB9O1xyXG4gICAgLyoqIEdldCBrZXkgdHlwZSBmcm9tIHNpZ25hdHVyZSAqL1xyXG4gICAgU2lnbmF0dXJlLnByb3RvdHlwZS5nZXRUeXBlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNpZ25hdHVyZS50eXBlO1xyXG4gICAgfTtcclxuICAgIC8qKiBWZXJpZnkgYSBzaWduYXR1cmUgd2l0aCBhIG1lc3NhZ2Ugb3IgaGFzaGVkIG1lc3NhZ2UgZGlnZXN0IGFuZCBwdWJsaWMga2V5ICovXHJcbiAgICBTaWduYXR1cmUucHJvdG90eXBlLnZlcmlmeSA9IGZ1bmN0aW9uIChkYXRhLCBwdWJsaWNLZXksIHNob3VsZEhhc2gsIGVuY29kaW5nKSB7XHJcbiAgICAgICAgaWYgKHNob3VsZEhhc2ggPT09IHZvaWQgMCkgeyBzaG91bGRIYXNoID0gdHJ1ZTsgfVxyXG4gICAgICAgIGlmIChlbmNvZGluZyA9PT0gdm9pZCAwKSB7IGVuY29kaW5nID0gJ3V0ZjgnOyB9XHJcbiAgICAgICAgaWYgKHNob3VsZEhhc2gpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IEJ1ZmZlci5mcm9tKGRhdGEsIGVuY29kaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5lYy5oYXNoKCkudXBkYXRlKGRhdGEpLmRpZ2VzdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZWxsaXB0aWNTaWduYXR1cmUgPSB0aGlzLnRvRWxsaXB0aWMoKTtcclxuICAgICAgICB2YXIgZWxsaXB0aWNQdWJsaWNLZXkgPSBwdWJsaWNLZXkudG9FbGxpcHRpYygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVjLnZlcmlmeShkYXRhLCBlbGxpcHRpY1NpZ25hdHVyZSwgZWxsaXB0aWNQdWJsaWNLZXksIGVuY29kaW5nKTtcclxuICAgIH07XHJcbiAgICAvKiogUmVjb3ZlciBhIHB1YmxpYyBrZXkgZnJvbSBhIG1lc3NhZ2Ugb3IgaGFzaGVkIG1lc3NhZ2UgZGlnZXN0IGFuZCBzaWduYXR1cmUgKi9cclxuICAgIFNpZ25hdHVyZS5wcm90b3R5cGUucmVjb3ZlciA9IGZ1bmN0aW9uIChkYXRhLCBzaG91bGRIYXNoLCBlbmNvZGluZykge1xyXG4gICAgICAgIGlmIChzaG91bGRIYXNoID09PSB2b2lkIDApIHsgc2hvdWxkSGFzaCA9IHRydWU7IH1cclxuICAgICAgICBpZiAoZW5jb2RpbmcgPT09IHZvaWQgMCkgeyBlbmNvZGluZyA9ICd1dGY4JzsgfVxyXG4gICAgICAgIGlmIChzaG91bGRIYXNoKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBCdWZmZXIuZnJvbShkYXRhLCBlbmNvZGluZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuZWMuaGFzaCgpLnVwZGF0ZShkYXRhKS5kaWdlc3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGVsbGlwdGljU2lnbmF0dXJlID0gdGhpcy50b0VsbGlwdGljKCk7XHJcbiAgICAgICAgdmFyIHJlY292ZXJlZFB1YmxpY0tleSA9IHRoaXMuZWMucmVjb3ZlclB1YktleShkYXRhLCBlbGxpcHRpY1NpZ25hdHVyZSwgZWxsaXB0aWNTaWduYXR1cmUucmVjb3ZlcnlQYXJhbSwgZW5jb2RpbmcpO1xyXG4gICAgICAgIHZhciBlbGxpcHRpY0tQdWIgPSB0aGlzLmVjLmtleUZyb21QdWJsaWMocmVjb3ZlcmVkUHVibGljS2V5KTtcclxuICAgICAgICByZXR1cm4gZW9zanNfa2V5X2NvbnZlcnNpb25zXzEuUHVibGljS2V5LmZyb21FbGxpcHRpYyhlbGxpcHRpY0tQdWIsIHRoaXMuZ2V0VHlwZSgpLCB0aGlzLmVjKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gU2lnbmF0dXJlO1xyXG59KCkpO1xyXG5leHBvcnRzLlNpZ25hdHVyZSA9IFNpZ25hdHVyZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8qKlxyXG4gKiBAbW9kdWxlIEpTLVNpZ1xyXG4gKi9cclxuLy8gY29weXJpZ2h0IGRlZmluZWQgaW4gZW9zanMvTElDRU5TRS50eHRcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn07XHJcbnZhciBfX3ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX192YWx1ZXMpIHx8IGZ1bmN0aW9uKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuSnNTaWduYXR1cmVQcm92aWRlciA9IGV4cG9ydHMuZGlnZXN0RnJvbVNlcmlhbGl6ZWREYXRhID0gZXhwb3J0cy5TaWduYXR1cmUgPSBleHBvcnRzLlB1YmxpY0tleSA9IGV4cG9ydHMuUHJpdmF0ZUtleSA9IHZvaWQgMDtcclxudmFyIGVsbGlwdGljXzEgPSByZXF1aXJlKFwiZWxsaXB0aWNcIik7XHJcbnZhciBlb3Nqc19rZXlfY29udmVyc2lvbnNfMSA9IHJlcXVpcmUoXCIuL2Vvc2pzLWtleS1jb252ZXJzaW9uc1wiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiUHJpdmF0ZUtleVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZW9zanNfa2V5X2NvbnZlcnNpb25zXzEuUHJpdmF0ZUtleTsgfSB9KTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiUHVibGljS2V5XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBlb3Nqc19rZXlfY29udmVyc2lvbnNfMS5QdWJsaWNLZXk7IH0gfSk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlNpZ25hdHVyZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZW9zanNfa2V5X2NvbnZlcnNpb25zXzEuU2lnbmF0dXJlOyB9IH0pO1xyXG52YXIgZW9zanNfbnVtZXJpY18xID0gcmVxdWlyZShcIi4vZW9zanMtbnVtZXJpY1wiKTtcclxuLyoqIGV4cGVuc2l2ZSB0byBjb25zdHJ1Y3Q7IHNvIHdlIGRvIGl0IG9uY2UgYW5kIHJldXNlIGl0ICovXHJcbnZhciBkZWZhdWx0RWMgPSBuZXcgZWxsaXB0aWNfMS5lYygnc2VjcDI1NmsxJyk7XHJcbi8qKiBDb25zdHJ1Y3QgdGhlIGRpZ2VzdCBmcm9tIHRyYW5zYWN0aW9uIGRldGFpbHMgKi9cclxudmFyIGRpZ2VzdEZyb21TZXJpYWxpemVkRGF0YSA9IGZ1bmN0aW9uIChjaGFpbklkLCBzZXJpYWxpemVkVHJhbnNhY3Rpb24sIHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGEsIGUpIHtcclxuICAgIGlmIChlID09PSB2b2lkIDApIHsgZSA9IGRlZmF1bHRFYzsgfVxyXG4gICAgdmFyIHNpZ25CdWYgPSBCdWZmZXIuY29uY2F0KFtcclxuICAgICAgICBCdWZmZXIuZnJvbShjaGFpbklkLCAnaGV4JyksXHJcbiAgICAgICAgQnVmZmVyLmZyb20oc2VyaWFsaXplZFRyYW5zYWN0aW9uKSxcclxuICAgICAgICBCdWZmZXIuZnJvbShzZXJpYWxpemVkQ29udGV4dEZyZWVEYXRhID9cclxuICAgICAgICAgICAgbmV3IFVpbnQ4QXJyYXkoZS5oYXNoKCkudXBkYXRlKHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGEpLmRpZ2VzdCgpKSA6XHJcbiAgICAgICAgICAgIG5ldyBVaW50OEFycmF5KDMyKSksXHJcbiAgICBdKTtcclxuICAgIHJldHVybiBlLmhhc2goKS51cGRhdGUoc2lnbkJ1ZikuZGlnZXN0KCk7XHJcbn07XHJcbmV4cG9ydHMuZGlnZXN0RnJvbVNlcmlhbGl6ZWREYXRhID0gZGlnZXN0RnJvbVNlcmlhbGl6ZWREYXRhO1xyXG4vKiogU2lnbnMgdHJhbnNhY3Rpb25zIHVzaW5nIGluLXByb2Nlc3MgcHJpdmF0ZSBrZXlzICovXHJcbnZhciBKc1NpZ25hdHVyZVByb3ZpZGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqIEBwYXJhbSBwcml2YXRlS2V5cyBwcml2YXRlIGtleXMgdG8gc2lnbiB3aXRoICovXHJcbiAgICBmdW5jdGlvbiBKc1NpZ25hdHVyZVByb3ZpZGVyKHByaXZhdGVLZXlzKSB7XHJcbiAgICAgICAgdmFyIGVfMSwgX2E7XHJcbiAgICAgICAgLyoqIG1hcCBwdWJsaWMgdG8gcHJpdmF0ZSBrZXlzICovXHJcbiAgICAgICAgdGhpcy5rZXlzID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIC8qKiBwdWJsaWMga2V5cyAqL1xyXG4gICAgICAgIHRoaXMuYXZhaWxhYmxlS2V5cyA9IFtdO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHByaXZhdGVLZXlzXzEgPSBfX3ZhbHVlcyhwcml2YXRlS2V5cyksIHByaXZhdGVLZXlzXzFfMSA9IHByaXZhdGVLZXlzXzEubmV4dCgpOyAhcHJpdmF0ZUtleXNfMV8xLmRvbmU7IHByaXZhdGVLZXlzXzFfMSA9IHByaXZhdGVLZXlzXzEubmV4dCgpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgayA9IHByaXZhdGVLZXlzXzFfMS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIHZhciBwcml2ID0gZW9zanNfa2V5X2NvbnZlcnNpb25zXzEuUHJpdmF0ZUtleS5mcm9tU3RyaW5nKGspO1xyXG4gICAgICAgICAgICAgICAgdmFyIHByaXZFbGxpcHRpYyA9IHByaXYudG9FbGxpcHRpYygpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHB1YlN0ciA9IHByaXYuZ2V0UHVibGljS2V5KCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5cy5zZXQocHViU3RyLCBwcml2RWxsaXB0aWMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGVLZXlzLnB1c2gocHViU3RyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxyXG4gICAgICAgIGZpbmFsbHkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHByaXZhdGVLZXlzXzFfMSAmJiAhcHJpdmF0ZUtleXNfMV8xLmRvbmUgJiYgKF9hID0gcHJpdmF0ZUtleXNfMS5yZXR1cm4pKSBfYS5jYWxsKHByaXZhdGVLZXlzXzEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKiogUHVibGljIGtleXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBwcml2YXRlIGtleXMgdGhhdCB0aGUgYFNpZ25hdHVyZVByb3ZpZGVyYCBob2xkcyAqL1xyXG4gICAgSnNTaWduYXR1cmVQcm92aWRlci5wcm90b3R5cGUuZ2V0QXZhaWxhYmxlS2V5cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLmF2YWlsYWJsZUtleXNdO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKiogU2lnbiBhIHRyYW5zYWN0aW9uICovXHJcbiAgICBKc1NpZ25hdHVyZVByb3ZpZGVyLnByb3RvdHlwZS5zaWduID0gZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgdmFyIGNoYWluSWQgPSBfYS5jaGFpbklkLCByZXF1aXJlZEtleXMgPSBfYS5yZXF1aXJlZEtleXMsIHNlcmlhbGl6ZWRUcmFuc2FjdGlvbiA9IF9hLnNlcmlhbGl6ZWRUcmFuc2FjdGlvbiwgc2VyaWFsaXplZENvbnRleHRGcmVlRGF0YSA9IF9hLnNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGE7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgZGlnZXN0LCBzaWduYXR1cmVzLCByZXF1aXJlZEtleXNfMSwgcmVxdWlyZWRLZXlzXzFfMSwga2V5LCBwdWJsaWNLZXksIGVsbGlwdGljUHJpdmF0ZUtleSwgcHJpdmF0ZUtleSwgc2lnbmF0dXJlO1xyXG4gICAgICAgICAgICB2YXIgZV8yLCBfYjtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYykge1xyXG4gICAgICAgICAgICAgICAgZGlnZXN0ID0gZGlnZXN0RnJvbVNlcmlhbGl6ZWREYXRhKGNoYWluSWQsIHNlcmlhbGl6ZWRUcmFuc2FjdGlvbiwgc2VyaWFsaXplZENvbnRleHRGcmVlRGF0YSwgZGVmYXVsdEVjKTtcclxuICAgICAgICAgICAgICAgIHNpZ25hdHVyZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChyZXF1aXJlZEtleXNfMSA9IF9fdmFsdWVzKHJlcXVpcmVkS2V5cyksIHJlcXVpcmVkS2V5c18xXzEgPSByZXF1aXJlZEtleXNfMS5uZXh0KCk7ICFyZXF1aXJlZEtleXNfMV8xLmRvbmU7IHJlcXVpcmVkS2V5c18xXzEgPSByZXF1aXJlZEtleXNfMS5uZXh0KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5ID0gcmVxdWlyZWRLZXlzXzFfMS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHVibGljS2V5ID0gZW9zanNfa2V5X2NvbnZlcnNpb25zXzEuUHVibGljS2V5LmZyb21TdHJpbmcoa2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxsaXB0aWNQcml2YXRlS2V5ID0gdGhpcy5rZXlzLmdldCgoMCwgZW9zanNfbnVtZXJpY18xLmNvbnZlcnRMZWdhY3lQdWJsaWNLZXkpKGtleSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcml2YXRlS2V5ID0gZW9zanNfa2V5X2NvbnZlcnNpb25zXzEuUHJpdmF0ZUtleS5mcm9tRWxsaXB0aWMoZWxsaXB0aWNQcml2YXRlS2V5LCBwdWJsaWNLZXkuZ2V0VHlwZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmF0dXJlID0gcHJpdmF0ZUtleS5zaWduKGRpZ2VzdCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduYXR1cmVzLnB1c2goc2lnbmF0dXJlLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlXzJfMSkgeyBlXzIgPSB7IGVycm9yOiBlXzJfMSB9OyB9XHJcbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWRLZXlzXzFfMSAmJiAhcmVxdWlyZWRLZXlzXzFfMS5kb25lICYmIChfYiA9IHJlcXVpcmVkS2V5c18xLnJldHVybikpIF9iLmNhbGwocmVxdWlyZWRLZXlzXzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMikgdGhyb3cgZV8yLmVycm9yOyB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgeyBzaWduYXR1cmVzOiBzaWduYXR1cmVzLCBzZXJpYWxpemVkVHJhbnNhY3Rpb246IHNlcmlhbGl6ZWRUcmFuc2FjdGlvbiwgc2VyaWFsaXplZENvbnRleHRGcmVlRGF0YTogc2VyaWFsaXplZENvbnRleHRGcmVlRGF0YSB9XTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEpzU2lnbmF0dXJlUHJvdmlkZXI7XHJcbn0oKSk7XHJcbmV4cG9ydHMuSnNTaWduYXR1cmVQcm92aWRlciA9IEpzU2lnbmF0dXJlUHJvdmlkZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuc2hhMjU2ID0gZXhwb3J0cy5nZW5lcmF0ZUtleVBhaXIgPSBleHBvcnRzLmNvbnN0cnVjdEVsbGlwdGljID0gZXhwb3J0cy5TaWduYXR1cmUgPSBleHBvcnRzLlB1YmxpY0tleSA9IGV4cG9ydHMuUHJpdmF0ZUtleSA9IHZvaWQgMDtcclxudmFyIGVsbGlwdGljXzEgPSByZXF1aXJlKFwiZWxsaXB0aWNcIik7XHJcbnZhciBoYXNoID0gcmVxdWlyZShcImhhc2guanNcIik7XHJcbnZhciBlb3Nqc19udW1lcmljXzEgPSByZXF1aXJlKFwiLi9lb3Nqcy1udW1lcmljXCIpO1xyXG52YXIgUHVibGljS2V5XzEgPSByZXF1aXJlKFwiLi9QdWJsaWNLZXlcIik7XHJcbnZhciBQcml2YXRlS2V5XzEgPSByZXF1aXJlKFwiLi9Qcml2YXRlS2V5XCIpO1xyXG52YXIgUHJpdmF0ZUtleV8yID0gcmVxdWlyZShcIi4vUHJpdmF0ZUtleVwiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiUHJpdmF0ZUtleVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gUHJpdmF0ZUtleV8yLlByaXZhdGVLZXk7IH0gfSk7XHJcbnZhciBQdWJsaWNLZXlfMiA9IHJlcXVpcmUoXCIuL1B1YmxpY0tleVwiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiUHVibGljS2V5XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBQdWJsaWNLZXlfMi5QdWJsaWNLZXk7IH0gfSk7XHJcbnZhciBTaWduYXR1cmVfMSA9IHJlcXVpcmUoXCIuL1NpZ25hdHVyZVwiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiU2lnbmF0dXJlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBTaWduYXR1cmVfMS5TaWduYXR1cmU7IH0gfSk7XHJcbi8qKiBDb25zdHJ1Y3QgdGhlIGVsbGlwdGljIGN1cnZlIG9iamVjdCBiYXNlZCBvbiBrZXkgdHlwZSAqL1xyXG52YXIgY29uc3RydWN0RWxsaXB0aWMgPSBmdW5jdGlvbiAodHlwZSkge1xyXG4gICAgaWYgKHR5cGUgPT09IGVvc2pzX251bWVyaWNfMS5LZXlUeXBlLmsxKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBlbGxpcHRpY18xLmVjKCdzZWNwMjU2azEnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgZWxsaXB0aWNfMS5lYygncDI1NicpO1xyXG59O1xyXG5leHBvcnRzLmNvbnN0cnVjdEVsbGlwdGljID0gY29uc3RydWN0RWxsaXB0aWM7XHJcbnZhciBnZW5lcmF0ZUtleVBhaXIgPSBmdW5jdGlvbiAodHlwZSwgb3B0aW9ucykge1xyXG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cclxuICAgIGlmICghb3B0aW9ucy5zZWN1cmVFbnYpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0tleSBnZW5lcmF0aW9uIGlzIGNvbXBsZXRlbHkgSU5TRUNVUkUgaW4gcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgaW4gdGhlIGJyb3dzZXIuICcgK1xyXG4gICAgICAgICAgICAnSWYgeW91IGFyZSBhYnNvbHV0ZWx5IGNlcnRhaW4gdGhpcyBkb2VzIE5PVCBkZXNjcmliZSB5b3VyIGVudmlyb25tZW50LCBzZXQgYHNlY3VyZUVudmAgaW4geW91ciAnICtcclxuICAgICAgICAgICAgJ29wdGlvbnMgdG8gYHRydWVgLiAgSWYgdGhpcyBkb2VzIGRlc2NyaWJlIHlvdXIgZW52aXJvbm1lbnQgYW5kIHlvdSBzZXQgYHNlY3VyZUVudmAgdG8gYHRydWVgLCAnICtcclxuICAgICAgICAgICAgJ1lPVSBETyBTTyBBVCBZT1VSIE9XTiBSSVNLIEFORCBUSEUgUklTSyBPRiBZT1VSIFVTRVJTLicpO1xyXG4gICAgfVxyXG4gICAgdmFyIGVjO1xyXG4gICAgaWYgKHR5cGUgPT09IGVvc2pzX251bWVyaWNfMS5LZXlUeXBlLmsxKSB7XHJcbiAgICAgICAgZWMgPSBuZXcgZWxsaXB0aWNfMS5lYygnc2VjcDI1NmsxJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBlYyA9IG5ldyBlbGxpcHRpY18xLmVjKCdwMjU2Jyk7XHJcbiAgICB9XHJcbiAgICB2YXIgZWxsaXB0aWNLZXlQYWlyID0gZWMuZ2VuS2V5UGFpcihvcHRpb25zLmVjT3B0aW9ucyk7XHJcbiAgICB2YXIgcHVibGljS2V5ID0gUHVibGljS2V5XzEuUHVibGljS2V5LmZyb21FbGxpcHRpYyhlbGxpcHRpY0tleVBhaXIsIHR5cGUsIGVjKTtcclxuICAgIHZhciBwcml2YXRlS2V5ID0gUHJpdmF0ZUtleV8xLlByaXZhdGVLZXkuZnJvbUVsbGlwdGljKGVsbGlwdGljS2V5UGFpciwgdHlwZSwgZWMpO1xyXG4gICAgcmV0dXJuIHsgcHVibGljS2V5OiBwdWJsaWNLZXksIHByaXZhdGVLZXk6IHByaXZhdGVLZXkgfTtcclxufTtcclxuZXhwb3J0cy5nZW5lcmF0ZUtleVBhaXIgPSBnZW5lcmF0ZUtleVBhaXI7XHJcbnZhciBzaGEyNTYgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgcmV0dXJuIGhhc2guc2hhMjU2KCkudXBkYXRlKGRhdGEpLmRpZ2VzdCgpO1xyXG59O1xyXG5leHBvcnRzLnNoYTI1NiA9IHNoYTI1NjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufTtcclxudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufTtcclxudmFyIF9fdmFsdWVzID0gKHRoaXMgJiYgdGhpcy5fX3ZhbHVlcykgfHwgZnVuY3Rpb24obykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5zaWduYXR1cmVUb1N0cmluZyA9IGV4cG9ydHMuc3RyaW5nVG9TaWduYXR1cmUgPSBleHBvcnRzLnByaXZhdGVLZXlUb1N0cmluZyA9IGV4cG9ydHMucHJpdmF0ZUtleVRvTGVnYWN5U3RyaW5nID0gZXhwb3J0cy5zdHJpbmdUb1ByaXZhdGVLZXkgPSBleHBvcnRzLmNvbnZlcnRMZWdhY3lQdWJsaWNLZXlzID0gZXhwb3J0cy5jb252ZXJ0TGVnYWN5UHVibGljS2V5ID0gZXhwb3J0cy5wdWJsaWNLZXlUb1N0cmluZyA9IGV4cG9ydHMucHVibGljS2V5VG9MZWdhY3lTdHJpbmcgPSBleHBvcnRzLnN0cmluZ1RvUHVibGljS2V5ID0gZXhwb3J0cy5zaWduYXR1cmVEYXRhU2l6ZSA9IGV4cG9ydHMucHJpdmF0ZUtleURhdGFTaXplID0gZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZSA9IGV4cG9ydHMuS2V5VHlwZSA9IGV4cG9ydHMuYmFzZTY0VG9CaW5hcnkgPSBleHBvcnRzLmJpbmFyeVRvQmFzZTU4ID0gZXhwb3J0cy5iYXNlNThUb0JpbmFyeSA9IGV4cG9ydHMuc2lnbmVkQmluYXJ5VG9EZWNpbWFsID0gZXhwb3J0cy5iaW5hcnlUb0RlY2ltYWwgPSBleHBvcnRzLnNpZ25lZERlY2ltYWxUb0JpbmFyeSA9IGV4cG9ydHMuZGVjaW1hbFRvQmluYXJ5ID0gZXhwb3J0cy5uZWdhdGUgPSBleHBvcnRzLmlzTmVnYXRpdmUgPSB2b2lkIDA7XHJcbi8qKlxyXG4gKiBAbW9kdWxlIE51bWVyaWNcclxuICovXHJcbnZhciBoYXNoX2pzXzEgPSByZXF1aXJlKFwiaGFzaC5qc1wiKTtcclxuLy8gY29weXJpZ2h0IGRlZmluZWQgaW4gZW9zanMvTElDRU5TRS50eHRcclxudmFyIHJpcGVtZDE2MCA9IHJlcXVpcmUoJy4vcmlwZW1kJykuUklQRU1EMTYwLmhhc2g7XHJcbnZhciBiYXNlNThDaGFycyA9ICcxMjM0NTY3ODlBQkNERUZHSEpLTE1OUFFSU1RVVldYWVphYmNkZWZnaGlqa21ub3BxcnN0dXZ3eHl6JztcclxudmFyIGJhc2U2NENoYXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nO1xyXG52YXIgY3JlYXRlX2Jhc2U1OF9tYXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgYmFzZTU4TSA9IEFycmF5KDI1NikuZmlsbCgtMSk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJhc2U1OENoYXJzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgYmFzZTU4TVtiYXNlNThDaGFycy5jaGFyQ29kZUF0KGkpXSA9IGk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYmFzZTU4TTtcclxufTtcclxudmFyIGJhc2U1OE1hcCA9IGNyZWF0ZV9iYXNlNThfbWFwKCk7XHJcbnZhciBjcmVhdGVfYmFzZTY0X21hcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBiYXNlNjRNID0gQXJyYXkoMjU2KS5maWxsKC0xKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmFzZTY0Q2hhcnMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBiYXNlNjRNW2Jhc2U2NENoYXJzLmNoYXJDb2RlQXQoaSldID0gaTtcclxuICAgIH1cclxuICAgIGJhc2U2NE1bJz0nLmNoYXJDb2RlQXQoMCldID0gMDtcclxuICAgIHJldHVybiBiYXNlNjRNO1xyXG59O1xyXG52YXIgYmFzZTY0TWFwID0gY3JlYXRlX2Jhc2U2NF9tYXAoKTtcclxuLyoqIElzIGBiaWdudW1gIGEgbmVnYXRpdmUgbnVtYmVyPyAqL1xyXG52YXIgaXNOZWdhdGl2ZSA9IGZ1bmN0aW9uIChiaWdudW0pIHtcclxuICAgIHJldHVybiAoYmlnbnVtW2JpZ251bS5sZW5ndGggLSAxXSAmIDB4ODApICE9PSAwO1xyXG59O1xyXG5leHBvcnRzLmlzTmVnYXRpdmUgPSBpc05lZ2F0aXZlO1xyXG4vKiogTmVnYXRlIGBiaWdudW1gICovXHJcbnZhciBuZWdhdGUgPSBmdW5jdGlvbiAoYmlnbnVtKSB7XHJcbiAgICB2YXIgY2FycnkgPSAxO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiaWdudW0ubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICB2YXIgeCA9ICh+YmlnbnVtW2ldICYgMHhmZikgKyBjYXJyeTtcclxuICAgICAgICBiaWdudW1baV0gPSB4O1xyXG4gICAgICAgIGNhcnJ5ID0geCA+PiA4O1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLm5lZ2F0ZSA9IG5lZ2F0ZTtcclxuLyoqXHJcbiAqIENvbnZlcnQgYW4gdW5zaWduZWQgZGVjaW1hbCBudW1iZXIgaW4gYHNgIHRvIGEgYmlnbnVtXHJcbiAqXHJcbiAqIEBwYXJhbSBzaXplIGJpZ251bSBzaXplIChieXRlcylcclxuICovXHJcbnZhciBkZWNpbWFsVG9CaW5hcnkgPSBmdW5jdGlvbiAoc2l6ZSwgcykge1xyXG4gICAgdmFyIHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KHNpemUpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgdmFyIHNyY0RpZ2l0ID0gcy5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICAgIGlmIChzcmNEaWdpdCA8ICcwJy5jaGFyQ29kZUF0KDApIHx8IHNyY0RpZ2l0ID4gJzknLmNoYXJDb2RlQXQoMCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIG51bWJlcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY2FycnkgPSBzcmNEaWdpdCAtICcwJy5jaGFyQ29kZUF0KDApO1xyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2l6ZTsgKytqKSB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gcmVzdWx0W2pdICogMTAgKyBjYXJyeTtcclxuICAgICAgICAgICAgcmVzdWx0W2pdID0geDtcclxuICAgICAgICAgICAgY2FycnkgPSB4ID4+IDg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjYXJyeSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ251bWJlciBpcyBvdXQgb2YgcmFuZ2UnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5leHBvcnRzLmRlY2ltYWxUb0JpbmFyeSA9IGRlY2ltYWxUb0JpbmFyeTtcclxuLyoqXHJcbiAqIENvbnZlcnQgYSBzaWduZWQgZGVjaW1hbCBudW1iZXIgaW4gYHNgIHRvIGEgYmlnbnVtXHJcbiAqXHJcbiAqIEBwYXJhbSBzaXplIGJpZ251bSBzaXplIChieXRlcylcclxuICovXHJcbnZhciBzaWduZWREZWNpbWFsVG9CaW5hcnkgPSBmdW5jdGlvbiAoc2l6ZSwgcykge1xyXG4gICAgdmFyIG5lZ2F0aXZlID0gc1swXSA9PT0gJy0nO1xyXG4gICAgaWYgKG5lZ2F0aXZlKSB7XHJcbiAgICAgICAgcyA9IHMuc3Vic3RyKDEpO1xyXG4gICAgfVxyXG4gICAgdmFyIHJlc3VsdCA9ICgwLCBleHBvcnRzLmRlY2ltYWxUb0JpbmFyeSkoc2l6ZSwgcyk7XHJcbiAgICBpZiAobmVnYXRpdmUpIHtcclxuICAgICAgICAoMCwgZXhwb3J0cy5uZWdhdGUpKHJlc3VsdCk7XHJcbiAgICAgICAgaWYgKCEoMCwgZXhwb3J0cy5pc05lZ2F0aXZlKShyZXN1bHQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbnVtYmVyIGlzIG91dCBvZiByYW5nZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCgwLCBleHBvcnRzLmlzTmVnYXRpdmUpKHJlc3VsdCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ251bWJlciBpcyBvdXQgb2YgcmFuZ2UnKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcbmV4cG9ydHMuc2lnbmVkRGVjaW1hbFRvQmluYXJ5ID0gc2lnbmVkRGVjaW1hbFRvQmluYXJ5O1xyXG4vKipcclxuICogQ29udmVydCBgYmlnbnVtYCB0byBhbiB1bnNpZ25lZCBkZWNpbWFsIG51bWJlclxyXG4gKlxyXG4gKiBAcGFyYW0gbWluRGlnaXRzIDAtcGFkIHJlc3VsdCB0byB0aGlzIG1hbnkgZGlnaXRzXHJcbiAqL1xyXG52YXIgYmluYXJ5VG9EZWNpbWFsID0gZnVuY3Rpb24gKGJpZ251bSwgbWluRGlnaXRzKSB7XHJcbiAgICBpZiAobWluRGlnaXRzID09PSB2b2lkIDApIHsgbWluRGlnaXRzID0gMTsgfVxyXG4gICAgdmFyIHJlc3VsdCA9IEFycmF5KG1pbkRpZ2l0cykuZmlsbCgnMCcuY2hhckNvZGVBdCgwKSk7XHJcbiAgICBmb3IgKHZhciBpID0gYmlnbnVtLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XHJcbiAgICAgICAgdmFyIGNhcnJ5ID0gYmlnbnVtW2ldO1xyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmVzdWx0Lmxlbmd0aDsgKytqKSB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gKChyZXN1bHRbal0gLSAnMCcuY2hhckNvZGVBdCgwKSkgPDwgOCkgKyBjYXJyeTtcclxuICAgICAgICAgICAgcmVzdWx0W2pdID0gJzAnLmNoYXJDb2RlQXQoMCkgKyB4ICUgMTA7XHJcbiAgICAgICAgICAgIGNhcnJ5ID0gKHggLyAxMCkgfCAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aGlsZSAoY2FycnkpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goJzAnLmNoYXJDb2RlQXQoMCkgKyBjYXJyeSAlIDEwKTtcclxuICAgICAgICAgICAgY2FycnkgPSAoY2FycnkgLyAxMCkgfCAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlc3VsdC5yZXZlcnNlKCk7XHJcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIF9fc3ByZWFkQXJyYXkoW10sIF9fcmVhZChyZXN1bHQpLCBmYWxzZSkpO1xyXG59O1xyXG5leHBvcnRzLmJpbmFyeVRvRGVjaW1hbCA9IGJpbmFyeVRvRGVjaW1hbDtcclxuLyoqXHJcbiAqIENvbnZlcnQgYGJpZ251bWAgdG8gYSBzaWduZWQgZGVjaW1hbCBudW1iZXJcclxuICpcclxuICogQHBhcmFtIG1pbkRpZ2l0cyAwLXBhZCByZXN1bHQgdG8gdGhpcyBtYW55IGRpZ2l0c1xyXG4gKi9cclxudmFyIHNpZ25lZEJpbmFyeVRvRGVjaW1hbCA9IGZ1bmN0aW9uIChiaWdudW0sIG1pbkRpZ2l0cykge1xyXG4gICAgaWYgKG1pbkRpZ2l0cyA9PT0gdm9pZCAwKSB7IG1pbkRpZ2l0cyA9IDE7IH1cclxuICAgIGlmICgoMCwgZXhwb3J0cy5pc05lZ2F0aXZlKShiaWdudW0pKSB7XHJcbiAgICAgICAgdmFyIHggPSBiaWdudW0uc2xpY2UoKTtcclxuICAgICAgICAoMCwgZXhwb3J0cy5uZWdhdGUpKHgpO1xyXG4gICAgICAgIHJldHVybiAnLScgKyAoMCwgZXhwb3J0cy5iaW5hcnlUb0RlY2ltYWwpKHgsIG1pbkRpZ2l0cyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKDAsIGV4cG9ydHMuYmluYXJ5VG9EZWNpbWFsKShiaWdudW0sIG1pbkRpZ2l0cyk7XHJcbn07XHJcbmV4cG9ydHMuc2lnbmVkQmluYXJ5VG9EZWNpbWFsID0gc2lnbmVkQmluYXJ5VG9EZWNpbWFsO1xyXG52YXIgYmFzZTU4VG9CaW5hcnlWYXJTaXplID0gZnVuY3Rpb24gKHMpIHtcclxuICAgIHZhciBlXzEsIF9hO1xyXG4gICAgdmFyIHJlc3VsdCA9IFtdO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgdmFyIGNhcnJ5ID0gYmFzZTU4TWFwW3MuY2hhckNvZGVBdChpKV07XHJcbiAgICAgICAgaWYgKGNhcnJ5IDwgMCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgYmFzZS01OCB2YWx1ZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJlc3VsdC5sZW5ndGg7ICsraikge1xyXG4gICAgICAgICAgICB2YXIgeCA9IHJlc3VsdFtqXSAqIDU4ICsgY2Fycnk7XHJcbiAgICAgICAgICAgIHJlc3VsdFtqXSA9IHggJiAweGZmO1xyXG4gICAgICAgICAgICBjYXJyeSA9IHggPj4gODtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNhcnJ5KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNhcnJ5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGZvciAodmFyIHNfMSA9IF9fdmFsdWVzKHMpLCBzXzFfMSA9IHNfMS5uZXh0KCk7ICFzXzFfMS5kb25lOyBzXzFfMSA9IHNfMS5uZXh0KCkpIHtcclxuICAgICAgICAgICAgdmFyIGNoID0gc18xXzEudmFsdWU7XHJcbiAgICAgICAgICAgIGlmIChjaCA9PT0gJzEnKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCgwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChzXzFfMSAmJiAhc18xXzEuZG9uZSAmJiAoX2EgPSBzXzEucmV0dXJuKSkgX2EuY2FsbChzXzEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXN1bHQucmV2ZXJzZSgpO1xyXG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHJlc3VsdCk7XHJcbn07XHJcbi8qKlxyXG4gKiBDb252ZXJ0IGFuIHVuc2lnbmVkIGJhc2UtNTggbnVtYmVyIGluIGBzYCB0byBhIGJpZ251bVxyXG4gKlxyXG4gKiBAcGFyYW0gc2l6ZSBiaWdudW0gc2l6ZSAoYnl0ZXMpXHJcbiAqL1xyXG52YXIgYmFzZTU4VG9CaW5hcnkgPSBmdW5jdGlvbiAoc2l6ZSwgcykge1xyXG4gICAgaWYgKCFzaXplKSB7XHJcbiAgICAgICAgcmV0dXJuIGJhc2U1OFRvQmluYXJ5VmFyU2l6ZShzKTtcclxuICAgIH1cclxuICAgIHZhciByZXN1bHQgPSBuZXcgVWludDhBcnJheShzaXplKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIHZhciBjYXJyeSA9IGJhc2U1OE1hcFtzLmNoYXJDb2RlQXQoaSldO1xyXG4gICAgICAgIGlmIChjYXJyeSA8IDApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGJhc2UtNTggdmFsdWUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzaXplOyArK2opIHtcclxuICAgICAgICAgICAgdmFyIHggPSByZXN1bHRbal0gKiA1OCArIGNhcnJ5O1xyXG4gICAgICAgICAgICByZXN1bHRbal0gPSB4O1xyXG4gICAgICAgICAgICBjYXJyeSA9IHggPj4gODtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNhcnJ5KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYmFzZS01OCB2YWx1ZSBpcyBvdXQgb2YgcmFuZ2UnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXN1bHQucmV2ZXJzZSgpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuZXhwb3J0cy5iYXNlNThUb0JpbmFyeSA9IGJhc2U1OFRvQmluYXJ5O1xyXG4vKipcclxuICogQ29udmVydCBgYmlnbnVtYCB0byBhIGJhc2UtNTggbnVtYmVyXHJcbiAqXHJcbiAqIEBwYXJhbSBtaW5EaWdpdHMgMC1wYWQgcmVzdWx0IHRvIHRoaXMgbWFueSBkaWdpdHNcclxuICovXHJcbnZhciBiaW5hcnlUb0Jhc2U1OCA9IGZ1bmN0aW9uIChiaWdudW0sIG1pbkRpZ2l0cykge1xyXG4gICAgdmFyIGVfMiwgX2EsIGVfMywgX2I7XHJcbiAgICBpZiAobWluRGlnaXRzID09PSB2b2lkIDApIHsgbWluRGlnaXRzID0gMTsgfVxyXG4gICAgdmFyIHJlc3VsdCA9IFtdO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBmb3IgKHZhciBiaWdudW1fMSA9IF9fdmFsdWVzKGJpZ251bSksIGJpZ251bV8xXzEgPSBiaWdudW1fMS5uZXh0KCk7ICFiaWdudW1fMV8xLmRvbmU7IGJpZ251bV8xXzEgPSBiaWdudW1fMS5uZXh0KCkpIHtcclxuICAgICAgICAgICAgdmFyIGJ5dGUgPSBiaWdudW1fMV8xLnZhbHVlO1xyXG4gICAgICAgICAgICB2YXIgY2FycnkgPSBieXRlO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJlc3VsdC5sZW5ndGg7ICsraikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHggPSAoYmFzZTU4TWFwW3Jlc3VsdFtqXV0gPDwgOCkgKyBjYXJyeTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdFtqXSA9IGJhc2U1OENoYXJzLmNoYXJDb2RlQXQoeCAlIDU4KTtcclxuICAgICAgICAgICAgICAgIGNhcnJ5ID0gKHggLyA1OCkgfCAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdoaWxlIChjYXJyeSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goYmFzZTU4Q2hhcnMuY2hhckNvZGVBdChjYXJyeSAlIDU4KSk7XHJcbiAgICAgICAgICAgICAgICBjYXJyeSA9IChjYXJyeSAvIDU4KSB8IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZV8yXzEpIHsgZV8yID0geyBlcnJvcjogZV8yXzEgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGJpZ251bV8xXzEgJiYgIWJpZ251bV8xXzEuZG9uZSAmJiAoX2EgPSBiaWdudW1fMS5yZXR1cm4pKSBfYS5jYWxsKGJpZ251bV8xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlXzIpIHRocm93IGVfMi5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgICBmb3IgKHZhciBiaWdudW1fMiA9IF9fdmFsdWVzKGJpZ251bSksIGJpZ251bV8yXzEgPSBiaWdudW1fMi5uZXh0KCk7ICFiaWdudW1fMl8xLmRvbmU7IGJpZ251bV8yXzEgPSBiaWdudW1fMi5uZXh0KCkpIHtcclxuICAgICAgICAgICAgdmFyIGJ5dGUgPSBiaWdudW1fMl8xLnZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoYnl0ZSkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCgnMScuY2hhckNvZGVBdCgwKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZV8zXzEpIHsgZV8zID0geyBlcnJvcjogZV8zXzEgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGJpZ251bV8yXzEgJiYgIWJpZ251bV8yXzEuZG9uZSAmJiAoX2IgPSBiaWdudW1fMi5yZXR1cm4pKSBfYi5jYWxsKGJpZ251bV8yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlXzMpIHRocm93IGVfMy5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmVzdWx0LnJldmVyc2UoKTtcclxuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgX19zcHJlYWRBcnJheShbXSwgX19yZWFkKHJlc3VsdCksIGZhbHNlKSk7XHJcbn07XHJcbmV4cG9ydHMuYmluYXJ5VG9CYXNlNTggPSBiaW5hcnlUb0Jhc2U1ODtcclxuLyoqIENvbnZlcnQgYW4gdW5zaWduZWQgYmFzZS02NCBudW1iZXIgaW4gYHNgIHRvIGEgYmlnbnVtICovXHJcbnZhciBiYXNlNjRUb0JpbmFyeSA9IGZ1bmN0aW9uIChzKSB7XHJcbiAgICB2YXIgbGVuID0gcy5sZW5ndGg7XHJcbiAgICBpZiAoKGxlbiAmIDMpID09PSAxICYmIHNbbGVuIC0gMV0gPT09ICc9Jykge1xyXG4gICAgICAgIGxlbiAtPSAxO1xyXG4gICAgfSAvLyBmYyBhcHBlbmRzIGFuIGV4dHJhICc9J1xyXG4gICAgaWYgKChsZW4gJiAzKSAhPT0gMCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYmFzZS02NCB2YWx1ZSBpcyBub3QgcGFkZGVkIGNvcnJlY3RseScpO1xyXG4gICAgfVxyXG4gICAgdmFyIGdyb3VwcyA9IGxlbiA+PiAyO1xyXG4gICAgdmFyIGJ5dGVzID0gZ3JvdXBzICogMztcclxuICAgIGlmIChsZW4gPiAwICYmIHNbbGVuIC0gMV0gPT09ICc9Jykge1xyXG4gICAgICAgIGlmIChzW2xlbiAtIDJdID09PSAnPScpIHtcclxuICAgICAgICAgICAgYnl0ZXMgLT0gMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGJ5dGVzIC09IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFyIHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KGJ5dGVzKTtcclxuICAgIGZvciAodmFyIGdyb3VwID0gMDsgZ3JvdXAgPCBncm91cHM7ICsrZ3JvdXApIHtcclxuICAgICAgICB2YXIgZGlnaXQwID0gYmFzZTY0TWFwW3MuY2hhckNvZGVBdChncm91cCAqIDQgKyAwKV07XHJcbiAgICAgICAgdmFyIGRpZ2l0MSA9IGJhc2U2NE1hcFtzLmNoYXJDb2RlQXQoZ3JvdXAgKiA0ICsgMSldO1xyXG4gICAgICAgIHZhciBkaWdpdDIgPSBiYXNlNjRNYXBbcy5jaGFyQ29kZUF0KGdyb3VwICogNCArIDIpXTtcclxuICAgICAgICB2YXIgZGlnaXQzID0gYmFzZTY0TWFwW3MuY2hhckNvZGVBdChncm91cCAqIDQgKyAzKV07XHJcbiAgICAgICAgcmVzdWx0W2dyb3VwICogMyArIDBdID0gKGRpZ2l0MCA8PCAyKSB8IChkaWdpdDEgPj4gNCk7XHJcbiAgICAgICAgaWYgKGdyb3VwICogMyArIDEgPCBieXRlcykge1xyXG4gICAgICAgICAgICByZXN1bHRbZ3JvdXAgKiAzICsgMV0gPSAoKGRpZ2l0MSAmIDE1KSA8PCA0KSB8IChkaWdpdDIgPj4gMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChncm91cCAqIDMgKyAyIDwgYnl0ZXMpIHtcclxuICAgICAgICAgICAgcmVzdWx0W2dyb3VwICogMyArIDJdID0gKChkaWdpdDIgJiAzKSA8PCA2KSB8IGRpZ2l0MztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5leHBvcnRzLmJhc2U2NFRvQmluYXJ5ID0gYmFzZTY0VG9CaW5hcnk7XHJcbi8qKiBLZXkgdHlwZXMgdGhpcyBsaWJyYXJ5IHN1cHBvcnRzICovXHJcbnZhciBLZXlUeXBlO1xyXG4oZnVuY3Rpb24gKEtleVR5cGUpIHtcclxuICAgIEtleVR5cGVbS2V5VHlwZVtcImsxXCJdID0gMF0gPSBcImsxXCI7XHJcbiAgICBLZXlUeXBlW0tleVR5cGVbXCJyMVwiXSA9IDFdID0gXCJyMVwiO1xyXG4gICAgS2V5VHlwZVtLZXlUeXBlW1wid2FcIl0gPSAyXSA9IFwid2FcIjtcclxufSkoS2V5VHlwZSA9IGV4cG9ydHMuS2V5VHlwZSB8fCAoZXhwb3J0cy5LZXlUeXBlID0ge30pKTtcclxuLyoqIFB1YmxpYyBrZXkgZGF0YSBzaXplLCBleGNsdWRpbmcgdHlwZSBmaWVsZCAqL1xyXG5leHBvcnRzLnB1YmxpY0tleURhdGFTaXplID0gMzM7XHJcbi8qKiBQcml2YXRlIGtleSBkYXRhIHNpemUsIGV4Y2x1ZGluZyB0eXBlIGZpZWxkICovXHJcbmV4cG9ydHMucHJpdmF0ZUtleURhdGFTaXplID0gMzI7XHJcbi8qKiBTaWduYXR1cmUgZGF0YSBzaXplLCBleGNsdWRpbmcgdHlwZSBmaWVsZCAqL1xyXG5leHBvcnRzLnNpZ25hdHVyZURhdGFTaXplID0gNjU7XHJcbnZhciBkaWdlc3RTdWZmaXhSaXBlbWQxNjAgPSBmdW5jdGlvbiAoZGF0YSwgc3VmZml4KSB7XHJcbiAgICB2YXIgZCA9IG5ldyBVaW50OEFycmF5KGRhdGEubGVuZ3RoICsgc3VmZml4Lmxlbmd0aCk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBkW2ldID0gZGF0YVtpXTtcclxuICAgIH1cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3VmZml4Lmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgZFtkYXRhLmxlbmd0aCArIGldID0gc3VmZml4LmNoYXJDb2RlQXQoaSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmlwZW1kMTYwKGQpO1xyXG59O1xyXG52YXIgc3RyaW5nVG9LZXkgPSBmdW5jdGlvbiAocywgdHlwZSwgc2l6ZSwgc3VmZml4KSB7XHJcbiAgICB2YXIgd2hvbGUgPSAoMCwgZXhwb3J0cy5iYXNlNThUb0JpbmFyeSkoc2l6ZSA/IHNpemUgKyA0IDogMCwgcyk7XHJcbiAgICB2YXIgcmVzdWx0ID0geyB0eXBlOiB0eXBlLCBkYXRhOiBuZXcgVWludDhBcnJheSh3aG9sZS5idWZmZXIsIDAsIHdob2xlLmxlbmd0aCAtIDQpIH07XHJcbiAgICB2YXIgZGlnZXN0ID0gbmV3IFVpbnQ4QXJyYXkoZGlnZXN0U3VmZml4UmlwZW1kMTYwKHJlc3VsdC5kYXRhLCBzdWZmaXgpKTtcclxuICAgIGlmIChkaWdlc3RbMF0gIT09IHdob2xlW3dob2xlLmxlbmd0aCAtIDRdIHx8IGRpZ2VzdFsxXSAhPT0gd2hvbGVbd2hvbGUubGVuZ3RoIC0gM11cclxuICAgICAgICB8fCBkaWdlc3RbMl0gIT09IHdob2xlW3dob2xlLmxlbmd0aCAtIDJdIHx8IGRpZ2VzdFszXSAhPT0gd2hvbGVbd2hvbGUubGVuZ3RoIC0gMV0pIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NoZWNrc3VtIGRvZXNuXFwndCBtYXRjaCcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxudmFyIGtleVRvU3RyaW5nID0gZnVuY3Rpb24gKGtleSwgc3VmZml4LCBwcmVmaXgpIHtcclxuICAgIHZhciBkaWdlc3QgPSBuZXcgVWludDhBcnJheShkaWdlc3RTdWZmaXhSaXBlbWQxNjAoa2V5LmRhdGEsIHN1ZmZpeCkpO1xyXG4gICAgdmFyIHdob2xlID0gbmV3IFVpbnQ4QXJyYXkoa2V5LmRhdGEubGVuZ3RoICsgNCk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleS5kYXRhLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgd2hvbGVbaV0gPSBrZXkuZGF0YVtpXTtcclxuICAgIH1cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgKytpKSB7XHJcbiAgICAgICAgd2hvbGVbaSArIGtleS5kYXRhLmxlbmd0aF0gPSBkaWdlc3RbaV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJlZml4ICsgKDAsIGV4cG9ydHMuYmluYXJ5VG9CYXNlNTgpKHdob2xlKTtcclxufTtcclxuLyoqIENvbnZlcnQga2V5IGluIGBzYCB0byBiaW5hcnkgZm9ybSAqL1xyXG52YXIgc3RyaW5nVG9QdWJsaWNLZXkgPSBmdW5jdGlvbiAocykge1xyXG4gICAgaWYgKHR5cGVvZiBzICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZXhwZWN0ZWQgc3RyaW5nIGNvbnRhaW5pbmcgcHVibGljIGtleScpO1xyXG4gICAgfVxyXG4gICAgaWYgKHMuc3Vic3RyKDAsIDMpID09PSAnRU9TJykge1xyXG4gICAgICAgIHZhciB3aG9sZSA9ICgwLCBleHBvcnRzLmJhc2U1OFRvQmluYXJ5KShleHBvcnRzLnB1YmxpY0tleURhdGFTaXplICsgNCwgcy5zdWJzdHIoMykpO1xyXG4gICAgICAgIHZhciBrZXkgPSB7IHR5cGU6IEtleVR5cGUuazEsIGRhdGE6IG5ldyBVaW50OEFycmF5KGV4cG9ydHMucHVibGljS2V5RGF0YVNpemUpIH07XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBvcnRzLnB1YmxpY0tleURhdGFTaXplOyArK2kpIHtcclxuICAgICAgICAgICAga2V5LmRhdGFbaV0gPSB3aG9sZVtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGRpZ2VzdCA9IG5ldyBVaW50OEFycmF5KHJpcGVtZDE2MChrZXkuZGF0YSkpO1xyXG4gICAgICAgIGlmIChkaWdlc3RbMF0gIT09IHdob2xlW2V4cG9ydHMucHVibGljS2V5RGF0YVNpemVdIHx8IGRpZ2VzdFsxXSAhPT0gd2hvbGVbMzRdXHJcbiAgICAgICAgICAgIHx8IGRpZ2VzdFsyXSAhPT0gd2hvbGVbMzVdIHx8IGRpZ2VzdFszXSAhPT0gd2hvbGVbMzZdKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY2hlY2tzdW0gZG9lc25cXCd0IG1hdGNoJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBrZXk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChzLnN1YnN0cigwLCA3KSA9PT0gJ1BVQl9LMV8nKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZ1RvS2V5KHMuc3Vic3RyKDcpLCBLZXlUeXBlLmsxLCBleHBvcnRzLnB1YmxpY0tleURhdGFTaXplLCAnSzEnKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHMuc3Vic3RyKDAsIDcpID09PSAnUFVCX1IxXycpIHtcclxuICAgICAgICByZXR1cm4gc3RyaW5nVG9LZXkocy5zdWJzdHIoNyksIEtleVR5cGUucjEsIGV4cG9ydHMucHVibGljS2V5RGF0YVNpemUsICdSMScpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocy5zdWJzdHIoMCwgNykgPT09ICdQVUJfV0FfJykge1xyXG4gICAgICAgIHJldHVybiBzdHJpbmdUb0tleShzLnN1YnN0cig3KSwgS2V5VHlwZS53YSwgMCwgJ1dBJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VucmVjb2duaXplZCBwdWJsaWMga2V5IGZvcm1hdCcpO1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLnN0cmluZ1RvUHVibGljS2V5ID0gc3RyaW5nVG9QdWJsaWNLZXk7XHJcbi8qKiBDb252ZXJ0IHB1YmxpYyBga2V5YCB0byBsZWdhY3kgc3RyaW5nIChiYXNlLTU4KSBmb3JtICovXHJcbnZhciBwdWJsaWNLZXlUb0xlZ2FjeVN0cmluZyA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgIGlmIChrZXkudHlwZSA9PT0gS2V5VHlwZS5rMSAmJiBrZXkuZGF0YS5sZW5ndGggPT09IGV4cG9ydHMucHVibGljS2V5RGF0YVNpemUpIHtcclxuICAgICAgICByZXR1cm4ga2V5VG9TdHJpbmcoa2V5LCAnJywgJ0VPUycpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoa2V5LnR5cGUgPT09IEtleVR5cGUucjEgfHwga2V5LnR5cGUgPT09IEtleVR5cGUud2EpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0tleSBmb3JtYXQgbm90IHN1cHBvcnRlZCBpbiBsZWdhY3kgY29udmVyc2lvbicpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnJlY29nbml6ZWQgcHVibGljIGtleSBmb3JtYXQnKTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0cy5wdWJsaWNLZXlUb0xlZ2FjeVN0cmluZyA9IHB1YmxpY0tleVRvTGVnYWN5U3RyaW5nO1xyXG4vKiogQ29udmVydCBga2V5YCB0byBzdHJpbmcgKGJhc2UtNTgpIGZvcm0gKi9cclxudmFyIHB1YmxpY0tleVRvU3RyaW5nID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgaWYgKGtleS50eXBlID09PSBLZXlUeXBlLmsxICYmIGtleS5kYXRhLmxlbmd0aCA9PT0gZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZSkge1xyXG4gICAgICAgIHJldHVybiBrZXlUb1N0cmluZyhrZXksICdLMScsICdQVUJfSzFfJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChrZXkudHlwZSA9PT0gS2V5VHlwZS5yMSAmJiBrZXkuZGF0YS5sZW5ndGggPT09IGV4cG9ydHMucHVibGljS2V5RGF0YVNpemUpIHtcclxuICAgICAgICByZXR1cm4ga2V5VG9TdHJpbmcoa2V5LCAnUjEnLCAnUFVCX1IxXycpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoa2V5LnR5cGUgPT09IEtleVR5cGUud2EpIHtcclxuICAgICAgICByZXR1cm4ga2V5VG9TdHJpbmcoa2V5LCAnV0EnLCAnUFVCX1dBXycpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnJlY29nbml6ZWQgcHVibGljIGtleSBmb3JtYXQnKTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0cy5wdWJsaWNLZXlUb1N0cmluZyA9IHB1YmxpY0tleVRvU3RyaW5nO1xyXG4vKiogSWYgYSBrZXkgaXMgaW4gdGhlIGxlZ2FjeSBmb3JtYXQgKGBFT1NgIHByZWZpeCksIHRoZW4gY29udmVydCBpdCB0byB0aGUgbmV3IGZvcm1hdCAoYFBVQl9LMV9gKS5cclxuICogTGVhdmVzIG90aGVyIGZvcm1hdHMgdW50b3VjaGVkXHJcbiAqL1xyXG52YXIgY29udmVydExlZ2FjeVB1YmxpY0tleSA9IGZ1bmN0aW9uIChzKSB7XHJcbiAgICBpZiAocy5zdWJzdHIoMCwgMykgPT09ICdFT1MnKSB7XHJcbiAgICAgICAgcmV0dXJuICgwLCBleHBvcnRzLnB1YmxpY0tleVRvU3RyaW5nKSgoMCwgZXhwb3J0cy5zdHJpbmdUb1B1YmxpY0tleSkocykpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHM7XHJcbn07XHJcbmV4cG9ydHMuY29udmVydExlZ2FjeVB1YmxpY0tleSA9IGNvbnZlcnRMZWdhY3lQdWJsaWNLZXk7XHJcbi8qKiBJZiBhIGtleSBpcyBpbiB0aGUgbGVnYWN5IGZvcm1hdCAoYEVPU2AgcHJlZml4KSwgdGhlbiBjb252ZXJ0IGl0IHRvIHRoZSBuZXcgZm9ybWF0IChgUFVCX0sxX2ApLlxyXG4gKiBMZWF2ZXMgb3RoZXIgZm9ybWF0cyB1bnRvdWNoZWRcclxuICovXHJcbnZhciBjb252ZXJ0TGVnYWN5UHVibGljS2V5cyA9IGZ1bmN0aW9uIChrZXlzKSB7XHJcbiAgICByZXR1cm4ga2V5cy5tYXAoZXhwb3J0cy5jb252ZXJ0TGVnYWN5UHVibGljS2V5KTtcclxufTtcclxuZXhwb3J0cy5jb252ZXJ0TGVnYWN5UHVibGljS2V5cyA9IGNvbnZlcnRMZWdhY3lQdWJsaWNLZXlzO1xyXG4vKiogQ29udmVydCBrZXkgaW4gYHNgIHRvIGJpbmFyeSBmb3JtICovXHJcbnZhciBzdHJpbmdUb1ByaXZhdGVLZXkgPSBmdW5jdGlvbiAocykge1xyXG4gICAgaWYgKHR5cGVvZiBzICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZXhwZWN0ZWQgc3RyaW5nIGNvbnRhaW5pbmcgcHJpdmF0ZSBrZXknKTtcclxuICAgIH1cclxuICAgIGlmIChzLnN1YnN0cigwLCA3KSA9PT0gJ1BWVF9SMV8nKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZ1RvS2V5KHMuc3Vic3RyKDcpLCBLZXlUeXBlLnIxLCBleHBvcnRzLnByaXZhdGVLZXlEYXRhU2l6ZSwgJ1IxJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChzLnN1YnN0cigwLCA3KSA9PT0gJ1BWVF9LMV8nKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZ1RvS2V5KHMuc3Vic3RyKDcpLCBLZXlUeXBlLmsxLCBleHBvcnRzLnByaXZhdGVLZXlEYXRhU2l6ZSwgJ0sxJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAvLyB0b2RvOiBWZXJpZnkgY2hlY2tzdW06IHNoYTI1NihzaGEyNTYoa2V5LmRhdGEpKS5cclxuICAgICAgICAvLyAgICAgICBOb3QgY3JpdGljYWwgc2luY2UgYSBiYWQga2V5IHdpbGwgZmFpbCB0byBwcm9kdWNlIGFcclxuICAgICAgICAvLyAgICAgICB2YWxpZCBzaWduYXR1cmUgYW55d2F5LlxyXG4gICAgICAgIHZhciB3aG9sZSA9ICgwLCBleHBvcnRzLmJhc2U1OFRvQmluYXJ5KShleHBvcnRzLnByaXZhdGVLZXlEYXRhU2l6ZSArIDUsIHMpO1xyXG4gICAgICAgIHZhciBrZXkgPSB7IHR5cGU6IEtleVR5cGUuazEsIGRhdGE6IG5ldyBVaW50OEFycmF5KGV4cG9ydHMucHJpdmF0ZUtleURhdGFTaXplKSB9O1xyXG4gICAgICAgIGlmICh3aG9sZVswXSAhPT0gMHg4MCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VucmVjb2duaXplZCBwcml2YXRlIGtleSB0eXBlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwb3J0cy5wcml2YXRlS2V5RGF0YVNpemU7ICsraSkge1xyXG4gICAgICAgICAgICBrZXkuZGF0YVtpXSA9IHdob2xlW2kgKyAxXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGtleTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0cy5zdHJpbmdUb1ByaXZhdGVLZXkgPSBzdHJpbmdUb1ByaXZhdGVLZXk7XHJcbi8qKiBDb252ZXJ0IHByaXZhdGUgYGtleWAgdG8gbGVnYWN5IHN0cmluZyAoYmFzZS01OCkgZm9ybSAqL1xyXG52YXIgcHJpdmF0ZUtleVRvTGVnYWN5U3RyaW5nID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgaWYgKGtleS50eXBlID09PSBLZXlUeXBlLmsxICYmIGtleS5kYXRhLmxlbmd0aCA9PT0gZXhwb3J0cy5wcml2YXRlS2V5RGF0YVNpemUpIHtcclxuICAgICAgICB2YXIgd2hvbGVfMSA9IFtdO1xyXG4gICAgICAgIHdob2xlXzEucHVzaCgxMjgpO1xyXG4gICAgICAgIGtleS5kYXRhLmZvckVhY2goZnVuY3Rpb24gKGJ5dGUpIHsgcmV0dXJuIHdob2xlXzEucHVzaChieXRlKTsgfSk7XHJcbiAgICAgICAgdmFyIGRpZ2VzdCA9IG5ldyBVaW50OEFycmF5KCgwLCBoYXNoX2pzXzEuc2hhMjU2KSgpLnVwZGF0ZSgoMCwgaGFzaF9qc18xLnNoYTI1NikoKS51cGRhdGUod2hvbGVfMSkuZGlnZXN0KCkpLmRpZ2VzdCgpKTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkoZXhwb3J0cy5wcml2YXRlS2V5RGF0YVNpemUgKyA1KTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdob2xlXzEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcmVzdWx0W2ldID0gd2hvbGVfMVtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICAgICAgcmVzdWx0W2kgKyB3aG9sZV8xLmxlbmd0aF0gPSBkaWdlc3RbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoMCwgZXhwb3J0cy5iaW5hcnlUb0Jhc2U1OCkocmVzdWx0KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGtleS50eXBlID09PSBLZXlUeXBlLnIxIHx8IGtleS50eXBlID09PSBLZXlUeXBlLndhKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdLZXkgZm9ybWF0IG5vdCBzdXBwb3J0ZWQgaW4gbGVnYWN5IGNvbnZlcnNpb24nKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHB1YmxpYyBrZXkgZm9ybWF0Jyk7XHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydHMucHJpdmF0ZUtleVRvTGVnYWN5U3RyaW5nID0gcHJpdmF0ZUtleVRvTGVnYWN5U3RyaW5nO1xyXG4vKiogQ29udmVydCBga2V5YCB0byBzdHJpbmcgKGJhc2UtNTgpIGZvcm0gKi9cclxudmFyIHByaXZhdGVLZXlUb1N0cmluZyA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgIGlmIChrZXkudHlwZSA9PT0gS2V5VHlwZS5yMSkge1xyXG4gICAgICAgIHJldHVybiBrZXlUb1N0cmluZyhrZXksICdSMScsICdQVlRfUjFfJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChrZXkudHlwZSA9PT0gS2V5VHlwZS5rMSkge1xyXG4gICAgICAgIHJldHVybiBrZXlUb1N0cmluZyhrZXksICdLMScsICdQVlRfSzFfJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VucmVjb2duaXplZCBwcml2YXRlIGtleSBmb3JtYXQnKTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0cy5wcml2YXRlS2V5VG9TdHJpbmcgPSBwcml2YXRlS2V5VG9TdHJpbmc7XHJcbi8qKiBDb252ZXJ0IGtleSBpbiBgc2AgdG8gYmluYXJ5IGZvcm0gKi9cclxudmFyIHN0cmluZ1RvU2lnbmF0dXJlID0gZnVuY3Rpb24gKHMpIHtcclxuICAgIGlmICh0eXBlb2YgcyAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2V4cGVjdGVkIHN0cmluZyBjb250YWluaW5nIHNpZ25hdHVyZScpO1xyXG4gICAgfVxyXG4gICAgaWYgKHMuc3Vic3RyKDAsIDcpID09PSAnU0lHX0sxXycpIHtcclxuICAgICAgICByZXR1cm4gc3RyaW5nVG9LZXkocy5zdWJzdHIoNyksIEtleVR5cGUuazEsIGV4cG9ydHMuc2lnbmF0dXJlRGF0YVNpemUsICdLMScpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocy5zdWJzdHIoMCwgNykgPT09ICdTSUdfUjFfJykge1xyXG4gICAgICAgIHJldHVybiBzdHJpbmdUb0tleShzLnN1YnN0cig3KSwgS2V5VHlwZS5yMSwgZXhwb3J0cy5zaWduYXR1cmVEYXRhU2l6ZSwgJ1IxJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChzLnN1YnN0cigwLCA3KSA9PT0gJ1NJR19XQV8nKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZ1RvS2V5KHMuc3Vic3RyKDcpLCBLZXlUeXBlLndhLCAwLCAnV0EnKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHNpZ25hdHVyZSBmb3JtYXQnKTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0cy5zdHJpbmdUb1NpZ25hdHVyZSA9IHN0cmluZ1RvU2lnbmF0dXJlO1xyXG4vKiogQ29udmVydCBgc2lnbmF0dXJlYCB0byBzdHJpbmcgKGJhc2UtNTgpIGZvcm0gKi9cclxudmFyIHNpZ25hdHVyZVRvU3RyaW5nID0gZnVuY3Rpb24gKHNpZ25hdHVyZSkge1xyXG4gICAgaWYgKHNpZ25hdHVyZS50eXBlID09PSBLZXlUeXBlLmsxKSB7XHJcbiAgICAgICAgcmV0dXJuIGtleVRvU3RyaW5nKHNpZ25hdHVyZSwgJ0sxJywgJ1NJR19LMV8nKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHNpZ25hdHVyZS50eXBlID09PSBLZXlUeXBlLnIxKSB7XHJcbiAgICAgICAgcmV0dXJuIGtleVRvU3RyaW5nKHNpZ25hdHVyZSwgJ1IxJywgJ1NJR19SMV8nKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHNpZ25hdHVyZS50eXBlID09PSBLZXlUeXBlLndhKSB7XHJcbiAgICAgICAgcmV0dXJuIGtleVRvU3RyaW5nKHNpZ25hdHVyZSwgJ1dBJywgJ1NJR19XQV8nKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHNpZ25hdHVyZSBmb3JtYXQnKTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0cy5zaWduYXR1cmVUb1N0cmluZyA9IHNpZ25hdHVyZVRvU3RyaW5nO1xyXG4iLCIvLyBodHRwczovL2dpc3QuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3dsemxhMDAwL2JhYzgzZGY2ZDNjNTE5MTZjNGRkMGJjOTQ3ZTQ2OTQ3L3Jhdy83ZWUzNDYyYjA5NWFiMjI1ODBkZGFmMTkxZjQ0YTU5MGRhNmZlMzNiL1JJUEVNRC0xNjAuanNcblxuLypcblx0UklQRU1ELTE2MC5qc1xuXG5cdFx0ZGV2ZWxvcGVkXG5cdFx0XHRieSBLLiAoaHR0cHM6Ly9naXRodWIuY29tL3dsemxhMDAwKVxuXHRcdFx0b24gRGVjZW1iZXIgMjctMjksIDIwMTcsXG5cblx0XHRsaWNlbnNlZCB1bmRlclxuXG5cblx0XHR0aGUgTUlUIGxpY2Vuc2VcblxuXHRcdENvcHlyaWdodCAoYykgMjAxNyBLLlxuXG5cdFx0IFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG5cdFx0b2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cblx0XHRmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXRcblx0XHRyZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSxcblx0XHRjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Jcblx0XHRzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZVxuXHRcdFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nXG5cdFx0Y29uZGl0aW9uczpcblxuXHRcdCBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuXHRcdGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5cdFx0IFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsXG5cdFx0RVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTXG5cdFx0T0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkRcblx0XHROT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVFxuXHRcdEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLFxuXHRcdFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuXHRcdEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1Jcblx0XHRPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbmNsYXNzIFJJUEVNRDE2MFxue1xuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIC8vIGh0dHBzOi8vd2ViY2FjaGUuZ29vZ2xldXNlcmNvbnRlbnQuY29tL3NlYXJjaD9xPWNhY2hlOkNuTE9nb2xUSFlFSjpodHRwczovL3d3dy5jb3NpYy5lc2F0Lmt1bGV1dmVuLmJlL3B1YmxpY2F0aW9ucy9hcnRpY2xlLTMxNy5wZGZcbiAgICAgICAgLy8gaHR0cDovL3Nob2RoZ2FuZ2EuaW5mbGlibmV0LmFjLmluL2JpdHN0cmVhbS8xMDYwMy8yMjk3OC8xMy8xM19hcHBlbmRpeC5wZGZcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0X25fcGFkX2J5dGVzKG1lc3NhZ2Vfc2l6ZSAvKiBpbiBieXRlcywgMSBieXRlIGlzIDggYml0cy4gKi8pXG4gICAge1xuICAgICAgICAvLyAgT2J0YWluIHRoZSBudW1iZXIgb2YgYnl0ZXMgbmVlZGVkIHRvIHBhZCB0aGUgbWVzc2FnZS5cbiAgICAgICAgLy8gSXQgZG9lcyBub3QgY29udGFpbiB0aGUgc2l6ZSBvZiB0aGUgbWVzc2FnZSBzaXplIGluZm9ybWF0aW9uLlxuICAgICAgICAvKlxuXHRcdFx0aHR0cHM6Ly93ZWJjYWNoZS5nb29nbGV1c2VyY29udGVudC5jb20vc2VhcmNoP3E9Y2FjaGU6Q25MT2dvbFRIWUVKOmh0dHBzOi8vd3d3LmNvc2ljLmVzYXQua3VsZXV2ZW4uYmUvcHVibGljYXRpb25zL2FydGljbGUtMzE3LnBkZlxuXG5cdFx0XHRUaGUgQ3J5cHRvZ3JhcGhpYyBIYXNoIEZ1bmN0aW9uIFJJUEVNRC0xNjBcblxuXHRcdFx0d3JpdHRlbiBieVxuXHRcdFx0XHRCYXJ0IFByZW5lZWwsXG5cdFx0XHRcdEhhbnMgRG9iYmVydGluLFxuXHRcdFx0XHRBbnRvb24gQm9zc2VsYWVyc1xuXHRcdFx0aW5cblx0XHRcdFx0MTk5Ny5cblxuXHRcdFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdFx0wqc1ICAgICBEZXNjcmlwdGlvbiBvZiBSSVBFTUQtMTYwXG5cblx0XHRcdC4uLi4uLlxuXG5cdFx0XHQgSW4gb3JkZXIgdG8gZ3VhcmFudGVlIHRoYXQgdGhlIHRvdGFsIGlucHV0IHNpemUgaXMgYVxuXHRcdFx0bXVsdGlwbGUgb2YgNTEyIGJpdHMsIHRoZSBpbnB1dCBpcyBwYWRkZWQgaW4gdGhlIHNhbWVcblx0XHRcdHdheSBhcyBmb3IgYWxsIHRoZSBtZW1iZXJzIG9mIHRoZSBNRDQtZmFtaWx5OiBvbmVcblx0XHRcdGFwcGVuZHMgYSBzaW5nbGUgMSBmb2xsb3dlZCBieSBhIHN0cmluZyBvZiAwcyAodGhlXG5cdFx0XHRudW1iZXIgb2YgMHMgbGllcyBiZXR3ZWVuIDAgYW5kIDUxMSk7IHRoZSBsYXN0IDY0IGJpdHNcblx0XHRcdG9mIHRoZSBleHRlbmRlZCBpbnB1dCBjb250YWluIHRoZSBiaW5hcnkgcmVwcmVzZW50YXRpb25cblx0XHRcdG9mIHRoZSBpbnB1dCBzaXplIGluIGJpdHMsIGxlYXN0IHNpZ25pZmljYW50IGJ5dGUgZmlyc3QuXG5cdFx0Ki9cbiAgICAgICAgLypcblx0XHRcdGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvcmZjL3JmYzExODYudHh0XG5cblx0XHRcdFJGQyAxMTg2OiBNRDQgTWVzc2FnZSBEaWdlc3QgQWxnb3JpdGhtLlxuXG5cdFx0XHR3cml0dGVuIGJ5XG5cdFx0XHRcdFJvbmFsZCBMaW5uIFJpdmVzdFxuXHRcdFx0aW5cblx0XHRcdFx0T2N0b2JlciAxOTkwLlxuXG5cdFx0XHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0XHTCpzMgICAgIE1ENCBBbGdvcml0aG0gRGVzY3JpcHRpb25cblxuXHRcdFx0Li4uLi4uXG5cblx0XHRcdFN0ZXAgMS4gQXBwZW5kIHBhZGRpbmcgYml0c1xuXG5cdFx0XHQgVGhlIG1lc3NhZ2UgaXMgXCJwYWRkZWRcIiAoZXh0ZW5kZWQpIHNvIHRoYXQgaXRzIGxlbmd0aFxuXHRcdFx0KGluIGJpdHMpIGlzIGNvbmdydWVudCB0byA0NDgsIG1vZHVsbyA1MTIuIFRoYXQgaXMsIHRoZVxuXHRcdFx0bWVzc2FnZSBpcyBleHRlbmRlZCBzbyB0aGF0IGl0IGlzIGp1c3QgNjQgYml0cyBzaHkgb2Zcblx0XHRcdGJlaW5nIGEgbXVsdGlwbGUgb2YgNTEyIGJpdHMgbG9uZy4gUGFkZGluZyBpcyBhbHdheXNcblx0XHRcdHBlcmZvcm1lZCwgZXZlbiBpZiB0aGUgbGVuZ3RoIG9mIHRoZSBtZXNzYWdlIGlzIGFscmVhZHlcblx0XHRcdGNvbmdydWVudCB0byA0NDgsIG1vZHVsbyA1MTIgKGluIHdoaWNoIGNhc2UgNTEyIGJpdHMgb2Zcblx0XHRcdHBhZGRpbmcgYXJlIGFkZGVkKS5cblxuXHRcdFx0IFBhZGRpbmcgaXMgcGVyZm9ybWVkIGFzIGZvbGxvd3M6IGEgc2luZ2xlIFwiMVwiIGJpdCBpc1xuXHRcdFx0YXBwZW5kZWQgdG8gdGhlIG1lc3NhZ2UsIGFuZCB0aGVuIGVub3VnaCB6ZXJvIGJpdHMgYXJlXG5cdFx0XHRhcHBlbmRlZCBzbyB0aGF0IHRoZSBsZW5ndGggaW4gYml0cyBvZiB0aGUgcGFkZGVkXG5cdFx0XHRtZXNzYWdlIGJlY29tZXMgY29uZ3J1ZW50IHRvIDQ0OCwgbW9kdWxvIDUxMi5cblxuXHRcdFx0U3RlcCAyLiBBcHBlbmQgbGVuZ3RoXG5cblx0XHRcdCBBIDY0LWJpdCByZXByZXNlbnRhdGlvbiBvZiBiICh0aGUgbGVuZ3RoIG9mIHRoZSBtZXNzYWdlXG5cdFx0XHRiZWZvcmUgdGhlIHBhZGRpbmcgYml0cyB3ZXJlIGFkZGVkKSBpcyBhcHBlbmRlZCB0byB0aGVcblx0XHRcdHJlc3VsdCBvZiB0aGUgcHJldmlvdXMgc3RlcC4gSW4gdGhlIHVubGlrZWx5IGV2ZW50IHRoYXRcblx0XHRcdGIgaXMgZ3JlYXRlciB0aGFuIDJeNjQsIHRoZW4gb25seSB0aGUgbG93LW9yZGVyIDY0IGJpdHNcblx0XHRcdG9mIGIgYXJlIHVzZWQuIChUaGVzZSBiaXRzIGFyZSBhcHBlbmRlZCBhcyB0d28gMzItYml0XG5cdFx0XHR3b3JkcyBhbmQgYXBwZW5kZWQgbG93LW9yZGVyIHdvcmQgZmlyc3QgaW4gYWNjb3JkYW5jZVxuXHRcdFx0d2l0aCB0aGUgcHJldmlvdXMgY29udmVudGlvbnMuKVxuXG5cdFx0XHQgQXQgdGhpcyBwb2ludCB0aGUgcmVzdWx0aW5nIG1lc3NhZ2UgKGFmdGVyIHBhZGRpbmcgd2l0aFxuXHRcdFx0Yml0cyBhbmQgd2l0aCBiKSBoYXMgYSBsZW5ndGggdGhhdCBpcyBhbiBleGFjdCBtdWx0aXBsZVxuXHRcdFx0b2YgNTEyIGJpdHMuIEVxdWl2YWxlbnRseSwgdGhpcyBtZXNzYWdlIGhhcyBhIGxlbmd0aFxuXHRcdFx0dGhhdCBpcyBhbiBleGFjdCBtdWx0aXBsZSBvZiAxNiAoMzItYml0KSB3b3Jkcy4gTGV0XG5cdFx0XHRNWzAgLi4uIE4tMV0gZGVub3RlIHRoZSB3b3JkcyBvZiB0aGUgcmVzdWx0aW5nIG1lc3NhZ2UsXG5cdFx0XHR3aGVyZSBOIGlzIGEgbXVsdGlwbGUgb2YgMTYuXG5cdFx0Ki9cbiAgICAgICAgLy8gaHR0cHM6Ly9jcnlwdG8uc3RhY2tleGNoYW5nZS5jb20vYS8zMjQwNy81NDU2OFxuICAgICAgICAvKlxuXHRcdFx0RXhhbXBsZSBjYXNlICAjIDFcblx0XHRcdFx0WzAgYml0OiBtZXNzYWdlLl1cblx0XHRcdFx0WzEgYml0OiAxLl1cblx0XHRcdFx0WzQ0NyBiaXRzOiAwLl1cblx0XHRcdFx0WzY0IGJpdHM6IG1lc3NhZ2Ugc2l6ZSBpbmZvcm1hdGlvbi5dXG5cblx0XHRcdEV4YW1wbGUgY2FzZSAgIyAyXG5cdFx0XHRcdFs1MTItYml0czogbWVzc2FnZV1cblx0XHRcdFx0WzEgYml0OiAxLl1cblx0XHRcdFx0WzQ0NyBiaXRzOiAwLl1cblx0XHRcdFx0WzY0IGJpdHM6IG1lc3NhZ2Ugc2l6ZSBpbmZvcm1hdGlvbi5dXG5cblx0XHRcdEV4YW1wbGUgY2FzZSAgIyAzXG5cdFx0XHRcdFsoNTEyIC0gNjQgPSA0NDgpIGJpdHM6IG1lc3NhZ2UuXVxuXHRcdFx0XHRbMSBiaXQ6IDEuXVxuXHRcdFx0XHRbNTExIGJpdHM6IDAuXVxuXHRcdFx0XHRbNjQgYml0czogbWVzc2FnZSBzaXplIGluZm9ybWF0aW9uLl1cblxuXHRcdFx0RXhhbXBsZSBjYXNlICAjIDRcblx0XHRcdFx0Wyg1MTIgLSA2NSA9IDQ0NykgYml0czogbWVzc2FnZS5dXG5cdFx0XHRcdFsxIGJpdDogMS5dXG5cdFx0XHRcdFswIGJpdDogMC5dXG5cdFx0XHRcdFs2NCBiaXRzOiBtZXNzYWdlIHNpemUgaW5mb3JtYXRpb24uXVxuXHRcdCovXG4gICAgICAgIC8vIFRoZSBudW1iZXIgb2YgcGFkZGluZyB6ZXJvIGJpdHM6XG4gICAgICAgIC8vICAgICAgNTExIC0gW3sobWVzc2FnZSBzaXplIGluIGJpdHMpICsgNjR9IChtb2QgNTEyKV1cbiAgICAgICAgcmV0dXJuIDY0IC0gKChtZXNzYWdlX3NpemUgKyA4KSAmIDBiMDAxMTExMTEgLyogNjMgKi8pO1xuICAgIH1cbiAgICBzdGF0aWMgcGFkKG1lc3NhZ2UgLyogQW4gQXJyYXlCdWZmZXIuICovKVxuICAgIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZV9zaXplID0gbWVzc2FnZS5ieXRlTGVuZ3RoO1xuICAgICAgICBjb25zdCBuX3BhZCA9IFJJUEVNRDE2MC5nZXRfbl9wYWRfYnl0ZXMobWVzc2FnZV9zaXplKTtcblxuICAgICAgICAvLyAgYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYCBpcyAoKDIgKiogNTMpIC0gMSkgYW5kXG4gICAgICAgIC8vIGJpdHdpc2Ugb3BlcmF0aW9uIGluIEphdmFzY3JpcHQgaXMgZG9uZSBvbiAzMi1iaXRzIG9wZXJhbmRzLlxuICAgICAgICBjb25zdCBkaXZtb2QgPSAoZGl2aWRlbmQsIGRpdmlzb3IpID0+IFtcbiAgICAgICAgICAgIE1hdGguZmxvb3IoZGl2aWRlbmQgLyBkaXZpc29yKSxcbiAgICAgICAgICAgIGRpdmlkZW5kICUgZGl2aXNvclxuICAgICAgICBdO1xuICAgICAgICAvKlxuVG8gc2hpZnRcblxuICAgMDAwMDAwMDAgMDAwPz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0IG9cbiAgIDAwMDAwMDAwID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/MDAwXG5cbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbk1ldGhvZCAjMVxuXG4gICAgMDAwMDAwMDAgMDAwPz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/XG4gICBbMDAwMDAwMDAgMDAwQUFBQUEgQUFBQUFBQUEgQUFBQUFBQUFdICg8QT4gY2FwdHVyZWQpXG4gICBbMDAwMDAwMDAgQUFBQUFBQUEgQUFBQUFBQUEgQUFBQUEwMDBdICg8QT4gc2hpZnRlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAoPEI+IGNhcHR1cmVkKSBbQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkJCQkJdXG4gICAgICAgICAgICAgICAgICAgICAoPEI+IHNoaWZ0ZWQpIFtCQkJdW0JCQkJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCIEJCQkJCMDAwXVxuICAgWzAwMDAwMDAwIEFBQUFBQUFBIEFBQUFBQUFBIEFBQUFBQkJCXSAoPEE+ICYgPEJfMj4gbWVyZ2VkKVxuICAgWzAwMDAwMDAwIEFBQUFBQUFBIEFBQUFBQUFBIEFBQUFBQkJCXVtCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQjAwMF1cbiAgICAwMDAwMDAwMCA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyAgPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8wMDBcblxuXHRcdGNvbnN0IHVpbnQzMl9tYXhfcGx1c18xID0gMHgxMDAwMDAwMDA7IC8vICgyICoqIDMyKVxuXHRcdGNvbnN0IFtcblx0XHRcdG1zZ19ieXRlX3NpemVfbW9zdCwgLy8gVmFsdWUgcmFuZ2UgWzAsICgyICoqIDIxKSAtIDFdLlxuXHRcdFx0bXNnX2J5dGVfc2l6ZV9sZWFzdCAvLyBWYWx1ZSByYW5nZSBbMCwgKDIgKiogMzIpIC0gMV0uXG5cdFx0XSA9IGRpdm1vZChtZXNzYWdlX3NpemUsIHVpbnQzMl9tYXhfcGx1c18xKTtcblx0XHRjb25zdCBbXG5cdFx0XHRjYXJyeSwgLy8gVmFsdWUgcmFuZ2UgWzAsIDddLlxuXHRcdFx0bXNnX2JpdF9zaXplX2xlYXN0IC8vIFZhbHVlIHJhbmdlIFswLCAoMiAqKiAzMikgLSA4XS5cblx0XHRdID0gZGl2bW9kKG1lc3NhZ2VfYnl0ZV9zaXplX2xlYXN0ICogOCwgdWludDMyX21heF9wbHVzXzEpO1xuXHRcdGNvbnN0IG1lc3NhZ2VfYml0X3NpemVfbW9zdCA9IG1lc3NhZ2VfYnl0ZV9zaXplX21vc3QgKiA4XG5cdFx0XHQrIGNhcnJ5OyAvLyBWYWx1ZSByYW5nZSBbMCwgKDIgKiogMjQpIC0gMV0uXG5cbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbk1ldGhvZCAjMlxuICAgIDAwMDAwMDAwIDAwMD8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ICA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/P1xuICAgICAgWzAwMDAwIDAwMEFBQUFBIEFBQUFBQUFBIEFBQUFBQUFBICBBQUFdICg8QT4gY2FwdHVyZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgKDxCPiBjYXB0dXJlZCkgWzAwMEJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAoPEI+IHNoaWZ0ZWQpIFtCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQjAwMF1cbiAgIFswMDAwMDAwMCBBQUFBQUFBQSBBQUFBQUFBQSBBQUFBQUFBQV1bQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkIwMDBdXG4gICAgMDAwMDAwMDAgPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/MDAwXG5cblx0XHQqL1xuICAgICAgICBjb25zdCBbXG4gICAgICAgICAgICBtc2dfYml0X3NpemVfbW9zdCxcbiAgICAgICAgICAgIG1zZ19iaXRfc2l6ZV9sZWFzdFxuICAgICAgICBdID0gZGl2bW9kKG1lc3NhZ2Vfc2l6ZSwgNTM2ODcwOTEyIC8qICgyICoqIDI5KSAqLylcbiAgICAgICAgICAgIC5tYXAoKHgsIGluZGV4KSA9PiAoaW5kZXggPyAoeCAqIDgpIDogeCkpO1xuXG4gICAgICAgIC8vIGBBcnJheUJ1ZmZlci50cmFuc2ZlcigpYCBpcyBub3Qgc3VwcG9ydGVkLlxuICAgICAgICBjb25zdCBwYWRkZWQgPSBuZXcgVWludDhBcnJheShtZXNzYWdlX3NpemUgKyBuX3BhZCArIDgpO1xuICAgICAgICBwYWRkZWQuc2V0KG5ldyBVaW50OEFycmF5KG1lc3NhZ2UpLCAwKTtcbiAgICAgICAgY29uc3QgZGF0YV92aWV3ID0gbmV3IERhdGFWaWV3KHBhZGRlZC5idWZmZXIpO1xuICAgICAgICBkYXRhX3ZpZXcuc2V0VWludDgobWVzc2FnZV9zaXplLCAwYjEwMDAwMDAwKTtcbiAgICAgICAgZGF0YV92aWV3LnNldFVpbnQzMihcbiAgICAgICAgICAgIG1lc3NhZ2Vfc2l6ZSArIG5fcGFkLFxuICAgICAgICAgICAgbXNnX2JpdF9zaXplX2xlYXN0LFxuICAgICAgICAgICAgdHJ1ZSAvLyBMaXR0bGUtZW5kaWFuXG4gICAgICAgICk7XG4gICAgICAgIGRhdGFfdmlldy5zZXRVaW50MzIoXG4gICAgICAgICAgICBtZXNzYWdlX3NpemUgKyBuX3BhZCArIDQsXG4gICAgICAgICAgICBtc2dfYml0X3NpemVfbW9zdCxcbiAgICAgICAgICAgIHRydWUgLy8gTGl0dGxlLWVuZGlhblxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBwYWRkZWQuYnVmZmVyO1xuICAgIH1cblxuICAgIHN0YXRpYyBmKGosIHgsIHksIHopXG4gICAge1xuICAgICAgICBpZigwIDw9IGogJiYgaiA8PSAxNSlcbiAgICAgICAgeyAvLyBFeGNsdXNpdmUtT1JcbiAgICAgICAgICAgIHJldHVybiB4IF4geSBeIHo7XG4gICAgICAgIH1cbiAgICAgICAgaWYoMTYgPD0gaiAmJiBqIDw9IDMxKVxuICAgICAgICB7IC8vIE11bHRpcGxleGluZyAobXV4aW5nKVxuICAgICAgICAgICAgcmV0dXJuICh4ICYgeSkgfCAofnggJiB6KTtcbiAgICAgICAgfVxuICAgICAgICBpZigzMiA8PSBqICYmIGogPD0gNDcpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiAoeCB8IH55KSBeIHo7XG4gICAgICAgIH1cbiAgICAgICAgaWYoNDggPD0gaiAmJiBqIDw9IDYzKVxuICAgICAgICB7IC8vIE11bHRpcGxleGluZyAobXV4aW5nKVxuICAgICAgICAgICAgcmV0dXJuICh4ICYgeikgfCAoeSAmIH56KTtcbiAgICAgICAgfVxuICAgICAgICBpZig2NCA8PSBqICYmIGogPD0gNzkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB4IF4gKHkgfCB+eik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIEsoailcbiAgICB7XG4gICAgICAgIGlmKDAgPD0gaiAmJiBqIDw9IDE1KVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gMHgwMDAwMDAwMDtcbiAgICAgICAgfVxuICAgICAgICBpZigxNiA8PSBqICYmIGogPD0gMzEpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIE1hdGguZmxvb3IoKDIgKiogMzApICogTWF0aC5TUVJUMilcbiAgICAgICAgICAgIHJldHVybiAweDVBODI3OTk5O1xuICAgICAgICB9XG4gICAgICAgIGlmKDMyIDw9IGogJiYgaiA8PSA0NylcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gTWF0aC5mbG9vcigoMiAqKiAzMCkgKiBNYXRoLnNxcnQoMykpXG4gICAgICAgICAgICByZXR1cm4gMHg2RUQ5RUJBMTtcbiAgICAgICAgfVxuICAgICAgICBpZig0OCA8PSBqICYmIGogPD0gNjMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIE1hdGguZmxvb3IoKDIgKiogMzApICogTWF0aC5zcXJ0KDUpKVxuICAgICAgICAgICAgcmV0dXJuIDB4OEYxQkJDREM7XG4gICAgICAgIH1cbiAgICAgICAgaWYoNjQgPD0gaiAmJiBqIDw9IDc5KVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBNYXRoLmZsb29yKCgyICoqIDMwKSAqIE1hdGguc3FydCg3KSlcbiAgICAgICAgICAgIHJldHVybiAweEE5NTNGRDRFO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBLUChqKSAvLyBLJ1xuICAgIHtcbiAgICAgICAgaWYoMCA8PSBqICYmIGogPD0gMTUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIE1hdGguZmxvb3IoKDIgKiogMzApICogTWF0aC5jYnJ0KDIpKVxuICAgICAgICAgICAgcmV0dXJuIDB4NTBBMjhCRTY7XG4gICAgICAgIH1cbiAgICAgICAgaWYoMTYgPD0gaiAmJiBqIDw9IDMxKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBNYXRoLmZsb29yKCgyICoqIDMwKSAqIE1hdGguY2JydCgzKSlcbiAgICAgICAgICAgIHJldHVybiAweDVDNEREMTI0O1xuICAgICAgICB9XG4gICAgICAgIGlmKDMyIDw9IGogJiYgaiA8PSA0NylcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gTWF0aC5mbG9vcigoMiAqKiAzMCkgKiBNYXRoLmNicnQoNSkpXG4gICAgICAgICAgICByZXR1cm4gMHg2RDcwM0VGMztcbiAgICAgICAgfVxuICAgICAgICBpZig0OCA8PSBqICYmIGogPD0gNjMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIE1hdGguZmxvb3IoKDIgKiogMzApICogTWF0aC5jYnJ0KDcpKVxuICAgICAgICAgICAgcmV0dXJuIDB4N0E2RDc2RTk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoNjQgPD0gaiAmJiBqIDw9IDc5KVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gMHgwMDAwMDAwMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgYWRkX21vZHVsbzMyKC8qIC4uLi4uLiAqLylcbiAgICB7XG4gICAgICAgIC8vIDEuICBNb2R1bG8gYWRkaXRpb24gKGFkZGl0aW9uIG1vZHVsbykgaXMgYXNzb2NpYXRpdmUuXG4gICAgICAgIC8vICAgIGh0dHBzOi8vcHJvb2Z3aWtpLm9yZy93aWtpL01vZHVsb19BZGRpdGlvbl9pc19Bc3NvY2lhdGl2ZVxuIFx0XHQvLyAyLiAgQml0d2lzZSBvcGVyYXRpb24gaW4gSmF2YXNjcmlwdFxuICAgICAgICAvLyAgICBpcyBkb25lIG9uIDMyLWJpdHMgb3BlcmFuZHNcbiAgICAgICAgLy8gICAgYW5kIHJlc3VsdHMgaW4gYSAzMi1iaXRzIHZhbHVlLlxuICAgICAgICByZXR1cm4gQXJyYXlcbiAgICAgICAgICAgIC5mcm9tKGFyZ3VtZW50cylcbiAgICAgICAgICAgIC5yZWR1Y2UoKGEsIGIpID0+IChhICsgYiksIDApIHwgMDtcbiAgICB9XG4gICAgc3RhdGljIHJvbDMyKHZhbHVlLCBjb3VudClcbiAgICB7IC8vIEN5Y2xpYyBsZWZ0IHNoaWZ0IChyb3RhdGUpIG9uIDMyLWJpdHMgdmFsdWUuXG4gICAgICAgIHJldHVybiAodmFsdWUgPDwgY291bnQpIHwgKHZhbHVlID4+PiAoMzIgLSBjb3VudCkpO1xuICAgIH1cbiAgICBzdGF0aWMgaGFzaChtZXNzYWdlIC8qIEFuIEFycmF5QnVmZmVyLiAqLylcbiAgICB7XG4gICAgICAgIC8vIC8vLy8vLy8vICAgICAgIFBhZGRpbmcgICAgICAgLy8vLy8vLy8vL1xuXG4gICAgICAgIC8vIFRoZSBwYWRkZWQgbWVzc2FnZS5cbiAgICAgICAgY29uc3QgcGFkZGVkID0gUklQRU1EMTYwLnBhZChtZXNzYWdlKTtcblxuICAgICAgICAvLyAvLy8vLy8vLyAgICAgQ29tcHJlc3Npb24gICAgIC8vLy8vLy8vLy9cblxuICAgICAgICAvLyBNZXNzYWdlIHdvcmQgc2VsZWN0b3JzLlxuICAgICAgICBjb25zdCByID0gW1xuICAgICAgICAgICAgMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSxcbiAgICAgICAgICAgIDcsIDQsIDEzLCAxLCAxMCwgNiwgMTUsIDMsIDEyLCAwLCA5LCA1LCAyLCAxNCwgMTEsIDgsXG4gICAgICAgICAgICAzLCAxMCwgMTQsIDQsIDksIDE1LCA4LCAxLCAyLCA3LCAwLCA2LCAxMywgMTEsIDUsIDEyLFxuICAgICAgICAgICAgMSwgOSwgMTEsIDEwLCAwLCA4LCAxMiwgNCwgMTMsIDMsIDcsIDE1LCAxNCwgNSwgNiwgMixcbiAgICAgICAgICAgIDQsIDAsIDUsIDksIDcsIDEyLCAyLCAxMCwgMTQsIDEsIDMsIDgsIDExLCA2LCAxNSwgMTNcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3QgclAgPSBbIC8vIHInXG4gICAgICAgICAgICA1LCAxNCwgNywgMCwgOSwgMiwgMTEsIDQsIDEzLCA2LCAxNSwgOCwgMSwgMTAsIDMsIDEyLFxuICAgICAgICAgICAgNiwgMTEsIDMsIDcsIDAsIDEzLCA1LCAxMCwgMTQsIDE1LCA4LCAxMiwgNCwgOSwgMSwgMixcbiAgICAgICAgICAgIDE1LCA1LCAxLCAzLCA3LCAxNCwgNiwgOSwgMTEsIDgsIDEyLCAyLCAxMCwgMCwgNCwgMTMsXG4gICAgICAgICAgICA4LCA2LCA0LCAxLCAzLCAxMSwgMTUsIDAsIDUsIDEyLCAyLCAxMywgOSwgNywgMTAsIDE0LFxuICAgICAgICAgICAgMTIsIDE1LCAxMCwgNCwgMSwgNSwgOCwgNywgNiwgMiwgMTMsIDE0LCAwLCAzLCA5LCAxMVxuICAgICAgICBdO1xuXG4gICAgICAgIC8vIEFtb3VudHMgZm9yICdyb3RhdGUgbGVmdCcgb3BlcmF0aW9uLlxuICAgICAgICBjb25zdCBzID0gW1xuICAgICAgICAgICAgMTEsIDE0LCAxNSwgMTIsIDUsIDgsIDcsIDksIDExLCAxMywgMTQsIDE1LCA2LCA3LCA5LCA4LFxuICAgICAgICAgICAgNywgNiwgOCwgMTMsIDExLCA5LCA3LCAxNSwgNywgMTIsIDE1LCA5LCAxMSwgNywgMTMsIDEyLFxuICAgICAgICAgICAgMTEsIDEzLCA2LCA3LCAxNCwgOSwgMTMsIDE1LCAxNCwgOCwgMTMsIDYsIDUsIDEyLCA3LCA1LFxuICAgICAgICAgICAgMTEsIDEyLCAxNCwgMTUsIDE0LCAxNSwgOSwgOCwgOSwgMTQsIDUsIDYsIDgsIDYsIDUsIDEyLFxuICAgICAgICAgICAgOSwgMTUsIDUsIDExLCA2LCA4LCAxMywgMTIsIDUsIDEyLCAxMywgMTQsIDExLCA4LCA1LCA2XG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IHNQID0gWyAvLyBzJ1xuICAgICAgICAgICAgOCwgOSwgOSwgMTEsIDEzLCAxNSwgMTUsIDUsIDcsIDcsIDgsIDExLCAxNCwgMTQsIDEyLCA2LFxuICAgICAgICAgICAgOSwgMTMsIDE1LCA3LCAxMiwgOCwgOSwgMTEsIDcsIDcsIDEyLCA3LCA2LCAxNSwgMTMsIDExLFxuICAgICAgICAgICAgOSwgNywgMTUsIDExLCA4LCA2LCA2LCAxNCwgMTIsIDEzLCA1LCAxNCwgMTMsIDEzLCA3LCA1LFxuICAgICAgICAgICAgMTUsIDUsIDgsIDExLCAxNCwgMTQsIDYsIDE0LCA2LCA5LCAxMiwgOSwgMTIsIDUsIDE1LCA4LFxuICAgICAgICAgICAgOCwgNSwgMTIsIDksIDEyLCA1LCAxNCwgNiwgOCwgMTMsIDYsIDUsIDE1LCAxMywgMTEsIDExXG4gICAgICAgIF07XG5cbiAgICAgICAgLy8gVGhlIHNpemUsIGluIGJ5dGVzLCBvZiBhIHdvcmQuXG4gICAgICAgIGNvbnN0IHdvcmRfc2l6ZSA9IDQ7XG5cbiAgICAgICAgLy8gVGhlIHNpemUsIGluIGJ5dGVzLCBvZiBhIDE2LXdvcmRzIGJsb2NrLlxuICAgICAgICBjb25zdCBibG9ja19zaXplID0gNjQ7XG5cbiAgICAgICAgLy8gVGhlIG51bWJlciBvZiB0aGUgMTYtd29yZHMgYmxvY2tzLlxuICAgICAgICBjb25zdCB0ID0gcGFkZGVkLmJ5dGVMZW5ndGggLyBibG9ja19zaXplO1xuXG4gICAgICAgIC8vICBUaGUgbWVzc2FnZSBhZnRlciBwYWRkaW5nIGNvbnNpc3RzIG9mIHQgMTYtd29yZCBibG9ja3MgdGhhdFxuICAgICAgICAvLyBhcmUgZGVub3RlZCB3aXRoIFhfaVtqXSwgd2l0aCAw4omkaeKJpCh0IOKIkiAxKSBhbmQgMOKJpGriiaQxNS5cbiAgICAgICAgY29uc3QgWCA9IChuZXcgQXJyYXkodCkpXG4gICAgICAgICAgICAuZmlsbCh1bmRlZmluZWQpXG4gICAgICAgICAgICAubWFwKChfLCBpKSA9PiBqID0+IChcbiAgICAgICAgICAgICAgICBuZXcgRGF0YVZpZXcoXG4gICAgICAgICAgICAgICAgICAgIHBhZGRlZCwgaSAqIGJsb2NrX3NpemUsIGJsb2NrX3NpemVcbiAgICAgICAgICAgICAgICApLmdldFVpbnQzMihcbiAgICAgICAgICAgICAgICAgICAgaiAqIHdvcmRfc2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgdHJ1ZSAvLyBMaXR0bGUtZW5kaWFuXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSk7XG5cbiAgICAgICAgLy8gIFRoZSByZXN1bHQgb2YgUklQRU1ELTE2MCBpcyBjb250YWluZWQgaW4gZml2ZSAzMi1iaXQgd29yZHMsXG4gICAgICAgIC8vIHdoaWNoIGZvcm0gdGhlIGludGVybmFsIHN0YXRlIG9mIHRoZSBhbGdvcml0aG0uIFRoZSBmaW5hbFxuICAgICAgICAvLyBjb250ZW50IG9mIHRoZXNlIGZpdmUgMzItYml0IHdvcmRzIGlzIGNvbnZlcnRlZCB0byBhIDE2MC1iaXRcbiAgICAgICAgLy8gc3RyaW5nLCBhZ2FpbiB1c2luZyB0aGUgbGl0dGxlLWVuZGlhbiBjb252ZW50aW9uLlxuICAgICAgICBjb25zdCBoID0gW1xuICAgICAgICAgICAgMHg2NzQ1MjMwMSwgLy8gaF8wXG4gICAgICAgICAgICAweEVGQ0RBQjg5LCAvLyBoXzFcbiAgICAgICAgICAgIDB4OThCQURDRkUsIC8vIGhfMlxuICAgICAgICAgICAgMHgxMDMyNTQ3NiwgLy8gaF8zXG4gICAgICAgICAgICAweEMzRDJFMUYwICAvLyBoXzRcbiAgICAgICAgXTtcblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdDsgKytpKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgQSA9IGhbMF07IGxldCBCID0gaFsxXTsgbGV0IEMgPSBoWzJdOyBsZXQgRCA9IGhbM107IGxldCBFID0gaFs0XTtcbiAgICAgICAgICAgIGxldCBBUCA9IEE7IGxldCBCUCA9IEI7IGxldCBDUCA9IEM7IGxldCBEUCA9IEQ7IGxldCBFUCA9IEU7XG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgODA7ICsrailcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBMZWZ0IHJvdW5kc1xuICAgICAgICAgICAgICAgIGxldCBUID0gUklQRU1EMTYwLmFkZF9tb2R1bG8zMiggLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zaGFkb3dcbiAgICAgICAgICAgICAgICAgICAgUklQRU1EMTYwLnJvbDMyKFxuICAgICAgICAgICAgICAgICAgICAgICAgUklQRU1EMTYwLmFkZF9tb2R1bG8zMihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJJUEVNRDE2MC5mKGosIEIsIEMsIEQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFhbaV0ocltqXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUklQRU1EMTYwLksoailcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBzW2pdXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIEVcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIEEgPSBFO1xuICAgICAgICAgICAgICAgIEUgPSBEO1xuICAgICAgICAgICAgICAgIEQgPSBSSVBFTUQxNjAucm9sMzIoQywgMTApO1xuICAgICAgICAgICAgICAgIEMgPSBCO1xuICAgICAgICAgICAgICAgIEIgPSBUO1xuXG4gICAgICAgICAgICAgICAgLy8gUmlnaHQgcm91bmRzXG4gICAgICAgICAgICAgICAgVCA9IFJJUEVNRDE2MC5hZGRfbW9kdWxvMzIoXG4gICAgICAgICAgICAgICAgICAgIFJJUEVNRDE2MC5yb2wzMihcbiAgICAgICAgICAgICAgICAgICAgICAgIFJJUEVNRDE2MC5hZGRfbW9kdWxvMzIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQVAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUklQRU1EMTYwLmYoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDc5IC0gaixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQlAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENQLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEUFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgWFtpXShyUFtqXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUklQRU1EMTYwLktQKGopXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgc1Bbal1cbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgRVBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIEFQID0gRVA7XG4gICAgICAgICAgICAgICAgRVAgPSBEUDtcbiAgICAgICAgICAgICAgICBEUCA9IFJJUEVNRDE2MC5yb2wzMihDUCwgMTApO1xuICAgICAgICAgICAgICAgIENQID0gQlA7XG4gICAgICAgICAgICAgICAgQlAgPSBUO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgVCA9IFJJUEVNRDE2MC5hZGRfbW9kdWxvMzIoaFsxXSwgQywgRFApO1xuICAgICAgICAgICAgaFsxXSA9IFJJUEVNRDE2MC5hZGRfbW9kdWxvMzIoaFsyXSwgRCwgRVApO1xuICAgICAgICAgICAgaFsyXSA9IFJJUEVNRDE2MC5hZGRfbW9kdWxvMzIoaFszXSwgRSwgQVApO1xuICAgICAgICAgICAgaFszXSA9IFJJUEVNRDE2MC5hZGRfbW9kdWxvMzIoaFs0XSwgQSwgQlApO1xuICAgICAgICAgICAgaFs0XSA9IFJJUEVNRDE2MC5hZGRfbW9kdWxvMzIoaFswXSwgQiwgQ1ApO1xuICAgICAgICAgICAgaFswXSA9IFQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAgVGhlIGZpbmFsIG91dHB1dCBzdHJpbmcgdGhlbiBjb25zaXN0cyBvZiB0aGUgY29uY2F0ZW5hdGF0aW9uXG4gICAgICAgIC8vIG9mIGhfMCwgaF8xLCBoXzIsIGhfMywgYW5kIGhfNCBhZnRlciBjb252ZXJ0aW5nIGVhY2ggaF9pIHRvIGFcbiAgICAgICAgLy8gNC1ieXRlIHN0cmluZyB1c2luZyB0aGUgbGl0dGxlLWVuZGlhbiBjb252ZW50aW9uLlxuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgQXJyYXlCdWZmZXIoMjApO1xuICAgICAgICBjb25zdCBkYXRhX3ZpZXcgPSBuZXcgRGF0YVZpZXcocmVzdWx0KTtcbiAgICAgICAgaC5mb3JFYWNoKChoX2ksIGkpID0+IGRhdGFfdmlldy5zZXRVaW50MzIoaSAqIDQsIGhfaSwgdHJ1ZSkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgUklQRU1EMTYwXG59O1xuIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiZW9zanNfanNzaWdcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rX25hbWVfXCJdID0gc2VsZltcIndlYnBhY2tDaHVua19uYW1lX1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiZXh0ZXJuYWxzXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2Vvc2pzLWpzc2lnLnRzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=