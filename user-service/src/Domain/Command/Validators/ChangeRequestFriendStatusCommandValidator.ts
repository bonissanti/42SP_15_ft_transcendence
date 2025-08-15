import {BaseValidator} from "./BaseValidator.js";
import {ChangeRequestFriendStatusCommand} from "../CommandObject/ChangeRequestFriendStatusCommand.js";
import {FriendshipRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/FriendshipRepository.js";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog.js";
import {StatusRequestEnum} from "../../../Application/Enums/StatusRequestEnum.js";
import {CustomError} from "../../../Shared/Errors/CustomError.js";
import {ValidationException} from "../../../Shared/Errors/ValidationException.js";
import { NotificationError } from "src/Shared/Errors/NotificationError.js";

export class ChangeRequestFriendStatusCommandValidator implements BaseValidator<ChangeRequestFriendStatusCommand>
{
    private FriendshipRepository: FriendshipRepository;
    private NotificationError: NotificationError;

    constructor(friendshipRepository: FriendshipRepository, notificationError: NotificationError)
    {
        this.FriendshipRepository = friendshipRepository;
        this.NotificationError = notificationError;
    }

    public async Validator(command: ChangeRequestFriendStatusCommand): Promise<void>
    {
        this.NotificationError.CleanErrors();
        if (command.status === StatusRequestEnum.PENDING)
            this.NotificationError.AddError(ErrorCatalog.InvalidStatusFriendRequest);

        if (!await this.FriendshipRepository.VerifyIfFriendshipExistsByFriendshipUuid(command.friendshipUuid))
            this.NotificationError.AddError(ErrorCatalog.FriendshipAlreadyExists);
        if (this.NotificationError.NumberOfErrors() > 0){
            const allErrors : CustomError[] = this.NotificationError.GetAllErrors();
            throw new ValidationException(allErrors);
        }
    }
}