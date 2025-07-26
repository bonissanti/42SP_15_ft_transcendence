import {BaseHandlerQuery} from "./BaseHandlerQuery.js";
import {VerifyIfUsersExistsByUuidsQuery} from "../QueryObject/VerifyIfUsersExistsByUuidsQuery.js";

import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {VerifyIfUsersExistsByUsernamesQuery} from "../QueryObject/VerifyIfUsersExistsByUsernamesQuery.js";

export class VerifyIfUsersExistsByUsernamesQueryHandler implements BaseHandlerQuery<VerifyIfUsersExistsByUsernamesQuery, boolean>
{
    constructor(private UserRepository: UserRepository, notificationError: NotificationError)
    {
    }

    async Handle(query: VerifyIfUsersExistsByUsernamesQuery): Promise<boolean>
    {
        console.log(query.Usernames);
        return await this.UserRepository.VerifyIfUsersExistsByUsername(query.Usernames);
    }
}