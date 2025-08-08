"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTournamentQuery = void 0;
class GetTournamentQuery {
    tournamentUuid;
    constructor(tournamentUuid) {
        this.tournamentUuid = tournamentUuid;
    }
    static fromDTO(dto) {
        return new GetTournamentQuery(dto.tournamentUuid);
    }
}
exports.GetTournamentQuery = GetTournamentQuery;
