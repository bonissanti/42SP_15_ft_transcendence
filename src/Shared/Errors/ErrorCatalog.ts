import { CustomError } from "./CustomError";

export class ErrorCatalog
{
    public static readonly InvalidEmail: CustomError = new CustomError(400, "Invalid email address");
    public static readonly InvalidPassword: CustomError = new CustomError(400, "Invalid password");
    public static readonly UsernameAlreadyExists: CustomError = new CustomError(400, "Username already exists");
    public static readonly UserNotFound: CustomError = new CustomError(404, "User not found");
    public static readonly InternalServerError: CustomError = new CustomError(500, "Internal server error");

}