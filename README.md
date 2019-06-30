# node-easy-jsonrpc

支持http和websocket的jsonrpc工具库

## 安装步骤：

### 安装
```bash
yarn add node-easy-jsonrpc  or npm install node-easy-jsonrpc
```

## 使用

### 初始化jsonrpc引擎
```javascript
//最好在你的web应用初始化时候调用该方法，将会遍历path下的路由文件
try {
  RpcController.init(path.join(__dirname, "./src/action"), {});
  //init 第一个参数传入路由文件目录  第二个参数：接受的params默认类型（参数校验）
} catch (e) {
  console.log(e);
}
```

### action文件编写
```javascript
import RpcControllerBack from "node-easy-jsonrpc";
import {RpcError, RpcUser} from "node-easy-jsonrpc";
const controller = RpcControllerBack.controller("test");
controller.addRule("auth", (params) => { //添加该路由文件下的全局rule
  if (params.password !== "123") {
    throw RpcError.InvalidRequest;
  }
});
controller.onIndexAction((params) => {
  return "welcome to index";
});
controller.onAction("method1", async (params: any, user: RpcUser) => {
  return true;
});
controller.onAction("method2", async (params: any, user: RpcUser) => {
  return "haha";
}).offCRule("auth");//该方法不经过取消该路由文件下的全局rule auth
controller.onAction("method3", async (params: any, user: RpcUser) => {
  throw new RpcError("you are a big");
});
controller.onAction("method4", async (params: any, user: RpcUser) => {
  user.success({name: "da ming"});
});
controller.onAction("method5", async (params: any, user: RpcUser) => {
  return params;
}).setParamSchema({
  name: "string",
  father: {name: "string", age: "delete"},
  age: "number",
  money: "delete"
});//参数校验 string|number|boolean|{}|[]|delete  ,delete代表删除该参数

controller.onAction("method6", async (params: any, user: RpcUser) => {
  return params;
}).setParamSchema([]);//params是数组
controller.onAction("method7", async (params: any, user: RpcUser) => {
  return params;
}).setParamSchema(["number"]);//params是数组，并且数组内容是数字

```

### 相关http/websocket请求转发到路由

```javascript
  //http使用,以express框架为示例
  import {NextFunction, Request, Response} from "express";
  import {uuid} from "../util/CommonUtil";
  import RpcControllerBack, {RpcRequest, RpcResponse, RpcUser} from "node-easy-jsonrpc";

  const express = require("express");
  const router = express.Router();
  router.all("/", (req: Request, res: Response, next: NextFunction) => {
    const method = req.baseUrl;
    const params = Object.keys(req.query).length > 0 ? req.query : req.body;
    const request = new RpcRequest(uuid(), method, params);
    RpcControllerBack.call(request, (res: RpcResponse) => {
      res.json(res);
    });
  });
  module.exports = router;

  //websocket,以ws框架为示例
  const server = new WebSocket.Server({port: 8080});
    server.on("connection", async (ws: WebSocket, req: IncomingMessage) => {
      ws.on("message", (msg: string) => {
         const msgJson=JSON.parse(msg);
         const rpcRequest=new RpcRequest(msgJson.id,msgJson.method,msgJson.params);
         RpcControllerBack.call(request, (res: RpcResponse) => {
              ws.send(JSON.stringfy(res));
         });
      });
    });


```
