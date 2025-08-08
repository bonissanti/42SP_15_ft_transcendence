"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllTournamentsViewModel = void 0;
class GetAllTournamentsViewModel {
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
    static fromQueryDTOlist(queryDTO) {
        return queryDTO.map(dto => new GetAllTournamentsViewModel(dto.tournamentUuid, dto.tournamentName, dto.player1Uuid, dto.player2Uuid, dto.player3Uuid, dto.player4Uuid));
    }
}
exports.GetAllTournamentsViewModel = GetAllTournamentsViewModel;
