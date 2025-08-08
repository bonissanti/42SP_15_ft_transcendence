"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTournamentValidator = void 0;
const ErrorCatalog_1 = require("../../../Shared/Errors/ErrorCatalog");
const ValidationException_1 = require("../../../Shared/Errors/ValidationException");
const UserServiceClient_1 = require("../../../Infrastructure/Http/Concrete/UserServiceClient");
class CreateTournamentValidator {
    tournamentRepository;
    NotificationError;
    backendApiClient;
    constructor(userRepository, notificationError) {
        this.tournamentRepository = userRepository;
        this.NotificationError = notificationError;
        this.backendApiClient = new UserServiceClient_1.UserServiceClient();
    }
    async Validator(command) {
        await this.validateUsersExists(command);
        if (this.NotificationError.NumberOfErrors() > 0) {
            const allErrors = this.NotificationError.GetAllErrors();
            throw new ValidationException_1.ValidationException(allErrors);
        }
    }
    async validateUsersExists(command) {
        try {
            const usersList = [
                command.player1Username,
                command.player2Username,
                command.player3Username,
                command.player4Username,
            ].filter(uuid => uuid != null && uuid !== '');
            if (usersList.length < 4)
                this.NotificationError.AddError(ErrorCatalog_1.ErrorCatalog.InvalidNumberOfParticipants);
            console.log("Verifying if users exist with usernames:", usersList);
            const exists = await this.backendApiClient.VerifyIfUsersExistsByUsername(usersList);
            if (!exists)
                this.NotificationError.AddError(ErrorCatalog_1.ErrorCatalog.UserNotFound);
        }
        catch (error) {
            this.NotificationError.AddError(ErrorCatalog_1.ErrorCatalog.InternalBackendApiErrorVerifyIfUsersExists);
        }
    }
}
exports.CreateTournamentValidator = CreateTournamentValidator;
