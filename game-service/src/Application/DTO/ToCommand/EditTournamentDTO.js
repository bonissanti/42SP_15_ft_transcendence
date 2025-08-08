"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditTournamentDTO = void 0;
class EditTournamentDTO {
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
}
exports.EditTournamentDTO = EditTournamentDTO;
