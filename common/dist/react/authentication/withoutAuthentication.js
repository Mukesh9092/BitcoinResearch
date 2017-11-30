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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var router_1 = require("next/router");
var react_1 = require("react");
var mobx_react_1 = require("mobx-react");
var environment_1 = require("../../environment");
exports.default = function (_a) {
    var redirectPath = _a.redirectPath;
    return function (ComposedComponent) {
        var WithoutAuthentication = /** @class */ (function (_super) {
            __extends(WithoutAuthentication, _super);
            function WithoutAuthentication() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            WithoutAuthentication.getInitialProps = function (ctx) {
                return __awaiter(this, void 0, void 0, function () {
                    var composedInitialProps, application;
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
                                application = composedInitialProps.application;
                                if (environment_1.isBrowser()) {
                                    // console.log("WithoutAuthentication#getInitialProps browser", this.props);
                                    if (application.session.isAuthenticated(ctx)) {
                                        // console.log("WithoutAuthentication#getInitialProps user is authenticated, redirecting");
                                        router_1.default.push(redirectPath);
                                    }
                                }
                                else {
                                    // console.log("WithoutAuthentication#getInitialProps server");
                                    if (ctx.req.isAuthenticated()) {
                                        // console.log("WithoutAuthentication#getInitialProps user is authenticated, redirecting");
                                        ctx.res.writeHead(302, {
                                            Location: redirectPath
                                        });
                                        ctx.res.end();
                                    }
                                }
                                return [2 /*return*/, __assign({}, composedInitialProps)];
                        }
                    });
                });
            };
            WithoutAuthentication.prototype.render = function () {
                // console.log("WithoutAuthentication#render", this.props);
                return __assign({}, this.props) /  > ;
            };
            WithoutAuthentication.displayName = "WithoutAuthentication(" + ComposedComponent.displayName + ")";
            WithoutAuthentication.propTypes = {};
            WithoutAuthentication = __decorate([
                mobx_react_1.inject("application"),
                mobx_react_1.observer
            ], WithoutAuthentication);
            return WithoutAuthentication;
        }(react_1.default.Component));
        return WithoutAuthentication;
    };
};
