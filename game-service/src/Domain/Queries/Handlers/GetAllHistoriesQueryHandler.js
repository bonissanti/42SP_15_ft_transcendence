"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllHistoriesQueryHandler = void 0;
const GetAllHistoriesQueryDTO_1 = require("../../QueryDTO/GetAllHistoriesQueryDTO");
class GetAllHistoriesQueryHandler {
    historyRepository;
    constructor(historyRepository, NotificationError) {
        this.historyRepository = historyRepository;
    }
    async Handle(query) {
        const historyData = await this.historyRepository.GetAllHistoriesByUsername(query.username);
        if (!historyData) {
            return null;
        }
        return historyData.map(history => new GetAllHistoriesQueryDTO_1.GetAllHistoriesQueryDTO(history.historyUuid, history.tournamentId, history.tournamentName, history.gameType, history.player1Username, history.player1Alias, history.player1Points, history.player2Username, history.player2Alias, history.player2Points, history.player3Username, history.player3Alias, history.player3Points, history.player4Username, history.player4Alias, history.player4Points));
    }
}
exports.GetAllHistoriesQueryHandler = GetAllHistoriesQueryHandler;
