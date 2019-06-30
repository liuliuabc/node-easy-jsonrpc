import RpcUser from "../bean/RpcUser";
import fs from "fs";
import path from "path";
import MethodType from "../bean/MethodType";
import RpcError from "../bean/RpcError";

export default class RpcController {
  public static controllers = new Map();
  public static publicRules = new Map();

  public static init(paths: any) {
    //放在上面会造成互相引用导致问题
    if (!(paths instanceof Array)) {
      paths = [paths];
    }
    for (const controllerPath of paths) {
      const fileNames = fs.readdirSync(controllerPath);
      for (const fileName of fileNames) {
        const filePath = path.join(controllerPath, fileName);
        const file = fs.statSync(filePath);
        if (file.isDirectory()) {
          this.init(filePath);
        } else if (fileName.endsWith(".ts") || fileName.endsWith(".js")) {
          const clazz = require(filePath).default;
          if (clazz.contollerName) {
            this.controllers.set(clazz.contollerName, new clazz());
          }
        }
      }
    }
  }

  public static requestAction(method: string, params: any,
                              methodType: string = MethodType.All, user: RpcUser) {
    if (!method) {
      throw RpcError.MethodNotFound;
    }
    method = method.toLowerCase();
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
      controllerName = method.substring(0, method.lastIndexOf("/"));
      methodName = method.substring(method.lastIndexOf("/") + 1);
    } else {
      controllerName = method;
    }
    const controller = this.controllers.get(controllerName);
    if (controller) {
      return this.executeAction(controller, methodName ? methodName : "/", params, methodType, user);
    } else {
      throw RpcError.MethodNotFound;
    }

  }

  public static executeAction(controller: any,
                              methodName: string, params: any,
                              methodType: string = MethodType.All, user: RpcUser) {
    if (!methodName || methodName === "/") {
      methodName = "index";
    }
    if (!controller.actions) {
      throw RpcError.MethodNotFound;
    }
    let method = controller.actions.get(methodName);
    if (!method) {
      method = controller.actions.get("default");
    }
    if (!method) {
      throw RpcError.MethodNotFound;
    } else {
      const methodTypes = method.methodTypes ? method.methodTypes : controller.methodTypes;
      if (!methodTypes||methodTypes.indexOf(MethodType.All) >= 0
        || methodTypes.indexOf(methodType) >= 0) {
        return this.invokeMethod(controller, method, params, user);
      } else {
        throw RpcError.MethodNotFound;
      }
    }
  }

  private static bindArr(arr1: any[] = [], arr2: any[] = []) {
    const result = [];
    for (const item of arr1) {
      if (result.indexOf(item) < 0) {
        result.push(item);
      }
    }
    for (const item of arr2) {
      if (result.indexOf(item) < 0) {
        result.push(item);
      }
    }
    return result;
  }

  private static delArr(arrOrigin: any[] = [], arrDel: any[] = []) {
    const result = [];
    for (const item of arrOrigin) {
      if (arrDel.indexOf(item) < 0) {
        result.push(item);
      }
    }
    return result;
  }

  public static async invokeMethod(thiz: any, method: any, params: any, user: RpcUser, isRule: boolean = false){
    if (!isRule) {
      if (!method.allRules) {
        const addRules = this.bindArr(method.addRules, thiz.addRules);
        const offRules = method.offRules;
        const addPublicRules = this.bindArr(method.addPublicRules, thiz.addPublicRules);
        const offPublicRules = method.offPublicRules;
        method.allRules = this.bindArr(this.delArr(addRules, offRules), this.delArr(addPublicRules, offPublicRules));
      }
      for (const ruleName of method.allRules) {
        let ruleMethod: any;
        if (ruleName.startsWith("public-")) {
          ruleMethod = RpcController.publicRules.get(ruleName);
        } else if (thiz.rules) {
          ruleMethod = thiz.rules.get(ruleName);
        }
        if (ruleMethod) {
           await this.invokeMethod(thiz, ruleMethod, params, user, true);
        } else {
          throw RpcError.InternalError;
        }
      }
    }
    if (!method.paramNames) {
      const mstr = method.toString();
      method.paramNames = mstr.substring(mstr.indexOf("(") + 1,
        mstr.indexOf(")")).replace(/ /g, "").split(",");
    }
    const paramValues: any[] = [];
    for (let i = 0; i < method.paramNames.length; i++) {
      const paramName = method.paramNames[i];
      let value: any = null;
      if (paramName === "params") {
        value = params;
      } else if (paramName === "user") {
        value = user;
      } else {
        value = params ? (params[paramName] ? params[paramName] : null) : null;
      }
      const canNull = method["canNull-" + i] === undefined ?
        (method.canNull === undefined ? thiz.canNull : method.canNull) : method["canNull-" + i];
      if (!canNull && !value) {
        throw RpcError.InvalidParams;
      }
      const type = method["type-" + i];
      if (value && type && type !== "any" && paramName !== "user") {
        if (type === "array") {
          if (!(value instanceof Array)) {
            throw RpcError.InvalidParams;
          }
        } else if (typeof value !== type) {
          throw RpcError.InvalidParams;
        }
      }
      paramValues.push(value);

    }
    return method.apply(thiz, paramValues);
  }
}
