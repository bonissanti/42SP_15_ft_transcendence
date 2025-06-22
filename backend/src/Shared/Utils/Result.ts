import { CustomError } from "../Errors/CustomError.js";

export class Result<T = void>
{
    public readonly isSucess: boolean;
    private readonly Message: string = "";
    public readonly Data?: T;

    private constructor(isSucess: boolean, message: string, data?: T)
    {
        this.isSucess = isSucess;
        this.Message = message;
        this.Data = data;
    }

    public static Sucess(message: string) : Result<void>
    {
        return new Result(true, message, undefined);
    }

    public static SucessWithData<T>(message: string, data: T) : Result<T>
    {
        return new Result(true, message, data);
    }

    public static Failure<T = void>(message: string): Result<T>
    {
        return new Result<T>(false, message, undefined);
    }

    public getMessage(): string
    {
        return this.Message;
    }
    
    public getData(): T | undefined {
        return this.Data;
    }
}