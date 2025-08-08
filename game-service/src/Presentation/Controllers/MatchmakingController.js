"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchmakingController = void 0;
const BaseController_1 = require("./BaseController");
const NotificationError_1 = require("../../Shared/Errors/NotificationError");
const GenerateMatchmakingDTO_1 = require("../../Application/DTO/ToCommand/GenerateMatchmakingDTO");
const MatchmakingService_1 = require("../../Application/Services/Concrete/MatchmakingService");
class MatchmakingController extends BaseController_1.BaseController {
    notificationError;
    matchMakingService;
    constructor() {
        super();
        this.notificationError = new NotificationError_1.NotificationError();
        this.matchMakingService = new MatchmakingService_1.MatchmakingService(this.notificationError);
    }
    //[Não implementado no front]
    async GenerateMatchmaking(request, reply) {
        const query = request.query;
        const dto = new GenerateMatchmakingDTO_1.GenerateMatchmakingDTO(query.username, query.wins, query.totalGames);
        const result = await this.matchMakingService.Generate(dto, reply);
        return this.handleResult(result, reply, this.notificationError);
    }
}
exports.MatchmakingController = MatchmakingController;
