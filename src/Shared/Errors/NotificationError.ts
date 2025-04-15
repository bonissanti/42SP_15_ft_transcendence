import {CustomError} from "./CustomError";
import {Result} from "../Utils/Result";

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
}