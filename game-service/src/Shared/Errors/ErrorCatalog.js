"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCatalog = void 0;
const CustomError_js_1 = require("./CustomError.js");
class ErrorCatalog {
    static InvalidExtension = new CustomError_js_1.CustomError(101, "Invalid file extension. Only .jpg and .png are allowed");
    static DatabaseViolated = new CustomError_js_1.CustomError(102, "A database constraint, like unique, was violated");
    static InvalidNumberOfParticipants = new CustomError_js_1.CustomError(103, "Number of participants must be 4");
    static InvalidNumberOfParticipantsHistory = new CustomError_js_1.CustomError(104, "Invalid number of participants to add in history. Must be 2");
    static PlayerCantPlayAgainstSelf = new CustomError_js_1.CustomError(105, "Player can't play against himself");
    static NegativePoints = new CustomError_js_1.CustomError(106, "Points can't be negative");
    static NegativeWins = new CustomError_js_1.CustomError(107, "Wins can't be negative");
    static NegativeValues = new CustomError_js_1.CustomError(108, "Wins or Total Games can't be negative");
    static InternalBackendApiErrorVerifyIfUsersExists = new CustomError_js_1.CustomError(109, "Error while trying to communicate with the backend api - endpont: VerifyIfUsersExists");
    static InternalBackendApiErrorVerifyIfUsersExistsByUsername = new CustomError_js_1.CustomError(110, "Error while trying to communicate with the user-sevice api - endpont: VerifyIfUsersExistsByUsername");
    static UserNotFound = new CustomError_js_1.CustomError(111, "User not found");
    static TournamentNotFound = new CustomError_js_1.CustomError(112, "Tournament not found");
    static HistoryNotFound = new CustomError_js_1.CustomError(113, "History not found");
    static InternalServerError = new CustomError_js_1.CustomError(500, "Internal server error");
}
exports.ErrorCatalog = ErrorCatalog;
