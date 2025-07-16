import {BaseHandlerQuery} from "./BaseHandlerQuery.js";
import {VerifyIfUsersExistsByUuidsQuery} from "../QueryObject/VerifyIfUsersExistsByUuidsQuery.js";

import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";

export class VerifyIfUsersExistsByUuidsQueryHandler implements BaseHandlerQuery<VerifyIfUsersExistsByUuidsQuery, boolean>
{
    constructor(private UserRepository: UserRepository, notificationError: NotificationError)
    {
    }

    async Handle(query: VerifyIfUsersExistsByUuidsQuery): Promise<boolean>
    {
        return await this.UserRepository.VerifyIfUsersExistsByUUIDs(query.Uuids);
    }
}