import {ErrorTypeEnum} from "../../Application/Enum/ErrorTypeEnum";

export class Result<T = void>
{
    public readonly isSucess: boolean;
    private readonly Message: string = "";
    public readonly Data?: T;
    public readonly Error?: ErrorTypeEnum;

    private constructor(isSucess: boolean, message: string, data?: T, error?: ErrorTypeEnum)
    {
        this.isSucess = isSucess;
        this.Message = message;
        this.Data = data;
        this.Error = error;
    }

    public static Sucess(message: string) : Result<void>
    {
        return new Result(true, message, undefined);
    }

    public static SucessWithData<T>(message: string, data: T) : Result<T>
    {
        return new Result(true, message, data);
    }

    public static Failure<T = void>(message: string, error: ErrorTypeEnum = ErrorTypeEnum.INTERNAL): Result<T>
    {
        return new Result<T>(false, message, undefined, error);
    }

    public getMessage(): string
    {
        return this.Message;
    }
    
    public getData(): T | undefined {
        return this.Data;
    }
}