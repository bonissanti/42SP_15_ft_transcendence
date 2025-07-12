import {TournamentRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/TournamentRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {BaseHandlerQuery} from "./BaseHandlerQuery.js";
import {GetAllTournamentsQuery} from "../QueryObject/GetAllTournamentsQuery";
import {GetAllTournamentsQueryDTO} from "../../../Domain/QueryDTO/GetAllTournamentsQueryDTO";

export class GetAllTournamentQueryHandler implements BaseHandlerQuery<GetAllTournamentsQuery, GetAllTournamentsQueryDTO[] | null>
{
    constructor(private tournamentRepository: TournamentRepository, NotificationError: NotificationError)
    {
    }

    async Handle(query: GetAllTournamentsQuery): Promise<GetAllTournamentsQueryDTO[] | null>
    {
        return await this.tournamentRepository.GetAllTournaments(query.userUuid);
    }
}