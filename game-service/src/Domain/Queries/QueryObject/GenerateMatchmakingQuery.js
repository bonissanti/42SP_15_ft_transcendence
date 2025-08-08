"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateMatchmakingQuery = void 0;
class GenerateMatchmakingQuery {
    username;
    wins;
    totalGames;
    constructor(username, wins, totalGames) {
        this.username = username;
        this.wins = wins;
        this.totalGames = totalGames;
    }
    static fromDTO(dto) {
        return new GenerateMatchmakingQuery(dto.username, dto.wins, dto.totalGames);
    }
}
exports.GenerateMatchmakingQuery = GenerateMatchmakingQuery;
