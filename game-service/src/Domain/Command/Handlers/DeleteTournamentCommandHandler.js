"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTournamentCommandHandler = void 0;
class DeleteTournamentCommandHandler {
    tournamentRepository;
    constructor(tournamentRepository, Notifcation) {
        this.tournamentRepository = tournamentRepository;
    }
    async Handle(command) {
        await this.tournamentRepository.Delete(command.tournamentUuid);
    }
}
exports.DeleteTournamentCommandHandler = DeleteTournamentCommandHandler;
