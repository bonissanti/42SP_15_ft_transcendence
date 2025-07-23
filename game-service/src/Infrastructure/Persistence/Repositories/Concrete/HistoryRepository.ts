import {IBaseRepository} from "../Interface/IBaseRepository";
import {History} from "../../../../Domain/Entities/Concrete/History";
import prisma from "../../../Service/PrismaService";
import {ErrorCatalog} from "../../../../Shared/Errors/ErrorCatalog";
import {GetAllHistoriesQueryDTO} from "../../../../Domain/QueryDTO/GetAllHistoriesQueryDTO";
import { NotificationError } from "src/Shared/Errors/NotificationError";

export class HistoryRepository implements IBaseRepository<GetAllHistoriesQueryDTO, History>
{

    public async Create(entity: History): Promise<void>
    {
        await prisma.history.create({
            data: {
                historyUuid: entity.historyUuid,
                tournamentName: entity.tournamentName,
                player1Username: entity.player1Username,
                player1Points: entity.player1Points,
                player2Username: entity.player2Username,
                player2Points: entity.player2Points,
                player3Username: entity.player3Username,
                player3Points: entity.player3Points,
                player4Username: entity.player4Username,
                player4Points: entity.player4Points,
            }
        });
    }

    public async GetAllHistoriesByUsername(username: string): Promise<History[]>
    {
        const historyData = await prisma.history.findMany({
            where: username? {
                OR: [
                    {player1Username: username},
                    {player2Username: username},
                    {player3Username: username},
                    {player4Username: username},
                ]
            } : {}
        });

        if (!historyData.length)
            throw new Error(ErrorCatalog.HistoryNotFound.SetError());

        return historyData.map((historyData) => this.RecoverEntity(historyData));
    }

    private RecoverEntity(history: any): History {
        return new History(
            history.tournamentName ?? undefined,
            history.player1Username,
            history.player1Points,
            history.player2Username,
            history.player2Points,
            history.player3Username,
            history.player3Points,
            history.player4Username,
            history.player4Points
        );
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