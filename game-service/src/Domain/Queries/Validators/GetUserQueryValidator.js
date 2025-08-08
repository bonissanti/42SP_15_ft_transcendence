"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserQueryValidator = void 0;
const ErrorCatalog_1 = require("../../../Shared/Errors/ErrorCatalog");
class GetUserQueryValidator {
    UserRepository;
    NotificationError;
    constructor(UserRepository, NotificationError) {
        this.UserRepository = UserRepository;
        this.NotificationError = NotificationError;
    }
    Validator(command) {
        if (!this.UserRepository.VerifyIfTournamentExistsByUUID(command.tournamentUuid))
            this.NotificationError.AddError(ErrorCatalog_1.ErrorCatalog.UserNotFound);
    }
}
exports.GetUserQueryValidator = GetUserQueryValidator;
