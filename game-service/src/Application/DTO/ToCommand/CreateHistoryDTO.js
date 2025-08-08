"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHistoryDTO = void 0;
class CreateHistoryDTO {
    gameType;
    tournamentId;
    tournamentName;
    player1Username;
    player1Alias;
    player1Points;
    player2Username;
    player2Alias;
    player2Points;
    player3Username;
    player3Alias;
    player3Points;
    player4Username;
    player4Alias;
    player4Points;
    constructor(gameType, tournamentId, tournamentName, player1Username, player1Alias, player1Points, player2Username, player2Alias, player2Points, player3Username, player3Alias, player3Points, player4Username, player4Alias, player4Points) {
        this.gameType = gameType;
        this.tournamentId = tournamentId;
        this.tournamentName = tournamentName;
        this.player1Username = player1Username;
        this.player1Alias = player1Alias;
        this.player1Points = player1Points;
        this.player2Username = player2Username;
        this.player2Alias = player2Alias;
        this.player2Points = player2Points;
        this.player3Username = player3Username;
        this.player3Alias = player3Alias;
        this.player3Points = player3Points;
        this.player4Username = player4Username;
        this.player4Alias = player4Alias;
        this.player4Points = player4Points;
    }
}
exports.CreateHistoryDTO = CreateHistoryDTO;
