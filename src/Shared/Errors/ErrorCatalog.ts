import { Error } from "./Error";

export class ErrorCatalog
{
    public static readonly UserNotFound: Error = new Error(404, "User not found");
    public static readonly InternalServerError: Error = new Error(500, "Internal server error");

}