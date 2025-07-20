import {BaseHandlerQuery} from "./BaseHandlerQuery";
import {GetAllHistoriesQuery} from "../QueryObject/GetAllHistoriesQuery";
import {GetAllHistoriesQueryDTO} from "../../QueryDTO/GetAllHistoriesQueryDTO";
import {HistoryRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/HistoryRepository";
import {NotificationError} from "../../../Shared/Errors/NotificationError";

export class GetAllHistoriesQueryHandler implements BaseHandlerQuery<GetAllHistoriesQuery, GetAllHistoriesQueryDTO[] | null>
{
    constructor(private historyRepository: HistoryRepository, NotificationError: NotificationError)
    {
    }

    async Handle(query: GetAllHistoriesQuery): Promise<GetAllHistoriesQueryDTO[] | null>
    {
        return await this.historyRepository.GetAllHistoriesByUsername(query.username);
    }
}