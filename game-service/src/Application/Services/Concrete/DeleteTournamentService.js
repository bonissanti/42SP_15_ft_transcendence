"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTournamentService = void 0;
const TournamentRepository_js_1 = require("../../../Infrastructure/Persistence/Repositories/Concrete/TournamentRepository.js");
const DeleteUserCommandValidator_js_1 = require("../../../Domain/Command/Validators/DeleteUserCommandValidator.js");
const DeleteTournamentCommandHandler_js_1 = require("../../../Domain/Command/Handlers/DeleteTournamentCommandHandler.js");
const Result_js_1 = require("../../../Shared/Utils/Result.js");
const ValidationException_js_1 = require("../../../Shared/Errors/ValidationException.js");
const ErrorCatalog_js_1 = require("../../../Shared/Errors/ErrorCatalog.js");
const client_1 = require("@prisma/client");
const DeleteTournamentCommand_1 = require("../../../Domain/Command/CommandObject/DeleteTournamentCommand");
const ErrorTypeEnum_1 = require("../../Enum/ErrorTypeEnum");
class DeleteTournamentService {
    tournamentRepository;
    deleteTournamentHandler;
    deleteUserCommandValidator;
    constructor(notificationError) {
        this.tournamentRepository = new TournamentRepository_js_1.TournamentRepository();
        this.deleteUserCommandValidator = new DeleteUserCommandValidator_js_1.DeleteUserCommandValidator(this.tournamentRepository, notificationError);
        this.deleteTournamentHandler = new DeleteTournamentCommandHandler_js_1.DeleteTournamentCommandHandler(this.tournamentRepository, notificationError);
    }
    async Execute(dto, reply) {
        try {
            const command = DeleteTournamentCommand_1.DeleteTournamentCommand.fromDTO(dto);
            await this.deleteUserCommandValidator.Validator(command);
            await this.deleteTournamentHandler.Handle(command);
            return Result_js_1.Result.Success("User deleted successfully");
        }
        catch (error) {
            if (error instanceof ValidationException_js_1.ValidationException) {
                const message = error.SetErrors();
                return Result_js_1.Result.Failure(message, ErrorTypeEnum_1.ErrorTypeEnum.VALIDATION);
            }
            else if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025')
                    return Result_js_1.Result.Failure("User to be deleted not found.");
                return Result_js_1.Result.Failure(ErrorCatalog_js_1.ErrorCatalog.DatabaseViolated.SetError(), ErrorTypeEnum_1.ErrorTypeEnum.CONFLICT);
            }
            return Result_js_1.Result.Failure(ErrorCatalog_js_1.ErrorCatalog.InternalServerError.SetError(), ErrorTypeEnum_1.ErrorTypeEnum.INTERNAL);
        }
    }
}
exports.DeleteTournamentService = DeleteTournamentService;
