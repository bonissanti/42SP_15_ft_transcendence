import {BaseHandlerQuery} from "./BaseHandlerQuery";
import {GenerateMatchmakingQuery} from "../QueryObject/GenerateMatchmakingQuery";
import {GetUserMatchmakingQueryDTO} from "../../QueryDTO/GetUserMatchmakingQueryDTO";
import {NotificationError} from "../../../Shared/Errors/NotificationError";
import {UserServiceClient} from "../../../Infrastructure/Http/Concrete/UserServiceClient";

export class GenerateMatchmakingQueryHandler implements BaseHandlerQuery<GenerateMatchmakingQuery, GetUserMatchmakingQueryDTO | null>
{
    constructor(private backendApiClient: UserServiceClient, NotificationError: NotificationError)
    {
    }

    async Handle(query: GenerateMatchmakingQuery): Promise<GetUserMatchmakingQueryDTO | null>
    {
        return await this.backendApiClient.SearchForOpponent(query.username, query.wins, query.totalGames);
    }
}