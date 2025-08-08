"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditTournamentCommandValidator = void 0;
const ErrorCatalog_1 = require("../../../Shared/Errors/ErrorCatalog");
const ValidationException_1 = require("../../../Shared/Errors/ValidationException");
const UserServiceClient_1 = require("../../../Infrastructure/Http/Concrete/UserServiceClient");
class EditTournamentCommandValidator {
    tournamentRepository;
    NotificationError;
    backendApiClient;
    constructor(tournamentRepository, NotificationError) {
        this.tournamentRepository = tournamentRepository;
        this.NotificationError = NotificationError;
        this.backendApiClient = new UserServiceClient_1.UserServiceClient();
    }
    async Validator(command) {
        if (!await this.tournamentRepository.VerifyIfTournamentExistsByUUID(command.tournamentUuid))
            this.NotificationError.AddError(ErrorCatalog_1.ErrorCatalog.TournamentNotFound);
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
            const exists = await this.backendApiClient.VerifyIfUsersExistsByUsername(usersList);
            if (!exists)
                this.NotificationError.AddError(ErrorCatalog_1.ErrorCatalog.UserNotFound);
        }
        catch (error) {
            this.NotificationError.AddError(ErrorCatalog_1.ErrorCatalog.InternalServerError);
        }
    }
}
exports.EditTournamentCommandValidator = EditTournamentCommandValidator;
