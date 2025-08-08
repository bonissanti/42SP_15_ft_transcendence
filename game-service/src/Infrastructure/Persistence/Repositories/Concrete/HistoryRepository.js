"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryRepository = void 0;
const PrismaService_1 = __importDefault(require("../../../Service/PrismaService"));
class HistoryRepository {
    async Create(entity) {
        await PrismaService_1.default.history.create({
            data: {
                historyUuid: entity.historyUuid,
                tournamentId: entity.tournamentId,
                tournamentName: entity.tournamentName,
                gameType: entity.gameType,
                player1Username: entity.player1Username,
                player1Alias: entity.player1Alias,
                player1Points: entity.player1Points,
                player2Username: entity.player2Username,
                player2Alias: entity.player2Alias,
                player2Points: entity.player2Points,
                player3Username: entity.player3Username,
                player3Alias: entity.player3Alias,
                player3Points: entity.player3Points,
                player4Username: entity.player4Username,
                player4Alias: entity.player4Alias,
                player4Points: entity.player4Points,
            }
        });
    }
    async GetAllHistoriesByUsername(username) {
        const historyData = await PrismaService_1.default.history.findMany({
            where: username ? {
                OR: [
                    { player1Username: username },
                    { player2Username: username },
                    { player3Username: username },
                    { player4Username: username },
                ]
            } : {}
        });
        return historyData;
    }
    Update(_uuid, entity, notification) {
        throw new Error("Method not implemented.");
    }
    Delete(_uuid, notification) {
        throw new Error("Method not implemented.");
    }
    GetAll() {
        throw new Error("Method not implemented.");
    }
}
exports.HistoryRepository = HistoryRepository;
