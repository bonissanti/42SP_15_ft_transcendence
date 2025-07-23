import {BaseHandlerCommand} from "./BaseHandlerCommand.js";
import {ChangeRequestFriendStatusCommand} from "../CommandObject/ChangeRequestFriendStatusCommand.js";
import {AddRequestFriendCommand} from "../CommandObject/AddRequestFriendCommand.js";
import {Friendship} from "../../Entities/Concrete/Friendship.js";

export class AddRequestFriendCommandHandler implements BaseHandlerCommand<AddRequestFriendCommand>
{
    private FriendshipRepository: FriendshipRepository;

    constructor(friendshipRepository: FriendshipRepository, notification: notificationError)
    {
        this.FriendshipRepository = friendshipRepository;
    }

    async Handle(command: AddRequestFriendCommand): Promise<void>
    {
        const friendship = new Friendship(command.status, command.receiverUuid, command.senderUuid);

        await this.FriendshipRepository.Create(friendship);
    }
}