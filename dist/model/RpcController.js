"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RpcError_1 = __importDefault(require("./RpcError"));
var RpcUser_1 = __importDefault(require("./RpcUser"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
function uuid() {
    return new Date().getTime() + Math.ceil(Math.random() * 20000) + Math.ceil(Math.random() * 20000);
}
var ActionRuleBase = /** @class */ (function () {
    function ActionRuleBase() {
        this.rules = new Map();
        this.paramSchema = null;
    }
    ActionRuleBase.prototype.setParamSchema = function (schema) {
        paramValidator.validateSchemaRule(schema);
        this.paramSchema = schema;
    };
    ActionRuleBase.prototype.cloneRules = function (keyAlias) {
        var e_1, _a;
        var cloneMap = new Map();
        try {
            for (var _b = __values(this.rules), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], fun = _d[1];
                cloneMap.set(keyAlias + key, fun);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return cloneMap;
    };
    ActionRuleBase.prototype.addRule = function (name, fun) {
        this.rules.set(name, fun);
    };
    ActionRuleBase.prototype.doVerifyRules = function (params, user) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2, _a, _b, _c, fun, e_2_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, 6, 7]);
                        _b = __values(this.rules.values()), _c = _b.next();
                        _d.label = 1;
                    case 1:
                        if (!!_c.done) return [3 /*break*/, 4];
                        fun = _c.value;
                        return [4 /*yield*/, fun(params, user)];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _c = _b.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_2_1 = _d.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return ActionRuleBase;
}());
var RpcController = /** @class */ (function (_super) {
    __extends(RpcController, _super);
    function RpcController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.controllerMap = new Map();
        _this.id = uuid();
        return _this;
    }
    RpcController.prototype.call = function (req, send) {
        return new RpcUser_1.default().call(req, send);
    };
    RpcController.prototype.notify = function (req) {
        return new RpcUser_1.default().notify(req);
    };
    RpcController.prototype.init = function (actionPath, paramSchema) {
        if (paramSchema === void 0) { paramSchema = null; }
        if (actionPath instanceof Array) {
            this.bindPaths(actionPath);
        }
        else {
            this.bindPath(actionPath);
        }
        this.setParamSchema(paramSchema);
    };
    RpcController.prototype.bindPath = function (actionPath) {
        var e_3, _a;
        //放在上面会造成互相引用导致问题
        var fileNames = fs_1.default.readdirSync(actionPath);
        try {
            for (var fileNames_1 = __values(fileNames), fileNames_1_1 = fileNames_1.next(); !fileNames_1_1.done; fileNames_1_1 = fileNames_1.next()) {
                var fileName = fileNames_1_1.value;
                var filePath = path_1.default.join(actionPath, fileName);
                var file = fs_1.default.statSync(filePath);
                if (file.isDirectory()) {
                    this.bindPath(filePath);
                }
                else if (fileName.endsWith(".ts") || fileName.endsWith(".js")) {
                    require(filePath);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (fileNames_1_1 && !fileNames_1_1.done && (_a = fileNames_1.return)) _a.call(fileNames_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    RpcController.prototype.bindPaths = function (actionPaths) {
        var e_4, _a;
        try {
            for (var actionPaths_1 = __values(actionPaths), actionPaths_1_1 = actionPaths_1.next(); !actionPaths_1_1.done; actionPaths_1_1 = actionPaths_1.next()) {
                var actionPath = actionPaths_1_1.value;
                this.bindPath(actionPath);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (actionPaths_1_1 && !actionPaths_1_1.done && (_a = actionPaths_1.return)) _a.call(actionPaths_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
    };
    RpcController.prototype.requestAction = function (method, params, user) {
        if (!method) {
            throw RpcError_1.default.MethodNotFound;
        }
        if (method[0] === "/") {
            method = method.substring(1);
        }
        if (method[method.length - 1] === "/") {
            method = method.substring(0, method.length - 1);
        }
        // user/login  user->module login->method
        // user/auth/login  user/auth->module login->method
        var controllerName = "";
        var methodName = "";
        if (method.indexOf("/") >= 0) {
            controllerName = method.substring(0, method.lastIndexOf("/")).toLowerCase();
            methodName = method.substring(method.lastIndexOf("/") + 1).toLowerCase();
        }
        else {
            controllerName = method;
        }
        var controller = this.controllerMap.get(controllerName);
        if (controller) {
            return controller.executeAction(methodName ? methodName : "/", params, user);
        }
        else {
            throw RpcError_1.default.MethodNotFound;
        }
    };
    RpcController.prototype.controller = function (name, paramType) {
        name = name.toLowerCase();
        var controller = this.controllerMap.get(name);
        if (!controller) {
            controller = new Controller(name, this);
            if (paramType !== undefined) {
                controller.setParamSchema(paramType);
            }
            else {
                controller.paramSchema = this.paramSchema;
            }
            this.controllerMap.set(name, controller);
        }
        return controller;
    };
    return RpcController;
}(ActionRuleBase));
exports.default = new RpcController();
var Controller = /** @class */ (function (_super) {
    __extends(Controller, _super);
    function Controller(name, ac) {
        var _this = _super.call(this) || this;
        _this.actionMap = new Map();
        _this.id = uuid();
        _this.name = name;
        _this.ac = ac;
        _this.rules = ac.cloneRules(_this.ac.id);
        return _this;
    }
    Controller.prototype.onIndexAction = function (actionFun) {
        var factory = new Action(actionFun, this);
        factory.paramSchema = this.paramSchema;
        this.actionMap.set("/", factory);
        return factory;
    };
    Controller.prototype.onAction = function (actionName, actionFun) {
        var factory = new Action(actionFun, this);
        factory.paramSchema = this.paramSchema;
        this.actionMap.set(actionName.toLowerCase(), factory);
        return factory;
    };
    Controller.prototype.addAcRule = function (name) {
        var rule = this.ac.rules.get(name);
        if (rule) {
            this.rules.set(this.ac.id + name, rule);
        }
        else {
            throw new RpcError_1.default({ message: "ActionController中没有该rule" });
        }
        return this;
    };
    Controller.prototype.offAcRule = function (name) {
        this.rules.delete(this.ac.id + name);
        return this;
    };
    Controller.prototype.executeAction = function (method, params, user) {
        return __awaiter(this, void 0, void 0, function () {
            var action;
            return __generator(this, function (_a) {
                action = this.actionMap.get(method);
                if (action) {
                    return [2 /*return*/, action.execute(params, user)];
                }
                else {
                    throw RpcError_1.default.MethodNotFound;
                }
                return [2 /*return*/];
            });
        });
    };
    return Controller;
}(ActionRuleBase));
var Action = /** @class */ (function (_super) {
    __extends(Action, _super);
    function Action(actionFun, controller) {
        var _this = _super.call(this) || this;
        _this.actionFun = actionFun;
        _this.controller = controller;
        _this.rules = controller.cloneRules(_this.controller.id);
        return _this;
    }
    Action.prototype.addAcRule = function (name) {
        var rule = this.controller.ac.rules.get(name);
        if (rule) {
            this.rules.set(this.controller.ac.id + name, rule);
        }
        else {
            throw new RpcError_1.default({ message: "ActionController中没有该rule" });
        }
        return this;
    };
    Action.prototype.offAcRule = function (name) {
        this.rules.delete(this.controller.ac.id + name);
        return this;
    };
    Action.prototype.addCRule = function (name) {
        var rule = this.controller.rules.get(name);
        if (rule) {
            this.rules.set(this.controller.id + name, rule);
        }
        else {
            throw new RpcError_1.default({ message: "Controller中没有该rule" });
        }
        return this;
    };
    Action.prototype.offCRule = function (name) {
        this.rules.delete(this.controller.id + name);
        return this;
    };
    Action.prototype.execute = function (params, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.doVerifyRules(params, user)];
                    case 1:
                        _a.sent();
                        paramValidator.validate(this.paramSchema, params);
                        return [4 /*yield*/, this.actionFun(params, user)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Action;
}(ActionRuleBase));
var ParamValidator = /** @class */ (function () {
    function ParamValidator() {
        this.cutors = ["delete", "string", "boolean", "number"];
    }
    ParamValidator.prototype.validateSchemaRule = function (schemaJson) {
        var e_5, _a;
        if (schemaJson instanceof Array) {
            try {
                for (var schemaJson_1 = __values(schemaJson), schemaJson_1_1 = schemaJson_1.next(); !schemaJson_1_1.done; schemaJson_1_1 = schemaJson_1.next()) {
                    var schema = schemaJson_1_1.value;
                    this.validateSchemaRule(schema);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (schemaJson_1_1 && !schemaJson_1_1.done && (_a = schemaJson_1.return)) _a.call(schemaJson_1);
                }
                finally { if (e_5) throw e_5.error; }
            }
        }
        else if (typeof schemaJson === "object") {
            for (var key in schemaJson) {
                var value = schemaJson[key];
                this.validateSchemaRule(value);
            }
        }
        else if (typeof schemaJson === "string") {
            if (this.cutors.indexOf(schemaJson) >= 0) {
                return true;
            }
            else {
                throw new RpcError_1.default({ message: "schema parse error " + schemaJson });
            }
        }
    };
    ParamValidator.prototype.validate = function (schema, value, valueKey, valueParent) {
        var e_6, _a;
        if (!schema) {
            return;
        }
        if (typeof schema === "string") {
            if (schema === "delete") {
                if (valueKey && valueParent) {
                    delete valueParent[valueKey];
                }
                else {
                    throw RpcError_1.default.InternalError;
                }
            }
            else if (typeof value !== schema) {
                throw RpcError_1.default.InvalidParams;
            }
        }
        else if (schema instanceof Array) {
            if (value instanceof Array) {
                if (schema.length > 0) {
                    try {
                        for (var value_1 = __values(value), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
                            var valueItem = value_1_1.value;
                            this.validate(schema[0], valueItem);
                        }
                    }
                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                    finally {
                        try {
                            if (value_1_1 && !value_1_1.done && (_a = value_1.return)) _a.call(value_1);
                        }
                        finally { if (e_6) throw e_6.error; }
                    }
                }
            }
            else {
                throw RpcError_1.default.InvalidParams;
            }
        }
        else if (typeof schema === "object") {
            if (typeof value === "object" && !(value instanceof Array)) {
                for (var prop in schema) {
                    this.validate(schema[prop], value[prop], prop, value);
                }
            }
            else {
                throw RpcError_1.default.InvalidParams;
            }
        }
    };
    return ParamValidator;
}());
var paramValidator = new ParamValidator();
