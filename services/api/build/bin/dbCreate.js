"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var _this = this;
var faker = require("faker");
var _a = require("../lib/crypto"), genRandomString = _a.genRandomString, sha512 = _a.sha512;
var store = require("../lib/database/store");
var start = function () { return __awaiter(_this, void 0, void 0, function () {
    var email, username, passwordSeed, passwordHash, documents, i, l, email_1, username_1, passwordSeed_1, passwordHash_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = "admin@test.com";
                username = "admin";
                passwordSeed = genRandomString(64);
                passwordHash = sha512("test", passwordSeed).passwordHash;
                documents = [
                    {
                        email: email,
                        username: username,
                        password_seed: passwordSeed,
                        password_hash: passwordHash,
                        disabled: false,
                        frozen: false,
                        delisted: false
                    }
                ];
                for (i = 2, l = 20; i < l; i++) {
                    email_1 = faker.internet.email();
                    username_1 = faker.internet.userName();
                    passwordSeed_1 = genRandomString(64);
                    passwordHash_1 = sha512("test", passwordSeed_1).passwordHash;
                    documents.push({
                        email: email_1,
                        username: username_1,
                        password_seed: passwordSeed_1,
                        password_hash: passwordHash_1,
                        disabled: false,
                        frozen: false,
                        delisted: false
                    });
                }
                return [4 /*yield*/, store.createMany("user", documents)];
            case 1:
                _a.sent();
                process.exit();
                return [2 /*return*/];
        }
    });
}); };
start();
//# sourceMappingURL=dbCreate.js.map