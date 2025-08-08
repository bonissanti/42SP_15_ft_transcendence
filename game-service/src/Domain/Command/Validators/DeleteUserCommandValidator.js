"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserCommandValidator = void 0;
const ErrorCatalog_1 = require("../../../Shared/Errors/ErrorCatalog");
class DeleteUserCommandValidator {
    tournamentRepository;
    NotificationError;
    constructor(tournamentRepository, NotificationError) {
        this.tournamentRepository = tournamentRepository;
        this.NotificationError = NotificationError;
    }
    async Validator(command) {
        if (!await this.tournamentRepository.VerifyIfTournamentExistsByUUID(command.tournamentUuid))
            this.NotificationError.AddError(ErrorCatalog_1.ErrorCatalog.UserNotFound);
    }
}
exports.DeleteUserCommandValidator = DeleteUserCommandValidator;
