import {GetUserQuery} from "../QueryObject/GetUserQuery.js";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {UserQueryDTO} from "../../../Domain/DTO/Query/UserQueryDTO.js";
import {BaseHandlerQuery} from "./BaseHandlerQuery.js";

export class GetUserQueryHandler implements BaseHandlerQuery<GetUserQuery | null>
{
    constructor(private UserRepository: UserRepository, NotificationError: NotificationError)
    {
    }

    async Handle(query: GetUserQuery): Promise<UserQueryDTO | null>
    {
        return await this.UserRepository.GetUserByIdentifier(query.Uuid, query.Username);
    }
}