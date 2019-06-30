import RpcInfo from "./RpcInfo";
export default class RpcError extends Error {
  public static InternalError = new RpcError(RpcInfo.InternalError);
  public static InvalidParams = new RpcError(RpcInfo.InvalidParams);
  public static InvalidRequest = new RpcError(RpcInfo.InvalidRequest);
  public static MethodNotFound = new RpcError(RpcInfo.MethodNotFound);
  public static ParseError = new RpcError(RpcInfo.ParseError);
  public static RequestTimeout = new RpcError(RpcInfo.RequestTimeout);
  public message: string;
  public code?: number;
  constructor(messageOrObj: string | { message: string, code?: number }, code?: number) {
    if (typeof messageOrObj === "object") {
      super(messageOrObj.message);
      this.message = messageOrObj.message;
      this.code = messageOrObj.code;
    } else {
      super(messageOrObj);
      this.message = messageOrObj;
      this.code = code;
    }
  }
  public toJSON() {
    return {
      code: this.code,
      message: this.message
    };
  }
}
