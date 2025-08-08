"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateMatchmakingQueryValidator = void 0;
const UserServiceClient_1 = require("../../../Infrastructure/Http/Concrete/UserServiceClient");
const ErrorCatalog_1 = require("../../../Shared/Errors/ErrorCatalog");
const ValidationException_1 = require("../../../Shared/Errors/ValidationException");
class GenerateMatchmakingQueryValidator {
    notificationError;
    backendApiClient;
    constructor(notificationError) {
        this.notificationError = notificationError;
        this.backendApiClient = new UserServiceClient_1.UserServiceClient();
    }
    async Validator(query) {
        await this.ValidateUsersExists(query);
        if (query.wins < 0 || query.totalGames < 0)
            this.notificationError.AddError(ErrorCatalog_1.ErrorCatalog.NegativeValues);
        if (this.notificationError.NumberOfErrors() > 0) {
            const allErrors = this.notificationError.GetAllErrors();
            throw new ValidationException_1.ValidationException(allErrors);
        }
    }
    async ValidateUsersExists(query) {
        try {
            const exists = await this.backendApiClient.VerifyIfUserExistsByUsername(query.username);
            if (!exists)
                this.notificationError.AddError(ErrorCatalog_1.ErrorCatalog.UserNotFound);
        }
        catch (error) {
            this.notificationError.AddError(ErrorCatalog_1.ErrorCatalog.InternalBackendApiErrorVerifyIfUsersExistsByUsername);
        }
    }
}
exports.GenerateMatchmakingQueryValidator = GenerateMatchmakingQueryValidator;
//TODO: adicionar validators dos outros gets
