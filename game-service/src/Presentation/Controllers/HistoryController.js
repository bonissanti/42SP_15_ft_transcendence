"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryController = void 0;
const BaseController_1 = require("./BaseController");
const NotificationError_1 = require("../../Shared/Errors/NotificationError");
const CreateHistoryDTO_1 = require("../../Application/DTO/ToCommand/CreateHistoryDTO");
const HistoryService_1 = require("../../Application/Services/Concrete/HistoryService");
const GetAllHistoriesDTO_1 = require("../../Application/DTO/ToQuery/GetAllHistoriesDTO");
class HistoryController extends BaseController_1.BaseController {
    notificationError;
    historyService;
    constructor() {
        super();
        this.notificationError = new NotificationError_1.NotificationError();
        this.historyService = new HistoryService_1.HistoryService(this.notificationError);
    }
    async CreateHistory(request, reply) {
        const body = request.body;
        const createHistoryDTO = new CreateHistoryDTO_1.CreateHistoryDTO(body.gameType, body.tournamentId ?? undefined, body.tournamentName ?? '', body.player1Username, body.player1Alias, body.player1Points, body.player2Username, body.player2Alias, body.player2Points, body.player3Username, body.player3Alias, body.player3Points, body.player4Username, body.player4Alias, body.player4Points);
        const result = await this.historyService.Create(createHistoryDTO, reply);
        return this.handleResult(result, reply, this.notificationError);
    }
    async GetAllHistories(request, reply) {
        const query = request.query;
        const getAllHistoriesDTO = new GetAllHistoriesDTO_1.GetAllHistoriesDTO(query.username);
        const result = await this.historyService.GetAll(getAllHistoriesDTO, reply);
        return this.handleResult(result, reply, this.notificationError);
    }
}
exports.HistoryController = HistoryController;
