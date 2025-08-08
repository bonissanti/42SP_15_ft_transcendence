"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHistoryCommand = void 0;
class CreateHistoryCommand {
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
    static fromDTO(dto) {
        return new CreateHistoryCommand(dto.gameType, dto.tournamentId, dto.tournamentName, dto.player1Username, dto.player1Alias, dto.player1Points, dto.player2Username, dto.player2Alias, dto.player2Points, dto.player3Username, dto.player3Alias, dto.player3Points, dto.player4Username, dto.player4Alias, dto.player4Points);
    }
}
exports.CreateHistoryCommand = CreateHistoryCommand;
