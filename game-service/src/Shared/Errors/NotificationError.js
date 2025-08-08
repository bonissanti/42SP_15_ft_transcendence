"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationError = void 0;
class NotificationError {
    ListOfErrors;
    constructor() {
        this.ListOfErrors = [];
    }
    AddError(customError) {
        this.ListOfErrors.push(customError);
    }
    CleanErrors() {
        this.ListOfErrors.length = 0;
    }
    NumberOfErrors() {
        return this.ListOfErrors.length;
    }
    GetAllErrors() {
        return this.ListOfErrors;
    }
    SetAllErrorsToString() {
        return this.ListOfErrors.map(e => 'Code:' + e.Code + ' Message: ' + e.Message).join('\n');
    }
}
exports.NotificationError = NotificationError;
