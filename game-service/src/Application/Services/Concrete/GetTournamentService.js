"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTournamentService = void 0;
const Result_js_1 = require("../../../Shared/Utils/Result.js");
const client_1 = require("@prisma/client");
const GetTournamentQuery_1 = require("../../../Domain/Queries/QueryObject/GetTournamentQuery");
const GetTournamentViewModel_1 = require("../../ViewModel/GetTournamentViewModel");
const TournamentRepository_1 = require("../../../Infrastructure/Persistence/Repositories/Concrete/TournamentRepository");
const GetTournamentQueryHandler_1 = require("../../../Domain/Queries/Handlers/GetTournamentQueryHandler");
const ErrorCatalog_1 = require("../../../Shared/Errors/ErrorCatalog");
const ValidationException_1 = require("../../../Shared/Errors/ValidationException");
const ErrorTypeEnum_1 = require("../../Enum/ErrorTypeEnum");
class GetTournamentService {
    tournamentRepository;
    getTournamentQueryHandler;
    constructor(notificationError) {
        this.tournamentRepository = new TournamentRepository_1.TournamentRepository();
        this.getTournamentQueryHandler = new GetTournamentQueryHandler_1.GetTournamentQueryHandler(this.tournamentRepository, notificationError);
    }
    async Get(dto, reply) {
        try {
            let getTournamentViewModel = null;
            const query = GetTournamentQuery_1.GetTournamentQuery.fromDTO(dto);
            const getUserQueryDTO = await this.getTournamentQueryHandler.Handle(query);
            if (!getUserQueryDTO) {
                return Result_js_1.Result.SuccessWithData("Tournament not found", getTournamentViewModel);
            }
            getTournamentViewModel = GetTournamentViewModel_1.GetTournamentViewModel.fromQueryDTO(getUserQueryDTO);
            return Result_js_1.Result.SuccessWithData("Tournament found", getTournamentViewModel);
        }
        catch (error) {
            if (error instanceof ValidationException_1.ValidationException) {
                const message = error.SetErrors();
                return Result_js_1.Result.Failure(message, ErrorTypeEnum_1.ErrorTypeEnum.VALIDATION);
            }
            else if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                return Result_js_1.Result.Failure(ErrorCatalog_1.ErrorCatalog.DatabaseViolated.SetError(), ErrorTypeEnum_1.ErrorTypeEnum.CONFLICT);
            }
            return Result_js_1.Result.Failure(ErrorCatalog_1.ErrorCatalog.InternalServerError.SetError(), ErrorTypeEnum_1.ErrorTypeEnum.INTERNAL);
        }
    }
    Execute(dto, reply) {
        throw new Error("Method not implemented.");
    }
}
exports.GetTournamentService = GetTournamentService;
