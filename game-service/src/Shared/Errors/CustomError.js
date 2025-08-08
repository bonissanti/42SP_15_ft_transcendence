"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError {
    Code;
    Message;
    constructor(code, message) {
        this.Code = code;
        this.Message = message;
    }
    GetCode() {
        return this.Code;
    }
    GetMessage() {
        return this.Message;
    }
    SetError() {
        return 'Code: ' + this.Code + ' Message:' + this.Message;
    }
}
exports.CustomError = CustomError;
