"use strict";
module.exports = {
    // Components
    get RpcController() {
        return require("lib/controller/RpcController");
    },
    get BaseController() {
        return require("lib/controller/BaseController");
    },
    get MethodType() {
        return require("lib/bean/MethodType");
    },
    get RpcError() {
        return require("lib/bean/RpcError");
    },
    get RpcNotice() {
        return require("lib/bean/RpcNotice");
    },
    get RpcRequest() {
        return require("lib/bean/RpcRequest");
    },
    get RpcResponse() {
        return require("lib/bean/RpcResponse");
    },
    get RpcUser() {
        return require("lib/bean/RpcUser");
    },
    get Action() {
        return require("lib/annotation/Action");
    },
    get AddPublicRule() {
        return require("lib/annotation/AddPublicRule");
    },
    get AddRule() {
        return require("lib/annotation/AddRule");
    },
    get Any() {
        return require("lib/annotation/Any");
    },
    get Array() {
        return require("lib/annotation/Array");
    },
    get Boolean() {
        return require("lib/annotation/Boolean");
    },
    get CanNull() {
        return require("lib/annotation/CanNull");
    },
    get Controller() {
        return require("lib/annotation/Controller");
    },
    get Default() {
        return require("lib/annotation/Default");
    },
    get Index() {
        return require("lib/annotation/Index");
    },
    get Method() {
        return require("lib/annotation/Method");
    },
    get Number() {
        return require("lib/annotation/Number");
    },
    get Object() {
        return require("lib/annotation/Object");
    },
    get OffPublicRule() {
        return require("lib/annotation/OffPublicRule");
    },
    get OffRule() {
        return require("lib/annotation/OffRule");
    },
    get PublicRule() {
        return require("lib/annotation/PublicRule");
    },
    get Rule() {
        return require("lib/annotation/Rule");
    },
    get String() {
        return require("lib/annotation/String");
    }
};
