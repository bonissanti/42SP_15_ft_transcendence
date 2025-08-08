"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateMatchmakingQueryHandler = void 0;
class GenerateMatchmakingQueryHandler {
    backendApiClient;
    constructor(backendApiClient, NotificationError) {
        this.backendApiClient = backendApiClient;
    }
    async Handle(query) {
        return await this.backendApiClient.SearchForOpponent(query.username, query.wins, query.totalGames);
    }
}
exports.GenerateMatchmakingQueryHandler = GenerateMatchmakingQueryHandler;
