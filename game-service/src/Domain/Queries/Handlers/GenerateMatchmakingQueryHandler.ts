import {BaseHandlerQuery} from "./BaseHandlerQuery";
import {GenerateMatchmakingQuery} from "../QueryObject/GenerateMatchmakingQuery";
import {GetUserMatchmakingQueryDTO} from "../../QueryDTO/GetUserMatchmakingQueryDTO";
import {NotificationError} from "../../../Shared/Errors/NotificationError";
import {BackendApiClient} from "../../../Infrastructure/Http/Concrete/BackendApiClient";

export class GenerateMatchmakingQueryHandler implements BaseHandlerQuery<GenerateMatchmakingQuery, GetUserMatchmakingQueryDTO | null>
{
    constructor(private backendApiClient: BackendApiClient, NotificationError: NotificationError)
    {
    }

    async Handle(query: GenerateMatchmakingQuery): Promise<GetUserMatchmakingQueryDTO | null>
    {
        return await this.backendApiClient.SearchForOpponent(query.username, query.wins, query.totalGames);
    }
}