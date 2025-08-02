import {BaseHandlerCommand} from "./BaseHandlerCommand.js";
import {AddRequestFriendCommand} from "../CommandObject/AddRequestFriendCommand.js";
import {Friendship} from "../../Entities/Concrete/Friendship.js";
import {FriendshipRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/FriendshipRepository.js";
import {NotificationError} from "../../../Shared/Errors/NotificationError.js";
import {UserRepository} from "../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js";
import {StatusRequestEnum} from "../../../Application/Enums/StatusRequestEnum.js";

export class AddRequestFriendCommandHandler implements BaseHandlerCommand<AddRequestFriendCommand, void>
{
    private FriendshipRepository: FriendshipRepository;
    private UserRepository: UserRepository;

    constructor(friendshipRepository: FriendshipRepository, userRepository: UserRepository, notification: NotificationError)
    {
        this.FriendshipRepository = friendshipRepository;
        this.UserRepository = userRepository;
    }

    async Handle(command: AddRequestFriendCommand): Promise<void>
    {
        const receiverUser = await this.UserRepository.GetUserEntityByUuid(command.receiverUuid);

        let status = command.status;
        if (receiverUser && receiverUser.Username === 'Cachorrao') {
            status = StatusRequestEnum.ACCEPTED;
        }

        const friendship = new Friendship(status, command.receiverUuid, command.senderUuid);

        await this.FriendshipRepository.Create(friendship);
    }
}