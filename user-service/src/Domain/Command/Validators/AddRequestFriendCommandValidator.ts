import {BaseValidator} from "./BaseValidator.js";
import {AddRequestFriendCommand} from "../CommandObject/AddRequestFriendCommand.js";
import {FriendshipRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/FriendshipRepository.js";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {ErrorCatalog} from "../../../Shared/Errors/ErrorCatalog.js";
import {StatusRequest} from "../../../Application/Enums/StatusRequest.js";
import {CustomError} from "../../../Shared/Errors/CustomError.js";
import {ValidationException} from "../../../Shared/Errors/ValidationException.js";

export class AddRequestFriendCommandValidator implements BaseValidator<AddRequestFriendCommand>
{
    private FriendshipRepository: FriendshipRepository;
    private UserRepository: UserRepository;
    private NotificationError: NotificationError;

    constructor(friendshipRepository: FriendshipRepository, userRepository: UserRepository, notificationError: NotificationError)
    {
        this.FriendshipRepository = friendshipRepository;
        this.UserRepository = userRepository;
        this.NotificationError = notificationError;
    }

    //TODO: RequestFriend or FriendRequest?
    public async Validator(command: AddRequestFriendCommand): Promise<void>
    {
        if (command.senderUuid === command.receiverUuid)
            this.NotificationError.AddError(ErrorCatalog.RequestToSamePerson);

        const users: string[] = [command.senderUuid, command.receiverUuid];
        if (!await this.UserRepository.VerifyIfUsersExistsByUUIDs(users))
            this.NotificationError.AddError(ErrorCatalog.UserNotFound)

        if (command.status !== StatusRequest.PENDING)
            this.NotificationError.AddError(ErrorCatalog.InvalidStatusFriendRequest)

        if (await this.FriendshipRepository.VerifyIfFriendshipExistsByUsersUuid(command.senderUuid, command.receiverUuid))
            this.NotificationError.AddError(ErrorCatalog.FriendshipAlreadyExists);

        if (this.NotificationError.NumberOfErrors() > 0){
            const allErrors : CustomError[] = this.NotificationError.GetAllErrors();
            throw new ValidationException(allErrors);
        }
    }
}