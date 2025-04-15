import { CustomError } from "../Errors/CustomError";

export class Result
{
    public readonly isSucess: boolean;
    public static CustomErrors: CustomError[];

    private constructor(isSucess: boolean)
    {
        this.isSucess = isSucess;
    }

    public static Sucess() : Result
    {
        return new Result(true);
    }

    public static Failure(): Result
    {
        return new Result(false);
    }
}