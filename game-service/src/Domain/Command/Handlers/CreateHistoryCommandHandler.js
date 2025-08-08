"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHistoryCommandHandler = void 0;
const History_1 = require("../../Entities/Concrete/History");
const UserServiceClient_1 = require("../../../Infrastructure/Http/Concrete/UserServiceClient");
const UpdateStatsExternalDTO_1 = require("../../ExternalDTO/UpdateStatsExternalDTO");
class CreateHistoryCommandHandler {
    historyRepository;
    backendApiClient;
    constructor(historyRepository, notification) {
        this.historyRepository = historyRepository;
        this.backendApiClient = new UserServiceClient_1.UserServiceClient();
    }
    async Handle(command) {
        const historyEntity = new History_1.History(command.tournamentId, command.tournamentName, command.gameType.toString(), command.player1Username, command.player1Alias, command.player1Points, command.player2Username, command.player2Alias, command.player2Points, command.player3Username, command.player3Alias, command.player3Points, command.player4Username, command.player4Alias, command.player4Points);
        const addStatsAfterMatch = new UpdateStatsExternalDTO_1.UpdateStatsExternalDTO(command.gameType, command.player1Username, command.player1Points, command.player2Username, command.player2Points, command.player3Username, command.player3Points, command.player4Username, command.player4Points);
        await this.backendApiClient.UpdateStatsForUsers(addStatsAfterMatch);
        await this.historyRepository.Create(historyEntity);
    }
}
exports.CreateHistoryCommandHandler = CreateHistoryCommandHandler;
