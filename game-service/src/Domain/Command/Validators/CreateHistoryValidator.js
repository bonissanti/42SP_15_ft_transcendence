"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHistoryValidator = void 0;
const UserServiceClient_1 = require("../../../Infrastructure/Http/Concrete/UserServiceClient");
const ErrorCatalog_1 = require("../../../Shared/Errors/ErrorCatalog");
const ValidationException_1 = require("../../../Shared/Errors/ValidationException");
class CreateHistoryValidator {
    NotificationError;
    backendApiClient;
    constructor(notificationError) {
        this.NotificationError = notificationError;
        this.backendApiClient = new UserServiceClient_1.UserServiceClient();
    }
    async Validator(command) {
        await this.ValidateUserExists(command);
        if (this.VerifyIfPlayerIsPlayingAgainstSelf(command))
            this.NotificationError.AddError(ErrorCatalog_1.ErrorCatalog.PlayerCantPlayAgainstSelf);
        if (command.player1Points < 0 || command.player2Points < 0)
            this.NotificationError.AddError(ErrorCatalog_1.ErrorCatalog.NegativePoints);
        if ((command.player3Points && command.player3Points < 0) || (command.player4Points && command.player4Points < 0))
            this.NotificationError.AddError(ErrorCatalog_1.ErrorCatalog.NegativePoints);
        if (this.NotificationError.NumberOfErrors() > 0) {
            const allErrors = this.NotificationError.GetAllErrors();
            throw new ValidationException_1.ValidationException(allErrors);
        }
    }
    VerifyIfPlayerIsPlayingAgainstSelf(command) {
        const players = [
            command.player1Username,
            command.player2Username,
            command.player3Username,
            command.player4Username
        ].filter(username => username != null && username !== '');
        const set = new Set(players);
        return set.size !== players.length;
    }
    async ValidateUserExists(command) {
        try {
            const userList = [
                command.player1Username,
                command.player2Username,
                command.player3Username,
                command.player4Username
            ].filter(username => username != null && username !== '');
            if (userList.length < 2)
                this.NotificationError.AddError(ErrorCatalog_1.ErrorCatalog.InvalidNumberOfParticipantsHistory);
            const exists = await this.backendApiClient.VerifyIfUsersExistsByUsername(userList);
            if (!exists)
                this.NotificationError.AddError(ErrorCatalog_1.ErrorCatalog.UserNotFound);
        }
        catch (error) {
            this.NotificationError.AddError(ErrorCatalog_1.ErrorCatalog.InternalBackendApiErrorVerifyIfUsersExistsByUsername);
        }
    }
}
exports.CreateHistoryValidator = CreateHistoryValidator;
