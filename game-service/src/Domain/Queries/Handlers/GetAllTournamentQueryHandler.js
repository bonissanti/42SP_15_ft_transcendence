"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllTournamentQueryHandler = void 0;
class GetAllTournamentQueryHandler {
    tournamentRepository;
    constructor(tournamentRepository, NotificationError) {
        this.tournamentRepository = tournamentRepository;
    }
    async Handle(query) {
        return await this.tournamentRepository.GetAllTournaments(query.userUuid);
    }
}
exports.GetAllTournamentQueryHandler = GetAllTournamentQueryHandler;
