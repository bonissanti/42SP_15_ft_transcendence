"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllTournamentsQueryDTO = void 0;
class GetAllTournamentsQueryDTO {
    tournamentUuid;
    tournamentName;
    player1Uuid;
    player2Uuid;
    player3Uuid;
    player4Uuid;
    constructor(tournamentUuid, tournamentName, player1Uuid, player2Uuid, player3Uuid, player4Uuid) {
        this.tournamentUuid = tournamentUuid;
        this.tournamentName = tournamentName;
        this.player1Uuid = player1Uuid;
        this.player2Uuid = player2Uuid;
        this.player3Uuid = player3Uuid;
        this.player4Uuid = player4Uuid;
    }
}
exports.GetAllTournamentsQueryDTO = GetAllTournamentsQueryDTO;
