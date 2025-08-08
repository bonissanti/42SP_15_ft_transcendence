"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const ErrorTypeEnum_1 = require("../../Application/Enum/ErrorTypeEnum");
class BaseController {
    handleResult(result, reply, notificationError) {
        notificationError.CleanErrors();
        if (result.isSucess) {
            const responseData = result.getData();
            if (responseData !== undefined && responseData !== null) {
                return reply.status(200).send(responseData);
            }
            return reply.status(200).send(result.getMessage());
        }
        else {
            console.log("Erro ao processar resultado:", result.Error);
            return reply.status(this.getStatusCodeFromErrorType(result.Error)).send({ message: result.getMessage() });
        }
    }
    getStatusCodeFromErrorType(ErrorType) {
        switch (ErrorType) {
            case ErrorTypeEnum_1.ErrorTypeEnum.VALIDATION:
                return 400;
            case ErrorTypeEnum_1.ErrorTypeEnum.NOT_FOUND:
                return 404;
            case ErrorTypeEnum_1.ErrorTypeEnum.CONFLICT:
                return 409;
            case ErrorTypeEnum_1.ErrorTypeEnum.INTERNAL:
            default:
                return 500;
        }
    }
}
exports.BaseController = BaseController;
