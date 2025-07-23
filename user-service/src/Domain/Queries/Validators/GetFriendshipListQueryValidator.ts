import {BaseValidator} from "../../Command/Validators/BaseValidator.js";
import {GetFriendshipListQuery} from "../QueryObject/GetFriendshipListQuery.js";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog.js";
import {CustomError} from "../../../Shared/Errors/CustomError.js";
import {ValidationException} from "../../../Shared/Errors/ValidationException.js";

export class GetFriendshipListQueryValidator implements BaseValidator<GetFriendshipListQuery>
{
    constructor(private userRepository: UserRepository, private  notificationError: NotificationError)
    {
    }

    public Validator(query: GetFriendshipListQuery, notificationError: NotificationError)
    {
        if (!this.userRepository.VerifyIfUserExistsByUUID(query.uuid))
            this.notificationError.AddError(ErrorCatalog.UserNotFound);

        if (this.notificationError.NumberOfErrors() > 0)
        {
            const allErrors: CustomError[] = this.notificationError.GetAllErrors();
            throw new ValidationException(allErrors);
        }
    }
}