import RpcUser from "../bean/RpcUser";
export default class RpcController {
    static controllers: Map<any, any>;
    static publicRules: Map<any, any>;
    static init(paths: any): void;
    static requestAction(method: string, params: any, methodType: string | undefined, user: RpcUser): Promise<any>;
    static executeAction(controller: any, methodName: string, params: any, methodType: string | undefined, user: RpcUser): Promise<any>;
    private static bindArr;
    private static delArr;
    static invokeMethod(thiz: any, method: any, params: any, user: RpcUser, isRule?: boolean): Promise<any>;
}
