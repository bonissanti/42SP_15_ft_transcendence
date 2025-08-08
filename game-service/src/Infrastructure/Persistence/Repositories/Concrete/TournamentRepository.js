"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentRepository = void 0;
const ErrorCatalog_js_1 = require("../../../../Shared/Errors/ErrorCatalog.js");
const Tournament_1 = require("../../../../Domain/Entities/Concrete/Tournament");
const GetTournamentQueryDTO_1 = require("../../../../Domain/QueryDTO/GetTournamentQueryDTO");
const PrismaService_1 = __importDefault(require("../../../Service/PrismaService"));
class TournamentRepository {
    async Create(tournamentEntity) {
        await PrismaService_1.default.tournament.create({
            data: {
                tournamentUuid: tournamentEntity.tournamentUuid,
                tournamentName: tournamentEntity.tournamentName,
                player1Username: tournamentEntity.player1Username,
                player2Username: tournamentEntity.player2Username,
                player3Username: tournamentEntity.player3Username,
                player4Username: tournamentEntity.player4Username,
                aliasPlayer1: tournamentEntity.aliasPlayer1,
                aliasPlayer2: tournamentEntity.aliasPlayer2,
                aliasPlayer3: tournamentEntity.aliasPlayer3,
                aliasPlayer4: tournamentEntity.aliasPlayer4,
            },
        });
    }
    async Update(_uuid, tournamentEntity) {
        await PrismaService_1.default.tournament.update({
            where: { tournamentUuid: _uuid },
            data: {
                tournamentName: tournamentEntity?.tournamentName,
                player1Username: tournamentEntity?.player1Username,
                player2Username: tournamentEntity?.player2Username,
                player3Username: tournamentEntity?.player3Username,
                player4Username: tournamentEntity?.player4Username,
            },
        });
    }
    async Delete(_uuid) {
        await PrismaService_1.default.tournament.delete({
            where: { tournamentUuid: _uuid },
        });
    }
    async GetAll() {
        const tournamentsData = await PrismaService_1.default.tournament.findMany();
        if (!tournamentsData.length) {
            throw new Error(ErrorCatalog_js_1.ErrorCatalog.TournamentNotFound.SetError());
        }
        return tournamentsData.map((tournament) => Tournament_1.Tournament.fromDatabase(tournament.tournamentUuid, tournament.tournamentName, tournament.player1Username, tournament.player2Username, tournament.player3Username, tournament.player4Username, tournament.aliasPlayer1, tournament.aliasPlayer2, tournament.aliasPlayer3, tournament.aliasPlayer4));
    }
    async GetTournamentQueryDTOByUuid(uuid) {
        const tournamentData = await PrismaService_1.default.tournament.findUnique({ where: { tournamentUuid: uuid } });
        if (!tournamentData)
            return null;
        const entity = Tournament_1.Tournament.fromDatabase(tournamentData.tournamentUuid, tournamentData.tournamentName, tournamentData.player1Username, tournamentData.player2Username, tournamentData.player3Username, tournamentData.player4Username, tournamentData.aliasPlayer1, tournamentData.aliasPlayer2, tournamentData.aliasPlayer3, tournamentData.aliasPlayer4);
        return this.mapToQueryDTO(entity);
    }
    async GetTournamentEntityByUuid(uuid) {
        const tournamentData = await PrismaService_1.default.tournament.findUnique({ where: { tournamentUuid: uuid } });
        if (!tournamentData)
            return null;
        return Tournament_1.Tournament.fromDatabase(tournamentData.tournamentUuid, tournamentData.tournamentName, tournamentData.player1Username, tournamentData.player2Username, tournamentData.player3Username, tournamentData.player4Username, tournamentData.aliasPlayer1, tournamentData.aliasPlayer2, tournamentData.aliasPlayer3, tournamentData.aliasPlayer4);
    }
    async GetAllTournaments(username) {
        const tournaments = await PrismaService_1.default.tournament.findMany({
            where: username ? {
                OR: [
                    { player1Username: username },
                    { player2Username: username },
                    { player3Username: username },
                    { player4Username: username }
                ]
            } : {}
        });
        return tournaments.map((tournament) => this.mapToQueryDTO(Tournament_1.Tournament.fromDatabase(tournament.tournamentUuid, tournament.tournamentName, tournament.player1Username, tournament.player2Username, tournament.player3Username, tournament.player4Username, tournament.aliasPlayer1, tournament.aliasPlayer2, tournament.aliasPlayer3, tournament.aliasPlayer4)));
    }
    async VerifyIfTournamentExistsByUUID(uuid) {
        const user = await PrismaService_1.default.tournament.findUnique({ where: { tournamentUuid: uuid } });
        return user !== null;
    }
    mapToQueryDTO(tournamentEntity) {
        return new GetTournamentQueryDTO_1.GetTournamentQueryDTO(tournamentEntity.tournamentUuid, tournamentEntity.tournamentName, tournamentEntity.player1Username, tournamentEntity.player2Username, tournamentEntity.player3Username, tournamentEntity.player4Username, tournamentEntity.aliasPlayer1, tournamentEntity.aliasPlayer2, tournamentEntity.aliasPlayer3, tournamentEntity.aliasPlayer4);
    }
}
exports.TournamentRepository = TournamentRepository;
