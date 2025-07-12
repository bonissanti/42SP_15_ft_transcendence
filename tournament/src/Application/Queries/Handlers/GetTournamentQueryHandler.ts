import {TournamentRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/TournamentRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {BaseHandlerQuery} from "./BaseHandlerQuery.js";
import {GetTournamentQuery} from "../QueryObject/GetTournamentQuery";
import {GetTournamentQueryDTO} from "../../../Domain/QueryDTO/GetTournamentQueryDTO";

export class GetTournamentQueryHandler implements BaseHandlerQuery<GetTournamentQuery | null>
{
    constructor(private tournamentRepository: TournamentRepository, NotificationError: NotificationError)
    {
    }

    async Handle(query: GetTournamentQuery): Promise<GetTournamentQueryDTO | null>
    {
        return await this.tournamentRepository.GetTournamentQueryDTOByUuid(query.tournamentUuid);
    }
}