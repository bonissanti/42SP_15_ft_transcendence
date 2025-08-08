"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllTournamentService = void 0;
const TournamentRepository_js_1 = require("../../../Infrastructure/Persistence/Repositories/Concrete/TournamentRepository.js");
const Result_js_1 = require("../../../Shared/Utils/Result.js");
const ValidationException_js_1 = require("../../../Shared/Errors/ValidationException.js");
const ErrorCatalog_js_1 = require("../../../Shared/Errors/ErrorCatalog.js");
const client_1 = require("@prisma/client");
const GetAllTournamentsQuery_1 = require("../../../Domain/Queries/QueryObject/GetAllTournamentsQuery");
const GetAllTournamentsViewModel_1 = require("../../ViewModel/GetAllTournamentsViewModel");
const GetAllTournamentQueryHandler_1 = require("../../../Domain/Queries/Handlers/GetAllTournamentQueryHandler");
const ErrorTypeEnum_1 = require("../../Enum/ErrorTypeEnum");
class GetAllTournamentService {
    tournamentRepository;
    GetUserQueryHandler;
    constructor(notificationError) {
        this.tournamentRepository = new TournamentRepository_js_1.TournamentRepository();
        this.GetUserQueryHandler = new GetAllTournamentQueryHandler_1.GetAllTournamentQueryHandler(this.tournamentRepository, notificationError);
    }
    async Execute(dto, reply) {
        try {
            let getAllTournamentsViewModel = [];
            const query = GetAllTournamentsQuery_1.GetAllTournamentsQuery.fromDTO(dto);
            const getAllTournamentsQueryDTO = await this.GetUserQueryHandler.Handle(query);
            if (!getAllTournamentsQueryDTO) {
                return Result_js_1.Result.SuccessWithData("Tournaments not found", getAllTournamentsViewModel);
            }
            getAllTournamentsViewModel = GetAllTournamentsViewModel_1.GetAllTournamentsViewModel.fromQueryDTOlist(getAllTournamentsQueryDTO);
            return Result_js_1.Result.SuccessWithData("Tournaments found", getAllTournamentsViewModel);
        }
        catch (error) {
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
exports.GetAllTournamentService = GetAllTournamentService;
