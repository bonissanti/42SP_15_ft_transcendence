import {TournamentRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/TournamentRepository";
import {NotificationError} from "../../../Shared/Errors/NotificationError";
import {BaseHandlerQuery} from "./BaseHandlerQuery";
import {GetTournamentQuery} from "../QueryObject/GetTournamentQuery";
import {GetTournamentQueryDTO} from "../../QueryDTO/GetTournamentQueryDTO";

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