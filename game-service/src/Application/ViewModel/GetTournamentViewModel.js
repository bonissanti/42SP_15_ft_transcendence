"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTournamentViewModel = void 0;
class GetTournamentViewModel {
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
    static fromQueryDTO(queryDTO) {
        return new GetTournamentViewModel(queryDTO.tournamentUuid, queryDTO.tournamentName, queryDTO.player1Uuid, queryDTO.player2Uuid, queryDTO.player3Uuid, queryDTO.player4Uuid, queryDTO.aliasPlayer1, queryDTO.aliasPlayer2, queryDTO.aliasPlayer3, queryDTO.aliasPlayer4);
    }
}
exports.GetTournamentViewModel = GetTournamentViewModel;
