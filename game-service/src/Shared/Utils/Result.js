"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
const ErrorTypeEnum_1 = require("../../Application/Enum/ErrorTypeEnum");
class Result {
    isSucess;
    Message = "";
    Data;
    Error;
    constructor(isSucess, message, data, error) {
        this.isSucess = isSucess;
        this.Message = message;
        this.Data = data;
        this.Error = error;
    }
    static Success(message) {
        return new Result(true, message, undefined);
    }
    static SuccessWithData(message, data) {
        return new Result(true, message, data);
    }
    static Failure(message, error = ErrorTypeEnum_1.ErrorTypeEnum.INTERNAL) {
        return new Result(false, message, undefined, error);
    }
    getMessage() {
        return this.Message;
    }
    getData() {
        return this.Data;
    }
}
exports.Result = Result;
