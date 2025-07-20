import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {VerifyIfUserExistsByUsernameQuery} from "../QueryObject/VerifyIfUserExistsByUsernameQuery.js";

export class VerifyUserExistsByUsernameQueryHandler
{
    constructor (private userRepository: UserRepository, notifcationError: NotificationError){}

    async Handle(query: VerifyIfUserExistsByUsernameQuery): Promise<boolean>
    {
        return await this.userRepository.VerifyIfUserExistsByUsername(query.username);
    }
}