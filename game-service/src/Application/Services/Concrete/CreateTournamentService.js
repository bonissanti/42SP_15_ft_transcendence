"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTournamentService = void 0;
const Result_js_1 = require("../../../Shared/Utils/Result.js");
const ErrorCatalog_js_1 = require("../../../Shared/Errors/ErrorCatalog.js");
const TournamentRepository_js_1 = require("../../../Infrastructure/Persistence/Repositories/Concrete/TournamentRepository.js");
const CreateTournamentCommandHandler_js_1 = require("../../../Domain/Command/Handlers/CreateTournamentCommandHandler.js");
const CreateTournamentValidator_js_1 = require("../../../Domain/Command/Validators/CreateTournamentValidator.js");
const ValidationException_js_1 = require("../../../Shared/Errors/ValidationException.js");
const client_1 = require("@prisma/client");
const CreateTournamentCommand_1 = require("../../../Domain/Command/CommandObject/CreateTournamentCommand");
const ErrorTypeEnum_1 = require("../../Enum/ErrorTypeEnum");
class CreateTournamentService {
    tournamentRepository;
    createTournamentCommandHandler;
    createTournamentValidator;
    constructor(notificationError) {
        this.tournamentRepository = new TournamentRepository_js_1.TournamentRepository();
        this.createTournamentValidator = new CreateTournamentValidator_js_1.CreateTournamentValidator(this.tournamentRepository, notificationError);
        this.createTournamentCommandHandler = new CreateTournamentCommandHandler_js_1.CreateTournamentCommandHandler(this.tournamentRepository, notificationError);
    }
    async Execute(dto, reply) {
        try {
            const command = CreateTournamentCommand_1.CreateTournamentCommand.fromDTO(dto);
            await this.createTournamentValidator.Validator(command);
            await this.createTournamentCommandHandler.Handle(command);
            return Result_js_1.Result.Success("Tournament created successfully");
        }
        catch (error) {
            console.log("Error in CreateTournamentService.Execute:", error);
            if (error instanceof ValidationException_js_1.ValidationException) {
                const message = error.SetErrors();
                return Result_js_1.Result.Failure(message, ErrorTypeEnum_1.ErrorTypeEnum.VALIDATION);
            }
            else if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                return Result_js_1.Result.Failure(ErrorCatalog_js_1.ErrorCatalog.DatabaseViolated.SetError(), ErrorTypeEnum_1.ErrorTypeEnum.CONFLICT);
            }
            return Result_js_1.Result.Failure(ErrorCatalog_js_1.ErrorCatalog.InternalServerError.SetError(), ErrorTypeEnum_1.ErrorTypeEnum.INTERNAL);
        }
    }
}
exports.CreateTournamentService = CreateTournamentService;
