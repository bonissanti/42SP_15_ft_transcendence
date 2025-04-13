import { Error } from "../Errors/Error";

export class Result
{
    public readonly isSucess: boolean;
    public readonly Error: Error | null;

    private constructor(isSucess: boolean, error: Error | null)
    {
        if (isSucess && error != null || !isSucess && error == null)
            throw new TypeError("Error: isSucess and error must be different");

        this.isSucess = isSucess;
        this.Error = error;
    }

    public static Sucess() : Result
    {
        return new Result(true, null);
    }

    public static Failure(error: Error): Result
    {
        return new Result(false, error);
    }

    public GetFailure()
    {
        return this.Error;
    }
}