import {GetUserQuery} from "../QueryObject/GetUserQuery.js";
import {TournamentRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/TournamentRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {GetUserDTO} from "../../DTO/ToQuery/GetUserDTO.js";
import {BaseHandlerQuery} from "./BaseHandlerQuery.js";
import {GetUserQueryDTO} from "../../../Domain/QueryDTO/GetUserQueryDTO.js";

export class GetUserQueryHandler implements BaseHandlerQuery<GetUserQuery | null>
{
    constructor(private UserRepository: TournamentRepository, NotificationError: NotificationError)
    {
    }

    async Handle(query: GetUserQuery): Promise<GetUserQueryDTO | null>
    {
        return await this.UserRepository.GetUserQueryDTOByUuid(query.Uuid);
    }
}