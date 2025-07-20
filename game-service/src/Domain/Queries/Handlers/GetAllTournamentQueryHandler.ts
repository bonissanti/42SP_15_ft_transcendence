import {TournamentRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/TournamentRepository";
import {NotificationError} from "../../../Shared/Errors/NotificationError";
import {BaseHandlerQuery} from "./BaseHandlerQuery";
import {GetAllTournamentsQuery} from "../QueryObject/GetAllTournamentsQuery";
import {GetAllTournamentsQueryDTO} from "../../QueryDTO/GetAllTournamentsQueryDTO";

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