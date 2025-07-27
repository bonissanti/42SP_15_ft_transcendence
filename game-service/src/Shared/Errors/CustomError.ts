export class CustomError
{
    public readonly Code: number;
    public readonly Message: string;

    constructor (code: number, message: string)
    {
        this.Code = code;
        this.Message = message;
    }

    public GetCode()
    {
        return this.Code;
    }

    public GetMessage()
    {
        return this.Message;
    }

    public SetError(): string
    {
        return 'Code: ' + this.Code + ' Message:' + this.Message;
    }
}