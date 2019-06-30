export default class RpcError extends Error {
    static InternalError: RpcError;
    static InvalidParams: RpcError;
    static InvalidRequest: RpcError;
    static MethodNotFound: RpcError;
    static ParseError: RpcError;
    static RequestTimeout: RpcError;
    message: string;
    code?: number;
    constructor(messageOrObj: string | {
        message: string;
        code?: number;
    }, code?: number);
    toJSON(): {
        code: number | undefined;
        message: string;
    };
}
