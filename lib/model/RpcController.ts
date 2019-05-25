import RpcError from "./RpcError";
import RpcUser from "./RpcUser";
import fs from "fs";
import path from "path";
import RpcNotice from "./RpcNotice";
import RpcRequest from "./RpcRequest";
import RpcResponse from "./RpcResponse";

export type ActionFunStruct = (params: any, rpcUser: RpcUser) => any;

function uuid() {
  return new Date().getTime() + Math.ceil(Math.random() * 20000) + Math.ceil(Math.random() * 20000);
}

class ActionRuleBase {
  public rules = new Map<string, ActionFunStruct>();
  public paramSchema: object | null | "number" | "boolean" | "string" = null;

  public setParamSchema(schema: object | null | "number" | "boolean" | "string") {
    paramValidator.validateSchemaRule(schema);
    this.paramSchema = schema;
  }

  public cloneRules(keyAlias: string) {
    const cloneMap = new Map();
    for (const [key, fun] of this.rules) {
      cloneMap.set(keyAlias + key, fun);
    }
    return cloneMap;
  }

  public addRule(name: string, fun: ActionFunStruct) {
    this.rules.set(name, fun);
  }

  public async doVerifyRules(params: any, user: RpcUser) {
    for (const fun of this.rules.values()) {
      await fun(params, user);
    }
  }
}

class RpcController extends ActionRuleBase {
  public controllerMap = new Map<string, Controller>();
  public id: any = uuid();
  public call(req: RpcRequest, send: (data: RpcResponse) => any){
    return new RpcUser().call(req,send);
  }
  public notify(req: RpcNotice){
    return new RpcUser().notify(req);
  }
  public init(actionPath: any, paramSchema: object | null | "number" |
    "boolean" | "string" = null) {
    if (actionPath instanceof Array) {
      this.bindPaths(actionPath);
    } else {
      this.bindPath(actionPath);
    }
    this.setParamSchema(paramSchema);
  }

  private bindPath(actionPath: any) {
    //放在上面会造成互相引用导致问题
    const fileNames = fs.readdirSync(actionPath);
    for (const fileName of fileNames) {
      const filePath = path.join(actionPath, fileName);
      const file = fs.statSync(filePath);
      if (file.isDirectory()) {
        this.bindPath(filePath);
      } else if (fileName.endsWith(".ts") || fileName.endsWith(".js")) {
        require(filePath);
      }
    }
  }

  private bindPaths(actionPaths: any[]) {
    for (const actionPath of actionPaths) {
      this.bindPath(actionPath);
    }
  }

  public requestAction(method: string, params: any, user: RpcUser) {
    if (!method) {
      throw RpcError.MethodNotFound;
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
    } else {
      controllerName = method;
    }
    const controller = this.controllerMap.get(controllerName);
    if (controller) {
      return controller.executeAction(methodName ? methodName : "/", params, user);
    } else {
      throw RpcError.MethodNotFound;
    }
  }

  public controller(name: string, paramType?: object | null | "number" | "boolean" |
    "string") {
    name = name.toLowerCase();
    let controller = this.controllerMap.get(name);
    if (!controller) {
      controller = new Controller(name, this);
      if (paramType !== undefined) {
        controller.setParamSchema(paramType);
      } else {
        controller.paramSchema = this.paramSchema;
      }
      this.controllerMap.set(name, controller);
    }
    return controller;
  }
}

export default new RpcController();

class Controller extends ActionRuleBase {
  public actionMap = new Map();
  public name: string;
  public id: any = uuid();
  public ac: RpcController;

  constructor(name: string, ac: RpcController) {
    super();
    this.name = name;
    this.ac = ac;
    this.rules = ac.cloneRules(this.ac.id);
  }

  public onIndexAction(actionFun: ActionFunStruct) {
    const factory = new Action(actionFun, this);
    factory.paramSchema = this.paramSchema;
    this.actionMap.set("/", factory);
    return factory;
  }

  public onAction(actionName: string, actionFun: ActionFunStruct) {
    const factory = new Action(actionFun, this);
    factory.paramSchema = this.paramSchema;
    this.actionMap.set(actionName.toLowerCase(), factory);
    return factory;
  }

  public addAcRule(name: string) {
    const rule = this.ac.rules.get(name);
    if (rule) {
      this.rules.set(this.ac.id + name, rule);
    } else {
      throw new RpcError({message: "ActionController中没有该rule"});
    }
    return this;
  }

  public offAcRule(name: string) {
    this.rules.delete(this.ac.id + name);
    return this;
  }

  public async executeAction(method: string, params: any, user: RpcUser) {
    const action = this.actionMap.get(method);
    if (action) {
      return action.execute(params, user);
    } else {
      throw RpcError.MethodNotFound;
    }
  }
}

class Action extends ActionRuleBase {
  public actionFun: ActionFunStruct;
  public controller: Controller;

  constructor(actionFun: ActionFunStruct, controller: Controller) {
    super();
    this.actionFun = actionFun;
    this.controller = controller;
    this.rules = controller.cloneRules(this.controller.id);
  }

  public addAcRule(name: string) {
    const rule = this.controller.ac.rules.get(name);
    if (rule) {
      this.rules.set(this.controller.ac.id + name, rule);
    } else {
      throw new RpcError({message: "ActionController中没有该rule"});
    }
    return this;
  }

  public offAcRule(name: string) {
    this.rules.delete(this.controller.ac.id + name);
    return this;
  }

  public addCRule(name: string) {
    const rule = this.controller.rules.get(name);
    if (rule) {
      this.rules.set(this.controller.id + name, rule);
    } else {
      throw new RpcError({message: "Controller中没有该rule"});
    }
    return this;
  }

  public offCRule(name: string) {
    this.rules.delete(this.controller.id + name);
    return this;
  }

  public async execute(params: any, user: RpcUser) {
    await this.doVerifyRules(params, user);
    paramValidator.validate(this.paramSchema, params);
    return await this.actionFun(params, user);
  }
}

class ParamValidator {
  public cutors = ["delete", "string", "boolean", "number"];

  public validateSchemaRule(schemaJson: any) {
    if (schemaJson instanceof Array) {
      for (const schema of schemaJson) {
        this.validateSchemaRule(schema);
      }
    } else if (typeof schemaJson === "object") {
      for (const key in schemaJson) {
        const value = schemaJson[key];
        this.validateSchemaRule(value);
      }
    } else if (typeof schemaJson === "string") {
      if (this.cutors.indexOf(schemaJson) >= 0) {
        return true;
      } else {
        throw new RpcError({message: `schema parse error ${schemaJson}`});
      }
    }
  }

  public validate(schema: any, value: any, valueKey?: string, valueParent?: any) {
    if (!schema) {
      return;
    }
    if (typeof schema === "string") {
      if (schema === "delete") {
        if (valueKey && valueParent) {
          delete valueParent[valueKey];
        } else {
          throw RpcError.InternalError;
        }
      } else if (typeof value !== schema) {
        throw RpcError.InvalidParams;
      }
    } else if (schema instanceof Array) {
      if (value instanceof Array) {
        if (schema.length > 0) {
          for (const valueItem of value) {
            this.validate(schema[0], valueItem);
          }
        }
      } else {
        throw RpcError.InvalidParams;
      }
    } else if (typeof schema === "object") {
      if (typeof value === "object" && !(value instanceof Array)) {
        for (const prop in schema) {
          this.validate(schema[prop], value[prop], prop, value);
        }
      } else {
        throw RpcError.InvalidParams;
      }
    }
  }
}

const paramValidator = new ParamValidator();
