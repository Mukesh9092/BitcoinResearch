"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var prop_types_1 = require("prop-types");
var react_1 = require("react");
var lodash_1 = require("lodash");
var environment_1 = require("../environment");
exports.default = function (Application) { return function (ComposedComponent) {
    return _a = /** @class */ (function (_super) {
            __extends(WithMobXProvider, _super);
            function WithMobXProvider(props) {
                var _this = _super.call(this, props) || this;
                // console.log("WithMobXProvider#constructor");
                // Se the application for the first browser render.
                if (environment_1.isBrowser() && !_this.application) {
                    var application = lodash_1.get(props, "serverState.application");
                    // Set the application instance for the browser side from here.
                    _this.application = Application.getBrowserInstance(application);
                }
                return _this;
            }
            WithMobXProvider.getInitialProps = function (ctx) {
                return __awaiter(this, void 0, void 0, function () {
                    var composedInitialProps, application, serverState;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                composedInitialProps = {};
                                if (!ComposedComponent.getInitialProps) return [3 /*break*/, 2];
                                return [4 /*yield*/, ComposedComponent.getInitialProps(ctx)];
                            case 1:
                                composedInitialProps = _a.sent();
                                _a.label = 2;
                            case 2:
                                serverState = {};
                                if (!environment_1.isBrowser()) return [3 /*break*/, 3];
                                // Set the application for route changes.
                                application = Application.getBrowserInstance(ctx);
                                // Set the application instance for the browser side from here.
                                this.application = application;
                                return [3 /*break*/, 5];
                            case 3: return [4 /*yield*/, Application.getServerInstance(ctx)];
                            case 4:
                                application = _a.sent();
                                // Set the application instance for the server side from here.
                                this.application = application;
                                // Also return it so it gets transformed into JSON for the initial data
                                // on the browser side.
                                serverState.application = application;
                                _a.label = 5;
                            case 5: return [2 /*return*/, __assign({ application: application,
                                    serverState: serverState }, composedInitialProps)];
                        }
                    });
                });
            };
            WithMobXProvider.prototype.render = function () {
                // console.log("WithMobXProvider#render", this.props, this.application);
                return application = { this: .application } >
                    __assign({}, this.props) /  >
                    /Provider>;
                ;
            };
            return WithMobXProvider;
        }(react_1.default.Component)),
        _a.displayName = "WithMobXProvider(" + ComposedComponent.displayName + ")",
        _a.propTypes = {
            serverState: prop_types_1.default.object.isRequired
        },
        _a;
    var _a;
}; };
