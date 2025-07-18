import {BaseHandlerQuery} from "./BaseHandlerQuery";
import {GenerateMatchmakingQuery} from "../QueryObject/GenerateMatchmakingQuery";
import {GenerateMatchmakingQueryDTO} from "../../QueryDTO/GenerateMatchmakingQueryDTO";
import {NotificationError} from "../../../Shared/Errors/NotificationError";
import {HistoryRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/HistoryRepository";

export class GenerateMatchmakingQueryHandler implements BaseHandlerQuery<GenerateMatchmakingQuery, GenerateMatchmakingQueryDTO>
{
    constructor(private historyRepository: HistoryRepository, NotificationError: NotificationError)
    {
    }

    async Handle(query: GenerateMatchmakingQuery): Promise<GenerateMatchmakingQueryDTO | null>
    {
        return await this.historyRepository.SearchForClosestOpponent(query.wins);
    }
}