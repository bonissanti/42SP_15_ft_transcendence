"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStatsExternalDTO = void 0;
class UpdateStatsExternalDTO {
    gameType;
    player1Username;
    player1Points;
    player2Username;
    player2Points;
    player3Username;
    player3Points;
    player4Username;
    player4Points;
    constructor(gameType, player1Username, player1Points, player2Username, player2Points, player3Username, player3Points, player4Username, player4Points) {
        this.gameType = gameType;
        this.player1Username = player1Username;
        this.player1Points = player1Points;
        this.player2Username = player2Username;
        this.player2Points = player2Points;
        this.player3Username = player3Username;
        this.player3Points = player3Points;
        this.player4Username = player4Username;
        this.player4Points = player4Points;
    }
}
exports.UpdateStatsExternalDTO = UpdateStatsExternalDTO;
