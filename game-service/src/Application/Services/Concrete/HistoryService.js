"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryService = void 0;
const HistoryRepository_1 = require("../../../Infrastructure/Persistence/Repositories/Concrete/HistoryRepository");
const CreateHistoryCommandHandler_1 = require("../../../Domain/Command/Handlers/CreateHistoryCommandHandler");
const CreateHistoryValidator_1 = require("../../../Domain/Command/Validators/CreateHistoryValidator");
const Result_1 = require("../../../Shared/Utils/Result");
const CreateHistoryCommand_1 = require("../../../Domain/Command/CommandObject/CreateHistoryCommand");
const ValidationException_1 = require("../../../Shared/Errors/ValidationException");
const client_1 = require("@prisma/client");
const ErrorCatalog_1 = require("../../../Shared/Errors/ErrorCatalog");
const GetAllHistoriesQuery_1 = require("../../../Domain/Queries/QueryObject/GetAllHistoriesQuery");
const GetAllHistoriesViewModel_1 = require("../../ViewModel/GetAllHistoriesViewModel");
const GetAllHistoriesQueryHandler_1 = require("../../../Domain/Queries/Handlers/GetAllHistoriesQueryHandler");
const ErrorTypeEnum_1 = require("../../Enum/ErrorTypeEnum");
class HistoryService {
    historyRepository;
    createHistoryCommandHandler;
    createHistoryCommandValidator;
    getAllHistoriesQueryHandler;
    constructor(notificationError) {
        this.historyRepository = new HistoryRepository_1.HistoryRepository();
        this.createHistoryCommandValidator = new CreateHistoryValidator_1.CreateHistoryValidator(notificationError);
        this.createHistoryCommandHandler = new CreateHistoryCommandHandler_1.CreateHistoryCommandHandler(this.historyRepository, notificationError);
        this.getAllHistoriesQueryHandler = new GetAllHistoriesQueryHandler_1.GetAllHistoriesQueryHandler(this.historyRepository, notificationError);
    }
    async Create(dto, reply) {
        try {
            const command = CreateHistoryCommand_1.CreateHistoryCommand.fromDTO(dto);
            await this.createHistoryCommandValidator.Validator(command);
            await this.createHistoryCommandHandler.Handle(command);
            return Result_1.Result.Success("History created successfully");
        }
        catch (error) {
            if (error instanceof ValidationException_1.ValidationException) {
                const message = error.SetErrors();
                return Result_1.Result.Failure(message, ErrorTypeEnum_1.ErrorTypeEnum.VALIDATION);
            }
            else if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                return Result_1.Result.Failure(ErrorCatalog_1.ErrorCatalog.DatabaseViolated.SetError(), ErrorTypeEnum_1.ErrorTypeEnum.CONFLICT);
            }
            return Result_1.Result.Failure(ErrorCatalog_1.ErrorCatalog.InternalServerError.SetError(), ErrorTypeEnum_1.ErrorTypeEnum.INTERNAL);
        }
    }
    async GetAll(dto, reply) {
        try {
            let getAllHistoriesViewModel = [];
            const query = GetAllHistoriesQuery_1.GetAllHistoriesQuery.fromDTO(dto);
            const GetAllHistoriesQueryDTO = await this.getAllHistoriesQueryHandler.Handle(query);
            if (!GetAllHistoriesQueryDTO) {
                return Result_1.Result.SuccessWithData("Histories not found", getAllHistoriesViewModel);
            }
            getAllHistoriesViewModel = GetAllHistoriesViewModel_1.GetAllHistoriesViewModel.fromQueryDTOList(GetAllHistoriesQueryDTO);
            return Result_1.Result.SuccessWithData("Histories found", getAllHistoriesViewModel);
        }
        catch (error) {
            if (error instanceof ValidationException_1.ValidationException) {
                const message = error.SetErrors();
                return Result_1.Result.Failure(message, ErrorTypeEnum_1.ErrorTypeEnum.VALIDATION);
            }
            else if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                return Result_1.Result.Failure(ErrorCatalog_1.ErrorCatalog.DatabaseViolated.SetError(), ErrorTypeEnum_1.ErrorTypeEnum.CONFLICT);
            }
            return Result_1.Result.Failure(ErrorCatalog_1.ErrorCatalog.InternalServerError.SetError(), ErrorTypeEnum_1.ErrorTypeEnum.INTERNAL);
        }
    }
    Execute(dto, reply) {
        throw new Error("Method not implemented.");
    }
}
exports.HistoryService = HistoryService;
