"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTournamentQueryDTO = void 0;
class GetTournamentQueryDTO {
    tournamentUuid;
    tournamentName;
    player1Uuid;
    player2Uuid;
    player3Uuid;
    player4Uuid;
    aliasPlayer1;
    aliasPlayer2;
    aliasPlayer3;
    aliasPlayer4;
    constructor(tournamentUuid, tournamentName, player1Uuid, player2Uuid, player3Uuid, player4Uuid, aliasPlayer1, aliasPlayer2, aliasPlayer3, aliasPlayer4) {
        this.tournamentUuid = tournamentUuid;
        this.tournamentName = tournamentName;
        this.player1Uuid = player1Uuid;
        this.player2Uuid = player2Uuid;
        this.player3Uuid = player3Uuid;
        this.player4Uuid = player4Uuid;
        this.aliasPlayer1 = aliasPlayer1;
        this.aliasPlayer2 = aliasPlayer2;
        this.aliasPlayer3 = aliasPlayer3;
        this.aliasPlayer4 = aliasPlayer4;
    }
}
exports.GetTournamentQueryDTO = GetTournamentQueryDTO;
