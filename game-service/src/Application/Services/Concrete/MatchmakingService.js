"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchmakingService = void 0;
const GenerateMatchmakingQuery_1 = require("../../../Domain/Queries/QueryObject/GenerateMatchmakingQuery");
const GenerateMatchmakingQueryHandler_1 = require("../../../Domain/Queries/Handlers/GenerateMatchmakingQueryHandler");
const GenerateMatchmakingQueryValidator_1 = require("../../../Domain/Queries/Validators/GenerateMatchmakingQueryValidator");
const UserServiceClient_1 = require("../../../Infrastructure/Http/Concrete/UserServiceClient");
const ErrorCatalog_1 = require("../../../Shared/Errors/ErrorCatalog");
const Result_1 = require("../../../Shared/Utils/Result");
const ValidationException_1 = require("../../../Shared/Errors/ValidationException");
const client_1 = require("@prisma/client");
const GetUserMatchmakingViewModel_1 = require("../../ViewModel/GetUserMatchmakingViewModel");
class MatchmakingService {
    backendApiClient;
    matchmakingQueryHandler;
    matchmakingQueryValidator;
    constructor(notificationError) {
        this.backendApiClient = new UserServiceClient_1.UserServiceClient();
        this.matchmakingQueryHandler = new GenerateMatchmakingQueryHandler_1.GenerateMatchmakingQueryHandler(this.backendApiClient, notificationError);
        this.matchmakingQueryValidator = new GenerateMatchmakingQueryValidator_1.GenerateMatchmakingQueryValidator(notificationError);
    }
    async Generate(dto, reply) {
        try {
            const query = GenerateMatchmakingQuery_1.GenerateMatchmakingQuery.fromDTO(dto);
            await this.matchmakingQueryValidator.Validator(query);
            const getUserMatchmakingQueryDTO = await this.matchmakingQueryHandler.Handle(query);
            if (!getUserMatchmakingQueryDTO)
                return Result_1.Result.Failure(ErrorCatalog_1.ErrorCatalog.DatabaseViolated.SetError());
            const getUserMatchmakingViewModel = GetUserMatchmakingViewModel_1.GetUserMatchmakingViewModel.fromQueryDTO(getUserMatchmakingQueryDTO);
            return Result_1.Result.SuccessWithData("Opponent found", getUserMatchmakingViewModel);
        }
        catch (error) {
            if (error instanceof ValidationException_1.ValidationException) {
                const message = error.SetErrors();
                return Result_1.Result.Failure(message);
            }
            else if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                return Result_1.Result.Failure(ErrorCatalog_1.ErrorCatalog.DatabaseViolated.SetError());
            }
            return Result_1.Result.Failure(ErrorCatalog_1.ErrorCatalog.InternalServerError.SetError());
        }
    }
}
exports.MatchmakingService = MatchmakingService;
