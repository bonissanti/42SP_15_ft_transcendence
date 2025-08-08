"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditTournamentCommandHandler = void 0;
class EditTournamentCommandHandler {
    tournamentRepository;
    constructor(tournamentRepository, Notifcation) {
        this.tournamentRepository = tournamentRepository;
    }
    async Handle(command) {
        const tournament = await this.tournamentRepository.GetTournamentEntityByUuid(command.tournamentUuid);
        await this.ChangeFields(tournament, command);
        await this.tournamentRepository.Update(command.tournamentUuid, tournament);
    }
    async ChangeFields(tournament, command) {
        tournament.tournamentName = command.tournamentName;
        tournament.player1Username = command.player1Username;
        tournament.player2Username = command.player2Username;
        tournament.player3Username = command.player3Username;
        tournament.player4Username = command.player4Username;
    }
}
exports.EditTournamentCommandHandler = EditTournamentCommandHandler;
