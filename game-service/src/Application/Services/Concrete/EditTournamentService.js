"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditTournamentService = void 0;
const TournamentRepository_js_1 = require("../../../Infrastructure/Persistence/Repositories/Concrete/TournamentRepository.js");
const ErrorCatalog_js_1 = require("../../../Shared/Errors/ErrorCatalog.js");
const library_1 = require("@prisma/client/runtime/library");
const EditTournamentCommandHandler_js_1 = require("../../../Domain/Command/Handlers/EditTournamentCommandHandler.js");
const EditTournamentCommandValidator_js_1 = require("../../../Domain/Command/Validators/EditTournamentCommandValidator.js");
const ValidationException_js_1 = require("../../../Shared/Errors/ValidationException.js");
const Result_js_1 = require("../../../Shared/Utils/Result.js");
const EditTournamentCommand_1 = require("../../../Domain/Command/CommandObject/EditTournamentCommand");
const ErrorTypeEnum_1 = require("../../Enum/ErrorTypeEnum");
class EditTournamentService {
    tournamentRepository;
    editTournamentHandler;
    editTournamentValidator;
    constructor(notificationError) {
        this.tournamentRepository = new TournamentRepository_js_1.TournamentRepository();
        this.editTournamentValidator = new EditTournamentCommandValidator_js_1.EditTournamentCommandValidator(this.tournamentRepository, notificationError);
        this.editTournamentHandler = new EditTournamentCommandHandler_js_1.EditTournamentCommandHandler(this.tournamentRepository, notificationError);
    }
    async Execute(dto, reply) {
        try {
            const command = EditTournamentCommand_1.EditTournamentCommand.fromDTO(dto);
            await this.editTournamentValidator.Validator(command);
            await this.editTournamentHandler.Handle(command);
            return Result_js_1.Result.Success("Tournament edited successfully");
        }
        catch (error) {
            if (error instanceof ValidationException_js_1.ValidationException) {
                const message = error.SetErrors();
                return Result_js_1.Result.Failure(message, ErrorTypeEnum_1.ErrorTypeEnum.VALIDATION);
            }
            else if (error instanceof library_1.PrismaClientKnownRequestError) {
                return Result_js_1.Result.Failure(ErrorCatalog_js_1.ErrorCatalog.DatabaseViolated.SetError(), ErrorTypeEnum_1.ErrorTypeEnum.CONFLICT);
            }
            return Result_js_1.Result.Failure(ErrorCatalog_js_1.ErrorCatalog.InternalServerError.SetError(), ErrorTypeEnum_1.ErrorTypeEnum.INTERNAL);
        }
    }
}
exports.EditTournamentService = EditTournamentService;
