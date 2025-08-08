"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTournamentQueryHandler = void 0;
class GetTournamentQueryHandler {
    tournamentRepository;
    constructor(tournamentRepository, NotificationError) {
        this.tournamentRepository = tournamentRepository;
    }
    async Handle(query) {
        return await this.tournamentRepository.GetTournamentQueryDTOByUuid(query.tournamentUuid);
    }
}
exports.GetTournamentQueryHandler = GetTournamentQueryHandler;
