"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    ParseError: { code: -32700, message: "数据解析失败" },
    InvalidRequest: { code: -32600, message: "无效的请求" },
    MethodNotFound: { code: -32601, message: "找不到方法" },
    InvalidParams: { code: -32602, message: "无效或错误的的参数" },
    InternalError: { code: -32603, message: "服务器内部错误" },
    RequestTimeout: { code: -34567, message: "请求超时" },
    NoResponse: { code: -1001, message: "服务器没有响应" },
};
