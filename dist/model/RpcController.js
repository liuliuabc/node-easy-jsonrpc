"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RpcError_1 = __importDefault(require("./RpcError"));
const RpcUser_1 = __importDefault(require("./RpcUser"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function uuid() {
    return new Date().getTime() + Math.ceil(Math.random() * 20000) + Math.ceil(Math.random() * 20000);
}
class ActionRuleBase {
    constructor() {
        this.rules = new Map();
        this.paramSchema = null;
    }
    setParamSchema(schema) {
        paramValidator.validateSchemaRule(schema);
        this.paramSchema = schema;
    }
    cloneRules(keyAlias) {
        const cloneMap = new Map();
        for (const [key, fun] of this.rules) {
            cloneMap.set(keyAlias + key, fun);
        }
        return cloneMap;
    }
    addRule(name, fun) {
        this.rules.set(name, fun);
    }
    doVerifyRules(params, user) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const fun of this.rules.values()) {
                yield fun(params, user);
            }
        });
    }
}
class RpcController extends ActionRuleBase {
    constructor() {
        super(...arguments);
        this.controllerMap = new Map();
        this.id = uuid();
    }
    call(req, send) {
        return new RpcUser_1.default().call(req, send);
    }
    notify(req) {
        return new RpcUser_1.default().notify(req);
    }
    init(actionPath, paramSchema = null) {
        if (actionPath instanceof Array) {
            this.bindPaths(actionPath);
        }
        else {
            this.bindPath(actionPath);
        }
        this.setParamSchema(paramSchema);
    }
    bindPath(actionPath) {
        //放在上面会造成互相引用导致问题
        const fileNames = fs_1.default.readdirSync(actionPath);
        for (const fileName of fileNames) {
            const filePath = path_1.default.join(actionPath, fileName);
            const file = fs_1.default.statSync(filePath);
            if (file.isDirectory()) {
                this.bindPath(filePath);
            }
            else if (fileName.endsWith(".ts") || fileName.endsWith(".js")) {
                require(filePath);
            }
        }
    }
    bindPaths(actionPaths) {
        for (const actionPath of actionPaths) {
            this.bindPath(actionPath);
        }
    }
    requestAction(method, params, user) {
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
        let controllerName = "";
        let methodName = "";
        if (method.indexOf("/") >= 0) {
            controllerName = method.substring(0, method.lastIndexOf("/")).toLowerCase();
            methodName = method.substring(method.lastIndexOf("/") + 1).toLowerCase();
        }
        else {
            controllerName = method;
        }
        const controller = this.controllerMap.get(controllerName);
        if (controller) {
            return controller.executeAction(methodName ? methodName : "/", params, user);
        }
        else {
            throw RpcError_1.default.MethodNotFound;
        }
    }
    controller(name, paramType) {
        name = name.toLowerCase();
        let controller = this.controllerMap.get(name);
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
    }
}
exports.default = new RpcController();
class Controller extends ActionRuleBase {
    constructor(name, ac) {
        super();
        this.actionMap = new Map();
        this.id = uuid();
        this.name = name;
        this.ac = ac;
        this.rules = ac.cloneRules(this.ac.id);
    }
    onIndexAction(actionFun) {
        const factory = new Action(actionFun, this);
        factory.paramSchema = this.paramSchema;
        this.actionMap.set("/", factory);
        return factory;
    }
    onAction(actionName, actionFun) {
        const factory = new Action(actionFun, this);
        factory.paramSchema = this.paramSchema;
        this.actionMap.set(actionName.toLowerCase(), factory);
        return factory;
    }
    addAcRule(name) {
        const rule = this.ac.rules.get(name);
        if (rule) {
            this.rules.set(this.ac.id + name, rule);
        }
        else {
            throw new RpcError_1.default({ message: "ActionController中没有该rule" });
        }
        return this;
    }
    offAcRule(name) {
        this.rules.delete(this.ac.id + name);
        return this;
    }
    executeAction(method, params, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const action = this.actionMap.get(method);
            if (action) {
                return action.execute(params, user);
            }
            else {
                throw RpcError_1.default.MethodNotFound;
            }
        });
    }
}
class Action extends ActionRuleBase {
    constructor(actionFun, controller) {
        super();
        this.actionFun = actionFun;
        this.controller = controller;
        this.rules = controller.cloneRules(this.controller.id);
    }
    addAcRule(name) {
        const rule = this.controller.ac.rules.get(name);
        if (rule) {
            this.rules.set(this.controller.ac.id + name, rule);
        }
        else {
            throw new RpcError_1.default({ message: "ActionController中没有该rule" });
        }
        return this;
    }
    offAcRule(name) {
        this.rules.delete(this.controller.ac.id + name);
        return this;
    }
    addCRule(name) {
        const rule = this.controller.rules.get(name);
        if (rule) {
            this.rules.set(this.controller.id + name, rule);
        }
        else {
            throw new RpcError_1.default({ message: "Controller中没有该rule" });
        }
        return this;
    }
    offCRule(name) {
        this.rules.delete(this.controller.id + name);
        return this;
    }
    execute(params, user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.doVerifyRules(params, user);
            paramValidator.validate(this.paramSchema, params);
            return yield this.actionFun(params, user);
        });
    }
}
class ParamValidator {
    constructor() {
        this.cutors = ["delete", "string", "boolean", "number"];
    }
    validateSchemaRule(schemaJson) {
        if (schemaJson instanceof Array) {
            for (const schema of schemaJson) {
                this.validateSchemaRule(schema);
            }
        }
        else if (typeof schemaJson === "object") {
            for (const key in schemaJson) {
                const value = schemaJson[key];
                this.validateSchemaRule(value);
            }
        }
        else if (typeof schemaJson === "string") {
            if (this.cutors.indexOf(schemaJson) >= 0) {
                return true;
            }
            else {
                throw new RpcError_1.default({ message: `schema parse error ${schemaJson}` });
            }
        }
    }
    validate(schema, value, valueKey, valueParent) {
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
                    for (const valueItem of value) {
                        this.validate(schema[0], valueItem);
                    }
                }
            }
            else {
                throw RpcError_1.default.InvalidParams;
            }
        }
        else if (typeof schema === "object") {
            if (typeof value === "object" && !(value instanceof Array)) {
                for (const prop in schema) {
                    this.validate(schema[prop], value[prop], prop, value);
                }
            }
            else {
                throw RpcError_1.default.InvalidParams;
            }
        }
    }
}
const paramValidator = new ParamValidator();
