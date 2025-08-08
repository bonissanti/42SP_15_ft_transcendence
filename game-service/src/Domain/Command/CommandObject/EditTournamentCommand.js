"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditTournamentCommand = void 0;
class EditTournamentCommand {
    tournamentUuid;
    tournamentName;
    player1Username;
    player2Username;
    player3Username;
    player4Username;
    constructor(tournamentUuid, tournamentName, player1Username, player2Username, player3Username, player4Username) {
        this.tournamentUuid = tournamentUuid;
        this.tournamentName = tournamentName;
        this.player1Username = player1Username;
        this.player2Username = player2Username;
        this.player3Username = player3Username;
        this.player4Username = player4Username;
    }
    static fromDTO(dto) {
        return new EditTournamentCommand(dto.tournamentUuid, dto.tournamentName, dto.player1Username, dto.player2Username, dto.player3Username, dto.player4Username);
    }
}
exports.EditTournamentCommand = EditTournamentCommand;
