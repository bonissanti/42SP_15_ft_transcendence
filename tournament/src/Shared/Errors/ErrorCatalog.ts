import { CustomError } from "./CustomError.js";

export class ErrorCatalog
{
    public static readonly InvalidExtension: CustomError = new CustomError(400, "Invalid file extension. Only .jpg and .png are allowed");
    public static readonly DatabaseViolated: CustomError = new CustomError(400, "A database constraint, like unique, was violated");
    public static readonly InvalidNumberOfParticipants: CustomError = new CustomError(400, "Number of participants must be 4");
    public static readonly UserNotFound: CustomError = new CustomError(404, "User not found");
    public static readonly TournamentNotFound: CustomError = new CustomError(404, "Tournament not found");
    public static readonly InternalServerError: CustomError = new CustomError(500, "Internal server error");
    public static readonly InternalBackendApiError: CustomError = new CustomError(500, "Error while trying to communicate with the backend api");
}