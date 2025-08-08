"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateMatchmakingDTO = void 0;
class GenerateMatchmakingDTO {
    username;
    wins;
    totalGames;
    constructor(username, wins, totalGames) {
        this.username = username;
        this.wins = wins;
        this.totalGames = totalGames;
    }
}
exports.GenerateMatchmakingDTO = GenerateMatchmakingDTO;
