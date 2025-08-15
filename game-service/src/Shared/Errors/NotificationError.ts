import {CustomError} from "./CustomError.js";

export class NotificationError
{
    protected ListOfErrors: CustomError[];

    constructor()
    {
        this.ListOfErrors = [];
    }

    public AddError(customError: CustomError)
    {
        this.ListOfErrors.push(customError);
    }

    public CleanErrors()
    {
        this.ListOfErrors.length = 0;
    }

    public NumberOfErrors(): number
    {
        return this.ListOfErrors.length;
    }

    public GetAllErrors(): CustomError[]
    {
        return this.ListOfErrors;
    }

    public SetAllErrorsToString(): string
    {
        return this.ListOfErrors.map(e => 'Code:' + e.Code + ' Message: ' + e.Message).join('\n');
    }
}