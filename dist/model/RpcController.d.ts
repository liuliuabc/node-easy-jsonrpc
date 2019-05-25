import RpcUser from "./RpcUser";
import RpcNotice from "./RpcNotice";
import RpcRequest from "./RpcRequest";
import RpcResponse from "./RpcResponse";
export declare type ActionFunStruct = (params: any, rpcUser: RpcUser) => any;
declare class ActionRuleBase {
    rules: Map<string, ActionFunStruct>;
    paramSchema: object | null | "number" | "boolean" | "string";
    setParamSchema(schema: object | null | "number" | "boolean" | "string"): void;
    cloneRules(keyAlias: string): Map<any, any>;
    addRule(name: string, fun: ActionFunStruct): void;
    doVerifyRules(params: any, user: RpcUser): Promise<void>;
}
declare class RpcController extends ActionRuleBase {
    controllerMap: Map<string, Controller>;
    id: any;
    call(req: RpcRequest, send: (data: RpcResponse) => any): Promise<void>;
    notify(req: RpcNotice): Promise<void>;
    init(actionPath: any, paramSchema?: object | null | "number" | "boolean" | "string"): void;
    private bindPath;
    private bindPaths;
    requestAction(method: string, params: any, user: RpcUser): Promise<any>;
    controller(name: string, paramType?: object | null | "number" | "boolean" | "string"): Controller;
}
declare const _default: RpcController;
export default _default;
declare class Controller extends ActionRuleBase {
    actionMap: Map<any, any>;
    name: string;
    id: any;
    ac: RpcController;
    constructor(name: string, ac: RpcController);
    onIndexAction(actionFun: ActionFunStruct): Action;
    onAction(actionName: string, actionFun: ActionFunStruct): Action;
    addAcRule(name: string): this;
    offAcRule(name: string): this;
    executeAction(method: string, params: any, user: RpcUser): Promise<any>;
}
declare class Action extends ActionRuleBase {
    actionFun: ActionFunStruct;
    controller: Controller;
    constructor(actionFun: ActionFunStruct, controller: Controller);
    addAcRule(name: string): this;
    offAcRule(name: string): this;
    addCRule(name: string): this;
    offCRule(name: string): this;
    execute(params: any, user: RpcUser): Promise<any>;
}
