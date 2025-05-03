import { CustomError } from "./CustomError.js";

export class ErrorCatalog
{
    public static readonly InvalidEmail: CustomError = new CustomError(400, "Invalid email address");
    public static readonly WrongEmail: CustomError = new CustomError(400, "Wrong email address");
    public static readonly InvalidPassword: CustomError = new CustomError(400, "Invalid password: must be between 8 and 30 characters long");
    public static readonly WrongPassword: CustomError = new CustomError(400, "Wrong password, try again");
    public static readonly UsernameAlreadyExists: CustomError = new CustomError(400, "Username already exists");
    public static readonly InvalidExtension: CustomError = new CustomError(400, "Invalid file extension. Only .jpg and .png are allowed");
    public static readonly DatabaseViolated: CustomError = new CustomError(400, "A database constraint, like unique, was violated");
    public static readonly UserNotFound: CustomError = new CustomError(404, "User not found");
    public static readonly InternalServerError: CustomError = new CustomError(500, "Internal server error");
}