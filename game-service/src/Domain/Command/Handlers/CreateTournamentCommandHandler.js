"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTournamentCommandHandler = void 0;
const Tournament_1 = require("../../Entities/Concrete/Tournament");
class CreateTournamentCommandHandler {
    tournamentRepository;
    constructor(tournamentRepository, notification) {
        this.tournamentRepository = tournamentRepository;
    }
    async Handle(command) {
        const tournamentEntity = new Tournament_1.Tournament(command.tournamentName, command.player1Username, command.player2Username, command.player3Username, command.player4Username, command.aliasPlayer1, command.aliasPlayer2, command.aliasPlayer3, command.aliasPlayer4);
        await this.tournamentRepository.Create(tournamentEntity);
    }
}
exports.CreateTournamentCommandHandler = CreateTournamentCommandHandler;
