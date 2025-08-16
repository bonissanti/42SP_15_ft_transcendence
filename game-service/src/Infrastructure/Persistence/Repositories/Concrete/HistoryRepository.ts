import {IBaseRepository} from "../Interface/IBaseRepository";
import {History} from "../../../../Domain/Entities/Concrete/History";
import prisma from "../../../Service/PrismaService";
import {ErrorCatalog} from "../../../../Shared/Errors/ErrorCatalog";
import {GetAllHistoriesQueryDTO} from "../../../../Domain/QueryDTO/GetAllHistoriesQueryDTO";
import { NotificationError } from "src/Shared/Errors/NotificationError";
import { UserServiceClient } from "../../../Http/Concrete/UserServiceClient";

export class HistoryRepository implements IBaseRepository<GetAllHistoriesQueryDTO, History>
{
    private userServiceClient: UserServiceClient;

    constructor() {
        this.userServiceClient = new UserServiceClient();
    }

    public async Create(entity: History): Promise<void>
    {
        await prisma.history.create({
            data: {
                historyUuid: entity.historyUuid,
                tournamentId: entity.tournamentId,
                tournamentName: entity.tournamentName,
                gameType: entity.gameType,
                player1Uuid: entity.player1Uuid,
                player1Alias: entity.player1Alias,
                player1Points: entity.player1Points,
                player2Uuid: entity.player2Uuid,
                player2Alias: entity.player2Alias,
                player2Points: entity.player2Points,
                player3Uuid: entity.player3Uuid,
                player3Alias: entity.player3Alias,
                player3Points: entity.player3Points,
                player4Uuid: entity.player4Uuid,
                player4Alias: entity.player4Alias,
                player4Points: entity.player4Points,
            }
        });
    }

    public async GetAllHistoriesByUuid(uuid: string): Promise<any[]>
    {
        const historyData = await prisma.history.findMany({
            where: uuid? {
                OR: [
                    {player1Uuid: uuid},
                    {player2Uuid: uuid},
                    {player3Uuid: uuid},
                    {player4Uuid: uuid},
                ]
            } : {}
        });

        if (historyData.length === 0) {
            return [];
        }

        const allPlayerUuids = new Set<string>();
        console.log("History Data: ", historyData);
        historyData.forEach((history: any) => {
            if (history.player1Uuid) allPlayerUuids.add(history.player1Uuid);
            if (history.player2Uuid) allPlayerUuids.add(history.player2Uuid);
            if (history.player3Uuid) allPlayerUuids.add(history.player3Uuid);
            if (history.player4Uuid) allPlayerUuids.add(history.player4Uuid);
        });

        const usersData = await this.userServiceClient.GetUsersByUuids(Array.from(allPlayerUuids));
        console.log('Users data from user-service:', usersData);
        
        const userMap = new Map();
        if (usersData) {
            usersData.forEach((user: any) => {
                console.log(`Mapping user: ${user.Uuid} -> ${user.Username}`);
                userMap.set(user.Uuid, user);
            });
        }
        
        console.log('UserMap contents:', Array.from(userMap.entries()));

        return historyData.map((history: any) => {
            console.log(`Looking for player1: ${history.player1Uuid}, found: ${userMap.get(history.player1Uuid)?.Username || 'NOT FOUND'}`);
            console.log(`Looking for player2: ${history.player2Uuid}, found: ${userMap.get(history.player2Uuid)?.Username || 'NOT FOUND'}`);
            
            return {
                historyUuid: history.historyUuid,
                tournamentId: history.tournamentId,
                tournamentName: history.tournamentName,
                gameType: history.gameType,
                player1Username: userMap.get(history.player1Uuid)?.Username || 'Unknown',
                player1Alias: history.player1Alias,
                player1Points: history.player1Points,
                player2Username: userMap.get(history.player2Uuid)?.Username || 'Unknown',
                player2Alias: history.player2Alias,
                player2Points: history.player2Points,
                player3Username: history.player3Uuid ? (userMap.get(history.player3Uuid)?.Username || 'Unknown') : null,
                player3Alias: history.player3Alias,
                player3Points: history.player3Points,
                player4Username: history.player4Uuid ? (userMap.get(history.player4Uuid)?.Username || 'Unknown') : null,
                player4Alias: history.player4Alias,
                player4Points: history.player4Points,
            };
        });
    }

    Update(_uuid: string, entity: History, notification: NotificationError): Promise<void> {
        throw new Error("Method not implemented.");
    }
    Delete(_uuid: string, notification: NotificationError): Promise<void> {
        throw new Error("Method not implemented.");
    }
    GetAll(): Promise<History[] | null> {
        throw new Error("Method not implemented.");
    }
}