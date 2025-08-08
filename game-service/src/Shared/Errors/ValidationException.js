"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
class ValidationException extends Error {
    Errors;
    constructor(errors) {
        super("Validation failed with one or more errors.");
        this.Errors = errors;
        Object.setPrototypeOf(this, ValidationException.prototype);
    }
    SetErrors() {
        return this.Errors.map(e => 'Code:' + e.Code + ' Message:' + e.Message).join('\n');
    }
}
exports.ValidationException = ValidationException;
