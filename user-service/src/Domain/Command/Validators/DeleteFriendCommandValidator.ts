import {BaseValidator} from "./BaseValidator.js";
import {DeleteFriendCommand} from "../CommandObject/DeleteFriendCommand.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog.js";
import {CustomError} from "../../../Shared/Errors/CustomError.js";
import {ValidationException} from "../../../Shared/Errors/ValidationException.js";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {FriendshipRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/FriendshipRepository.js";

export class DeleteFriendCommandValidator implements BaseValidator<DeleteFriendCommand>
{
    constructor(private friendshipRepository: FriendshipRepository, private userRepository: UserRepository, private notificationError: NotificationError)
    {
    }

    public async Validator(command: DeleteFriendCommand): Promise<void>
    {
        if (!await this.userRepository.VerifyIfUserExistsByUUID(command.friendshipUuid))
            this.notificationError.AddError(ErrorCatalog.UserNotFound);

        if (!await this.friendshipRepository.VerifyIfFriendshipExistsByFriendshipUuid(command.friendshipUuid))
            this.notificationError.AddError(ErrorCatalog.FriendshipAlreadyExists);

        if (this.notificationError.NumberOfErrors() > 0){
            const allErrors : CustomError[] = this.notificationError.GetAllErrors();
            throw new ValidationException(allErrors);
        }
    }
}