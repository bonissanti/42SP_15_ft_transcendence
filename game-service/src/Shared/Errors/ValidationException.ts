import {CustomError} from "./CustomError.js";

export class ValidationException extends Error
{
    public readonly Errors: CustomError[];

    constructor(errors: CustomError[])
    {
        super("Validation failed with one or more errors.");
        this.Errors = errors;
        Object.setPrototypeOf(this, ValidationException.prototype);
    }

    public SetErrors(): string
    {
        return this.Errors.map(e => 'Code:' + e.Code + ' Message:' + e.Message).join('\n')
    }

}