"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTournamentDTO = void 0;
class CreateTournamentDTO {
    tournamentName;
    player1Username;
    player2Username;
    player3Username;
    player4Username;
    aliasPlayer1;
    aliasPlayer2;
    aliasPlayer3;
    aliasPlayer4;
    constructor(tournamentName, player1Username, player2Username, player3Username, player4Username, aliasPlayer1, aliasPlayer2, aliasPlayer3, aliasPlayer4) {
        this.tournamentName = tournamentName;
        this.player1Username = player1Username;
        this.player2Username = player2Username;
        this.player3Username = player3Username;
        this.player4Username = player4Username;
        this.aliasPlayer1 = aliasPlayer1;
        this.aliasPlayer2 = aliasPlayer2;
        this.aliasPlayer3 = aliasPlayer3;
        this.aliasPlayer4 = aliasPlayer4;
    }
}
exports.CreateTournamentDTO = CreateTournamentDTO;
