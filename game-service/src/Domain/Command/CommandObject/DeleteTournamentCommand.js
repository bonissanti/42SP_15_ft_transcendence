"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTournamentCommand = void 0;
class DeleteTournamentCommand {
    tournamentUuid;
    constructor(tournamentUuid) {
        this.tournamentUuid = tournamentUuid;
    }
    static fromDTO(dto) {
        return new DeleteTournamentCommand(dto.torunamentUuid);
    }
}
exports.DeleteTournamentCommand = DeleteTournamentCommand;
