import { CustomError } from "../Errors/CustomError";

export class Result
{
    public readonly isSucess: boolean;
    private readonly Message: string = "";

    private constructor(isSucess: boolean, message: string)
    {
        this.isSucess = isSucess;
        this.Message = message;
    }

    public static Sucess(message: string) : Result
    {
        return new Result(true, message);
    }

    public static Failure(message: string): Result
    {
        return new Result(false, message);
    }

    public getMessage(): string
    {
        return this.Message;
    }
}